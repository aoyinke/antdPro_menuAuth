import React, { useRef, useState, useEffect } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Button, Menu, Dropdown, Form, message, Card, Select } from 'antd';
import ProTable from '@ant-design/pro-table';

import CreateAlertModal from '@/components/createInfoModal'
import ModifyAlert from '@/components/ModifyForm/index'

import { getAlertList, createAlert, changeAlert, deleteAlert, getDictDetailAccroName } from './service'
import { connect } from 'dva'

import globalStyles from '@/global.less'



const AlertManage = props => {

    
    const [selected, handleSelected] = useState([])
    const [equipCategoryList, handlEquipCategoryList] = useState({})
    const { createModalVisible, modifyModalVisible, deleteModalVisible,currentRowData } = props
    const { dispatch } = props
    const actionRef = useRef();
    const modifyRef = useRef()


    useEffect(() => {
        const fetchDate = async () => {
            let res = await getDictDetailAccroName(['alarmType'])
            const hide = message.loading('正在请求');

            console.log("res", res)
            try {
                if (res.code == 200) {
                    let tmp = res.data.alarmType
                    let tmps = {}
                    tmp.forEach(element => {
                        tmps[element.value] = { text: element.laber }
                    });
                    handlEquipCategoryList(tmps)
                    hide();
                }

            } catch (error) {
                hide();
                message.error('请求失败请重试！');
            }


        }
        fetchDate();

    }, [])



    async function handleMenuClick(e) {
        if (selected.length) {
            if (e.key === 'remove') {
                dispatch({
                    type: "GlobalModel/changeDeleteModalVisible",
                    payload: true
                })
            }

        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="remove">删除</Menu.Item>
            {/* <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item> */}
        </Menu>
    );


    /**
     * 添加报警
     * @param fields
     */
    const createAlertFunc = async (value) => {
        const hide = message.loading('正在添加');

        try {
            await createAlert(value);
            hide();
            message.success('添加成功');
            return true;
        } catch (error) {
            hide();
            message.error('添加失败请重试！');
            return false;
        }
    }


    /**
     * 删除报警
     * @param fields
     */

    const deleteAlertFunc = async () => {
        let ids = selected.map(item => {
            return item.id
        })

        const hide = message.loading('正在删除');

        try {
            await deleteAlert(ids);
            hide();
            message.success('删除成功，即将刷新');
            dispatch({
                type: "GlobalModel/changeDeleteModalVisible",
                payload: false
            })
            actionRef.current.reload();
        } catch (error) {
            hide();
            message.error('删除失败，请重试');
        }

    }

    /**
     * 更新报警
     * @param fields
     */

    const handleUpdate = async params => {
        const hide = message.loading('正在修改');

        try {
            await changeAlert(params);
            hide();
            message.success('修改成功');
            dispatch({
                type: "GlobalModel/changeModifyModalVisible",
                payload: false
            })
            actionRef.current.reload()
            return true;
        } catch (error) {
            hide();
            message.error('修改失败请重试！');
            return false;
        }
    };
    const columns = [
        {
            title: '报警类型',
            dataIndex: 'typeId',
            valueEnum: equipCategoryList,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            hideInTable: true
        },

        {
            title: '报警类型英文名',
            dataIndex: 'enName',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: "15%",
            hideInSearch: true,
        },
        {
            title: '报警类型中文名',
            dataIndex: 'zhName',
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
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
            width: "15%",
            hideInSearch: true,
        },
        {
            title: '报警类型id',
            dataIndex: 'value',
            ellipsis: true,
            rules: [
                {
                    required: true,
                    message: '此项为必填项',

                },
                { max: 2, message: "最长2个数字" },
                {
                    type: "number",
                    transform: (val) => Number(val),
                    message: "只能输入数字",
                },
            ],
            width: "15%",
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: "15%",
            hideInSearch: true,
            hideInForm:true
        },
        {
            title: '操作',
            width: "15%",
            valueType: 'option',
            render: (text, row, _, action) => [

                <Button type="primary" onClick={() => {
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: true
                    })
                    
                    dispatch({
                        type: "GlobalModel/saveCurrentRowData",
                        payload: row
                    })
                    setTimeout(()=>{
                        modifyRef.current.setFieldsValue(row)
                    },100)

                }}>修改</Button>
            ],
        },
    ];

    const modifyColumns = [
        {
            title: '报警类型',
            dataIndex: 'typeId',
            valueEnum: equipCategoryList,

        },

        {
            title: '报警类型英文名',
            dataIndex: 'enName',

        },
        {
            title: '报警类型中文名',
            dataIndex: 'zhName',

        },
        {
            title: '备注',
            dataIndex: 'remark',

        },
        {
            title: '报警类型id',
            dataIndex: 'value',

        }
        
    ];

    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns}
                pagination={{
                    showQuickJumper: true,
                }}
                search={true}
                actionRef={actionRef}
                request={async (params) => {
                    params.pageNum = params.current
                    if (!params.typeId) {
                        return;
                    }
                    let res = await getAlertList(params)
                    if (res.code != 200) {
                        return Promise.resolve({
                            success: true
                        })
                    }
                    return Promise.resolve({
                        data: res.data.rows,
                        success: true,
                        total: res.data.total,

                    })
                }}
                manualRequest={true}
                rowKey="id"
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        handleSelected(selectedRows)
                    }

                }}

                dateFormatter="string"
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={() => {
                        dispatch({
                            type: "GlobalModel/changeCreateModalVisible",
                            payload: true
                        })
                    }}>
                        <PlusOutlined />
                        新建
                    </Button>,
                    <Dropdown overlay={menu}>
                        <Button key="4">
                            批量处理 <DownOutlined />
                        </Button>
                    </Dropdown>
                ]}
            />

            <CreateAlertModal
                title="新建报警" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })
                }} modalVisible={createModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        let success = await createAlertFunc(value);
                        if (success) {
                            dispatch({
                                type: "GlobalModel/changeCreateModalVisible",
                                payload: false
                            })

                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    rowKey="id"
                    type="form"
                    columns={columns}
                />
            </CreateAlertModal>
            <CreateAlertModal
                title="修改报警信息"
                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeModifyModalVisible",
                        payload: false
                    })
                }} modalVisible={modifyModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        console.log("value",value)
                        let params = {...value,id:currentRowData.id}
                        await handleUpdate(params);

                
                        
                    }}
                    rowKey="id"
                    type="form"
                    columns={modifyColumns}
                    formRef={modifyRef}
                />
            </CreateAlertModal>

            <CreateAlertModal
                title="删除报警信息"

                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeDeleteModalVisible",
                        payload: false
                    })
                }} modalVisible={deleteModalVisible}>
                <p>是否确认删除</p>
                <div className={globalStyles.flexCenter}>
                    <Button type="primary" onClick={deleteAlertFunc} >确认删除</Button>
                </div>
            </CreateAlertModal>
        </PageHeaderWrapper>
    )
}

export default connect(({ GlobalModel }) => ({
    createModalVisible: GlobalModel.createModalVisible,
    modifyModalVisible: GlobalModel.modifyModalVisible,
    deleteModalVisible: GlobalModel.deleteModalVisible,
    currentModifyRole: GlobalModel.currentModifyRole,
    currentRowData: GlobalModel.currentRowData
}))(AlertManage)