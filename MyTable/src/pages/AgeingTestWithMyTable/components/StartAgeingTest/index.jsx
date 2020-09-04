import React, { useContext } from 'react';
import { connect } from 'umi';
import CreateAgeingModal from '@/components/createInfoModal';
import globalStyles from '@/global.less';
import { Button, message } from 'antd';
import { startToAgeingTest } from '../../service';
import AgeignTestContext from '../../context';

const StartAgeingTest = (props) => {
    const { dispatch } = props;
    const { createModalVisible } = props;
    const { selectedEquip} = useContext(AgeignTestContext);

    const startToAgeTest = async () => {

        let isError = false;
        if (selectedEquip) {
            isError = selectedEquip.every((item) => {
                if (item.status === '2' || item.status === '4') {
                    return true;
                }
                return false;
            });
        } else {
            return;
        }

        if (!isError) {
            message.error('勾选了非老化中或非老化失败');
            return;
        }
        const ids = selectedEquip.map((item) => {
            return item.id;
        });
        if (ids.length) {
            const hide = message.loading('正在进行老化测试，请稍等');
            try {
                const response = await startToAgeingTest(ids);

                if (response.code === 200) {

                    message.success('批量老化测试成功');
                } else if (response.message) {
                    message.info(`批量老化测试失败:${response.message || ''}`);
                }
            } catch (error) {
                console.log(error);
            }
            hide();
            dispatch({
                type: 'GlobalModel/changeCreateModalVisible',
                payload: false,
            });

        } else {
            message.error('老化设备不能为空');
        }
    };

    return (
        <CreateAgeingModal
            title="批量老化测试"
            onCancel={() => {
                dispatch({
                    type: 'GlobalModel/changeCreateModalVisible',
                    payload: false,
                });
            }}
            modalVisible={createModalVisible}
        >
            <p>确认开始批量老化测试</p>
            <div className={globalStyles.flexCenter}>
                <Button type="primary" onClick={startToAgeTest}>
                    确认开始
        </Button>
            </div>
        </CreateAgeingModal>
    );
};

export default connect(({ GlobalModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
}))(React.memo(StartAgeingTest));
