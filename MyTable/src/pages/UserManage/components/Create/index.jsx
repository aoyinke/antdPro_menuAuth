import React, { useContext } from 'react'
import CreateUserModal from '@/components/CreateModal'
import { message } from 'antd'
import { createUserInfo } from '../../service';
import UserManageContext from '../../context'

const Create = () => {


    const { columns,actionRef } = useContext(UserManageContext)
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

    return (
        <CreateUserModal
            title="新建用户"
            columns={columns}
            onSubmit={createUserFunc}
        />
    )
}


export default React.memo(Create)