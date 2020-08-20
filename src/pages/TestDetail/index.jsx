import React, { useEffect, useState, useCallback } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
    Button,
    Card,
    Descriptions,
    message,
    Form,
    Modal,
    Input
} from 'antd';

import {connect} from 'dva'
import styles from './style.less';
import TableDetails from './components/tableDetails';
import { getTest, endTest, startPrintTest, startToTest,singleEndTest } from './service'


/**
* 设置全局变量
*/

var intervalTest = () => { }


const BeginToRenderEqui = ({ readyToRender,handleAllowToEndAll,params }) => {

    const [currentTestEquipList, handlecurrentTestEquipList] = useState({})
    
    useEffect(() => {
        if (readyToRender) {
            let hide = message.loading("测试中")
            intervalTest = setInterval(async () => {
                try {
                    let res = await getTest(params)
                    // console.log("res.data",res.data)
                    if (res.code) {
                        if (res.code == 200) {
                            delete res.data.currentMacId
                            
                            handlecurrentTestEquipList(res.data)
                            
                            let i = 0
                            Object.keys(currentTestEquipList).forEach(ip=>{
                                if(currentTestEquipList[ip].success == ''){
                                    i = 1
                                }
                            })
                            if(i == 0){
                                handleAllowToEndAll(true)
                            }else{
                                handleAllowToEndAll(false)
                            }
                            
                            
                        } 

                    }

                    hide()
                } catch (error) {
                    message.error("出错了：" + error)
                }

            }, 2000)
            return () => { clearInterval(intervalTest) }
        }

    }, [currentTestEquipList, readyToRender])

    return (
        <div className={styles.equiTestBar} >
            {
                Object.keys(currentTestEquipList).map(ip => {
                    // console.log("TableDetails",currentTestEquipList[ip])
                    return (
                        <TableDetails ip={ip} equipData={currentTestEquipList[ip]} port={params.port} typeId={params.typeId}/>
                    )
                })
            }
        </div>

    )
}
const TestDetail = (props) => {

    const [readyStartToEnd, handleStartToEnd] = useState(false)
    const [showInfoForm, handleShowInfoForm] = useState(false)
    const [readStartTogetTest, handleReadStartTogetTest] = useState(false)
    const [form] = Form.useForm();


    const {port,typeId} = props
    const {dispatch} = props

    useEffect(() => {

        let urlPort = props.location.query.port
        let urlTypeId = props.location.query.typeId
        console.log("props",props)
        dispatch({
            type:"testDetailModal/SaveUrlParmas",
            payload:{port:urlPort,typeId:urlTypeId}
        })


    }, [])


    /**
     * 开始测试
     */
    const startTest = async () => {
        const hide = message.loading('正在进行测试');

        try {
            let params = { typeId, port }
            console.log("params",params)
            let res = await startToTest(params);
            if (res.code === 200) {
                hide();
                message.success('开始测试成功');
                
                handleReadStartTogetTest(true)
                return
            } else {
                hide();
                message.error('开始测试失败');
            }

        } catch (error) {
            hide();
            message.error('开始测试失败请重试！');
        }

    }

    /**
     * 确认打印测试
     */
    const onConfirmStartToPrint = async () => {
        let { imei, imsi, macId,model } = form.getFieldValue()


        if (!imei) {
            message.error("imei不能为空")
            return
        }
        if (!imsi) {
            message.error("imsi不能为空！")
            return
        }
        if (!macId) {
            message.error("macId不能为空！")
            return
        }
        if (!model) {
            message.error("model不能为空！")
            return
        }
        const hide = message.loading('正在进行打印测试');
        let params = { imei, imsi, macId, typeId,model }
        try {
            let res = await startPrintTest(params);
            if (res.code === 200) {
                hide();
                message.success('打印测试成功');
                handleShowInfoForm(false)
            } else {
                hide();
                message.error('打印测试失败');
                handleShowInfoForm(false)
            }

        } catch (error) {
            hide();
            message.error('打印测试失败请重试！');
        }
    }

    /**
     * 允许结束所有测试
     */

    const handleAllowToEndAll = (state)=>{
        handleStartToEnd(state)
    }
    
    /**
     * 单个测试终止
     */

    const handleSingleEndTest = async (ip)=>{
        let params = {typeId,port,ip}
        await singleEndTest(params)
    }

    return (
        <PageHeaderWrapper title={false}>
            <Card
                title="设备信息"
                style={{
                    marginBottom: 24,
                }}
                bordered={false}
            >
                <Descriptions
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <Descriptions.Item label="设备型号">{props.location.query.zhName}</Descriptions.Item>
                    <div className={styles.equiBtn}>
                        <Button type="primary" style={{ background: "#fca130", border: "1px solid #fca130" }} onClick={() => {

                            handleShowInfoForm(true)
                        }}>打印测试</Button>
                        <Button type="primary"  style={{ margin: "15px" }} onClick={startTest}>开始测试</Button>
                        <Button type="primary" danger disabled={!readyStartToEnd} onClick={async () => {
                            clearInterval(intervalTest)
                            handleReadStartTogetTest(false)
                            message.info("结束测试成功")
                            handleStartToEnd(false)
                            await endTest({port})
                        }}>结束测试</Button>
                    </div>

                </Descriptions>


            </Card>
            <BeginToRenderEqui params = {{ips:props.location.query.ipList,port:port,typeId:typeId}} readyToRender={readStartTogetTest} handleAllowToEndAll={handleAllowToEndAll} ></BeginToRenderEqui>
            <Modal
                title="输入测试信息"
                visible={showInfoForm}
                onCancel={() => { handleShowInfoForm(false) }}
                destroyOnClose={true}
                footer={null}>

                <Form
                    onFinish={onConfirmStartToPrint}
                    form={form}
                >
                    <Form.Item
                        label="imei"
                        name="imei"
                        rules={[{ required: true, message: '请输入imei!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="imsi"
                        name="imsi"
                        rules={[{ required: true, message: '请输入imsi!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="macId"
                        name="macId"
                        rules={[{ required: true, message: '请输入macId!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="model"
                        name="model"
                        rules={[{ required: true, message: '请输入model!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <div className={styles.buttonPois}>
                        <Button type="primary" onClick={onConfirmStartToPrint}>确认</Button>
                    </div>


                </Form>
            </Modal>
        </PageHeaderWrapper>

    )
}

export default connect(({testDetailModal})=>({
    port:testDetailModal.port,
    typeId:testDetailModal.typeId
}))(TestDetail);