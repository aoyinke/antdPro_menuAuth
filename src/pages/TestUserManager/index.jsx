import React, { useEffect } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import MyTable from '@/components/MyTable'
import { Button, message } from 'antd'
import { connect } from 'umi';
import { columns } from './columns'
import { getUserList, changeUserInfo, deleteUserInfo, createUserInfo, resetPassword, getDictDetailAccroName, getAllRole } from './service';

const TestUserManager = (props) => {

    const { dispatch } = props
    const { createModalVisible, modifyModalVisible, currentResetUser, resetPasswordModal, deleteModalVisible, currentRowData } = props
    const { postValueEnum, statusValueEnum, sexValueEnum, roleValueEnum } = props

    const request = async (params) => {

        try {
            const res = await getUserList(params)
            if (res.code === 200) {
                return res.data
            }
            message.error(`请求数据错误，${res.message}`)
        } catch (error) {
            console.log(error)
        }
        return []

    }

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


    const options = (text, row, _, action) => [
        <Button type="primary" onClick={() => {
            dispatch({
                type: "GlobalModel/changeModifyModalVisible",
                payload: true
            })

            dispatch({
                type: "GlobalModel/saveCurrentRowData",
                payload: row
            })

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
    ]

    return (
        <PageHeaderWrapper>
            <MyTable
                columns={columns(postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum, options)}
                request={request}
                Search
            />
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

}))(TestUserManager)