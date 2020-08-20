import React, { useRef,useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Button} from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi'


let selectedEquip = []
const UpgradeTest = () => {

    
    const columns = [


        {
            title: '设备类型英文名',
            dataIndex: 'enName',
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: 50,
            hideInSearch: true,
        },
        {
            title: '设备类型中文名',
            dataIndex: 'zhName',
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: 100,
            hideInSearch: true,
        },
        {
            title: '当前机号',
            dataIndex: 'currentMacId',

            width: 100,
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '老化参数',
            dataIndex: 'oldingParam',
            width: 100,
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '库存参数',
            dataIndex: 'endingParam',
            width: 100,
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '生产参数',
            dataIndex: 'productParam',
            width: 100,
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '测试参数',
            dataIndex: 'testingParam',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: 150,
            hideInSearch: true,
            hideInForm: true
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 100,
            hideInSearch: true
        }

    ];

    const actionRef = useRef();
    /**
     * 准备Enum对象
     */
    const prepareEnumValue = async ()=>{

    }

    /**
     * 开始老化测试
     */
    const startToAgeTest = async ()=>{

    }
    useEffect(()=>{
        prepareEnumValue()
    })
    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns}
                pagination={{
                    showQuickJumper: true,
                }}
                search={false}
                actionRef={actionRef}
                request={async (params) => {
                    params.pageNum = params.current
                    console.log("params", params)
                    // try {
                    //     let res = await getEquipList(params)
                    //     console.log("res", res)
                    //     if (res.code !== 200) {
                    //         message.error("页面请求数据失败，状态码：" + res.code)
                    //     } else {
                    //         return Promise.resolve({
                    //             data: res.data.rows,
                    //             success: true,
                    //             total: res.data.total
                    //         })
                    //     }

                    // } catch (error) {
                    //     console.err(error)
                    // }
                    return Promise.resolve({
                        success: true
                    })

                }}
                rowKey="id"
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        selectedEquip = selectedRows
                    }

                }}
                dateFormatter="string"
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={() => {
                        // dispatch({
                        //     type: "GlobalModel/changeCreateModalVisible",
                        //     payload: true
                        // })
                        // console.log("createModalVisible", createModalVisible)
                    }}>
                        批量入库
                    </Button>
                ]}
            />
        </PageHeaderWrapper>
    )
}

export default UpgradeTest