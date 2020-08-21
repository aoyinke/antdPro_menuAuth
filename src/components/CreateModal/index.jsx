import React from 'react'
import CommonModal from '@/components/createInfoModal';
import ProTable from '@ant-design/pro-table';
import {connect} from 'umi'

const CreateModal = props => {

    const { columns, title, createModalVisible, } = props

    const { dispatch, onSubmit } = props
    return (
        <CommonModal
            title={title} onCancel={
                () => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })

                }
            }
            modalVisible={createModalVisible}
        >
            <ProTable
                onSubmit={async (value) => {
                    await onSubmit(value)
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })
                }}
                rowKey="id"
                type="form"
                columns={columns}
            />
        </CommonModal>
    )
}


export default connect(({ GlobalModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
}))(CreateModal)