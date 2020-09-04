export const columns = (type) => {

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
            title: '日志类型',
            dataIndex: 'type',

            valueEnum: type,
            hideInTable: true
        },
        {
            title: "用户名称",
            dataIndex: 'username',
            ellipsis: true,
            width: 150,
            hideInSearch: true
        },
        {
            title: '操作',
            dataIndex: 'operation',
            ellipsis: true,
            width: 150,
            hideInSearch: true
        },
        {
            title: '时间',
            dataIndex: 'time',
            ellipsis: true,
            width: 100,
            hideInSearch: true
        },
        {
            title: '参数',
            dataIndex: 'params',
            ellipsis: true,
            width: 300,
            hideInSearch: true
        },
        {
            title: '方法',
            dataIndex: 'method',
            ellipsis: true,
            width: 200,
            hideInSearch: true
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: "dateTime",
            ellipsis: true,
            width: 200,
            hideInSearch: true
        }
    ];
}