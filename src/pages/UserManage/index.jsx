import React, { useRef, useEffect } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import CreateUser from '@/components/createInfoModal';
import { getToken } from '@/utils/utils';
import globalStyles from '@/global.less';
import { getUserList, changeUserInfo, deleteUserInfo, createUserInfo, resetPassword, getDictDetailAccroName, getAllRole } from './service';



let selectedUser = []

const UserManage = props => {


    const actionRef = useRef();
    const modifyRef = useRef()

    const { dispatch } = props
    const { createModalVisible, modifyModalVisible, currentResetUser, resetPasswordModal, deleteModalVisible, currentRowData } = props
    const { postValueEnum, statusValueEnum, sexValueEnum, roleValueEnum } = props

    /**
     * 初始化ValueEnum
     */
    const prepareValueEnum = async () => {
        const dictNames = ['userState', 'post', 'sex'];
        const postTmp = {};
        const sexTmp = {};
        const userStateTmp = {};
        const roleTmp = {};

        const roleList = await getAllRole()
        const dictInfo = await getDictDetailAccroName(dictNames)



        if (roleList.code === 200) {
            roleList.data.rows.forEach(roleItem => {
                const { roleZhName } = roleItem
                roleTmp[roleItem.id] = { text: roleZhName }
            })
            dispatch({
                type: "UserManageModel/SaveRoleValueEnum",
                payload: roleTmp
            })
        } else {
            message.error(`角色列表获取失败，状态码:${roleList.code}`)
        }

        if (dictInfo.code === 200) {
            const { post, sex, userState } = dictInfo.data;
            post.forEach(postItem => {
                const postValue = postItem.value
                postTmp[postValue] = { text: postItem.laber }
            });

            userState.forEach(statusItem => {
                const statusValue = statusItem.value;
                if (statusItem.laber === '启用') {
                    userStateTmp[statusValue] = { text: statusItem.laber, status: 'Success' }
                } else {
                    userStateTmp[statusValue] = { text: statusItem.laber, status: 'Error' }
                }

            });
            sex.forEach(sexItem => {
                const sexValue = sexItem.value
                sexTmp[sexValue] = { text: sexItem.laber }

            });
            dispatch({
                type: "UserManageModel/SavePostValueEnum",
                payload: postTmp
            });
            dispatch({
                type: "UserManageModel/SaveStatusValueEnum",
                payload: userStateTmp
            });
            dispatch({
                type: "UserManageModel/SaveSexValueEnum",
                payload: sexTmp
            });
        }

    }
    useEffect(() => {
        prepareValueEnum()
    }, [])
    /**
     * 
     * @param {创建} value 
     */
    const createUserFunc = async (value) => {
        const hide = message.loading('正在添加');

        try {
            const response = await createUserInfo(value);
            if (response.code === 200) {
                hide();
                message.success('添加成功');
                return true;
            }
            hide();
            message.error('添加失败请重试！');
            return false;

        } catch (error) {
            hide();
            message.error('添加失败请重试！');
            return false;
        }
    }

    /**
     * 
     * @param {删除}  
     */
    const deleteUserFunc = async () => {

        const ids = selectedUser.map(item => {
            return item.id
        })


        const hide = message.loading('正在删除');

        try {
            await deleteUserInfo(ids);
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
     * 
     * @param {批量删除}} e 
     */
    async function handleMenuClick(e) {
        if (selectedUser.length) {
            if (e.key === 'remove') {
                dispatch({
                    type: "GlobalModel/changeDeleteModalVisible",
                    payload: true
                })

            }

        }
    }

    /**
     * 展开的多选菜单
     */
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="remove">删除用户</Menu.Item>
            {/* <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item> */}
        </Menu>
    );

    /**
     * 
     * @param {修改} value 
     */

    const handleUpdate = async params => {
        const hide = message.loading('正在修改');

        try {
            const response = await changeUserInfo(params);
            if (response.code === 200) {
                hide();
                message.success('修改成功');
                dispatch({
                    type: "GlobalModel/changeModifyModalVisible",
                    payload: false
                })
                actionRef.current.reload()
                return true;
            }
            hide();
            message.error('修改失败请重试！');
            return false;

        } catch (error) {
            hide();
            message.error('修改失败请重试！');
            return false;
        }
    };

    /**
     * 
     * @param {重置密码} value 
     */

    const resetUserPassword = async () => {
        const hide = message.loading('正在重置密码');

        try {
            const response = await resetPassword({ token: getToken(), id: currentResetUser });
            if (response.code === 200) {
                hide();
                message.success('重置密码成功');
                dispatch({
                    type: "UserManageModel/changeResetPasswordModal",
                    payload: false
                })
                actionRef.current.reload()
            } else {
                hide();
                message.error(`重置密码失败请重试:${response.message}`);
            }

        } catch (error) {
            hide();
            message.error('重置密码失败请重试！');
        }
    }


    /**
     * 表格cloumns
     */
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            width: "15%",
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            hideInSearch: true,
        },
        {
            title: '真实姓名',
            dataIndex: 'realname',
            width: "15%",
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            hideInSearch: true,

        },
        {
            title: '职位',
            dataIndex: 'post',
            width: "15%",
            valueEnum: postValueEnum,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
                {
                    max: 1,
                    message: '长度不能超过1',
                },
                {
                    type: "number",
                    transform: (val) => Number(val),
                    message: "只能输入数字",
                }
            ],
            hideInSearch: true,

        },
        {
            title: '角色',
            dataIndex: 'roleId',
            ellipsis: true,
            valueEnum: roleValueEnum,
            width: "15%",
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            hideInSearch: true,
        },
        {
            title: '性别',
            dataIndex: 'ssex',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: "15%",
            valueEnum: sexValueEnum,
            hideInSearch: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            width: "20%",
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            hideInSearch: true,
            valueEnum: statusValueEnum
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, row, _, action) => [
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
                        modifyRef.current.setFieldsValue(Object.assign(row, { roleId: JSON.stringify(row.roleId) }))
                    }, 100)
                }}>修改</Button>,
                <Button type="primary" danger onClick={() => {
                    dispatch({
                        type: "UserManageModel/changeCurrentResetUser",
                        payload: row.id
                    })
                    dispatch({
                        type: "UserManageModel/changeResetPasswordModal",
                        payload: true
                    })
                }}>密码重置</Button>
            ],
        },
    ];

    /**
     * 修改表格cloumns
     */
    const modifyColumns = [

        {
            title: '用户名',
            dataIndex: 'username',


        },
        {
            title: '真实姓名',
            dataIndex: 'realname',
        },
        {
            title: '职位',
            dataIndex: 'post',
            valueEnum: postValueEnum,

        },
        {
            title: '角色',
            dataIndex: 'roleId',
            valueEnum: roleValueEnum,

        },
        {
            title: '性别',
            dataIndex: 'ssex',

            valueEnum: sexValueEnum,
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueEnum: statusValueEnum
        },

    ];

    return (
        <PageHeaderWrapper
            title={false}
        >
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
                        const res = await getUserList(par)
                        if (res.code === 200) {
                            return Promise.resolve({
                                data: res.data.rows,
                                success: true,
                                total: res.data.total
                            })
                        }
                        message.error(`请求数据错误，${res.message}`)
                    } catch (error) {
                        console.log(error)
                    }
                    return Promise.resolve({
                        success: true,
                    })

                }}
                search={false}
                rowKey="id"
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        selectedUser = selectedRows
                        console.log("selectedUser", selectedUser)
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
                        <PlusOutlined />新建
                    </Button>,
                    <Dropdown overlay={menu}>
                        <Button key="4">
                            批量处理 <DownOutlined />
                        </Button>
                    </Dropdown>
                ]}
            />
            <CreateUser
                title="新建用户" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })

                }} modalVisible={createModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        const success = await createUserFunc(value);

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
                    rowKey="id"
                    type="form"
                    columns={columns}
                />
            </CreateUser>
            <CreateUser
                title="修改用户"

                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: false
                    })
                }} modalVisible={modifyModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        const params = { ...value, id: currentRowData.id }
                        await handleUpdate(params);



                    }}
                    rowKey="id"
                    type="form"
                    columns={modifyColumns}
                    formRef={modifyRef}
                />
            </CreateUser>
            <CreateUser
                title="删除用户"

                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeDeleteModalVisible",
                        payload: false
                    })
                }} modalVisible={deleteModalVisible}>
                <p>是否确认删除</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={deleteUserFunc} >确认删除</Button>
                </div>
            </CreateUser>
            <CreateUser
                title="重置密码"

                onCancel={() => {
                    dispatch({
                        type: "UserManageModel/changeResetPasswordModal",
                        payload: false
                    })
                }} modalVisible={resetPasswordModal}>
                <p>是否重置密码</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={resetUserPassword} >确认重置密码</Button>
                </div>
            </CreateUser>
        </PageHeaderWrapper>
    )
}

export default connect(({ GlobalModel, UserManageModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
    modifyModalVisible: GlobalModel.modifyModalVisible,
    deleteModalVisible: GlobalModel.deleteModalVisible,
    currentModifyRole: GlobalModel.currentModifyRole,
    currentRowData: GlobalModel.currentRowData,
    resetPasswordModal: UserManageModel.resetPasswordModal,
    currentResetUser: UserManageModel.currentResetUser,
    postValueEnum: UserManageModel.postValueEnum,
    statusValueEnum: UserManageModel.statusValueEnum,
    sexValueEnum: UserManageModel.sexValueEnum,
    roleValueEnum: UserManageModel.roleValueEnum,

}))(UserManage)

