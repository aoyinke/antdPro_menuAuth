import React, { useRef, useContext, useState } from 'react';
import CreateAgeingModal from '@/components/createInfoModal';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { message } from 'antd';
import InfoHeader from '../InfoHeader'
import { detailColumns } from '../../columns';
import styles from '../../styles.less';
import AgeignTestContext from '../../context';
import { getAgeingList } from '../../service';

const AgeingTestDetail = (props) => {

  const [info, handleInfo] = useState({})
  const { dispatch } = props;
  const { detailModalVisible } = props;
  const detailActionRef = useRef();
  const ageingParams = useContext(AgeignTestContext);
  // console.log(ageingParams)
  return (
    <CreateAgeingModal
      title="老化测试详情"
      onCancel={() => {
        dispatch({
          type: 'AgeingTestModel/changeDetailModalVisible',
          payload: false,
        });
      }}
      modalVisible={detailModalVisible}
      wrapClassName={styles.ageingTestDetail}
      style={{ top: 0 }}
      width="100%"
    >

      <div style={{ backgroundColor: "#F5F5F5" }}>
        <ProTable
          columns={detailColumns}
          pagination={{
            showQuickJumper: true,
          }}
          actionRef={detailActionRef}
          tableExtraRender={(_, data) => (
            <InfoHeader info={info} />
          )}
          request={async (params) => {
            const par = params;
            par.pageNum = params.current;
            par.insideId = ageingParams.insideId;

            if (!params.createFrom && !params.createTo) {
              par.createFrom = ageingParams.createFrom;
              par.createTo = ageingParams.createTo;
            }
            try {
              const res = await getAgeingList(par);
              if (res.code !== 200) {
                message.error(`页面请求数据失败，状态码：${res.code || ''}`);
              } else {
                handleInfo(() => res.data.info)
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
      </div>
    </CreateAgeingModal>
  );
};

export default connect(({ AgeingTestModel }) => ({
  detailModalVisible: AgeingTestModel.detailModalVisible,
}))(React.memo(AgeingTestDetail));
