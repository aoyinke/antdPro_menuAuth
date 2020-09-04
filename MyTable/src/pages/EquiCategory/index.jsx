import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import CreateEquipModal from '@/components/CreateModal';
import ModifyEquipModal from '@/components/ModifyModal';
import { getEquipList, changeEquip, createEquip } from './service';
import { modifyColumns, columns } from './columns';

const EquiCategory = (props) => {
  const actionRef = useRef();
  const modifyRef = useRef();
  const { dispatch } = props;
  /**
   * 添加设备类型
   * @param fields
   */
  const createEquiFunc = async (value) => {
    const hide = message.loading('正在添加');
    const par = value;
    par.testingParams = JSON.parse(value.testingParam);
    par.oldingParams = JSON.parse(value.oldingParam);
    par.stockParams = JSON.parse(value.stockParam)
    par.upgradeParams = JSON.parse(value.upgradeParam)
    try {
      const res = await createEquip(par);
      if (res.code === 200) {
        message.success('添加成功');
        actionRef.current.reload();
      } else {
        message.error(`添加失败:${res.message}`);
      }
      hide();
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  /**
   * 更新设备类型
   * @param fields
   */

  const handleUpdate = async (params) => {
    const hide = message.loading('正在修改');
    const par = params;
    par.testingParams = JSON.parse(params.testingParam);
    par.oldingParams = JSON.parse(params.oldingParam);
    par.stockParams = JSON.parse(params.stockParam)
    par.upgradeParams = JSON.parse(params.upgradeParam)
    try {
      const res = await changeEquip(par);
      if (res.code !== 200) {
        hide();
        message.error(`修改错误，：${res.code || res.message}`);
      } else {
        message.success('修改成功');
        hide();
        actionRef.current.reload();
      }
    } catch (error) {
      hide();
      message.error('修改失败请重试！');
    }
  };

  const options = (text, row, _, payload) => [
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
        columns={columns(options)}
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        actionRef={actionRef}
        scroll={{x:1500}}
        sticky
        request={async (params) => {
          const par = params;
          par.pageNum = params.current;
          // console.log("params",params)
          try {
            const res = await getEquipList(params);
            if (res.code !== 200) {
              message.error(`页面请求数据失败，状态码：${res.code}`);
            } else {
              return Promise.resolve({
                data: res.data.rows,
                success: true,
                total: res.data.total,
              });
            }
          } catch (error) {
            console.err(error);
          }
          return Promise.resolve({
            success: true,
          });
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="设备类型管理"
        toolBarRender={() => [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              dispatch({
                type: 'GlobalModel/changeCreateModalVisible',
                payload: true,
              });
            }}
          >
            <PlusOutlined />
            新建
          </Button>,
        ]}
      />
      <CreateEquipModal
        title="新建设备类型"
        columns={columns(options)}
        onSubmit={createEquiFunc}
      />

      <ModifyEquipModal
        title="修改设备类型"
        modifyColumns={modifyColumns}
        modifyRef={modifyRef}
        onSubmit={handleUpdate}
      />
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(React.memo(EquiCategory));
