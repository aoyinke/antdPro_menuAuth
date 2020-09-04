import React from 'react'
import ChangeStateModal from '@/components/createInfoModal'
import { connect } from 'umi';
import { Button } from 'antd'
import globalStyles from '@/global.less';
import styles from './styles.less'


const ChangeState = props => {

    const { state, equipValueEnum, changeStateModalVisible,confirmDestoryFirstModalVisible,confirmDestorySecondModalVisible } = props
    const { dispatch } = props

    const CurrentState = () => {
        if (state === "0" || state === "1") {
            return (
                <div className={styles.changeState}>
                    <p>状态将从</p>
                    <p className={styles.state}>{equipValueEnum[state].text}</p>
                    <p>更改为</p>
                    <p className={styles.state}>{equipValueEnum[-1].text}</p>
                    <div className={globalStyles.flexCenter}>
                        <Button type="primary" onClick={async () => {
                            dispatch({
                                type: "EquipListModel/changeStateModalVisible",
                                payload: false
                            })
                        }} >确认修改</Button>
                    </div>
                </div>
            )

        }
        if (state === '-1') {
            return (
                <div>

                    <div className={globalStyles.flexCenter}>
                        <Button type="primary" onClick={async () => {
                            dispatch({
                                type: "EquipListModel/changeStateModalVisible",
                                payload: false
                            })
                        }} >修改为测试中</Button>
                        <Button type="primary" danger onClick={async () => {
                            dispatch({
                                type: "EquipListModel/changeStateModalVisible",
                                payload: false
                            })
                            dispatch({
                                type: "EquipListModel/changeConfirmDestoryFirstModalVisible",
                                payload: true
                            })
                        }} >修改为已报废</Button>
                    </div>
                </div>
            )
        }

        return <></>
    }

    return (
        <>
            <ChangeStateModal
                title="更改设备状态"
                onCancel={() => {
                    dispatch({
                        type: 'EquipListModel/changeStateModalVisible',
                        payload: false,
                    });
                }}
                modalVisible={changeStateModalVisible}
            >
                <CurrentState />
            </ChangeStateModal>
            <ChangeStateModal
                title="一次确认是否修改为报废"
                onCancel={() => {
                    dispatch({
                        type: 'EquipListModel/changeStateModalVisible',
                        payload: false,
                    });
                }}
                modalVisible={confirmDestoryFirstModalVisible}
            >
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={async () => {
                        dispatch({
                            type: "EquipListModel/changeConfirmDestoryFirstModalVisible",
                            payload: false
                        })
                        dispatch({
                            type: "EquipListModel/changeConfirmDestorySecondModalVisible",
                            payload: true
                        })
                    }} >确认</Button>
                </div>
            </ChangeStateModal>
            <ChangeStateModal
                title="二次确认是否修改为报废"
                onCancel={() => {
                    dispatch({
                        type: "EquipListModel/changeConfirmDestorySecondModalVisible",
                        payload: false
                    })
                }}
                modalVisible={confirmDestorySecondModalVisible}
            >
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={async () => {
                        dispatch({
                            type: "EquipListModel/changeConfirmDestorySecondModalVisible",
                            payload: false
                        })
                    }} >确认</Button>
                </div>
            </ChangeStateModal>
        </>

    )
}


export default connect(({ EquipListModel }) => ({
    equipValueEnum: EquipListModel.equipValueEnum,
    changeStateModalVisible: EquipListModel.changeStateModalVisible,
    confirmDestoryFirstModalVisible: EquipListModel.confirmDestoryFirstModalVisible,
    confirmDestorySecondModalVisible: EquipListModel.confirmDestorySecondModalVisible
}))(React.memo(ChangeState))