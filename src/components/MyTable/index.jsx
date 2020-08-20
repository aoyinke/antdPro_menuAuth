import React, { useEffect, useState } from 'react'
import { Table, Card } from 'antd';
import TableSeachHeader from './components/tableSeachHeader'



let pageNum = 1
let pageSize = 10
const MyTable = (props) => {

    const [tableData, handleTableData] = useState([])
    const [requestParams,handleParams] = useState({})
    const [isLoading,handleIsLoading] = useState(false)
    const { columns, dataSource, searchColumns, Search, manulDataRender } = props
    const { request } = props


    /**
     * 
     * @param {当前页码和每页数据量} params 
     */
    const initial = async (params) => {
        handleIsLoading(()=>true)
        const par = {}
        if (params) {
            if (params.pageSize || params.size) {
                pageSize = params.pageSize || params.size
            }
            if (params.page || params.current) {
                pageNum = params.page || params.current
            }

        }
        par.pageNum = pageNum
        par.pageSize = pageSize

        
        const rowData = await request(Object.assign(par, params,requestParams))
        handleIsLoading(()=>false)
        handleTableData(()=>rowData)
        console.log("tableData",tableData)
        return rowData
    }

    /**
     * 保存每次查询的变量
     */

    const saveSearchParams = (params)=>{

        handleParams(()=> params)
    }

    useEffect(() => {
        if (!manulDataRender) {
            initial()
        }
    }, [])

    return (
        <>
            <TableSeachHeader columns={searchColumns} saveSearchParams={saveSearchParams} search={initial} need={Search} />
            <Card>
                <Table
                    columns={columns}
                    loading={{spinning:isLoading,delay:500}}
                    dataSource={dataSource || tableData.rows}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper:true,
                        total:tableData.total,
                        onChange: (page, size) => {
                            const params = { page, size }
                            initial(params)
                        },
                        onShowSizeChange: (current, size) => {
                            const params = { current, size }
                            initial(params)
                        }
                    }}
                />
            </Card>
        </>
    )
}


export default MyTable