export const columns = (equipValueEnum,options) => {
  return [
    {
      title: '开始时间',
      dataIndex: 'createFrom',
      valueType: 'dateTime',
      hideInTable: true,
    },
    {
      title: '结束时间',
      dataIndex: 'createTo',
      valueType: 'dateTime',
      hideInTable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      width: 100,

    },
    {
      title: '内部Id',
      dataIndex: 'insideId',
      ellipsis: true,
      width: 100,
    },
    {
      title: '外部Id',
      dataIndex: 'outsideId',
      ellipsis: true,
      width: 100,
      formItemProps: {
        responsive: ['md']
      },
    },
    {
      title: 'imsi',
      dataIndex: 'imsi',
      ellipsis: true,
      width: 100,
      formItemProps: {
        responsive: ['md']
      },
    },
    {
      title: '设备机号',
      dataIndex: 'macId',
      ellipsis: true,
      width: 80,
      formItemProps: {
        responsive: ['md']
      },
    },
    {
      title: '打印机号',
      dataIndex: 'printMacId',
      ellipsis: true,
      width: 80,
      formItemProps: {
        responsive: ['md']
      },
    },
    {
      title: '型号',
      dataIndex: 'model',
      ellipsis: true,
      width: 100,
      hideInSearch: true,
      formItemProps: {
        responsive: ['md']
      },
    },
    {
      title: '型号名',
      dataIndex: 'modelName',
      ellipsis: true,
      hideInSearch: true,
      width: 100,
      formItemProps: {
        responsive: ['md']
      },
    },
    {
      title: '类型名称',
      dataIndex: 'typeName',
      ellipsis: true,
      width: 100,
      hideInSearch: true,
      formItemProps: {
        responsive: ['md']
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: equipValueEnum,
      formItemProps: {
        responsive: ['md','lg']
      },
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
      formItemProps: {
        responsive: ['md']
      },
    },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      render: options,
      fixed:'right'
    },
  ];
};
