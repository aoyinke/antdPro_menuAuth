export const modifyColumns = (typeIds) => [
    {
        title: '设备类型',
        dataIndex: 'typeId',
        valueEnum: typeIds,
    },
    {
        title: '设备型号英文名',
        dataIndex: 'model',
    },
    {
        title: '设备型号中文名',
        dataIndex: 'name',
    },
    {
        title: '模组名',
        dataIndex: 'module',
    },
];

export const creColumns = () => [
  {
      title: '设备型号英文名',
      dataIndex: 'model',
  },
  {
      title: '设备型号中文名',
      dataIndex: 'name',
  },
  {
      title: '模组名',
      dataIndex: 'module',
  },
];

export const columns = (typeIds,options)=>{
    
    return [
        {
          title: '设备类型',
          dataIndex: 'typeId',
          valueEnum: typeIds,
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
          hideInTable: true,
        },
        {
          title: '设备型号英文名',
          dataIndex: 'model',
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
          title: '设备型号中文名',
          dataIndex: 'name',
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
          title: '模组名',
          dataIndex: 'module',
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
          title: '创建时间',
          dataIndex: 'createTime',
          width: '20%',
          hideInSearch: true,
          hideInForm: true,
        },
        {
          title: '操作',
          width: '20%',
          valueType: 'option',
          render: options
        },
      ];
}