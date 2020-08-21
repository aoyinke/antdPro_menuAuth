import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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
    console.log('params', params);
    const par = params;
    if (params.createFrom && params.createTo) {
      par.createFrom = formateDate(params.createFrom);
      par.createTo = formateDate(params.createTo);
    }
    try {
      const response = await getOperateLogList(params);
      if (response.code === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
    return [];
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
      />
    </PageHeaderWrapper>
  );
};

export default Test;
