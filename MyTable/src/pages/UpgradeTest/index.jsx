import React, { useRef, useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {UploadOutlined} from '@ant-design/icons'
import { Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi';
import { formateDate } from '@/utils/utils';
import UpgradeTestContext from './context';
import UpgradeTestDetail from './components/UpgradeTestDetail';
import StartToUpgradeTest from './components/StartUpgradeTest'
import UploadFileModal from './components/UploadFileModal'
import { getUpgradeTest } from './service'
import { columns } from './columns'


const UpgradeTest = (props) => {

    const [insideId, handleInsideId] = useState("");
    const [selectedEquip, handleSelectedEquip] = useState([])
    const { equipValueEnum } = props;
    const actionRef = useRef();
    const { dispatch } = props

    // 设置初始访问的起止时间
    const date = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
    const treeDaysAgo = new Date(new Date(new Date().toLocaleDateString()).getTime() - 2 * 24 * 60 * 60 * 1000 - 1)
    const createFrom = formateDate(treeDaysAgo)
    const createTo = formateDate(date)

    useEffect(() => {
        dispatch({
            type: "EquipListModel/fetchPrepareEnumValue"
        })
    }, [])

    const options = (text, row, _, action) => [
        <Button type="primary" onClick={() => {
            if (row.status === "3") {
                message.error("待升级设备无详情信息")
                return;
            }
            handleInsideId(() => row.insideId)
            dispatch({
                type: "UpgradeTestModel/changeDetailModalVisible",
                payload: true
            })
        }}>详情</Button>,
    ]

    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns(options, equipValueEnum)}
                pagination={{
                    showQuickJumper: true,
                }}
                actionRef={actionRef}
                scroll={{ x: 1500 }}
                sticky
                request={async (params) => {
                    const par = params
                    par.pageNum = params.current;
                    try {
                        const res = await getUpgradeTest(par)
                        if (res.code !== 200) {
                            message.error(`页面请求数据失败，状态码：${res.code}`)
                        } else {
                            return Promise.resolve({
                                data: res.data.rows,
                                success: true,
                                total: res.data.total
                            })
                        }

                    } catch (error) {
                        console.log(error)
                    }
                    return Promise.resolve({
                        success: true
                    })

                }}
                rowKey="id"
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        handleSelectedEquip(() => selectedRows)
                    }

                }}
                dateFormatter="string"
                toolBarRender={() => [
                    <Button
                        key="3"
                        style={{ background: '#fca130', border: '1px solid #fca130' }}
                        type="primary" onClick={() => {
                            dispatch({
                                type: "UpgradeTestModel/changeUploadFileModalVisible",
                                payload: true
                            })
                        }} >
                        <UploadOutlined />
                        上传文件
                    </Button>,
                    <Button key="3" type="primary" onClick={() => {
                        dispatch({
                            type: "GlobalModel/changeCreateModalVisible",
                            payload: true
                        })
                    }} >
                        开始升级
                    </Button>
                ]}
            />
            <UpgradeTestContext.Provider value={{ actionRef, selectedEquip, insideId, createFrom, createTo }}>
                <StartToUpgradeTest />
                <UpgradeTestDetail />
            </UpgradeTestContext.Provider>
            <UploadFileModal />
        </PageHeaderWrapper>
    )
}

export default connect(({ EquipListModel }) => ({
    equipValueEnum: EquipListModel.equipValueEnum,
}))(React.memo(UpgradeTest))