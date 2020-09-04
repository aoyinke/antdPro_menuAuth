import React from 'react'
import CreateStockModel from '@/components/createInfoModal'
import { Button, message } from 'antd';
import { connect } from 'umi'
import globalStyles from '@/global.less'
import { removeFromStock } from '../../service'

const Create = props => {

    const { dispatch } = props
    const { deleteModalVisible, selectedEquip } = props
    /**
     * 
     * @param {出库操作} value 
     */

    const deleteStockFunc = async () => {

        let flag = true;
        const ids = selectedEquip.map(item => {
            if(item.status === '9' || item.status === '10' || item.status === '11'){
                return item.id
            }else{
                flag = false;
            }
        });
        if(!flag){
            message.error("勾选了不能出库的设备")
            return;
        }
        if (ids.length) {
            const hide = message.loading('正在出库');
            try {
                const response = await removeFromStock(ids);
                if (response.code === 200) {
                    hide();
                    message.success('出库成功');
                } else {
                    hide();
                    message.error('出库失败请重试！');
                }
                dispatch({
                    type: "GlobalModel/changeDeleteModalVisible",
                    payload: false
                })
            } catch (error) {
                hide();
                message.error('出库失败请重试！');
            }
        } else {
            message.error("出库设备不能为空")
        }

    }


    return (
        <CreateStockModel
            title="出库存" onCancel={() => {
                dispatch({
                    type: "GlobalModel/changeDeleteModalVisible",
                    payload: false
                })

            }} modalVisible={deleteModalVisible}>
            <p>是否确认出库</p>
            <div className={globalStyles.flexCenter}>
                <Button type="primary" onClick={deleteStockFunc} >确认</Button>
            </div>
        </CreateStockModel>
    )
}


export default connect(({ GlobalModel }) => ({
    deleteModalVisible: GlobalModel.deleteModalVisible,
}))(React.memo(Create))