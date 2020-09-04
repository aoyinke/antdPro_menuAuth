export const modifyColumns = (equipCategoryEnum) => [
  {
    title: '报警类型',
    dataIndex: 'typeId',
    valueEnum: equipCategoryEnum,
  },

  {
    title: '报警类型英文名',
    dataIndex: 'enName',
  },
  {
    title: '报警类型中文名',
    dataIndex: 'zhName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '报警类型id',
    dataIndex: 'value',
  },
];

export const creColumns = () => [
  {
    title: '报警类型英文名',
    dataIndex: 'enName',
  },
  {
    title: '报警类型中文名',
    dataIndex: 'zhName',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '报警类型id',
    dataIndex: 'value',
  },
];

export const columns = (equipCategoryEnum, options) => {
  return [
    {
      title: '报警类型',
      dataIndex: 'typeId',
      valueEnum: equipCategoryEnum,

      hideInTable: true,
    },

    {
      title: '报警类型英文名',
      dataIndex: 'enName',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: '15%',
      hideInSearch: true,
    },
    {
      title: '报警类型中文名',
      dataIndex: 'zhName',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: '20%',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: '15%',
      hideInSearch: true,
    },
    {
      title: '报警类型id',
      dataIndex: 'value',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
          { max: 2, message: '最长2个数字' },
          {
            type: 'number',
            transform: (val) => Number(val),
            message: '只能输入数字',
          },
        ],
      },

      width: '15%',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '15%',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      width: '15%',
      valueType: 'option',
      render: options,
    },
  ];
};
