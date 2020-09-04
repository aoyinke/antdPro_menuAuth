import React, { useEffect } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { message } from 'antd';
import MyTable from '@/components/MyTable';
import { formateDate } from '@/utils/utils';
import { getEquipList, getDictDetailAccroName } from './service';
import { columns, searchColumns } from './columns';

const TestEquipList = (props) => {
  const { equipValueEnum } = props;
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'EquipListModel/fetchPrepareEnumValue',
    });
  }, []);
  /**
   *
   * @param {页面获取数据函数}
   */
  const request = async (params) => {
    console.log('params', params);
    const par = params;
    if (params.createFrom && params.createTo) {
      par.createFrom = formateDate(params.createFrom);
      par.createTo = formateDate(params.createTo);
    }
    try {
      const res = await getEquipList(par);
      const dictInfo = await getDictDetailAccroName(['equipState']);

      const { equipState } = dictInfo.data;

      equipState.forEach((equipItem) => {
        const equipValue = equipItem.value;
        equipValueEnum[equipValue] = { text: equipItem.laber };
      });

      if (res.code === 200) {
        return res.data;
      }
      message.error(`获取设备列表错误，状态码 ${res.code}`);
    } catch (error) {
      message.error(`获取设备列表错误，${error}`);
    }
    return [];
  };

  return (
    <PageHeaderWrapper title={false}>
      <MyTable columns={columns(equipValueEnum)} searchColumns={searchColumns} request={request} />
    </PageHeaderWrapper>
  );
};

export default connect(({ EquipListModel }) => ({
  equipValueEnum: EquipListModel.equipValueEnum,
}))(TestEquipList);
