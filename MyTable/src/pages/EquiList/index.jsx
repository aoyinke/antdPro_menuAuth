import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { message, Button } from 'antd';
import ChangeState from './components/ChangeState'
import { getEquipList } from './service';
import { columns } from './columns';

const allowChange = ["0", "-1", "1"]
const EquiList = (props) => {
  const [currentState, handleCurrentState] = useState(0)
  const actionRef = useRef();
  const { equipValueEnum, equipLoading } = props;
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'EquipListModel/fetchPrepareEnumValue',
    });
  }, []);

  const options = (text, row, _, payload) => [
    <Button
      type="primary"
      onClick={() => {
        handleCurrentState(() => row.status)
        
        if (allowChange.indexOf(row.status) !== -1) {
          dispatch({
            type: 'EquipListModel/changeStateModalVisible',
            payload: true,
          });
          return
        }

        message.error(`${equipValueEnum[row.status].text} 不可修改状态`)
      }}
    >
      修改状态
    </Button>,
  ];
  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        columns={columns(equipValueEnum, options)}
        pagination={{
          showQuickJumper: true,
        }}
        loading={{
          spinning: equipLoading,
        }}
        actionRef={actionRef}
        scroll={{x:1500}}
        sticky
        request={async (params) => {
          const par = params;
          par.pageNum = params.current;
          try {
            const res = await getEquipList(par);
            if (res.code === 200) {
              return Promise.resolve({
                data: res.data.rows,
                success: true,
                total: res.data.total,
              });
            }
            message.error(`获取设备列表错误，状态码 ${res.code}`);
          } catch (error) {
            message.error(`获取设备列表错误，${error}`);
          }
          return Promise.resolve({
            success: true,
          });
        }}
        rowKey="id"
        dateFormatter="string"
        headerTitle="设备列表"
      />
      <ChangeState state={currentState} />
    </PageHeaderWrapper>
  );
};

export default connect(({ EquipListModel, loading }) => ({
  equipValueEnum: EquipListModel.equipValueEnum,
  equipLoading: loading.effects['EquipListModel/fetchPrepareEnumValue'],
}))(React.memo(EquiList));
