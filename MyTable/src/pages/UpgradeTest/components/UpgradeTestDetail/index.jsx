import React, { useRef, useContext} from 'react'
import CreateUpgradeModal from '@/components/createInfoModal';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { message } from 'antd';
import { detailColumns } from '../../columns';
import styles from '../../styles.less';
import UpgradeTestContext from '../../context'
import { getUpgradeList } from '../../service';

const UpgradeTestDetail = (props) => {

    const { dispatch } = props;
    const { detailModalVisible } = props
    const detailActionRef = useRef();
    const upgradeParams = useContext(UpgradeTestContext)
    return (
        <CreateUpgradeModal
            title="升级测试详情"
            onCancel={() => {
                dispatch({
                    type: 'UpgradeTestModel/changeDetailModalVisible',
                    payload: false,
                });
            }}
            modalVisible={detailModalVisible}
            wrapClassName={styles.upgradeTestDetail}
            style={{ top: 0 }}
            width="100%"
        >
            <ProTable
                columns={detailColumns}
                pagination={{
                    showQuickJumper: true,
                }}
                actionRef={detailActionRef}
                request={async (params) => {
                    const par = params;
                    par.pageNum = params.current;
                    par.insideId = upgradeParams.insideId;

                    if (!params.createFrom && !params.createTo) {
                        par.createFrom = upgradeParams.createFrom;
                        par.createTo = upgradeParams.createTo;
                    }
                    try {
                        const res = await getUpgradeList(par);
                        if (res.code !== 200) {
                            message.error(`页面请求数据失败，状态码：${res.code}`);
                        } else {
                            return Promise.resolve({
                                data: res.data.rows,
                                success: true,
                                total: res.data.total,
                            });
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    return Promise.resolve({
                        success: true,
                    });
                }}
                rowKey="id"
                dateFormatter="string"
            />
        </CreateUpgradeModal>
    )
}

export default connect(({ UpgradeTestModel }) => ({
    detailModalVisible: UpgradeTestModel.detailModalVisible,
}))(React.memo(UpgradeTestDetail));