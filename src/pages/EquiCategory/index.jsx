import React, { useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi'
import CreateEquip from '@/components/createInfoModal'
import { getEquipList, changeEquip, createEquip } from './service'

const EquiCategory = props => {


    const actionRef = useRef();
    const modifyRef = useRef()
    const { dispatch } = props
    const { createModalVisible, modifyModalVisible, currentRowData } = props
    /**
     * 添加设备类型
     * @param fields
     */
    const createEquiFunc = async (value) => {
        const hide = message.loading('正在添加');
        const par = value
        par.testingParams = JSON.parse(value.testingParams)
        par.testingParam = value.testingParams
        try {
            await createEquip(value);
            hide();
            message.success('添加成功');
            return true;
        } catch (error) {
            hide();
            message.error('添加失败请重试！');
            return false;
        }
    }

    /** 
     * 更新角色
     * @param fields
     */

    const handleUpdate = async params => {
        const hide = message.loading('正在修改');

        try {
            let res = await changeEquip(params);
            if (res.code !== 200) {
                hide()
                message.error(`修改错误，状态码：${res.code ? res.code : res.status}`)
            } else {
                message.success('修改成功');
                hide()
                dispatch({
                    type: "GlobalModel/changeModifyModalVisible",
                    payload: false
                })
                actionRef.current.reload()
                return true;
            }

        } catch (error) {
            hide();
            message.error('修改失败请重试！');
            return false;
        }
    };

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
        },
        {
            title: '操作',
            width: 50,
            valueType: 'option',
            render: (text, row, _, payload) => [

                <Button type="primary" onClick={() => {
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: true
                    })

                    dispatch({
                        type: "GlobalModel/saveCurrentRowData",
                        payload: row
                    })

                    setTimeout(() => {
                        modifyRef.current.setFieldsValue(row)
                    }, 100)
                }}>修改</Button>
            ]
        },
        {
            title: '测试参数',
            dataIndex: 'testingParams',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: 100,
            hideInTable: true,
        },

    ];

    const modifyColumns = [


        {
            title: '设备类型英文名',
            dataIndex: 'enName',

        },
        {
            title: '设备类型中文名',
            dataIndex: 'zhName',

        },
        {
            title: '当前机号',
            dataIndex: 'currentMacId',

        },
        {
            title: '测试参数',
            dataIndex: 'testingParam',

        },

    ];
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
                    const par = params
                    par.pageNum = params.current
                    // console.log("params",params)
                    try {
                        const res = await getEquipList(params)
                        console.log("res", res)
                        if (res.code !== 200) {
                            message.error(`页面请求数据失败，状态码：${res.code}`)
                        } else {0
                            return Promise.resolve({
                                data: res.data.rows,
                                success: true,
                                total: res.data.total
                            })
                        }

                    } catch (error) {
                        console.err(error)
                    }

                }}
                rowKey="id"

                dateFormatter="string"
                headerTitle="设备类型管理"
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={() => {
                        dispatch({
                            type: "GlobalModel/changeCreateModalVisible",
                            payload: true
                        })
                    }}>
                        <PlusOutlined />
                        新建
                    </Button>
                ]}
            />
            <CreateEquip
                title="新建设备类型" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })

                }} modalVisible={createModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        const success = await createEquiFunc(value);
                        if (success) {
                            dispatch({
                                type: "GlobalModel/changeCreateModalVisible",
                                payload: false
                            })

                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    rowKey="createUser"
                    type="form"
                    columns={columns}
                />
            </CreateEquip>
            <CreateEquip
                title="修改设备类型"
                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: false
                    })
                }} modalVisible={modifyModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        const par = value
                        par.testingParams = JSON.parse(value.testingParam)
                        const params = { ...par, id: currentRowData.id }
                        await handleUpdate(params);
                    }}
                    rowKey="id"
                    type="form"
                    columns={modifyColumns}
                    formRef={modifyRef}
                />
            </CreateEquip>

        </PageHeaderWrapper>
    )
}

export default connect(({ GlobalModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
    modifyModalVisible: GlobalModel.modifyModalVisible,
    currentModifyRole: GlobalModel.currentModifyRole,
    currentRowData: GlobalModel.currentRowData
}))(EquiCategory)