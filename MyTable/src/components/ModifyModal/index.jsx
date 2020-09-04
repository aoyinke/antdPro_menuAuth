import React from 'react'
import CommonModal from '@/components/createInfoModal';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi'


const ModifyModal = props => {

    const { modifyColumns, title, modifyModalVisible, modifyRef, currentRowData } = props

    const { dispatch, onSubmit } = props
    return (
        <CommonModal
            title={title}
            onCancel={() => {
                dispatch({
                    type: "GlobalModel/changeModifyModalVisible",
                    payload: false
                })
            }} modalVisible={modifyModalVisible}>
            <ProTable
                onSubmit={async value => {
                    const params = Object.assign(currentRowData,value)
                    await onSubmit(params)
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: false
                    })
                }}
                rowKey="id"
                type="form"
                columns={modifyColumns}
                formRef={modifyRef}
            />
        </CommonModal>
    )
}


export default connect(({ GlobalModel }) => ({
    modifyModalVisible: GlobalModel.modifyModalVisible,
    currentRowData: GlobalModel.currentRowData
}))(ModifyModal)

