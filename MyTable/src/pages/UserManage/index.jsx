import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import DeleteUserModal from './components/Delete'
import ModifyUserModal from './components/Modify'
import CreateUserModal from './components/Create'
import ResetPasswordModal from './components/resetPasswordModal'
import { getUserList, getDictDetailAccroName, getAllRole } from './service';
import { columns, modifyColumns } from './columns';
import UserManageContext from './context'

const postValueEnum = {}
const statusValueEnum = {}
const sexValueEnum = {}
const roleValueEnum = {}

const UserManage = props => {

    const [selectedUser, handleSelectedUser] = useState([])
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

    const options = (text, row, _, action) => [
        <Button
            type="primary"
            key="1"
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
            key="2"
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
                        handleSelectedUser(() => selectedRows)
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

            <UserManageContext.Provider value={{ modifyRef, modifyColumns: modifyColumns(postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum), actionRef }}>
                <ModifyUserModal />
            </UserManageContext.Provider>
            <UserManageContext.Provider value={{ selectedUser, actionRef }}>
                <DeleteUserModal />
            </UserManageContext.Provider>

            <UserManageContext.Provider value={{ columns: columns(postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum, options), actionRef }}>
                <CreateUserModal />
            </UserManageContext.Provider>
            <UserManageContext.Provider value={{ currentResetUser, actionRef }}>
                <ResetPasswordModal
                />
            </UserManageContext.Provider>

        </PageHeaderWrapper>
    )
}

export default connect(({ UserManageModel }) => ({
    currentResetUser: UserManageModel.currentResetUser

}))(React.memo(UserManage))

