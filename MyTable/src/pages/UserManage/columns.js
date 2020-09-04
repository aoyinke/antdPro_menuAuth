export const columns = (postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum, options) => {
  return [
    {
      title: '用户名',
      dataIndex: 'username',
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ]
    },
    {
      title: '真实姓名',
      dataIndex: 'realname',
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ]
    },
    {
      title: '职位',
      dataIndex: 'post',
      valueEnum: postValueEnum,
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      ellipsis: true,
      valueEnum: roleValueEnum,

      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'ssex',
      ellipsis: true,
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
      valueEnum: sexValueEnum,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
      hideInSearch: true,
      valueEnum: statusValueEnum,
    },
    {
      title: '操作',
      valueType: 'option',
      render: options,
    },
  ];
};


export const modifyColumns = (postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum) => {
  return [

    {
      title: '用户名',
      dataIndex: 'username',


    },
    {
      title: '真实姓名',
      dataIndex: 'realname',
    },
    {
      title: '职位',
      dataIndex: 'post',
      valueEnum: postValueEnum,

    },
    {
      title: '角色',
      dataIndex: 'roleId',
      valueEnum: roleValueEnum,

    },
    {
      title: '性别',
      dataIndex: 'ssex',

      valueEnum: sexValueEnum,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: statusValueEnum
    },

  ];
}
