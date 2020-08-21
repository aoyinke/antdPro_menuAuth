import React, { useRef, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Space, message, Modal } from 'antd';
import { connect } from 'umi';
import CreateDict from '@/components/createInfoModal';
import styles from './styles.less';
import { leftColumns, rightColumns, createDictDetailColumns, modifyColumns } from './columns';
import { getDictListPage, getDictDetailListPage } from './service';

let currentDelete = [];
let currentDeleteDetail = [];
let currentModify = {};
let currentModifyDetail = {};
const DictImprove = (props) => {
  const [allowDealDetail, handleAllowDealDetail] = useState(false);
  const [selected, handleSelected] = useState({});
  const actionFormRef = useRef();
  const actionRef = useRef();
  const detailActionRef = useRef();
  const detailFormRef = useRef();
  const {
    createModalVisible,
    createDetailModalVisible,
    modifyModalVisible,
    modifyDetailModalVisible,
    deleteDetailModalVisible,
    deleteModalVisible,
  } = props;
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'DictModel/saveDictDetailList',
      payload: { data: { rows: [] } },
    });
  }, []);
  /**
   *
   * @param {动态修改字典选中样式} record
   */
  const setRowClassName = (record) => {
    return record.id === selected.id ? styles.selected : '';
  };

  /**
   *
   * @param {新增字典}} params
   */
  const addDictFunc = (params) => {
    dispatch({
      type: 'DictModel/fetchAddDict',
      payload: params,
    });
    actionRef.current.reload();
  };

  /**
   *
   * @param {创建字典详情} record
   */

  const createDictDetail = (paramas) => {
    dispatch({
      type: 'DictModel/fetchAddDetailDict',
      payload: paramas,
    });
    detailActionRef.current.reload();
  };

  /**
   *
   * @param {删除字典}} params
   */
  const deleteDictFunc = () => {
    const ids = currentDelete.map((item) => {
      return item.id;
    });

    if (ids.length) {
      dispatch({
        type: 'DictModel/fetchDeleteDict',
        payload: ids,
      });
      actionRef.current.reload();
      actionRef.current.clearSelected();
    } else {
      message.error(`批量删除不可为空`);
    }
  };

  /**
   *
   * @param {删除字典详情}} params
   */
  const deleteDictDetailFunc = () => {
    const ids = currentDeleteDetail.map((item) => {
      return item.id;
    });
    if (ids.length) {
      const { dictName } = currentDeleteDetail[0];
      dispatch({
        type: 'DictModel/fetchDeleteDetailDict',
        payload: { ids, dictName },
      });
      actionRef.current.reload();
      detailActionRef.current.reload();
      detailActionRef.current.clearSelected();
    } else {
      message.error(`批量删除不可为空`);
    }
  };

  /**
   * @param {修改字典}} params
   */

  const changeDictFunc = (params) => {
    const par = Object.assign(currentModify, params);
    dispatch({
      type: 'DictModel/fetchUpdateDict',
      payload: par,
    });
    actionRef.current.reload();
  };

  /**
   * @param {修改字典详情}} params
   */

  const changeDictDetaiFunc = (params) => {
    const par = Object.assign(currentModifyDetail, params);
    dispatch({
      type: 'DictModel/fetchUpdateDetailDict',
      payload: par,
    });
  };

  const leftOptions = (text, record) => (
    <Space size="middle">
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: 'GlobalModel/changeModifyModalVisible',
            payload: true,
          });
          currentModify = record;
          setTimeout(() => {
            actionFormRef.current.setFieldsValue(record);
          });
        }}
      >
        修改
      </Button>
    </Space>
  );

  const rightOptions = (text, record) => (
    <Space size="middle">
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: 'GlobalModel/changeModifyDetailModalVisible',
            payload: true,
          });
          currentModifyDetail = record;
          setTimeout(() => {
            detailFormRef.current.setFieldsValue(record);
          });
        }}
      >
        修改
      </Button>
    </Space>
  );

  return (
    <PageHeaderWrapper>
      <div className={styles.dictWrapper}>
        <div className={styles.wrapperLeft}>
          <ProTable
            columns={leftColumns(leftOptions)}
            pagination={{
              showQuickJumper: true,
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  handleAllowDealDetail(() => true);
                  handleSelected(() => record);
                  detailActionRef.current.reload();
                },
              };
            }}
            rowClassName={setRowClassName}
            search={false}
            options={false}
            actionRef={actionRef}
            request={async (params) => {
              const response = await getDictListPage(params);
              if (response.code === 200) {
                return Promise.resolve({
                  data: response.data.rows,
                  success: true,
                  total: response.data.total,
                });
              }
              message.error(`出错了：${response.message}`);
              return Promise.resolve({
                success: true,
              });
            }}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                currentDelete = selectedRows;
              },
            }}
            rowKey="id"
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
              <Button
                key="4"
                type="primary"
                danger
                onClick={() => {
                  dispatch({
                    type: 'GlobalModel/changeDeleteModalVisible',
                    payload: true,
                  });
                }}
              >
                <MinusOutlined />
                删除
              </Button>,
            ]}
            dateFormatter="string"
          />
        </div>
        <div className={styles.wrapperRight}>
          <ProTable
            columns={rightColumns(rightOptions)}
            pagination={{
              showQuickJumper: true,
            }}
            actionRef={detailActionRef}
            options={false}
            search={false}
            rowKey="id"
            dateFormatter="string"
            request={async () => {
              const response = await getDictDetailListPage({ name: selected.name });
              if (response.code === 200) {
                return Promise.resolve({
                  data: response.data.rows,
                  success: true,
                  total: response.data.total,
                });
              }
              message.error(`出错了：${response.message}`);
              return Promise.resolve({
                success: true,
              });
            }}
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                currentDeleteDetail = selectedRows;
              },
            }}
            toolBarRender={() => [
              <Button
                key="3"
                type="primary"
                disabled={!allowDealDetail}
                onClick={() => {
                  dispatch({
                    type: 'GlobalModel/changeCreateDetailModalVisible',
                    payload: true,
                  });
                }}
              >
                <PlusOutlined />
                新建
              </Button>,
              <Button
                key="4"
                type="primary"
                disabled={!allowDealDetail}
                danger
                onClick={() => {
                  dispatch({
                    type: 'GlobalModel/changeDeleteDetailModalVisible',
                    payload: true,
                  });
                }}
              >
                <MinusOutlined />
                删除
              </Button>,
            ]}
          />
        </div>
      </div>
      <CreateDict
        title="创建字典"
        onCancel={() => {
          dispatch({
            type: 'GlobalModel/changeCreateModalVisible',
            payload: false,
          });
        }}
        modalVisible={createModalVisible}
      >
        <ProTable onSubmit={addDictFunc} type="form" columns={leftColumns(leftOptions)} />
      </CreateDict>
      <CreateDict
        title="创建字典详情"
        onCancel={() => {
          dispatch({
            type: 'GlobalModel/changeCreateDetailModalVisible',
            payload: false,
          });
        }}
        modalVisible={createDetailModalVisible}
      >
        <ProTable
          onSubmit={(value) => {
            const params = Object.assign(selected, value);
            params.dictName = selected.name;
            createDictDetail(params);
          }}
          type="form"
          columns={createDictDetailColumns}
        />
      </CreateDict>
      <Modal
        title="确认删除该字典"
        visible={deleteModalVisible}
        onOk={deleteDictFunc}
        onCancel={() => {
          dispatch({
            type: 'GlobalModel/changeDeleteModalVisible',
            payload: false,
          });
        }}
      >
        <p>是否确认删除该字典？</p>
      </Modal>
      <Modal
        title="确认删除该字典详情"
        visible={deleteDetailModalVisible}
        onOk={deleteDictDetailFunc}
        onCancel={() => {
          dispatch({
            type: 'GlobalModel/changeDeleteDetailModalVisible',
            payload: false,
          });
        }}
      >
        <p>是否确认删除该字典详情？</p>
      </Modal>
      <CreateDict
        title="修改字典"
        onCancel={() => {
          dispatch({
            type: 'GlobalModel/changeModifyModalVisible',
            payload: false,
          });
        }}
        modalVisible={modifyModalVisible}
      >
        <ProTable
          onSubmit={(value) => {
            changeDictFunc(value);
          }}
          type="form"
          formRef={actionFormRef}
          columns={modifyColumns}
        />
      </CreateDict>
      <CreateDict
        title="修改字典详情"
        onCancel={() => {
          dispatch({
            type: 'GlobalModel/changeModifyDetailModalVisible',
            payload: false,
          });
        }}
        modalVisible={modifyDetailModalVisible}
      >
        <ProTable
          onSubmit={(value) => {
            changeDictDetaiFunc(value);
          }}
          type="form"
          formRef={detailFormRef}
          columns={createDictDetailColumns}
        />
      </CreateDict>
    </PageHeaderWrapper>
  );
};

export default connect(({ DictModel, loading, GlobalModel }) => ({
  dictList: DictModel.dictList,
  dictDetailList: DictModel.dictDetailList,
  createDetailModalVisible: GlobalModel.createDetailModalVisible,
  createModalVisible: GlobalModel.createModalVisible,
  deleteDetailModalVisible: GlobalModel.deleteDetailModalVisible,
  deleteModalVisible: GlobalModel.deleteModalVisible,
  modifyModalVisible: GlobalModel.modifyModalVisible,
  modifyDetailModalVisible: GlobalModel.modifyDetailModalVisible,
  dictListLoading: loading.effects['DictModel/fetchGetDictListPage'],
}))(DictImprove);
