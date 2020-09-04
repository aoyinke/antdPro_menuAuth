import React from 'react';
import { Descriptions, Card } from 'antd';
import { dict } from '../../_config'

const InfoHeader = props => {

    const { info } = props
    const newKey = ["heart_num", "heart_error_num", "heart_repeat_error_num", "shake", "water", "water1", "water2"]
    return (
        info ? <Card>
            <Descriptions
                bordered
                column={7}
                size="small"
            >
                {
                    newKey.map(key => {
                        if (dict.hasOwnProperty(key)) {
                            if (info[key] || info[key] === 0) {
                                return <Descriptions.Item label={dict[key]}>{info[key]}</Descriptions.Item>
                            }

                        }
                        return <></>

                    })
                }


            </Descriptions>
        </Card > : <></>
    )
}


export default React.memo(InfoHeader)