export const columns = (options, equipValueEnum) => {

    const enumType = {}
    Object.entries(equipValueEnum).forEach(item => {
        const [key, value] = item
        if (key === "2" || key === "3" || key === "4") {
            enumType[key] = value
        }
    })
    return [
        {
            title: '开始时间',
            dataIndex: 'createFrom',
            valueType: "dateTime",
            hideInTable: true
        },
        {
            title: '结束时间',
            dataIndex: 'createTo',
            valueType: "dateTime",
            hideInTable: true
        },
        {
            title: '状态',
            dataIndex: 'status',
            ellipsis: true,
            valueEnum: enumType,
            width: "9%",
        },
        {
            title: '测试人',
            dataIndex: 'user',
            hideInTable: true
        },
        {
            title: '名称',
            dataIndex: 'name',
            ellipsis: true,
            width: "9%"
        },
        {
            title: '内部Id',
            dataIndex: 'insideId',
            ellipsis: true,
            width: "9%"
        },
        {
            title: '外部Id',
            dataIndex: 'outsideId',
            ellipsis: true,
            width: "9%"
        },
        {
            title: 'imsi',
            dataIndex: 'imsi',
            ellipsis: true,
            width: "9%"
        },
        {
            title: '设备机号',
            dataIndex: 'macId',
            ellipsis: true,
            width: "9%"
        },
        {
            title: '打印机号',
            dataIndex: 'printMacId',
            ellipsis: true,
            width: "7%"
        },
        {
            title: '型号',
            dataIndex: 'model',
            ellipsis: true,
            width: "9%",
            hideInSearch: true,
        },
        {
            title: '型号名',
            dataIndex: 'modelName',
            ellipsis: true,
            hideInSearch: true,
            width: "9%",
        },
        {
            title: '类型名称',
            dataIndex: 'typeName',
            ellipsis: true,
            width: "9%",
            hideInSearch: true,
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: "9%",
            ellipsis: true,
            hideInSearch: true
        },
        {
            title: '操作',
            valueType: 'option',
            render: options,
            fixed:"right"
        },

    ];
}


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
        title: '操作人员',
        dataIndex: 'createUser',
        ellipsis: true,
        width: 100,
      },
      {
        title: '参数',
        dataIndex: 'params',
        ellipsis: true,
        width: 200,
      },
      {
        title: '结果',
        dataIndex: 'result',
        ellipsis: true,
        width: 100,
      },
      {
        title: '方法',
        dataIndex: 'method',
        ellipsis: true,
        hideInSearch: true,
        width: 100,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        hideInSearch: true,
        width: 100,
      }

];