import { Space, Tooltip, Input } from 'antd';
import React from 'react';

export const columns = (options) => [
  {
    title: '设备类型英文名',
    dataIndex: 'enName',
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 150,
    hideInSearch: true,
  },
  {
    title: '设备类型中文名',
    dataIndex: 'zhName',
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 150,
    hideInSearch: true,
  },
  {
    title: '当前机号',
    dataIndex: 'currentMacId',

    width: 100,
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: '老化参数',
    dataIndex: 'oldingParams',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
    render: (_, row) => (
      <Space>
        <Tooltip title={JSON.stringify(row.oldingParams)} arrowPointAtCenter>
          {JSON.stringify(row.oldingParams).substring(0, 30)}
        </Tooltip>
      </Space>
    ),
  },
  {
    title: '库存参数',
    dataIndex: 'stockParams',
    width: 100,
    hideInSearch: true,
    ellipsis: true,
    render: (_, row) => (
      <Space>
        <Tooltip title={JSON.stringify(row.stockParams)} arrowPointAtCenter>
          {JSON.stringify(row.stockParams).substring(0, 10)}
        </Tooltip>
      </Space>
    ),
  },
  {
    title: '升级参数',
    dataIndex: 'upgradeParams',
    width: 100,
    hideInSearch: true,
    render: (_, row) => (
      <Space>
        <Tooltip title={JSON.stringify(row.upgradeParams)} arrowPointAtCenter>
          {JSON.stringify(row.upgradeParams).substring(0, 10)}
        </Tooltip>
      </Space>
    ),
  },
  {
    title: '测试参数',
    dataIndex: 'testingParams',
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 150,
    hideInSearch: true,
    hideInForm: true,
    render: (_, row) => (
      <Space>
        <Tooltip title={JSON.stringify(row.testingParams)} arrowPointAtCenter>
          {JSON.stringify(row.testingParams).substring(0, 10)}
        </Tooltip>
      </Space>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 50,
    valueType: 'option',
    fixed:"right",
    render: options,
  },
  {
    title: '测试参数',
    dataIndex: 'testingParams',
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 100,
    hideInTable: true,
  },
];

export const modifyColumns = [
  {
    title: '设备类型英文名',
    dataIndex: 'enName',
  },
  {
    title: '设备类型中文名',
    dataIndex: 'zhName',
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
  },
  {
    title: '当前机号',
    dataIndex: 'currentMacId',
  },
  {
    title: '测试参数',
    dataIndex: 'testingParam',
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '此项为必填项',
      },
    ],
    width: 150,
    hideInSearch: true,
  },
  {
    title: '老化参数',
    dataIndex: 'oldingParam',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '库存参数',
    dataIndex: 'stockParam',
    width: 100,
    hideInSearch: true,
    ellipsis: true,
  },
  {
    title: '升级参数',
    dataIndex: 'upgradeParam',
    width: 100,
    hideInSearch: true,
  },
];
