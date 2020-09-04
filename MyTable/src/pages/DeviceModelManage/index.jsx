import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Menu, Dropdown, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import DeleteDeviceModal from '@/components/DeleteModal';
import CreateDeviceModal from '@/components/CreateModal';
import ModifyDeviceModal from '@/components/ModifyModal';
import { connect } from 'umi';
import { getModelListAll, getTypeIds, changeModel, createtModel, deletetModel } from './service';
import { columns, modifyColumns, creColumns } from './columns';

const DeviceModelManage = (props) => {
  const actionRef = useRef();
  const [typeIds, handelTypeIds] = useState({});
  const modifyRef = useRef();
  let typeId;
  const [selected, handleSelected] = useState([]);
  const { dispatch } = props;

  const fetchDate = async () => {
    const res = await getTypeIds();

    try {
      if (res.code === 200) {
        const tmp = {};
        res.data.forEach((item) => {
          tmp[item.id] = { text: item.remark };
        });
        handelTypeIds(tmp);
      }else{
        message.error(`出错了：${res.message || res.code}`)
      }
    } catch (error) {
      message.error(`设备类型获取失败:${res.message}`);
    }
  };

  useEffect(() => {
    fetchDate();
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

  /**
   * 添加报警
   * @param fields
   */
  const createModelFunc = async (value) => {
    const hide = message.loading('正在添加');
    try {
      const response = await createtModel({ ...value, typeId });
      if (response.code === 200) {
        hide();
        message.success('添加成功');
        actionRef.current.reload();
      } else {
        hide();
        message.error('添加失败请重试！');
      }
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  /**
   * 删除报警
   * @param fields
   */

  const deleteModelFunc = async () => {
    const ids = selected.map((item) => {
      return item.id;
    });

    const hide = message.loading('正在删除');

    try {
      await deletetModel(ids);
      hide();
      message.success('删除成功，即将刷新');
      dispatch({
        type: 'GlobalModel/changeDeleteModalVisible',
        payload: false,
      });
      actionRef.current.reload();
      actionRef.current.clearSelected();
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
    }
  };

  /**
   * 更新报警
   * @param fields
   */

  const handleUpdate = async (params) => {
    const hide = message.loading('正在修改');

    try {
      await changeModel(params);
      hide();
      message.success('修改成功');
      dispatch({
        type: 'GlobalModel/changeModifyModalVisible',
        payload: false,
      });
      actionRef.current.reload();
      return true;
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
      return false;
    }
  };

  const options = (text, row, _, action) => [
    <Button
      type="primary"
      onClick={() => {
        dispatch({
          type: 'GlobalModel/saveCurrentRowData',
          payload: row,
        });
        dispatch({
          type: 'GlobalModel/changeModifyModalVisible',
          payload: true,
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
        columns={columns(typeIds, options)}
        pagination={{
          showQuickJumper: true,
        }}
        search
        actionRef={actionRef}
        request={async (params) => {
          const par = params;
          if (!par.typeId) {
            message.error("未选择设备类型")
          } else {
            par.pageNum = params.current;
            typeId = par.typeId
            const res = await getModelListAll(par);
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
            handleSelected(() => selectedRows);
          },
        }}
        dateFormatter="string"
        headerTitle="设备型号管理"
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
      <CreateDeviceModal
        title="新建设备型号"
        creColumns={creColumns()}
        onSubmit={createModelFunc}
      />
      <ModifyDeviceModal
        title="修改设备型号"
        modifyColumns={modifyColumns(typeIds)}
        modifyRef={modifyRef}
        onSubmit={handleUpdate}
      />
      <DeleteDeviceModal title="删除设备型号" deleteFunc={deleteModelFunc} />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(React.memo(DeviceModelManage));
