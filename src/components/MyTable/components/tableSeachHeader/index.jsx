import React from 'react';
import moment from 'moment';
import { Card, Input, Form, DatePicker, Button, Select } from 'antd';
import globalStyles from '@/global.less';
import styles from './styles.less';
const { Option } = Select;

const TableSeachHeader = (props) => {
  const { columns, need } = props;
  const { search, saveSearchParams } = props;

  return !need && columns ? (
    <Card>
      <Form
        name="basic"
        onFinish={(values) => {
          search(values);
          saveSearchParams(values);
        }}
      >
        <div className={styles.searchTable}>
          {columns.map((item) => {
            if (item.hideInSearch) {
              return <></>;
            }
            if (item.valueType === 'dateTime') {
              return (
                <Form.Item label={item.title} name={item.dataIndex} rules={item.rules}>
                  <DatePicker
                    label={item.title}
                    name={item.dataIndex}
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  />
                </Form.Item>
              );
            }
            if (item.valueEnum) {
              return (
                <Form.Item label={item.title} name={item.dataIndex} rules={item.rules}>
                  <Select style={item.style || { width: 200 }} allowClear>
                    {Object.keys(item.valueEnum).map((valueItem) => {
                      return <Option value={valueItem}>{item.valueEnum[valueItem].text}</Option>;
                    })}
                  </Select>
                </Form.Item>
              );
            }
            return (
              <Form.Item label={item.title} name={item.dataIndex} rules={item.rules}>
                <Input />
              </Form.Item>
            );
          })}
        </div>

        <Form.Item>
          <div className={globalStyles.flexCenter}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  ) : (
    <></>
  );
};

export default TableSeachHeader;
