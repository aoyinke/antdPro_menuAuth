import React, { useEffect, useState, useRef} from 'react';
import { Table, Card } from 'antd';
import { connect } from 'umi'
import TableSeachHeader from './components/tableSeachHeader';
import ToolBarRender from './components/ToolBarRender'
import { handleEnumColumns } from './utils'

let pageNum = 1;
let pageSize = 20;
const MyTable = (props) => {
  const [isLoading, handleIsLoading] = useState(false)
  const [tableData, handleTableData] = useState([]);
  const requestParamsRef = useRef()
  const {
    columns,
    dataSource,
    searchColumns,
    Search,
    manulDataRender,
    toolBarRender,
    options = true
  } = props;
  const { dispatch } = props
  const { request } = props;

  /**
   *
   * @param {当前页码和每页数据量} params
   */
  const initial = async (params) => {
    handleIsLoading(() => true);
    const par = {};
    if (params) {
      if (params.pageSize || params.size) {
        pageSize = params.pageSize || params.size;
      }
      if (params.page || params.current) {
        pageNum = params.page || params.current;
      }
    }
    par.pageNum = pageNum;
    par.pageSize = pageSize;
    const res = await request(Object.assign(par, params, requestParamsRef.current));
    if (res.success) {
      handleTableData(() => res);
      handleIsLoading(() => false)
    } else {
      throw new Error("返回的数据为空")
    }
    return res;
  };

  /**
   * 保存每次查询的变量
   */

  const saveSearchParams = (params) => {
    requestParamsRef.current = params
  };

  useEffect(() => {
    if (!manulDataRender) {
      handleIsLoading(() => true)
      initial();

    }
  }, []);



  return (
    <>
      <TableSeachHeader
        columns={searchColumns}
        saveSearchParams={saveSearchParams}
        search={initial}
        need={Search}
      />
      <Card>
        {options ? <ToolBarRender request={initial} tools={toolBarRender} /> : <></>}
        <Table
          columns={handleEnumColumns(columns)}
          loading={{ spinning: isLoading }}
          dataSource={dataSource || tableData.data}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            total: tableData.total,
            onChange: (page, size) => {
              const params = { page, size };
              initial(params);
            },
            onShowSizeChange: (current, size) => {
              const params = { current, size };
              initial(params);
            },
          }}
          {...props}
        />
      </Card>
    </>
  );
};

export default connect(() => ({
}))(React.memo(MyTable));
