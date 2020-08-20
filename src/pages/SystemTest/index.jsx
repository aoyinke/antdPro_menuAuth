import React, { useEffect, useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { List, message, Button, Card, Modal, Input, Form } from 'antd';
import { connect, history } from 'umi'
import styles from './style.less'


let currentTest = {}

const SystemTest = (props) => {
  const { dispatch, currentSystemList } = props
  const [showInfoForm, handleShowInfoForm] = useState(false)
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: "systemList/fetchCurrent"
    })

    console.log("currentSystemList", currentSystemList)
  }, [])


  const onConfirmStart = () => {
    const { IP, PORT } = form.getFieldValue()


    if (!PORT) {
      message.error("PORT不能为空")
      return
    }
    if (!IP) {
      message.error("IP不能为空！")
      return
    }

    history.push({ pathname: './testDetail', query: { ipList: IP, port: PORT, typeId: currentTest.id, zhName: currentTest.zhName } })




  }




  return (
    <PageHeaderWrapper title={false}>
      <div className={styles.listContainer}>
        <Card>
          <List
            className={styles.container}
            size="small"
            rowKey="id"
            loading={false}
            //   pagination={paginationProps}
            dataSource={currentSystemList}
            renderItem={item => (
              <List.Item
                actions={[

                  <Button onClick={() => {
                    handleShowInfoForm(true)
                    currentTest = item
                  }} type="primary" >开始测试</Button>
                ]}
              >
                <List.Item.Meta
                  title={item.zhName}

                />
                <List.Item.Meta
                  title={item.remark}

                />
                <List.Item.Meta
                  title={item.currentMacId}

                />

              </List.Item>
            )}
          />
        </Card>
      </div>
      <Modal
        title="输入测试信息"
        visible={showInfoForm}
        onCancel={() => { handleShowInfoForm(false) }}
        destroyOnClose
        footer={null}
        maskClosable={false}
      >

        <Form
          onFinish={onConfirmStart}
          form={form}
        >
          <Form.Item
            label="IP"
            name="IP"
            rules={[{ required: true, message: '请输入多个或单个IP，多个用英文,隔开' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="PORT"
            name="PORT"
            rules={[{ required: true, message: '请输入端口!' }]}
          >
            <Input />
          </Form.Item>



          <div className={styles.buttonPois}>
            <Button type="primary" onClick={onConfirmStart}>确认</Button>
          </div>


        </Form>
      </Modal>
    </PageHeaderWrapper>
  )
}

export default connect(({ systemList, loading }) => ({
  currentSystemList: systemList.currentSystemList,
  loading: loading.effects['systemList/fetchCurrent'],
}))(SystemTest);
