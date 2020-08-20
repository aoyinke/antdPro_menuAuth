import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Button, Menu, Dropdown, Form, message, Card, Select } from 'antd';
import ProTable from '@ant-design/pro-table';

import CreateAlertModal from '@/components/createInfoModal'

import { getModelListAll, getTypeIds, changeModel, createtModel, deletetModel } from './service'
import { connect } from 'dva'
import globalStyles from '@/global.less'





const DeviceModelManage = props => {

    const actionRef = useRef();
    const [typeIds, handelTypeIds] = useState({})
    const modifyRef = useRef()

    const [selected, handleSelected] = useState([])
    const { createModalVisible, deleteModalVisible,modifyModalVisible, currentRowData } = props
    const { dispatch } = props

    useEffect(() => {
        const fetchDate = async () => {
            let res = await getTypeIds()
            const hide = message.loading('正在请求');

            console.log("res", res)
            try {
                if (res.code == 200) {
                    let tmp = {}
                    res.data.forEach(item => {
                        tmp[item.id] = { text: item.zhName }
                    })
                    console.log("tmp", tmp)
                    handelTypeIds(tmp)
                    hide();
                }

            } catch (error) {
                hide();
                message.error('请求失败请重试！');
            }


        }
        fetchDate();

    }, [])




    async function handleMenuClick(e) {
        if (selected.length) {
            if (e.key === 'remove') {
                dispatch({
                    type: "GlobalModel/changeDeleteModalVisible",
                    payload: true
                })
            }

        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="remove">删除</Menu.Item>
            {/* <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item> */}
        </Menu>
    );


    /**
     * 添加报警
     * @param fields
     */
    const createModelFunc = async (value) => {
        const hide = message.loading('正在添加');

        try {
            let response = await createtModel(value);
            if (response.code === 200) {
                hide();
                message.success('添加成功');
                return true;
            }else{
                hide();
                message.error('添加失败请重试！');
                return false
            }
        } catch (error) {
            hide();
            message.error('添加失败请重试！');
            return false;
        }
    }


    /**
     * 删除报警
     * @param fields
     */

    const deleteModelFunc = async () => {
        let ids = selected.map(item => {
            return item.id
        })

        const hide = message.loading('正在删除');

        try {
            await deletetModel(ids);
            hide();
            message.success('删除成功，即将刷新');
            dispatch({
                type: "GlobalModel/changeDeleteModalVisible",
                payload: false
            })
            actionRef.current.reload();
            actionRef.current.clearSelected()
        } catch (error) {
            hide();
            message.error('删除失败，请重试');
        }

    }

    /**
     * 更新报警
     * @param fields
     */

    const handleUpdate = async params => {
        const hide = message.loading('正在修改');

        try {
            await changeModel(params);
            hide();
            message.success('修改成功');
            dispatch({
                type: "GlobalModel/changeModifyModalVisible",
                payload: false
            })
            actionRef.current.reload()
            return true;
        } catch (error) {
            hide();
            message.error('修改失败请重试！');
            return false;
        }
    };
    const columns = [
        {
            title: '设备类型',
            dataIndex: 'typeId',
            valueEnum: typeIds,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            hideInTable: true
        },
        {
            title: '设备型号英文名',
            dataIndex: 'model',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: '20%',
            hideInSearch: true,
        },
        {
            title: '设备型号中文名',
            dataIndex: 'name',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: '20%',
            hideInSearch: true,
        },
        {
            title: '模组名',
            dataIndex: 'module',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: "20%",
            hideInSearch: true,
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: "20%",
            hideInSearch: true,
            hideInForm:true
        },
        {
            title: '操作',
            width: "20%",
            valueType: 'option',
            render: (text, row, _, action) => [

                <Button type="primary" onClick={() => {

                    dispatch({
                        type: "GlobalModel/saveCurrentRowData",
                        payload: row
                    })
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: true
                    })
                    setTimeout(()=>{
                        modifyRef.current.setFieldsValue(row)
                    },100)

                }}>修改</Button>
            ],
        },
    ];

    const modifyColumns = [
        {
            title: '设备类型',
            dataIndex: 'typeId',
            valueEnum: typeIds,

        },
        {
            title: '设备型号英文名',
            dataIndex: 'model',
  
        },
        {
            title: '设备型号中文名',
            dataIndex: 'name',

        },
        {
            title: '模组名',
            dataIndex: 'module',

        },

    ];

    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns}
                pagination={{
                    showQuickJumper: true,
                }}
                search={true}
                actionRef={actionRef}
                request={async (params) => {
                    params.pageNum = params.current
                    if (!params.typeId) {
                        return;
                    }
                    let res = await getModelListAll(params)
                    if (res.code != 200) {
                        return Promise.resolve({
                            success: true
                        })
                    }
                    return Promise.resolve({
                        data: res.data.rows,
                        success: true,
                        total: res.data.total,

                    })
                }}
                manualRequest={true}
                rowKey="id"
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        handleSelected(selectedRows)
                    }

                }}

                dateFormatter="string"
                headerTitle="设备型号管理"
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={() => {
                        dispatch({
                            type: "GlobalModel/changeCreateModalVisible",
                            payload: true
                        })
                    }}>
                        <PlusOutlined />
                        新建
                    </Button>,
                    <Dropdown overlay={menu}>
                        <Button key="4">
                            批量处理 <DownOutlined />
                        </Button>
                    </Dropdown>
                ]}
            />

            <CreateAlertModal
                title="新建设备型号" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })
                }} modalVisible={createModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        let success = await createModelFunc(value);
                        if (success) {
                            dispatch({
                                type: "GlobalModel/changeModifyModalVisible",
                                payload: false
                            });

                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    rowKey="createUser"
                    type="form"
                    columns={columns}
                />
            </CreateAlertModal>
            <CreateAlertModal
                title="修改设备型号"
                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: false
                    })
                }} modalVisible={modifyModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        console.log("value",value)
                        let params = {...value,id:currentRowData.id}
                        await handleUpdate(params);

                
                        
                    }}
                    rowKey="id"
                    type="form"
                    columns={modifyColumns}
                    formRef={modifyRef}
                />
            </CreateAlertModal>

            <CreateAlertModal
                title="删除设备模型"

                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeDeleteModalVisible",
                        payload: false
                    })
                }} modalVisible={deleteModalVisible}>
                <p>是否确认删除</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={deleteModelFunc} >确认删除</Button>
                </div>
            </CreateAlertModal>
        </PageHeaderWrapper>
    )
}

export default connect(({ GlobalModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
    modifyModalVisible: GlobalModel.modifyModalVisible,
    deleteModalVisible: GlobalModel.deleteModalVisible,
    currentModifyRole: GlobalModel.currentModifyRole,
    currentRowData: GlobalModel.currentRowData
}))(DeviceModelManage)
