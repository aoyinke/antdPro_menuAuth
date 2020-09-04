import React, { useRef, useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { formateDate } from '@/utils/utils';
import AgeignTestContext from './context';
import AgeingTestDetail from './components/AgeingTestDetail';
import StartToAgeingTest from './components/StartAgeingTest';
import { getAgeingTest } from './service';
import { columns } from './columns';

const AgeingTest = (props) => {
  const [insideId, handleInsideId] = useState('');
  const [selectedEquip, handleSelectedEquip] = useState([]);
  const { equipValueEnum } = props;
  const actionRef = useRef();
  const { dispatch } = props;

  // 设置初始访问的起止时间
  const date = new Date(
    new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1,
  );
  const treeDaysAgo = new Date(
    new Date(new Date().toLocaleDateString()).getTime() - 2 * 24 * 60 * 60 * 1000 - 1,
  );
  const createFrom = formateDate(treeDaysAgo);
  const createTo = formateDate(date);
    console.log(createFrom,createTo)
  /**
   * 准备Enum对象
   */

  useEffect(() => {
    dispatch({
      type: 'EquipListModel/fetchPrepareEnumValue',
    });
  }, []);

  const options = (text, row, _, action) => [
    <Button
      type="primary"
      onClick={() => {
        if (row.status === '2') {
          message.error('待老化设备无详情信息');
          return;
        }
        handleInsideId(() => row.insideId);
        dispatch({
          type: 'AgeingTestModel/changeDetailModalVisible',
          payload: true,
        });
      }}
    >
      详情
    </Button>,
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        columns={columns(options, equipValueEnum)}
        pagination={{
          showQuickJumper: true,
        }}                                                                                                                
        actionRef={actionRef}
        request={async (params) => {
          const par = params;
          par.pageNum = params.current;
          try {
            const res = await getAgeingTest(params);
            if (res.code !== 200) {
              message.error(`页面请求数据失败，状态码：${res.code || '网关错误'}`);
            } else {
              return Promise.resolve({
                data: res.data.rows,
                success: true,
                total: res.data.total,
              });
            }
          } catch (error) {
            console.log(error);
          }
          return Promise.resolve({
            success: true,
          });
        }}
        scroll={{x:1500}}
        sticky
        rowKey="id"
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            handleSelectedEquip(() => selectedRows);
          },
        }}
        dateFormatter="string"
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
            开始老化
          </Button>,
        ]}
      />
      <AgeignTestContext.Provider
        value={{ actionRef, selectedEquip, insideId, createFrom, createTo }}
      >
        <StartToAgeingTest />
        <AgeingTestDetail />
      </AgeignTestContext.Provider>
    </PageHeaderWrapper>
  );
};

export default connect(({ EquipListModel }) => ({
  equipValueEnum: EquipListModel.equipValueEnum,
}))(React.memo(AgeingTest));
