import React, { useRef, useEffect } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { message } from 'antd';
import { getEquipList, getDictDetailAccroName } from './service';

const EquiList = (props) => {
  const actionRef = useRef();
  const { equipValueEnum, equipLoading } = props;
  const { dispatch } = props;
  useEffect(() => {
    dispatch({
      type: 'EquipListModel/fetchPrepareEnumValue',
    });
  }, []);
  const columns = [
    {
      title: '开始时间',
      dataIndex: 'createFrom',
      valueType: 'dateTime',
      hideInTable: true,
    },
    {
      title: '结束时间',
      dataIndex: 'createTo',
      valueType: 'dateTime',
      hideInTable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '内部Id',
      dataIndex: 'insideId',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '外部Id',
      dataIndex: 'outsideId',
      ellipsis: true,
      width: '7%',
    },
    {
      title: 'imsi',
      dataIndex: 'imsi',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '设备机号',
      dataIndex: 'macId',
      ellipsis: true,
      width: '4%',
    },
    {
      title: '打印机号',
      dataIndex: 'printMacId',
      ellipsis: true,
      width: '4%',
    },
    {
      title: '型号',
      dataIndex: 'model',
      ellipsis: true,
      width: '7%',
      hideInSearch: true,
    },
    {
      title: '型号名',
      dataIndex: 'modelName',
      ellipsis: true,
      hideInSearch: true,
      width: '7%',
    },
    {
      title: '类型名称',
      dataIndex: 'typeName',
      ellipsis: true,
      width: '7%',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: equipValueEnum,
      hideInSearch: true,
      width: '7%',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '7%',
      ellipsis: true,
      hideInSearch: true,
    },
    // {
    //     title: '操作',
    //
    //     valueType: 'option',
    //     render: (text, row, _, action) => [

    //         <Button type="primary" onClick={() => {

    //         }}>修改</Button>
    //     ]
    // },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        columns={columns}
        pagination={{
          showQuickJumper: true,
        }}
        loading={{
          spinning: equipLoading,
        }}
        actionRef={actionRef}
        request={async (params) => {
          const par = params;
          par.pageNum = params.current;
          // console.log("params",params)
          try {
            const res = await getEquipList(par);
            const dictInfo = await getDictDetailAccroName(['equipState']);

            const { equipState } = dictInfo.data;

            equipState.forEach((equipItem) => {
              const equipValue = equipItem.value;
              equipValueEnum[equipValue] = { text: equipItem.laber };
            });

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
    </PageHeaderWrapper>
  );
};

export default connect(({ EquipListModel, loading }) => ({
  equipValueEnum: EquipListModel.equipValueEnum,
  equipLoading: loading.effects['EquipListModel/fetchPrepareEnumValue'],
}))(EquiList);
