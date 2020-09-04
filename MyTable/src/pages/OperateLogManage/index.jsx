
import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { connect } from 'umi'
import { getOperateLogList } from './service'
import { columns } from './columns'




const OperateLogManage = (props) => {

    const actionRef = useRef();

    const { EnumValue } = props
    const { dispatch } = props

    useEffect(() => {
        dispatch({
            type: "OperateLogManageModel/fetchEnumValue"
        })
    }, [])




    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns(EnumValue)}
                actionRef={actionRef}
                // onSubmit={submitSearch}
                request={async (params) => {
                    const par = params
                    par.pageNum = params.current
                    if (params.createTo && params.createFrom) {
                        const res = await getOperateLogList(params)

                        if (res.code === 200) {
                            return Promise.resolve({
                                data: res.data.rows,
                                success: true,
                                total: res.data.total
                            })
                        }
                        message.error(`出错了：${res.message || res.code}`)
                    } else {
                        message.error("查询参数中开始时间和结束时间为必选")
                    }

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

export default connect(({ OperateLogManageModel }) => ({
    EnumValue: OperateLogManageModel.EnumValue
}))(React.memo(OperateLogManage))