import React, { useRef, useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import CreateAgeingModal from '@/components/createInfoModal'
import { connect } from 'umi'
import { getFullDateTime } from '@/utils/utils'
import globalStyles from '@/global.less'
import { startToAgeingTest, getAgeingTest, getAgeingList } from './service'
import styles from './styles.less'

let selectedEquip = []

const AgeingTest = props => {



    const { createModalVisible, detailModalVisible, insideId, equipValueEnum } = props
    const actionRef = useRef();
    const detailActionRef = useRef()
    const { dispatch } = props
    
    // 设置初始访问的起止时间
    const date = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
    const treeDaysAgo = new Date(new Date(new Date().toLocaleDateString()).getTime() - 2 * 24 * 60 * 60 * 1000 - 1)
    const createFrom = getFullDateTime(treeDaysAgo)
    const createTo = getFullDateTime(date)

    /**
     * 准备Enum对象
     */


    /**
     * 开始老化测试
     */
    const startToAgeTest = async () => {
        const isError = selectedEquip.every(item => {
            if (item.status === "2" || item.status === '4') {
                return true
            }
            return false
        });

        if (!isError) {
            message.error("勾选了非老化中或非老化失败")
            return
        }
        const ids = selectedEquip.map(item => {
            return item.id;
        })
        if (ids.length) {

            try {
                const response = await startToAgeingTest(ids)
                if (response.code === 200) {
                    message.info("批量老化测试成功")
                    actionRef.current.clearSelected()
                } else if (response.message) {
                    message.info(`批量老化测试失败:${response.message}`)
                }

            } catch (error) {
                console.log(error)
            }
            dispatch({
                type: "GlobalModel/changeCreateModalVisible",
                payload: false
            })
            actionRef.current.reload();
            actionRef.current.clearSelected();
        } else {
            message.error("老化设备不能为空")
        }
    }
    useEffect(() => {
        dispatch({
            type: "EquipListModel/fetchPrepareEnumValue"
        })
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
            title: '测试人',
            dataIndex: 'user',
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
                        message.error("待老化设备无详情信息")
                        return;
                    }
                    dispatch({
                        type: "AgeingTestModel/saveInsideId",
                        payload: row.insideId
                    })
                    dispatch({
                        type: "AgeingTestModel/changeDetailModalVisible",
                        payload: true
                    })
                }}>详情</Button>,

            ],
        },

    ];
    const detailColumns = [
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
            title: '创建时间',
            dataIndex: 'createTime',
            width: "9%",
            ellipsis: true,
            hideInSearch: true
        }

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
                    const par = params
                    par.pageNum = params.current
                    try {
                        const res = await getAgeingTest(params)
                        if (res.code !== 200) {
                            message.error(`页面请求数据失败，状态码：${res.code}`)
                        } else {
                            return Promise.resolve({
                                data: res.data.rows,
                                success: true,
                                total: res.data.total
                            })
                        }

                    } catch (error) {
                        console.log(error)
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
                    }}>
                        开始老化
                    </Button>
                ]}
            />
            <CreateAgeingModal
                title="批量老化测试" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })
                }} modalVisible={createModalVisible}>
                <p>确认开始批量老化测试</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={startToAgeTest} >确认开始</Button>
                </div>
            </CreateAgeingModal>
            <CreateAgeingModal
                title="老化测试详情" onCancel={() => {
                    dispatch({
                        type: "AgeingTestModel/changeDetailModalVisible",
                        payload: false
                    })
                }} modalVisible={detailModalVisible}
                wrapClassName={styles.ageingTestDetail}
                style={{ top: 0 }}
                width="100%"
            >
                <ProTable
                    columns={detailColumns}
                    pagination={{
                        showQuickJumper: true,
                    }}

                    actionRef={detailActionRef}
                    request={async (params) => {
                        const par = params
                        par.pageNum = params.current;
                        par.insideId = insideId

                        if (!params.createFrom && !params.createTo) {
                            par.createFrom = createFrom
                            par.createTo = createTo
                        }
                        try {
                            const res = await getAgeingList(par);
                            if (res.code !== 200) {
                                message.error(`页面请求数据失败，状态码：${res.code}`);
                            } else {
                                return Promise.resolve({
                                    data: res.data.rows,
                                    success: true,
                                    total: res.data.total,
                                });
                            }
                        } catch (error) {
                            console.log(error);
                        }
                        return Promise.resolve({
                            success: true,
                        });
                    }}
                    rowKey="id"

                    dateFormatter="string"

                />
            </CreateAgeingModal>
        </PageHeaderWrapper>
    )
}

export default connect(({ GlobalModel, AgeingTestModel, EquipListModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
    detailModalVisible: AgeingTestModel.detailModalVisible,
    insideId: AgeingTestModel.insideId,
    equipValueEnum: EquipListModel.equipValueEnum
}))(AgeingTest)