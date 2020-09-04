export const columns = (postValueEnum, roleValueEnum, sexValueEnum, statusValueEnum, options) => {
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
