import React from 'react'
import CreateUser from '@/components/createInfoModal';
import { connect } from 'umi'
import globalStyles from '@/global.less';
import { Button } from 'antd';

const ResetPasswordModal = props => {

    const { dispatch, resetPasswordModal, resetUserPassword } = props
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
                <Button type="primary" onClick={async ()=>{
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