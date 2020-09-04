import React, { useContext } from 'react'
import DeleteUserModal from '@/components/DeleteModal'
import { message } from 'antd'
import { deleteUserInfo } from '../../service';
import UserManageContext from '../../context'

const Modify = () => {


    const { actionRef, selectedUser } = useContext(UserManageContext)
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

    return (
        <DeleteUserModal
            title="删除用户"
            deleteFunc={deleteUserFunc}
        />
    )
}


export default React.memo(Modify)