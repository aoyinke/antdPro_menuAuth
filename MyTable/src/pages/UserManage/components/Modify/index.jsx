import React, { useContext } from 'react'
import ModifyUserModal from '@/components/ModifyModal'
import { message } from 'antd'
import { changeUserInfo } from '../../service';
import UserManageContext from '../../context'

const Modify = () => {


    const { modifyColumns, actionRef, modifyRef } = useContext(UserManageContext)
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

    return (
        <ModifyUserModal
            title="修改用户"
            modifyColumns={modifyColumns}
            modifyRef={modifyRef}
            onSubmit={handleUpdate}
        />
    )
}


export default React.memo(Modify)