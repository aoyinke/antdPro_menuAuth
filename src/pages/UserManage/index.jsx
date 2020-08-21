import React, { useRef, useEffect } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import DeleteUserModal from '@/components/DeleteModal'
import CreateUserModal from '@/components/CreateModal'
import ModifyUserModal from '@/components/ModifyModal'

import { getToken } from '@/utils/utils';
import { getUserList, changeUserInfo, deleteUserInfo, createUserInfo, resetPassword, getDictDetailAccroName, getAllRole } from './service';
import { columns, modifyColumns } from './columns';
import ResetPasswordModal from './components/resetPasswordModal'

let selectedUser = []
const postValueEnum = {}
const statusValueEnum = {}
const sexValueEnum = {}
const roleValueEnum = {}

const UserManage = props => {


    const actionRef = useRef();
    const modifyRef = useRef()

    const { dispatch } = props
    const { currentResetUser } = props

    /**
     * 初始化ValueEnum
     */
    const prepareValueEnum = async () => {
        const dictNames = ['userState', 'post', 'sex'];
        const roleList = await getAllRole()
        const dictInfo = await getDictDetailAccroName(dictNames)

        if (roleList.code === 200) {
            roleList.data.rows.forEach(roleItem => {
                const { roleZhName } = roleItem
                roleValueEnum[roleItem.id] = { text: roleZhName }
            })
        } else {
            message.error(`角色列表获取失败，状态码:${roleList.code}`)
        }

        if (dictInfo.code === 200) {
            const { post, sex, userState } = dictInfo.data;
            post.forEach(postItem => {
                const postValue = postItem.value
                postValueEnum[postValue] = { text: postItem.laber }
            });
            userState.forEach(statusItem => {
                const statusValue = statusItem.value;
                if (statusItem.laber === '启用') {
                    statusValueEnum[statusValue] = { text: statusItem.laber, status: 'Success' }
                } else {
                    statusValueEnum[statusValue] = { text: statusItem.laber, status: 'Error' }
                }

            });
            sex.forEach(sexItem => {
                const sexValue = sexItem.value
                sexValueEnum[sexValue] = { text: sexItem.laber }

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
                if (actionRef.current) {
                    actionRef.current.reload()
                }

            } else {
                hide();
                message.error('添加失败请重试！');
            }


        } catch (error) {
            hide();
            message.error('添加失败请重试！');
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
                actionRef.current.reload()
            } else {
                hide();
                message.error('修改失败请重试！');
            }


        } catch (error) {
            hide();
            message.error('修改失败请重试！');
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

    
    const options = (text, row, _, action) => [
        <Button
            type="primary"
            onClick={() => {
                dispatch({
                    type: 'GlobalModel/changeModifyModalVisible',
                    payload: true,
                });

                dispatch({
                    type: 'GlobalModel/saveCurrentRowData',
                    payload: row,
                });

                setTimeout(() => {
                    modifyRef.current.setFieldsValue(row)
                })
            }}

        >
            修改
        </Button>,
        <Button
            type="primary"
            danger
            onClick={() => {
                dispatch({
                    type: 'UserManageModel/changeCurrentResetUser',
                    payload: row.id,
                });
                dispatch({
                    type: 'UserManageModel/changeResetPasswordModal',
                    payload: true,
                });
            }}
        >
            密码重置
        </Button>
    ];



    return (
        <PageHeaderWrapper
            title={false}
        >
            <ProTable
                columns={columns(postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum, options)}
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
            <CreateUserModal
                title="新建用户"
                columns={columns(postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum, options)}
                onSubmit={createUserFunc}
            />

            <ModifyUserModal
                title="修改用户"
                modifyColumns={modifyColumns(postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum)}
                modifyRef={modifyRef}
                onSubmit={handleUpdate}
            />
            <DeleteUserModal
                title="删除用户"
                deleteFunc={deleteUserFunc}
            />
            <ResetPasswordModal
                resetUserPassword={resetUserPassword}
            />
        </PageHeaderWrapper>
    )
}

export default connect(({ UserManageModel }) => ({
    currentResetUser: UserManageModel.currentResetUser

}))(UserManage)

