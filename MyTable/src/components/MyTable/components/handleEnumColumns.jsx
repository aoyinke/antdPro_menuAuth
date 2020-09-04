import React from 'react'
import { CheckCircleTwoTone, StopOutlined,LoadingOutlined,MinusCircleFilled } from '@ant-design/icons';


const EnumRender = (props) => {

    const { text, record, index, valueEnum } = props
    const enumItem = valueEnum[text]
    if (enumItem) {
        if (enumItem.hasOwnProperty("status")) {
            if (enumItem.status === "Success") {
                return (
                    <div>
                        <span style={{marginRight:"6px"}}>  
                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                        </span>
                        {enumItem.text}                    
                    </div>
                )
            }
            if ((enumItem.status === "Error")) {
                return (
                    <div>
                        <span style={{marginRight:"6px"}}>
                            <StopOutlined style={{ color: "#ff4d4f" }} />
                        </span>
                        {enumItem.text}                    
                    </div>
                )
            }
            if ((enumItem.status === "Processing")) {
                return (
                    <div>
                        <span style={{marginRight:"6px"}}>
                            <LoadingOutlined style={{ color: "gold" }} />
                        </span>
                        {enumItem.text}                   
                     </div>
                )
            }
            if ((enumItem.status === "Waiting")) {
                return (
                    <div>
                        <span style={{marginRight:"6px"}}>
                            <MinusCircleFilled style={{ color: "#1890ff" }} />
                        </span>
                        {enumItem.text}                   
                     </div>
                )
            }
        } else {
            return (
                <div>
                    {enumItem.text}
                </div>
            )
        }
    }

}

export default React.memo(EnumRender)