
import React, { useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { EnumValueHandle } from '@/utils/utils'
import { categoryCheck, getOperateLogList } from './service'





const OperateLogManage = () => {

    const [type, handleType] = useState({})
    const actionRef = useRef();

    const getLogType = async () => {
        try {
            const res = await categoryCheck()
            const types = EnumValueHandle(res.data)
            handleType(types)

        } catch (error) {
            message.error(`出错了:${error}`)
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

            hideInTable: true
        },
        {
            title: '日志类型',
            dataIndex: 'type',

            valueEnum: type,
            hideInTable: true
        },
        {
            title: "用户名称",
            dataIndex: 'username',
            ellipsis: true,
            width: 150,
            hideInSearch: true
        },
        {
            title: '操作',
            dataIndex: 'operation',
            ellipsis: true,
            width: 150,
            hideInSearch: true
        },
        {
            title: '时间',
            dataIndex: 'time',
            ellipsis: true,
            width: 100,
            hideInSearch: true
        },
        {
            title: '参数',
            dataIndex: 'params',
            ellipsis: true,
            width: 300,
            hideInSearch: true
        },
        {
            title: '方法',
            dataIndex: 'method',
            ellipsis: true,
            width: 200,
            hideInSearch: true
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: "dateTime",
            ellipsis: true,
            width: 200,
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
                    const par = params
                    par.pageNum = params.current
                    const res = await getOperateLogList(params)

                    if (res.code === 200) {
                        return Promise.resolve({
                            data: res.data.rows,
                            success: true,
                            total: res.data.total
                        })
                    }

                    message.error(`出错了：${res.message}`)
                    return Promise.resolve({
                        success: true,
                    })



                }}
                manualRequest
                rowKey="id"
                dateFormatter="string"
            />
        </PageHeaderWrapper>
    )
}

export default OperateLogManage