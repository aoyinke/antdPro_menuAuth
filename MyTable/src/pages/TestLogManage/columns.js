export const columns = (type) => {

    return  [
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
            ellipsis: true,
            hideInTable: true
        },
        {
            title: '日志类型',
            dataIndex: 'type',
            ellipsis: true,
            valueEnum: type,
            hideInTable: true
        },
        {
            title: "内容",
            dataIndex: 'content',
            width: 100,
            hideInSearch: true
        },
        {
            title: '方法',
            dataIndex: 'method',
            ellipsis: true,
            width: 100,
            hideInSearch: true
        },
        {
            title: '操作人员',
            dataIndex: 'createUser',
            width: 100,
            hideInForm: true
        },
        {
            title: '内部Id',
            dataIndex: 'insideId',
            width: 100,
            hideInForm: true
        },
        {
            title: '参数',
            dataIndex: 'params',
            ellipsis: true,
            width: 200,
            hideInSearch: true
        },
        {
            title: '测试结果',
            dataIndex: 'result',
            ellipsis: true,
            width: 100,
            hideInSearch: true
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 100,
            hideInSearch: true
        }
       
    ];
}