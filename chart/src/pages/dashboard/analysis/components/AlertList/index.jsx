import React, {useRef} from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { columns } from './columns';

const AlertManage = (props) => {
  const {loading} = props
  const actionRef = useRef()
  const options = (text, row, _, action) => [
    <Button
      type="primary"
      key="1"
      onClick={() => {

      }}
    >
      确认
    </Button>,
    <Button
      type="primary"
      key="2"
      onClick={() => {

      }}
      danger
    >
      忽略
  </Button>,
  ];
  const data = []
  let count = 1
  for(let i = 0;i<30;i++){
    data.push({
      id:count,
      state:"已确认",
      content:"水淹告警",
      posi:"仓库1入口",
      name:"顶呱呱服饰",
      company:"武进支公司",
      companyIndex:"10086",
      crisisPosi:"黄xx",
      manager:"刘xx",
      concat:"马xx"
    })
    count++
  }
  return (
    <ProTable
      columns={columns(options)}
      headerTitle="告警列表"
      options={false}
      pagination={{
        showQuickJumper: true,
      }}
      loading={loading}
      scroll={{
        x:1500
      }}
      sticky
      search={false}
      actionRef={actionRef}
      request={async (params) => {

        return Promise.resolve({
          success: true,
          data,
          total:30
        });
      }}
      defaultData={data}
      rowKey="id"
      dateFormatter="string"

    />

  );
};

export default React.memo(AlertManage)
