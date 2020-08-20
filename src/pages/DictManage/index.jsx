
import React, { useState, useEffect } from 'react';
import { Table, Card, Input, Button, Space, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva'
import CreateDict from '@/components/createInfoModal'
import ModifyForm from '@/components/ModifyForm/index'

import styles from './styles.less'


const { Search } = Input;




// rowSelection object indicates the need for row selection

const DictManage = (props) => {

    const [createModalVisible, handleModalVisible] = useState(false);
    const [createDetailModalVisible, handleCreateDetailModalVisible] = useState(false);
    const [deleteModalVisible, handleDeleteModalVisible] = useState(false)
    const [deleteDetailModalVisible, handledeleteDetailModalVisible] = useState(false);

    const [changeModalVisible, handleChangeModalVisible] = useState(false)
    const [changeDetailModalVisible, handlechangeDetailModalVisible] = useState(false)
    const [changeDetailModalRowData, handleChangeDetailModalRowData] = useState({})

    const [currentDelete, handleCurrentDelete] = useState([])
    const [currentDeleteDetail, handleCurrentDeleteDetail] = useState({})

    const [currentModify, handleCurrentModify] = useState({})
    const [currentDetailModify, handleCurrentDetailModify] = useState({})
    const [currentRowData, handleCurrentRowData] = useState({})

    const [selected, handleSelected] = useState({})
    const [showDetail, handleShowDetail] = useState(false)
    const { dictList, dictDetailList } = props
    const { dispatch } = props





    /**
     * 
     * @param {新增字典}} params 
     */
    const addDictFunc = async (params) => {
        dispatch({
            type: "DictModel/fetchaddDict",
            payload: params
        })

        message.info("新增字典成功")

    }

    /**
     * 
     * @param {删除字典}} params 
     */
    const deleteDictFunc = () => {
        dispatch({
            type: "DictModel/fetchdeleteDict",
            payload: currentDelete
        })

        message.info("删除该字典成功")
        handleDeleteModalVisible(false)
    }
    /**
     * 
     * @param {删除字典详情}} params 
     */
    const deleteDictDetailFunc = () => {
        dispatch({
            type: "DictModel/fetchdeleteDetailDict",
            payload: { id: [currentDeleteDetail.id], dictName: currentDeleteDetail.dictName }
        })


        message.info("删除该字典详情成功")
        handledeleteDetailModalVisible(false)
    }

    /**
     * @param {修改字典}} params 
     */

    const changeDictFunc = (params) => {
        dispatch({
            type: "DictModel/fetchupdateDict",
            payload: params
        })

        message.info("修改字典成功")
        handleChangeModalVisible(false)
    }

    /**
     * @param {修改字典详情}} params 
     */

    const changeDictDetaiFunc = (params) => {
        dispatch({
            type: "DictModel/fetchupdateDetailDict",
            payload: params
        })

        message.info("修改字典成功")
        handlechangeDetailModalVisible(false)
    }


    /**
     * 
     * @param {获取字典详情} record 
     */

    const getDictDetail = (name) => {
        dispatch({
            type: 'DictModel/fetchgetDictDetailListPage',
            payload: { name }
        })

    }

    /**
     * 
     * @param {创建字典详情} record 
     */

    const createDictDetail = (paramas) => {
        dispatch({
            type: 'DictModel/fetchaddDetailDict',
            payload: paramas
        })


        message.info("创建该字典详情成功")

    }
    /**
     * 
     * @param {动态修改字典选中样式} record 
     */
    const setRowClassName = (record) => {
        return record.id === selected.id ? styles.selected : ''
    }

    const leftActions = [
        <Button type="primary" onClick={() => {
            handleModalVisible(true)
        }}><PlusOutlined />新增字典</Button>
    ]

    const rightActions = [
        <Button type="primary" onClick={() => {
            handleCreateDetailModalVisible(true)
        }}><PlusOutlined />新增字典详情</Button>
    ]
    useEffect(() => {

        dispatch({
            type: "DictModel/fetchgetDictListPage"
        })
        console.log("dictList", dictList)
    }, [])



    const leftColumns = [
        {
            title: '字典名称',
            dataIndex: 'name',

            width: "20%",

        },
        {
            title: '字典描述',
            width: "50%",
            dataIndex: 'remark',
        },
        {
            title: "操作",
            valueType: 'option',
            width: "30%",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        handleChangeModalVisible(true)
                        let { id, name, remark } = record
                        handleCurrentModify(
                            {
                                name: { defaultValue: name, zhName: "字典名称" },
                                remark: { defaultValue: remark, zhName: "备注" }
                            })

                        handleCurrentRowData(record)
                        console.log("record", record)

                    }}>修改</Button>
                    <Button type="primary" danger onClick={() => {
                        handleDeleteModalVisible(true)
                        handleCurrentDelete([record.id])
                    }}>删除</Button>
                </Space>
            ),
        }
    ];

    const rightColumns = [
        {
            title: '所属字典名称',
            dataIndex: 'dictName',

        },
        {
            title: '字典中文名',
            dataIndex: 'laber',

        },
        {
            title: '字典详情描述',
            dataIndex: 'remark',
        },
        {
            title: '字典值',
            dataIndex: 'value',
        },
        {
            title: "操作",
            key: "action",
            valueType: 'option',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        handlechangeDetailModalVisible(true)
                        let { laber, value, remark, dictName } = record
                        handleCurrentDetailModify({
                            laber: { defaultValue: laber, zhName: "字典中文名" },
                            value: { defaultValue: value, zhName: "字典值" },
                            remark: { defaultValue: remark, zhName: "字典详情描述" },
                            dictName
                        })
                        handleChangeDetailModalRowData(record)
                    }
                    }>修改</Button>
                    <Button type="primary" danger onClick={() => {
                        handledeleteDetailModalVisible(true)
                        console.log("record", record)
                        handleCurrentDeleteDetail(record)
                    }}>删除</Button>
                </Space>
            ),
        }

    ];

    const createDictDetailColumns = [



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
    return (
        <PageHeaderWrapper title={false}>
            <div className={styles.Table}>

                <div className={styles.leftTable}>

                    <Card
                        title="字典列表"
                        actions={leftActions}
                    >
                        <Search placeholder="输入名称或描述进行搜索" onSearch={value => console.log(value)} enterButton />
                        <Table
                            onRow={record => {
                                return {
                                    onClick: event => {
                                        handleSelected(record)
                                        console.log("record", record)
                                        getDictDetail(record.name)
                                        console.log(record.name, dictDetailList)
                                        handleShowDetail(true)
                                    }
                                }
                            }}
                            rowClassName={setRowClassName}
                            columns={leftColumns}
                            dataSource={dictList}

                        />
                    </Card>
                </div>


                <div className={styles.rightTable}>
                    <Card
                        title="字典详情"
                        actions={showDetail ? rightActions : []}>


                        <Table
                            columns={rightColumns}
                            dataSource={dictDetailList}
                        />
                    </Card>
                </div>

            </div>
            <CreateDict
                title="创建字典" onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        handleModalVisible(false)
                        message.info("添加字典成功！")
                        await addDictFunc(value);
                    }}
                    type="form"
                    columns={leftColumns}
                />
            </CreateDict>
            <CreateDict
                title="创建字典详情" onCancel={() => handleCreateDetailModalVisible(false)} modalVisible={createDetailModalVisible}>
                <ProTable
                    onSubmit={value => {
                        let params = Object.assign(selected, value)
                        params.dictName = selected.name
                        createDictDetail(params)
                        handleCreateDetailModalVisible(false)
                    }}
                    type="form"
                    columns={createDictDetailColumns}
                />
            </CreateDict>
            <Modal
                title="确认删除该字典"
                visible={deleteModalVisible}
                onOk={deleteDictFunc}
                onCancel={() => handleDeleteModalVisible(false)}
            >
                <p>是否确认删除该字典？</p>

            </Modal>
            <Modal
                title="确认删除该字典详情"
                visible={deleteDetailModalVisible}
                onOk={deleteDictDetailFunc}
                onCancel={() => handledeleteDetailModalVisible(false)}
            >
                <p>是否确认删除该字典详情？</p>

            </Modal>
            <CreateDict
                title="修改字典"

                onCancel={() => handleChangeModalVisible(false)} modalVisible={changeModalVisible}>
                <ModifyForm rowData={currentRowData} formData={currentModify} onModifyForm={changeDictFunc} ></ModifyForm>
            </CreateDict>

            <CreateDict
                title="修改字典详情"

                onCancel={() => handlechangeDetailModalVisible(false)} modalVisible={changeDetailModalVisible}>
                <ModifyForm rowData={changeDetailModalRowData} formData={currentDetailModify} onModifyForm={changeDictDetaiFunc} ></ModifyForm>
            </CreateDict>
        </PageHeaderWrapper>
    )
}

export default connect(({ DictModel, loading}) => ({
    dictList: DictModel.dictList,
    dictDetailList: DictModel.dictDetailList,
    dictListLoading: loading.effects['DictModel/fetchgetDictListPage'],
 
}))(DictManage)