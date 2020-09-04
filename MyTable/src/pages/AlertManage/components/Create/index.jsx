import React, { useContext } from 'react';
import CreateAlertModal from '@/components/CreateModal';
import { connect } from 'umi';
import { message } from 'antd';
import { createAlert } from '../../service';
import AlertManageContext from '../../context';

const Create = () => {
  const { creColumns, actionRef, typeId } = useContext(AlertManageContext);
  /**
   * 添加报警
   * @param fields
   */
  const createAlertFunc = async (value) => {
    const hide = message.loading('正在添加');
    try {
      const res = await createAlert({...value,typeId});
      if (res.code === 200) {
        hide();
        message.success('添加成功');
        actionRef.current.reload();
      } else {
        message.error(`添加错误，${res.message || res.code || ''}`);
      }
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
    }
  };

  return <CreateAlertModal creColumns={creColumns} onSubmit={createAlertFunc} title="新建报警" />;
};

export default connect(() => ({}))(React.memo(Create));
