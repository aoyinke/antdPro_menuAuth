import React, { useContext } from 'react';
import ModifyAlertModal from '@/components/ModifyModal';
import { connect } from 'umi';
import { message } from 'antd'
import { changeAlert } from '../../service';
import AlertManageContext from '../../context'

const Modify = () => {

    const { modifyColumns, modifyRef, actionRef } = useContext(AlertManageContext)

    /**
    * 更新报警
    * @param fields
    */

    const handleUpdate = async (params) => {
        const hide = message.loading('正在修改');

        try {
            const res = await changeAlert(params);
            if (res.code === 200) {
                message.success('修改成功');

                actionRef.current.reload();
            } else {
                message.error(`修改失败：${res.message || res.code}`)
            }
            hide();
        } catch (error) {
            hide();
            message.error('修改失败请重试！');
        }
    };

    return (
        <ModifyAlertModal
            title="修改报警"
            modifyColumns={modifyColumns}
            modifyRef={modifyRef}
            onSubmit={handleUpdate}
        />
    )
}


export default connect(() => ({}))(React.memo(Modify));