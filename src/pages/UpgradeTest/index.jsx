import React, { useRef, useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import CreateUpgradeModal from '@/components/createInfoModal'
import { connect, history } from 'umi'
import globalStyles from '@/global.less'
import { startToUpgradingTest, getUpgradeTest, getDictDetailAccroName } from './service'

let selectedEquip = []
const equipValueEnum = {}
const UpgradeTest = props => {

    const { createModalVisible } = props
    const actionRef = useRef();
    const { dispatch } = props

    const prepareEnumValue = async () => {
        try {
            const dictInfo = await getDictDetailAccroName(['equipState'])
            if (dictInfo.code === 200) {
                const { equipState } = dictInfo.data
                equipState.forEach(equipItem => {
                    const equipValue = equipItem.value
                    equipValueEnum[equipValue] = { text: equipItem.laber }
                })
            } else {
                message.error(`出错了，${dictInfo.message}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startToUpgradeTest = async () => {
        const isError = selectedEquip.every(item => {
            if (item.status === "6" || item.status === "8") {
                return true
            }
            return false
        })

        if (!isError) {
            message.error("勾选了升级中或升级成功的设备")
            return
        }

        let ids = selectedEquip.map(item => {
            return item.id
        })

        if (ids.length) {
            try {
                let response = await startToUpgradingTest(ids)
                if (response.code === 200) {
                    message.info("批量升级测试成功")
                    actionRef.current.clearSelected()
                } else {
                    if (response.message) {
                        message.info("批量升级测试失败：" + response.message)
                    }
                }
            } catch (error) {
                console.log(error)
            }
            dispatch({
                type: "GlobalModel/changeCreateModalVisible",
                payload: false
            })
            actionRef.current.reload()
        } else {
            message.error("未选中")
        }
    }

    useEffect(() => {
        prepareEnumValue()
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
            title: '名称',
            dataIndex: 'name',
            ellipsis: true,
            width: "9%"
        },
        {
            title: '内部Id',
            dataIndex: 'insideId',
            ellipsis: true,
            width: "9%"
        },
        {
            title: '外部Id',
            dataIndex: 'outsideId',
            ellipsis: true,
            width: "9%"
        },
        {
            title: 'imsi',
            dataIndex: 'imsi',
            ellipsis: true,
            width: "9%"
        },
        {
            title: '设备机号',
            dataIndex: 'macId',
            ellipsis: true,
            width: "9%"
        },
        {
            title: '打印机号',
            dataIndex: 'printMacId',
            ellipsis: true,
            width: "7%"
        },
        {
            title: '型号',
            dataIndex: 'model',
            ellipsis: true,
            width: "9%",
            hideInSearch: true,
        },
        {
            title: '型号名',
            dataIndex: 'modelName',
            ellipsis: true,
            hideInSearch: true,
            width: "9%",
        },
        {
            title: '类型名称',
            dataIndex: 'typeName',
            ellipsis: true,
            width: "9%",
            hideInSearch: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            ellipsis: true,
            valueEnum: equipValueEnum,
            width: "9%",
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: "9%",
            ellipsis: true,
            hideInSearch: true
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, row, _, action) => [
                <Button type="primary" onClick={() => {
                    if (row.status === "3") {
                        message.error("此设备无详情信息")
                        return;
                    }
                    history.push({ pathname: './UpgradeListDetail', query: { insideId: row.insideId } })
                }}>详情</Button>,

            ],
        },

    ];

    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns}
                pagination={{
                    showQuickJumper: true,
                }}
                actionRef={actionRef}
                request={async (params) => {
                    params.pageNum = params.current
                    console.log("params", params)
                    try {
                        let res = await getUpgradeTest(params)
                        console.log("res", res)
                        if (res.code !== 200) {
                            message.error("页面请求数据失败，状态码：" + res.code)
                        } else {
                            return Promise.resolve({
                                data: res.data.rows,
                                success: true,
                                total: res.data.total
                            })
                        }

                    } catch (error) {
                        console.error(error)
                    }
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
                        dispatch({
                            type: "GlobalModel/changeCreateModalVisible",
                            payload: true
                        })
                        console.log("createModalVisible", createModalVisible)
                    }} >
                        开始升级
                    </Button>
                ]}
            />
            <CreateUpgradeModal
                title="批量升级测试" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })
                }} modalVisible={createModalVisible}>
                <p>确认开始批量升级测试</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={startToUpgradeTest} >确认开始</Button>
                </div>
            </CreateUpgradeModal>
        </PageHeaderWrapper>
    )
}

export default connect(({ GlobalModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
}))(UpgradeTest)