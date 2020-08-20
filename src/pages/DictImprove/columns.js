
export const createDictDetailColumns = [



    {
        title: '字典详情名称',
        dataIndex: 'laber',
    },
    {
        title: '字典值',
        dataIndex: 'value',
    },
    {
        title: '字典详情描述',
        dataIndex: 'remark',
    }

];

export const leftColumns = (options) => {

    return [
        {
            title: '字典名称',
            dataIndex: 'name',
            hideInSearch: true,
            width: "20%",

        },
        {
            title: '字典描述',
            width: "50%",
            dataIndex: 'remark',
            hideInSearch: true,
        },
        {
            title: "操作",
            valueType: 'option',
            width: "30%",
            render: options
        }
    ];
}

export const rightColumns = (options) => {

    return [
        {
            title: '所属字典名称',
            dataIndex: 'dictName',
            hideInSearch: true,

        },
        {
            title: '字典中文名',
            dataIndex: 'laber',
            hideInSearch: true,
        },
        {
            title: '字典详情描述',
            dataIndex: 'remark',
            hideInSearch: true,
        },
        {
            title: '字典值',
            dataIndex: 'value',
            hideInSearch: true,
        },
        {
            title: "操作",
            key: "action",
            valueType: 'option',
            render: options
        }

    ];
}