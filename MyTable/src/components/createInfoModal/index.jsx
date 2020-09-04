import React from 'react';
import { Modal } from 'antd';

const createInfoModal = props => {
  const { modalVisible, onCancel,title } = props;
  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      maskClosable = {false}
      {...props}
    >
      {props.children}
    </Modal>
  );
};

export default createInfoModal;
