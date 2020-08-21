import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout'

import { Button, Menu, Dropdown, message } from 'antd';
import ProTable from '@ant-design/pro-table';

import CreateRole from '@/components/createInfoModal'
import { connect } from 'umi'
import globalStyles from '@/global.less'

import AuthManage from './components/authManage'
import { getCharList, changeRoleInfo, deleteRole, createRole } from './service'




const CharManage = props => {

    const actionRef = useRef();
    const [selectedRole, handleSelectedRole] = useState([])
    const modifyRef = useRef()

    const { dispatch, currentUserEuName } = props
    const { createModalVisible, deleteModalVisible, authManageModalVisible, modifyModalVisible, currentRowData } = props
    useEffect(() => {

        dispatch({
            type: "CharManageModel/fetchMenuTree"
        })
    }, [])
    /**
     * 
     * @param {批量处理菜单点击事件} 
     */
    async function handleMenuClick(e) {
        if (selectedRole.length) {
            if (e.key === 'remove') {
                dispatch({
                    type: "GlobalModel/changeDeleteModalVisible",
                    payload: true
                })

            }

        }
    }

    /**
     * 批量处理菜单
     */
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="remove">删除角色</Menu.Item>
            {/* <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item> */}
        </Menu>
    );

    /**
     * 添加角色
     * @param fields
     */
    const createRoleFunc = async (value) => {
        const hide = message.loading('正在添加');

        try {
            await createRole(value);

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
     * 删除角色
     * @param fields
     */

    const deleteRoleFunc = async () => {
        let ids = selectedRole.map(item => {
            return item.id
        })

        const hide = message.loading('正在删除');

        try {
            await deleteRole(ids);
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
     * 更新角色
     * @param fields
     */

    const handleUpdate = async params => {
        const hide = message.loading('正在修改');

        try {
            await changeRoleInfo(params);
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

    /**
     * 
     * @param {获取菜单树} authTree 
     */
    const getMenuTree = () => {
        dispatch({
            type: "CharManageModel/saveMenuAuthTree"
        })
    }

    /**
     * 
     * @param {生成selectedKeys} selectedKeys 
     */

    const generateSelectedKeys = (role) => {
        dispatch({
            type: "CharManageModel/saveSelectedKeys",
            payload: role
        })
    }
    /**
     * 更新角色权限
     * @param fields
     */

    const confirmChangeAuth = () => {
        dispatch({
            type: "CharManageModel/changeAuthManageModalVisible",
            payload: false
        })
    }



    const columns = [


        {
            title: '角色中文名称',
            dataIndex: 'roleZhName',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: '24%',
            hideInSearch: true,
        },
        {
            title: '角色英文名称',
            dataIndex: 'roleEuName',
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
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: '24%',
            hideInSearch: true,
        },
        {
            title: '操作',
            width: '24%',
            valueType: 'option',
            render: (text, row, _, action) => [
                <Button onClick={() => {
                    dispatch({
                        type: "CharManageModel/changeAuthManageModalVisible",
                        payload: true
                    })
                    dispatch({
                        type: "CharManageModel/saveCurrentUserEuName",
                        payload: row.roleEuName
                    })
                    generateSelectedKeys(row.roleEuName)
                }}>权限</Button>,
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
            ],
        },
    ];

    const modifyColumns = [


        {
            title: '角色中文名称',
            dataIndex: 'roleZhName',


        },
        {
            title: '角色英文名称',
            dataIndex: 'roleEuName',

        },
        {
            title: '备注',
            dataIndex: 'remark',

        }

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
                    params.pageNum = params.current
                    try {
                        let res = await getCharList(params)
                        getMenuTree()
                        if (res.code === 200) {

                            console.log("res", res)
                            return Promise.resolve({
                                data: res.data.rows,
                                success: true,
                                total: res.data.total
                            })
                        } else {
                            message.error("获取角色列表错误，状态码:" + res.code)
                        }
                    } catch (error) {
                        message.error("获取角色列表失败，状态码:" + res.code)
                    }

                }}
                rowKey="id"
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        handleSelectedRole(selectedRows)
                        console.log("selectedRole", selectedRole)
                    }

                }}

                dateFormatter="string"
                headerTitle="角色管理"
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
            <CreateRole
                title="新建角色" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })
                }} modalVisible={createModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        let success = await createRoleFunc(value);
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
            </CreateRole>
            <CreateRole
                title="修改角色"
                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: false
                    })
                }} modalVisible={modifyModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        console.log("value", value)
                        let params = { ...value, id: currentRowData.id }
                        await handleUpdate(params);
                    }}
                    rowKey="id"
                    type="form"
                    columns={modifyColumns}
                    formRef={modifyRef}
                />
            </CreateRole>
            <CreateRole
                title="配置权限"
                onCancel={() => {
                    dispatch({
                        type: "CharManageModel/changeAuthManageModalVisible",
                        payload: false
                    })
                }} modalVisible={authManageModalVisible}>
                <AuthManage confirmChangeAuth={confirmChangeAuth} userAuth={currentUserEuName} />
            </CreateRole>

            <CreateRole
                title="删除角色"

                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/deleteModalVisible",
                        payload: false
                    })
                }} modalVisible={deleteModalVisible}>
                <p>是否确认删除</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={deleteRoleFunc} >确认删除</Button>
                </div>
            </CreateRole>

        </PageHeaderWrapper>
    )
}

export default connect(({ CharManageModel, loading, GlobalModel }) => ({
    menuTree: CharManageModel.menuTree,
    menuAuthTree: CharManageModel.menuAuthTree,
    selectedKeys: CharManageModel.selectedKeys,
    currentUserEuName: CharManageModel.currentUserEuName,
    authManageModalVisible: CharManageModel.authManageModalVisible,
    loading: loading.effects['CharManageModel/fetchMenuTree'],
    createModalVisible: GlobalModel.createModalVisible,
    modifyModalVisible: GlobalModel.modifyModalVisible,
    deleteModalVisible: GlobalModel.deleteModalVisible,
    currentModifyRole: GlobalModel.currentModifyRole,
    currentRowData: GlobalModel.currentRowData
}))(CharManage)
