import React, { useRef, useEffect, useState } from 'react'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table';
import { connect } from 'umi'
import { getWareHouseList, getWareHouseLogList } from './service'
import { columns } from './columns'
import CreateStock from './components/Create'
import RemoveStock from './components/Remove'


const WareHousingManage = props => {

    const actionRef = useRef();
    const [selectedEquip,setSelectedEquip] = useState();

    const { equipValueEnum } = props
    const statusEnum = {
        5:equipValueEnum[5],
        8:equipValueEnum[8],
        9:equipValueEnum[9],
        10:equipValueEnum[10],
        11:equipValueEnum[11]
    };
    const { dispatch } = props
    useEffect(() => {
        dispatch({
            type: "EquipListModel/fetchPrepareEnumValue"
        })
    }, [])
    return (
        <PageHeaderWrapper title={false}>
            <ProTable
                columns={columns(statusEnum)}
                pagination={{
                    showQuickJumper: true,
                }}
                actionRef={actionRef}
                request={async (params) => {
                    const par = params
                    par.pageNum = params.current
                    try {
                        const res = await getWareHouseList(params)
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
                        setSelectedEquip(selectedRows)
                    }

                }}
                toolBarRender={() => [
                    <Button key="3" type="primary" onClick={() => {
                        dispatch({
                            type: "GlobalModel/changeCreateModalVisible",
                            payload: true
                        })
                    }}>
                        <PlusOutlined />
                        入库
                    </Button>,
                    <Button key="3" type="primary" danger onClick={() => {
                        dispatch({
                            type: "GlobalModel/changeDeleteModalVisible",
                            payload: true
                        })
                    }}>
                        <MinusOutlined />
                        出库
                    </Button>
                ]}
                dateFormatter="string"

            />
            <CreateStock
                selectedEquip={selectedEquip}
            />

            <RemoveStock
                selectedEquip={selectedEquip}
            />
        </PageHeaderWrapper>
    )
}


export default connect(({ EquipListModel }) => ({
    equipValueEnum: EquipListModel.equipValueEnum
}))(React.memo(WareHousingManage))