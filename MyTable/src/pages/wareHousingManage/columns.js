export const columns = (equipValueEnum)=>{

    return [
        {
            title: '开始时间',
            dataIndex: 'createFrom',
            valueType: "dateTime",
            hideInTable: true,
            hideInForm: true
        },
        {
            title: '结束时间',
            dataIndex: 'createTo',
            valueType: "dateTime",
            hideInTable: true,
            hideInForm: true
        },
        {
            title: '创建人',
            dataIndex: 'user',
            hideInTable: true
        },
        {
            title: '设备名',
            dataIndex: 'name',
            ellipsis: true,
            width: "9%",
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
            width: "9%"
        },
        {
            title: '设备型号',
            dataIndex: 'model',
            ellipsis: true,
            width: "9%",
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
            title: '状态',
            dataIndex: 'status',
            ellipsis: true,
            valueEnum: equipValueEnum,
            width: "9%",
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: "9%",
            ellipsis: true,
            hideInSearch: true
        }
    
    ];
}