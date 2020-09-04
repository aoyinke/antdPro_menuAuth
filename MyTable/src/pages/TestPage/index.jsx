import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Button,message} from 'antd'
import { EnumValueHandle, formateDate } from '@/utils/utils';
import MyTable from '@/components/MyTable';
import { categoryCheck, getOperateLogList } from './service';
import { searchColumns, columns } from './columns';

const Test = () => {
  const [type, handleType] = useState({});

  const getLogType = async () => {
    try {
      const res = await categoryCheck();
      handleType(EnumValueHandle(res.data));
    } catch (error) {
      message.error(`出错了:${error}`);
    }
  };

  /**
   *
   * @param {页面获取数据函数}
   */
  const request = async (params) => {
    const par = params;
    if (params.createFrom && params.createTo) {
      par.createFrom = formateDate(params.createFrom);
      par.createTo = formateDate(params.createTo);
      console.log("par", par)
    }
    try {
      const response = await getOperateLogList(par);
      if (response.code === 200) {
        return {
          data: response.data.rows,
          total: response.data.total,
          success: true
        };
      }
    } catch (error) {
      console.log(error);
    }
    return {
      success: true
    };
  };

  useEffect(() => {
    getLogType();
  }, []);
  return (
    <PageHeaderWrapper title={false}>
      <MyTable
        columns={columns}
        searchColumns={searchColumns(type)}
        manulDataRender
        request={request}
        rowKey="id"
        scroll={{ x: 1500 }}
        sticky
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            console.log("selectedRows", selectedRows)
          }

        }}
        toolBarRender={() => [
          <Button
            key="3"
            type="primary"
            onClick={() => {
              
            }}
          >
            开始老化
          </Button>,
        ]}
      />
    </PageHeaderWrapper>
  );
};

export default Test;
