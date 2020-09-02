
export const columns = (options) => {
    return [
        {
            title: '告警状态',
            dataIndex: 'state',
            ellipsis: true,
            width: '10%',
            hideInSearch: true,
        },
        {
            title: '告警内容',
            dataIndex: 'content',
            ellipsis: true,
            
            width: '10%',
            hideInSearch: true,
        },
        {
            title: '监测点位置',
            dataIndex: 'posi',
            ellipsis: true,
            
            width: '10%',
            hideInSearch: true,
        },
        {
            title: '企业名称',
            dataIndex: 'name',
            ellipsis: true,
            
            width: '10%',
            hideInSearch: true,
        },
        {
            title: '经营单位',
            dataIndex: 'company',
            width: '10%',
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '经营单位代码',
            dataIndex: 'companyIndex',
            width: '10%',
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '风控专岗',
            dataIndex: 'crisisPosi',
            width: '10%',
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '客户经理',
            dataIndex: 'manager',
            width: '10%',
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '企业联系人',
            dataIndex: 'concat',
            width: '10%',
            hideInSearch: true,
            hideInForm: true,
        },
        {
            title: '操作',
            width: '10%',
            valueType: 'option',
            render: options,
            fixed:"right"
        },
    ];
};
