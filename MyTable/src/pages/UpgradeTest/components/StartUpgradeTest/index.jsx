import React, { useContext } from 'react'
import { connect } from 'umi';
import CreateUpgradeModal from '@/components/createInfoModal';
import globalStyles from '@/global.less';
import { Button, message } from 'antd';
import { startToUpgradingTest } from '../../service';
import UpgradeTestContext from '../../context'

const StartUpgradingTest = props => {

    const { dispatch } = props
    const { createModalVisible } = props
    const { selectedEquip, actionRef } = useContext(UpgradeTestContext)

    const startToUpgradeTest = async () => {
        let isError = false
        if (selectedEquip) {
            isError = selectedEquip.every((item) => {
                if (item.status === '2' || item.status === '4') {
                    return true;
                }
                return false;
            });
        } else {
            return
        }


        if (!isError) {
            message.error('勾选了升级中或升级成功的设备');
            return;
        }
        const ids = selectedEquip.map((item) => {
            return item.id;
        });
        if (ids.length) {
            const hide = message.loading("正在进行升级测试，请稍等")
            try {
                const response = await startToUpgradingTest(ids);
                if (response.code === 200) {
                    message.info('批量升级测试成功');
                    actionRef.current.clearSelected();
                } else if (response.message) {
                    message.info(`批量升级测试失败：${response.message}`);

                }
            } catch (error) {
                console.log(error);
            }
            hide()
            dispatch({
                type: 'GlobalModel/changeCreateModalVisible',
                payload: false,
            });
            actionRef.current.reload();
            actionRef.current.clearSelected();
        } else {
            message.error('升级设备不能为空');
        }
    };



    return (
        <CreateUpgradeModal
            title="批量升级测试"
            onCancel={() => {
                dispatch({
                    type: 'GlobalModel/changeCreateModalVisible',
                    payload: false,
                });
            }}
            modalVisible={createModalVisible}
        >
            <p>确认开始批量升级测试</p>
            <div className={globalStyles.flexCenter}>
                <Button type="primary" onClick={startToUpgradeTest}>
                    确认开始
          </Button>
            </div>
        </CreateUpgradeModal>
    )
}


export default connect(({ GlobalModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
}))(React.memo(StartUpgradingTest));