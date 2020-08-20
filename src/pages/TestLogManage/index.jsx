import React, { useEffect, useState,useRef} from 'react';
import { message} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { getTestLogList, categoryCheck } from './service'
import { EnumValueHandle} from '@/utils/utils'



const TestLogManage = props => {

    const [type, handleType] = useState({})
    const actionRef = useRef();

    const getLogType = async () => {
        try {
            let res = await categoryCheck()
            let types = EnumValueHandle(res.data)
            console.log("types", types)
            handleType(types)

        } catch (error) {
            message.error("出错了！" + error)
        }
    }
    useEffect(() => {
        getLogType()
    }, [])

  

    const columns = [
        {
            title: '开始时间',
            dataIndex: 'createFrom',
            valueType: "dateTime",
            hideInTable: true
        },
        {
            title: '结束时间',
            dataIndex: 'createTo',
            valueType: "dateTime",
            ellipsis: true,
            hideInTable: true
        },
        {
            title: '日志类型',
            dataIndex: 'type',
            ellipsis: true,
            valueEnum: type,
            hideInTable: true
        },
        {
            title: "内容",
            dataIndex: 'content',
            width: 100,
            hideInSearch: true
        },
        {
            title: '方法',
            dataIndex: 'method',
            ellipsis: true,
            width: 100,
            hideInSearch: true
        },
        {
            title: '操作人员',
            dataIndex: 'createUser',
            width: 100,
            hideInForm: true
        },
        {
            title: '内部Id',
            dataIndex: 'insideId',
            width: 100,
            hideInForm: true
        },
        {
            title: '参数',
            dataIndex: 'params',
            ellipsis: true,
            width: 200,
            hideInSearch: true
        },
        {
            title: '测试结果',
            dataIndex: 'result',
            ellipsis: true,
            width: 100,
            hideInSearch: true
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 100,
            hideInSearch: true
        }
       
    ];
    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                // onSubmit={submitSearch}
                request={async (params) => {
                    let {createFrom,createTo} = params
                    if (createFrom && createTo) {
                        params.pageNum = params.current
                        let res = await getTestLogList(params)
                        return Promise.resolve({
                            data: res.data.rows,
                            success: true,
                            total: res.data.total
                        })
                    }
                    return Promise.resolve({
                        success: true,
                    })
                }}
                manualRequest={true}
                rowKey="id"
                dateFormatter="string"
                headerTitle="测试日志"
            />
        </PageHeaderWrapper>
    )
}

export default TestLogManage