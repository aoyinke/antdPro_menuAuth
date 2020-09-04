import React, { useRef, useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import MyTable from '@/components/MyTable';
import { connect } from 'umi';
import { Button, message } from 'antd';
import { formateDate } from '@/utils/utils';
import AgeignTestContext from './context';
import AgeingTestDetail from './components/AgeingTestDetail';
import StartToAgeingTest from './components/StartAgeingTest';
import { searchColumns, columns } from './columns';
import { getAgeingTest } from './service';

const AgeingTestWithMyTable = (props) => {
    const [insideId, handleInsideId] = useState('');
    const [selectedEquip, handleSelectedEquip] = useState([]);
    const { equipValueEnum } = props;
    const { dispatch } = props
    // 设置初始访问的起止时间
    const date = new Date(
        new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1,
    );
    const treeDaysAgo = new Date(
        new Date(new Date().toLocaleDateString()).getTime() - 2 * 24 * 60 * 60 * 1000 - 1,
    );
    const createFrom = formateDate(treeDaysAgo);
    const createTo = formateDate(date);
    console.log(createFrom, createTo)

    const options = (text, row, _, action) => [
        <Button
            type="primary"
            onClick={() => {
                if (row.status === '2') {
                    message.error('待老化设备无详情信息');
                    return;
                }
                handleInsideId(() => row.insideId);
                dispatch({
                    type: 'AgeingTestModel/changeDetailModalVisible',
                    payload: true,
                });
            }}
        >
            详情
        </Button>,
    ];


    /**
    *
    * @param {页面获取数据函数}
    */
    const request = async (params) => {
        const par = params;
        try {
            const response = await getAgeingTest(par);
            if (response.code === 200) {
                return {
                    data: response.data.rows,
                    total: response.data.total,
                    success: true
                };
            }
            message.error(`页面请求数据失败，状态码：${response.code || '网关错误'}`);
        } catch (error) {
            console.log(error);
        }
        return {
            success: true
        };
    };

    useEffect(() => {
        dispatch({
            type: 'EquipListModel/fetchPrepareEnumValue',
        });
    }, []);
    return (
        <PageHeaderWrapper title={false}>
            <MyTable
                columns={columns(options, equipValueEnum)}
                searchColumns={searchColumns(equipValueEnum)}
                request={request}
                rowKey="id"
                scroll={{ x: 1500 }}
                sticky
                rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                        handleSelectedEquip(() => selectedRows)
                    }

                }}
                toolBarRender={() => [
                    <Button
                        key="3"
                        type="primary"
                        onClick={() => {
                            dispatch({
                                type: 'GlobalModel/changeCreateModalVisible',
                                payload: true,
                            });
                        }}
                    >
                        开始老化
                    </Button>,
                ]}
            />
            <AgeignTestContext.Provider
                value={{ selectedEquip, insideId, createFrom, createTo }}
            >
                <StartToAgeingTest />
                <AgeingTestDetail />
            </AgeignTestContext.Provider>
        </PageHeaderWrapper>
    )
}

export default connect(({ EquipListModel }) => ({
    equipValueEnum: EquipListModel.equipValueEnum,
}))(React.memo(AgeingTestWithMyTable))