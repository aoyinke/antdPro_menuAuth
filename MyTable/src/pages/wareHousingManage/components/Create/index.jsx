import React from 'react'
import CreateStockModel from '@/components/createInfoModal'
import { Button, message } from 'antd';
import { connect } from 'umi'
import globalStyles from '@/global.less'
import { moveIntoStock } from '../../service'

const Create = props => {

    const { dispatch } = props
    const { createModalVisible, selectedEquip } = props
    /**
     * 
     * @param {入库操作} value 
     */
    const createStockFunc = async () => {
        let flag = true;
        const ids = selectedEquip.map(item => {
            if(item.status === '5' || item.status === '8'){
                return item.id
            }else{
                flag = false;
            }
        });
        if(!flag){
            message.error("只能入库老化成功和升级成功的设备")
            return;
        }
        if (ids.length) {
            const hide = message.loading('正在添加');
            try {
                const response = await moveIntoStock(ids);
                if (response.code === 200) {
                    hide();
                    message.success('入库成功');
                } else {
                    hide();
                    message.error('入库失败请重试！');
                }
                dispatch({
                    type: "GlobalModel/changeCreateModalVisible",
                    payload: false
                })
            } catch (error) {
                hide();
                message.error('入库失败请重试！');
            }
        } else {
            message.error("入库设备不能为空")
        }

    }

    return (
        <CreateStockModel
            title="入库存" onCancel={() => {
                dispatch({
                    type: "GlobalModel/changeCreateModalVisible",
                    payload: false
                })

            }} modalVisible={createModalVisible}>
            <p>是否确认入库存</p>
            <div className={globalStyles.flexCenter}>
                <Button type="primary" onClick={createStockFunc} >确认</Button>
            </div>
        </CreateStockModel>
    )
}


export default connect(({ GlobalModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
}))(React.memo(Create))