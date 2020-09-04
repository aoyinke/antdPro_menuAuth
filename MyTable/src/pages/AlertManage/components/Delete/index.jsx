import React, { useContext } from 'react';
import DeleteAlertModal from '@/components/DeleteModal';
import { connect } from 'umi';
import { message } from 'antd'
import { deleteAlert } from '../../service';
import AlertManageContext from '../../context'

const Delete = () => {

    const { selected, actionRef } = useContext(AlertManageContext)
    /**
   * 删除报警
   * @param fields
   */

    const deleteAlertFunc = async () => {
        const ids = selected.map((item) => {
            return item.id;
        });
        if (ids.length) {
            const hide = message.loading('正在删除');

            try {
                const res = await deleteAlert(ids);
                if (res.code === 200) {
                    hide();
                    message.success('删除成功，即将刷新');

                    actionRef.current.reload();
                } else {
                    message.error(`批量删除失败，${res.message}`);
                }
            } catch (error) {
                hide();
                message.error('删除失败，请重试');
            }
        } else {
            message.error('批量删除不可为空');
        }
    };

    return (
        <DeleteAlertModal title="删除报警信息" deleteFunc={deleteAlertFunc} />
    )
}


export default connect(() => ({}))(React.memo(Delete));