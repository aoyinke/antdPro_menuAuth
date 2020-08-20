import React, { useRef, useEffect } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi'
import CreateStockModel from '@/components/createInfoModal'
import globalStyles from '@/global.less'
import { getWareHouseList, getWareHouseLogList, removeFromStock, moveIntoStock } from './service'

const WareHousingManage = props => {

    const actionRef = useRef();
    /**
     * 设置全局变量
     */
    let selectedEquip = []

    const { equipValueEnum, createModalVisible, deleteModalVisible } = props
    const { dispatch } = props
    useEffect(() => {
        dispatch({
            type: "EquipListModel/fetchPrepareEnumValue"
        })
    }, [])

    /**
     * 
     * @param {入库操作} value 
     */
    const createStockFunc = async () => {


        const ids = selectedEquip.map(item => {

            return item.id
        });
        if (ids.length) {
            const hide = message.loading('正在添加');
            try {
                const response = await moveIntoStock(ids);
                if (response.code === 200) {
                    hide();
                    message.success('入库成功');
                } else {
                    hide();
                    message.error('入库失败请重试！');
                }
                dispatch({
                    type: "GlobalModel/changeCreateModalVisible",
                    payload: false
                })
            } catch (error) {
                hide();
                message.error('入库失败请重试！');
            }
        } else {
            message.error("入库设备不能为空")
        }

    }

    /**
     * 
     * @param {出库操作} value 
     */

    const deleteStockFunc = async () => {


        const ids = selectedEquip.map(item => {

            return item.id
        })
        if (ids.length) {
            const hide = message.loading('正在出库');
            try {
                const response = await removeFromStock(ids);
                if (response.code === 200) {
                    hide();
                    message.success('出库成功');
                } else {
                    hide();
                    message.error('出库失败请重试！');
                }
                dispatch({
                    type: "GlobalModel/changeDeleteModalVisible",
                    payload: false
                })
            } catch (error) {
                hide();
                message.error('出库失败请重试！');
            }
        } else {
            message.error("出库设备不能为空")
        }

    }


    const columns = [
        {
            title: '开始时间',
            dataIndex: 'createFrom',
            valueType: "dateTime",
            hideInTable: true,
            hideInForm: true
        },
        {
            title: '结束时间',
            dataIndex: 'createTo',
            valueType: "dateTime",
            hideInTable: true,
            hideInForm: true
        },
        {
            title: '创建人',
            dataIndex: 'user',
            hideInTable: true
        },
        {
            title: '名称',
            dataIndex: 'name',
            ellipsis: true,
            width: "9%",
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
            width: "9%"
        },
        {
            title: '型号',
            dataIndex: 'model',
            ellipsis: true,
            width: "9%",
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
                        const res = await getWareHouseList(params)
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
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={() => {
                        dispatch({
                            type: "GlobalModel/changeCreateModalVisible",
                            payload: true
                        })
                    }}>
                        <PlusOutlined />
                        入库
                    </Button>,
                    <Button key="3" type="primary" danger onClick={() => {
                        dispatch({
                            type: "GlobalModel/changeDeleteModalVisible",
                            payload: true
                        })
                    }}>
                        <MinusOutlined />
                        出库
                    </Button>
                ]}
                dateFormatter="string"

            />
            <CreateStockModel
                title="入库存" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })

                }} modalVisible={createModalVisible}>
                <p>是否确认入库存</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={createStockFunc} >确认</Button>
                </div>
            </CreateStockModel>
            <CreateStockModel
                title="出库存" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeDeleteModalVisible",
                        payload: false
                    })

                }} modalVisible={deleteModalVisible}>
                <p>是否确认出库</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={deleteStockFunc} >确认</Button>
                </div>
            </CreateStockModel>
        </PageHeaderWrapper>
    )
}


export default connect(({ GlobalModel, EquipListModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
    deleteModalVisible: GlobalModel.deleteModalVisible,
    equipValueEnum: EquipListModel.equipValueEnum
}))(WareHousingManage)