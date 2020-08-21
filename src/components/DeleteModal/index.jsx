import React from 'react'
import CommonModal from '@/components/createInfoModal';
import {connect} from 'umi'
import globalStyles from '@/global.less';
import { Button } from 'antd'

const DeleteModal = props => {

    const { deleteModalVisible, dispatch, deleteFunc, title } = props
    return (
        <CommonModal
            title={title}

            onCancel={() => {
                dispatch({
                    type: "GlobalModel/changeDeleteModalVisible",
                    payload: false
                })
            }} modalVisible={deleteModalVisible}>
            <p>是否确认删除</p>
            <div className={globalStyles.flexCenter}>
                <Button type="primary" onClick={async () => {
                    await deleteFunc()
                    dispatch({
                        type: "GlobalModel/changeDeleteModalVisible",
                        payload: false
                    })
                }} >确认删除</Button>
            </div>
        </CommonModal>
    )
}


export default connect(({ GlobalModel }) => ({
    deleteModalVisible: GlobalModel.deleteModalVisible,
}))(DeleteModal)