import React, { useEffect, useState } from 'react';

import { Descriptions, Card, Button } from 'antd';
import { Input, Result, Tooltip } from 'antd';
import globalStyles from '@/global.less'
import styles from './styles.less'
import { timestampToTime } from '@/utils/utils'
import { singleEndTest } from '../../service'
const { TextArea } = Input;

/**
 * 
 * @param {全局变量} e 
 */




/**
 * 设备字典
 */
const equipKeyDict = {
    "生产模式就绪": "productionMode",
    "读取设备参数": "readParam",
    "写入机号": "writeDevice",
    "系统创建设备": "initDevice",
    "平台创建设备": "createDevice",
    "设备上网": "connectDevice",
    "平台读取设备": "readDevice",
    "平台删除设备": "deleteDevice",
    "写入参数": "writeParam",
    "打印标签": "printDevice",







}

/**
 * 
 * @param {功能测试属性字典} props 
 */
const functionParams = {
    "一档水淹": "water",
    "二档水淹": "water1",
    "三挡水淹": "water2",
    "振动测试": "shake",




}


/**
 * 
 * @param {自定义的状态颜色组件}} StateIcon 
 */
const StateIcon = (props) => {
    if (props.state == 'success' || props.state == true) {
        return (
            <span className={globalStyles.success}>
                成功
            </span>
        )
    } else {
        return (
            <Tooltip title={props.children}>
                <span className={styles.textStyle}>{props.children}</span>
            </Tooltip>

        )
    }

}

/**
 * 
 * @param {自定义的标题状态颜色}} TitleComponent 
 */
const TitleComponent = ({ ip, state, allowToStop, handleSingleEnd }) => {

    const handleStateColor = (state) => {
        console.log("state", state)
        if (state == '测试成功') {
            return 'successState'
        } else if (state == '进行中') {
            return 'movingState'
        } else {
            return 'errorState'
        }
    }

    return (
        <div className={styles.TitleComponent}>
            <div className={styles.ipTitle}>
                <span>{`IP:${ip} `}</span>
                <span className={styles[handleStateColor(state)]}>{state}</span>
            </div>
            <div style={{ marginTop: "-17px" }}>
                <Button danger type="primary" disabled={!allowToStop} onClick={handleSingleEnd}>停止测试</Button>
            </div>
        </div>

    )
}
const RenderEquip = (props) => {
    let { equipData, state, ip, typeId, port } = props
    const [allowToStop, handleAllowToStop] = useState(false)

    const handleSingleEnd = async () => {
        await singleEndTest({ port, typeId, ip })
    }
    useEffect(() => {
        if ((equipData.useTimeStamp / 1000) > 120) {
            handleAllowToStop(true)

        } else {
            handleAllowToStop(false)
        }
    })

    return (
        <div className={styles.table}>
            <Card >

                <Descriptions title={<TitleComponent ip={ip} state={state} handleSingleEnd={handleSingleEnd} allowToStop={allowToStop}></TitleComponent>} bordered column={2} size="small">
                    <Descriptions.Item label="测试时间">{equipData.useTimeStamp / 1000}</Descriptions.Item>
                    {
                        Object.keys(equipKeyDict).map(key => {

                            return (
                                <Descriptions.Item label={key}>
                                    <StateIcon state={equipData.testTarget[equipKeyDict[key]]}>
                                        {equipData.testTarget[equipKeyDict[key]]}
                                    </StateIcon>
                                </Descriptions.Item>
                            )
                        })
                    }
                    <Descriptions.Item>

                    </Descriptions.Item>
                    <Descriptions.Item label="功能测试" span={2}>
                        <p style={{marginBottom:"-5px",fontWeight:"bold",fontSize:"1.2em"}}>{equipData.testTarget.functionTesting}</p>
                    </Descriptions.Item>
                    {
                        Object.keys(functionParams).map(key => {

                            return (
                                <Descriptions.Item label={key}>
                                    <StateIcon state={equipData.testTarget.functionParam[functionParams[key]]}>
                                        {equipData.testTarget.functionParam[equipKeyDict[key]]}
                                    </StateIcon>
                                </Descriptions.Item>
                            )
                        })
                    }


                    <Descriptions.Item label="设备属性" span={2}>
                        <Tooltip title={JSON.stringify(equipData.testTarget.readParams)}>
                            <Input value={JSON.stringify(equipData.testTarget.readParams)}></Input>
                        </Tooltip>

                    </Descriptions.Item>
                    <Descriptions.Item label="设备写入属性" span={2}>
                        <Tooltip title={JSON.stringify(equipData.testTarget.writeParams)}>
                            <Input value={JSON.stringify(equipData.testTarget.writeParams)}></Input>
                        </Tooltip>
                    </Descriptions.Item>

                </Descriptions>
                <TextArea allowClear value={equipData.comInfo} />
            </Card>
        </div>
    )
}

const TableDetails = props => {

    const { ip, equipData, port, typeId } = props
    const [state, handleState] = useState('')

    useEffect(() => {
        console.log("6666")
        console.log("ip,  equipData", ip, equipData)
        if (ip && equipData) {
            if (equipData.success == 'success') {
                handleState("测试成功")
            } else if (!equipData.success) {
                handleState("进行中")
            } else {
                handleState("测试错误")
            }

        }

    })
    if (typeof props.equipData == 'object') {
        return <RenderEquip equipData={equipData} state={state} ip={ip} port={port} typeId={typeId}></RenderEquip>
    } else {
        return (
            <div className={styles.table}>
                <Card>
                    <div className={styles.ipTitle}>
                        {`IP：${ip}`}
                    </div>
                    <Result
                        status="warning"
                        title='无数据'

                    />

                </Card>
            </div>
        )
    }

}


export default TableDetails 