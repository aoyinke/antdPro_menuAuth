import React, { useState, useCallback } from 'react';
import moment from 'moment';
import { Card, Input, Form, DatePicker, Button, Select, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames'
import globalStyles from '@/global.less';
import styles from './styles.less';

const { Option } = Select;
let root = undefined
const TableSeachHeader = (props) => {
  const [collapsed, handleCollapsed] = useState(false)
  const { columns, need } = props;
  const { search, saveSearchParams } = props;
  const [form] = Form.useForm();


  const isCollapsedClassNames = classNames({
    [styles.unfold]: collapsed,
  })
  const needHideShowSeachClassNames = classNames({
    [styles.hideShowSeach]: !collapsed
  })
  const collapsedOperClassName = classNames(styles.operation, {
    [styles.collapsedOper]: collapsed,
  })

  const onFinish = (values) => {
    saveSearchParams(values);
    search(values);


  }

  const onReset = () => {
    form.resetFields();
  };


  const FoldSeachMenu = () => {
    if (root) {
      const childNums = root.childNodes.length

      if (childNums > 3 && !collapsed) {
        for (let i = 2; i < childNums - 1; i += 1) {
          root.childNodes[i].setAttribute('class', `ant-col ant-col-9 ${needHideShowSeachClassNames}`)
        }
      }
      if (collapsed) {
        for (let i = 2; i < childNums - 1; i += 1) {
          root.childNodes[i].setAttribute('class', 'ant-col ant-col-9 ')
        }
      }

    }
  }
  const handleRoot = useCallback((n) => {
    root = n
    FoldSeachMenu()
  }, [collapsed])

  const UnFoldSeachMenu = () => {

    handleCollapsed(prev => !prev)
  }


  return !need && columns ? (
    <Card

      className={styles.SearchCard}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        form={form}
      >
        <Row
          ref={handleRoot}
          className={styles.SearchBar}
          // justify="space-around"
          gutter={[8, 8]}
        >
          {columns.map((item) => {
            if (item.hideInSearch) {
              return <></>;
            }
            if (item.valueType === 'dateTime') {
              return (
                <Col span={8} >
                  <Form.Item
                    className={styles.searchTableItem}
                    label={item.title}
                    name={item.dataIndex}
                    rules={item.rules}
                    key={item.title}
                  >
                    <DatePicker
                      label={item.title}
                      name={item.dataIndex}
                      style={{ width: "20vw" }}
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                  </Form.Item>
                </Col>
              );
            }
            if (item.valueEnum) {
              return (
                <Col span={8} >
                  <Form.Item
                    className={styles.searchTableItem}
                    label={item.title}
                    name={item.dataIndex}
                    rules={item.rules}
                    key={item.title}
                  >
                    <Select style={item.style || { width: 300 }} allowClear >
                      {Object.keys(item.valueEnum).map((valueItem) => {
                        return <Option key={item.valueEnum[valueItem].text} value={valueItem}>{item.valueEnum[valueItem].text}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </Col>

              );
            }
            return (
              <Col span={8} >
                <Form.Item
                  className={styles.searchTableItem}
                  label={item.title}
                  name={item.dataIndex}
                  rules={item.rules}
                  key={item.title}
                >
                  <Input
                    style={{ width: "20vw" }}

                  />
                </Form.Item>
              </Col>
            );
          })}
          <Col span={8} className={collapsedOperClassName}>
            <Form.Item >
              <div className={globalStyles.flexCenter}>
                <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
                  查询
                </Button>
                <Button htmlType="button" onClick={onReset} style={{ marginRight: "10px" }}>
                  重置
                </Button>
                <div className={styles.collapse} onClick={UnFoldSeachMenu}>
                  <a>{!collapsed ? '展开' : '收起'}</a>
                  <span >
                    <DownOutlined className={isCollapsedClassNames} />
                  </span>
                </div>
              </div>
            </Form.Item>
          </Col>


        </Row>

      </Form>

    </Card>
  ) : (
      <></>
    );
};

export default React.memo(TableSeachHeader);
