import React, { useContext } from 'react'
import CreateUser from '@/components/createInfoModal';
import { connect } from 'umi'
import globalStyles from '@/global.less';
import { getToken } from '@/utils/utils';
import { Button, message } from 'antd';
import { resetPassword } from '../../service';
import UserManageContext from '../../context'

const ResetPasswordModal = props => {

    const { dispatch, resetPasswordModal } = props
    const { currentResetUser, actionRef } = useContext(UserManageContext)

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

    return (
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
                <Button type="primary" onClick={async () => {
                    await resetUserPassword()
                    dispatch({
                        type: "UserManageModel/changeResetPasswordModal",
                        payload: false
                    })
                }} >确认重置密码</Button>
            </div>
        </CreateUser>
    )
}


export default connect(({ UserManageModel }) => ({
    resetPasswordModal: UserManageModel.resetPasswordModal,
}))(ResetPasswordModal)