import React, { useRef, useState } from 'react'
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Modal } from 'antd';
import { connect } from 'umi'
import CreateDict from '@/components/createInfoModal'
import styles from './styles.less'
import { leftColumns, rightColumns, createDictDetailColumns } from './columns'
import { getDictListPage } from './service'


const DictImprove = props => {

    const [selected, handleSelected] = useState({})
    const actionRef = useRef();
    const detailActionRef = useRef()
    const { dictDetailList, createModalVisible, createDetailModalVisible, deleteDetailModalVisible, modifyModalVisible, deleteModalVisible } = props
    const { dispatch } = props

    /**
     * 
     * @param {动态修改字典选中样式} record 
     */
    const setRowClassName = (record) => {
        return record.id === selected.id ? styles.selected : ''
    }

    /**
     * 
     * @param {新增字典}} params 
     */
    const addDictFunc = (params) => {
        dispatch({
            type: "DictModel/fetchaddDict",
            payload: params
        })
        actionRef.current.reload()

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
        detailActionRef.current.reload()


    }

    /**
    * 
    * @param {删除字典}} params 
    */
    const deleteDictFunc = (currentDelete) => {
        dispatch({
            type: "DictModel/fetchdeleteDict",
            payload: currentDelete
        })

    }

    /**
     * 
     * @param {删除字典详情}} params 
     */
    const deleteDictDetailFunc = (currentDeleteDetail) => {
        const { id, dictName } = currentDeleteDetail
        dispatch({
            type: "DictModel/fetchdeleteDetailDict",
            payload: { id, dictName }
        })

    }

    /**
     * 
     * @param {获取字典详情} name 
     */

    const getDictDetail = (name) => {
        dispatch({
            type: 'DictModel/fetchgetDictDetailListPage',
            payload: { name }
        })

    }

    const leftOptions = (text, record) => (
        <Space size="middle">
            <Button type="primary" onClick={() => {


            }}>修改</Button>
            <Button type="primary" danger onClick={() => {
                deleteDictFunc(record)
            }}>删除</Button>
        </Space>
    )

    const rightOptions = (text, record) => (
        <Space size="middle">
            <Button type="primary" onClick={() => {

            }
            }>修改</Button>
            <Button type="primary" danger onClick={() => {

            }}>删除</Button>
        </Space>
    )

    return (
        <PageHeaderWrapper>
            <div className={styles.dictWrapper}>
                <div className={styles.wrapperLeft}>
                    <ProTable
                        columns={leftColumns(leftOptions)}
                        pagination={{
                            showQuickJumper: true,
                        }}
                        onRow={record => {
                            return {
                                onClick: () => {
                                    handleSelected(() => record)
                                    getDictDetail(record.name)
                                }
                            }
                        }}
                        rowClassName={setRowClassName}
                        search={false}
                        options={false}
                        actionRef={actionRef}
                        request={async (params) => {

                            const response = await getDictListPage(params)
                            if (response.code === 200) {
                                return Promise.resolve({
                                    data: response.data.rows,
                                    success: true,
                                    total: response.data.total
                                })
                            }
                            message.error(`出错了：${response.message}`)
                            return Promise.resolve({
                                success: true,
                            })

                        }}
                        rowKey="id"
                        toolBarRender={() => [
                            <Button key="3" type="primary" onClick={() => {
                                dispatch({
                                    type: "GlobalModel/changeCreateModalVisible",
                                    payload: true
                                })
                            }}>
                                <PlusOutlined />新建
                            </Button>
                        ]}
                        dateFormatter="string"

                    />
                </div>
                <div className={styles.wrapperRight}>
                    <ProTable
                        columns={rightColumns(rightOptions)}
                        pagination={{
                            showQuickJumper: true,
                        }}
                        actionRef={detailActionRef}
                        options={false}
                        search={false}
                        dataSource={dictDetailList}
                        rowKey="id"
                        manualRequest
                        dateFormatter="string"

                    />
                </div>
            </div>
            <CreateDict
                title="创建字典" onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeCreateModalVisible",
                        payload: false
                    })
                }} modalVisible={createModalVisible}>
                <ProTable
                    onSubmit={addDictFunc}
                    type="form"
                    columns={leftColumns(leftOptions)}
                />
            </CreateDict>
            <CreateDict
                title="创建字典详情" onCancel={() => {
                    dispatch({
                        type: 'DictModel/changeCreateDetailModalVisible',
                        payload: false
                    })
                }} modalVisible={createDetailModalVisible}>
                <ProTable
                    onSubmit={value => {
                        const params = Object.assign(selected, value)
                        params.dictName = selected.name
                        createDictDetail(params)
                    }}
                    type="form"
                    columns={createDictDetailColumns}
                />
            </CreateDict>
            <Modal
                title="确认删除该字典"
                visible={deleteModalVisible}
                onOk={deleteDictFunc}
                onCancel={() => {
                    dispatch({
                        type: "GlobalModel/changeDeleteModalVisible",
                        payload: false
                    })
                }}
            >
                <p>是否确认删除该字典？</p>

            </Modal>
            <Modal
                title="确认删除该字典详情"
                visible={deleteDetailModalVisible}
                onOk={deleteDictDetailFunc}
                onCancel={() => {
                    dispatch({
                        type: "DictModel/changeDeleteDetailModalVisible",
                        payload: false
                    })
                }}
            >
                <p>是否确认删除该字典详情？</p>

            </Modal>
        </PageHeaderWrapper>
    )
}


export default connect(({ DictModel, loading, GlobalModel }) => ({
    dictList: DictModel.dictList,
    dictDetailList: DictModel.dictDetailList,
    createDetailModalVisible: DictModel.createModalVisible,
    deleteDetailModalVisible: DictModel.deleteDetailModalVisible,
    createModalVisible: GlobalModel.createModalVisible,
    modifyModalVisible: GlobalModel.modifyModalVisible,
    deleteModalVisible: GlobalModel.deleteModalVisible,
    dictListLoading: loading.effects['DictModel/fetchgetDictListPage'],

}))(DictImprove)