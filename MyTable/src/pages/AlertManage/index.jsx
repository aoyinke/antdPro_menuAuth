import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Menu, Dropdown, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import DeleteAlertModal from './components/Delete';
import CreateAlertModal from './components/Create';
import ModifyAlertModal from './components/Modify';
import AlertManageContext from './context'
import {
  getAlertList,
  getDictDetailAccroName,
} from './service';
import { modifyColumns, columns, creColumns } from './columns';

const AlertManage = (props) => {
  const { dispatch } = props;
  const [equipCategoryEnum, handleEquipCategoryEnum] = useState({});
  const [typeId, handleTypeId] = useState(0)
  const [selected, handleSelected] = useState([])
  const actionRef = useRef();
  const modifyRef = useRef();


  const prepareEnum = async () => {
    const res = await getDictDetailAccroName(['alarmType']);

    try {
      if (res.code === 200) {
        const { alarmType } = res.data;
        const tmp = {};
        alarmType.forEach((element) => {
          tmp[element.value] = { text: element.laber };
        });
        handleEquipCategoryEnum(() => tmp);
      } else {
        message.error(`报警类型获取失败${res.message}`);
      }
    } catch (error) {
      message.error(`报警类型获取失败${res.message}`);
    }
  };

  useEffect(() => {
    prepareEnum();
  }, []);

  async function handleMenuClick(e) {
    if (selected.length) {
      if (e.key === 'remove') {
        dispatch({
          type: 'GlobalModel/changeDeleteModalVisible',
          payload: true,
        });
      }
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="remove">删除</Menu.Item>
      {/* <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item> */}
    </Menu>
  );
  const options = (text, row, _, action) => [
    <Button
      type="primary"
      onClick={() => {
        dispatch({
          type: 'GlobalModel/changeModifyModalVisible',
          payload: true,
        });

        dispatch({
          type: 'GlobalModel/saveCurrentRowData',
          payload: row,
        });
        setTimeout(() => {
          modifyRef.current.setFieldsValue(row);
        }, 100);
      }}
    >
      修改
    </Button>,
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        columns={columns(equipCategoryEnum, options)}
        pagination={{
          showQuickJumper: true,
        }}

        actionRef={actionRef}
        request={async (params) => {
          const par = params;
          if (!par.typeId) {
            message.error("未选择报警类型");
          } else {
            par.pageNum = params.current;
            handleTypeId(() => par.typeId)
            const res = await getAlertList(par);
            if (res.code === 200) {
              return Promise.resolve({
                data: res.data.rows,
                success: true,
                total: res.data.total,
              });
            } 
            message.error(`出错了：${res.message || res.code}`)
          }
          return Promise.resolve({
            success: true,
          });
        }}
        manualRequest
        rowKey="id"
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            handleSelected(() => selectedRows)
          },
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              if (typeId) {
                dispatch({
                  type: 'GlobalModel/changeCreateModalVisible',
                  payload: true,
                });
              } else {
                message.error("需先进行查询")
              }

            }}
          >
            <PlusOutlined />
            新建
          </Button>,
          <Dropdown overlay={menu}>
            <Button key="4">
              批量处理 <DownOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <AlertManageContext.Provider value={{ creColumns: creColumns(), actionRef, typeId }}>
        <CreateAlertModal
        />
      </AlertManageContext.Provider>

      <AlertManageContext.Provider value={{ modifyRef, modifyColumns: modifyColumns(equipCategoryEnum), actionRef }}>
        <ModifyAlertModal
        />
      </AlertManageContext.Provider>

      <AlertManageContext.Provider value={{ selected, actionRef }}>
        <DeleteAlertModal />
      </AlertManageContext.Provider>

    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(React.memo(AlertManage));
