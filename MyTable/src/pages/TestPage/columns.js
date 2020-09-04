export const searchColumns = (type) => {
  return [
    {
      title: '开始时间',
      dataIndex: 'createFrom',
      valueType: 'dateTime',
      hideInTable: true,
      rules: [{ required: true, message: 'Please input your username!' }],
    },
    {
      title: '结束时间',
      dataIndex: 'createTo',
      valueType: 'dateTime',
      hideInTable: true,
      rules: [{ required: true, message: 'Please input your username!' }],
    },
    {
      title: '日志类型',
      dataIndex: 'type',

      valueEnum: type,
      hideInTable: true,
    },
    {
      title: '日志类型',
      dataIndex: 'type',

      valueEnum: type,
      hideInTable: true,
    },
    {
      title: '日志类型',
      dataIndex: 'type',

      valueEnum: type,
      hideInTable: true,
    },
    {
      title: '日志类型',
      dataIndex: 'type',

      valueEnum: type,
      hideInTable: true,
    },
    {
      title: '日志类型',
      dataIndex: 'type',

      valueEnum: type,
      hideInTable: true,
    },
    {
      title: '日志类型',
      dataIndex: 'type',

      valueEnum: type,
      hideInTable: true,
    },
    {
      title: '日志类型',
      dataIndex: 'type',

      valueEnum: type,
      hideInTable: true,
    },
  ];
};

export const columns = [
  {
    title: '用户名称',
    dataIndex: 'username',
    ellipsis: true,
  },

  {
    title: '时间',
    dataIndex: 'time',
    ellipsis: true,
  },
  {
    title: '参数',
    dataIndex: 'params',
    ellipsis: true,
  },
  {
    title: '方法',
    dataIndex: 'method',
    ellipsis: true,
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    ellipsis: true,
    fixed:"right"
  },
];
