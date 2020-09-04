export const columns = (options) => {
  return [
    {
      title: '角色中文名称',
      dataIndex: 'roleZhName',
      ellipsis: true,
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
      width: '24%',
      hideInSearch: true,
    },
    {
      title: '角色英文名称',
      dataIndex: 'roleEuName',
      ellipsis: true,
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
      width: '20%',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
      width: '24%',
      hideInSearch: true,
    },
    {
      title: '操作',
      width: '24%',
      valueType: 'option',
      render: options,
    },
  ];
};

export const modifyColumns = [
  {
    title: '角色中文名称',
    dataIndex: 'roleZhName',
  },
  {
    title: '角色英文名称',
    dataIndex: 'roleEuName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
