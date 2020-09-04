export const searchColumns = [
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
    width: '7%',
  },
  {
    title: '内部Id',
    dataIndex: 'insideId',
    ellipsis: true,
    width: '7%',
  },
  {
    title: '外部Id',
    dataIndex: 'outsideId',
    ellipsis: true,
    width: '7%',
  },
  {
    title: 'imsi',
    dataIndex: 'imsi',
    ellipsis: true,
    width: '7%',
  },
  {
    title: '设备机号',
    dataIndex: 'macId',
    ellipsis: true,
    width: '4%',
  },
  {
    title: '打印机号',
    dataIndex: 'printMacId',
    ellipsis: true,
    width: '4%',
  },
  {
    title: '型号',
    dataIndex: 'model',
    ellipsis: true,
    width: '7%',
    hideInSearch: true,
  },
];

export const columns = (equipValueEnum) => {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '内部Id',
      dataIndex: 'insideId',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '外部Id',
      dataIndex: 'outsideId',
      ellipsis: true,
      width: '7%',
    },
    {
      title: 'imsi',
      dataIndex: 'imsi',
      ellipsis: true,
      width: '7%',
    },
    {
      title: '设备机号',
      dataIndex: 'macId',
      ellipsis: true,
      width: '4%',
    },
    {
      title: '打印机号',
      dataIndex: 'printMacId',
      ellipsis: true,
      width: '4%',
    },
    {
      title: '型号',
      dataIndex: 'model',
      ellipsis: true,
      width: '7%',
      hideInSearch: true,
    },
    {
      title: '型号名',
      dataIndex: 'modelName',
      ellipsis: true,
      hideInSearch: true,
      width: '7%',
    },
    {
      title: '类型名称',
      dataIndex: 'typeName',
      ellipsis: true,
      width: '7%',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: equipValueEnum,
      hideInSearch: true,
      width: '7%',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: '7%',
      ellipsis: true,
      hideInSearch: true,
    },
    // {
    //     title: '操作',
    //
    //     valueType: 'option',
    //     render: (text, row, _, action) => [

    //         <Button type="primary" onClick={() => {

    //         }}>修改</Button>
    //     ]
    // },
  ];
};
