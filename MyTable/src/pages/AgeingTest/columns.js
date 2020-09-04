import {OldTypes} from '@/utils/utils'

export const columns = (options, equipValueEnum) => {
  const enumType = {};
  Object.entries(equipValueEnum).forEach((item) => {
    const [key, value] = item;
    if (key === '2' || key === '3' || key === '4' || key === '5') {
      enumType[key] = value;
    }
  });
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
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: enumType,
      width: 100,
    },
    {
      title: '测试人',
      dataIndex: 'user',
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
    },
    {
      title: 'imsi',
      dataIndex: 'imsi',
      ellipsis: true,
      width: 100,
    },
    {
      title: '设备机号',
      dataIndex: 'macId',
      ellipsis: true,
      width: 100,
    },
    {
      title: '打印机号',
      dataIndex: 'printMacId',
      ellipsis: true,
      width: 80,
    },
    {
      title: '型号',
      dataIndex: 'model',
      ellipsis: true,
      width: 100,
      hideInSearch: true,
    },
    {
      title: '型号名',
      dataIndex: 'modelName',
      ellipsis: true,
      hideInSearch: true,
      width: 100,
    },
    {
      title: '类型名称',
      dataIndex: 'typeName',
      ellipsis: true,
      width: 100,
      hideInSearch: true,
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: options,
      fixed:'right',
      width: 100,
    },
  ];
};

export const detailColumns = [
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
    title: '类别',
    dataIndex: 'type',
    valueEnum:OldTypes,
    width: 80,
  },
  {
    title: '内部Id',
    dataIndex: 'insideId',
    ellipsis: true,
    width: 80,
  },
  {
    title: '外部Id',
    dataIndex: 'outsideId',
    ellipsis: true,
    width: 100,
  },
  {
    title: '操作人员',
    hideInSearch: true,
    dataIndex: 'createUser',
    width: 60,
  },
  {
    title: '内容',
    dataIndex: 'content',
    hideInSearch: true,
    ellipsis: true,
    width: 200,
    
  },
  {
    title: '参数',
    dataIndex: 'params',
    hideInSearch: true,
    ellipsis: true,
    width: 150,
  },
  {
    title: '结果',
    dataIndex: 'result',
    hideInSearch: true,
    ellipsis: true,
    width: 150,
  },
  {
    title: '方法',
    dataIndex: 'method',
    ellipsis: true,
    hideInSearch: true,
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    hideInSearch: true,
    width: 100,
    hideInTable: true,
  },
  {
    title: '测试人员',
    dataIndex: 'user',
    hideInTable: true,
  }
];
