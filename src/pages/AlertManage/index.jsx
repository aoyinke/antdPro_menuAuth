import React, { useRef, useEffect } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import { Button, Menu, Dropdown, message } from 'antd';
import ProTable from '@ant-design/pro-table';

import DeleteAlertModal from '@/components/DeleteModal'
import CreateAlertModal from '@/components/CreateModal'
import ModifyAlertModal from '@/components/ModifyModal';

import { connect } from 'umi'
import { getAlertList, createAlert, changeAlert, deleteAlert, getDictDetailAccroName } from './service'
import { modifyColumns, columns } from './column'



let selected = []
const equipCategoryEnum = {}
const AlertManage = props => {


    const { dispatch } = props
    const actionRef = useRef();
    const modifyRef = useRef()


    const prepareEnum = async () => {
        const res = await getDictDetailAccroName(['alarmType'])
        const hide = message.loading('正在请求');

        try {
            if (res.code === 200) {
                const { alarmType } = res.data
                alarmType.forEach(element => {
                    equipCategoryEnum[element.value] = { text: element.laber }
                });
                hide();
            }

        } catch (error) {
            hide();
            message.error('请求失败请重试！');
        }


    }
    useEffect(() => {
        prepareEnum();

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

            const res = await createAlert(value);
            if (res.code === 200) {
                hide();
                message.success('添加成功');
                actionRef.current.reload()
            } else {
                message.error(`添加错误，${res.message}`)
            }

        } catch (error) {
            hide();
            message.error('添加失败请重试！');
        }
    }


    /**
     * 删除报警
     * @param fields
     */

    const deleteAlertFunc = async () => {
        const ids = selected.map(item => {
            return item.id
        })
        if (ids.length) {
            const hide = message.loading('正在删除');

            try {
                const res = await deleteAlert(ids);
                if (res.code === 200) {
                    hide();
                    message.success('删除成功，即将刷新');

                    actionRef.current.reload();
                } else {
                    message.error(`批量删除失败，${res.message}`)
                }

            } catch (error) {
                hide();
                message.error('删除失败，请重试');
            }
        } else {
            message.error("批量删除不可为空")
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

    const options = (text, row, _, action) => [

        <Button type="primary" onClick={() => {
            dispatch({
                type: "GlobalModel/changeModifyModalVisible",
                payload: true
            })

            dispatch({
                type: "GlobalModel/saveCurrentRowData",
                payload: row
            })
            setTimeout(() => {
                modifyRef.current.setFieldsValue(row)
            }, 100)

        }}>修改</Button>
    ]

    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns(equipCategoryEnum, options)}
                pagination={{
                    showQuickJumper: true,
                }}
                search
                actionRef={actionRef}
                request={async (params) => {
                    const par = params
                    par.pageNum = params.current
                    const res = await getAlertList(params)
                    if (res.code === 200) {
                        return Promise.resolve({
                            data: res.data.rows,
                            success: true,
                            total: res.data.total,

                        })

                    }
                    return Promise.resolve({
                        success: true
                    })

                }}
                manualRequest
                rowKey="id"
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        selected = selectedRows
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
                columns={columns(equipCategoryEnum, options)}
                onSubmit={createAlertFunc}
                title="新建报警"
            />
            <ModifyAlertModal
                title="修改报警"
                modifyColumns={modifyColumns(equipCategoryEnum)}
                modifyRef={modifyRef}
                onSubmit={handleUpdate}
            />

            <DeleteAlertModal
                title="删除报警信息"
                deleteFunc={deleteAlertFunc}
            />

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