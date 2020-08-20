import React, { useState, useEffect} from 'react';
import {
    Form,
    Input,

    Select,
    Button,
    message
} from 'antd';

const { Option } = Select;
import { connect } from 'umi'
import styles from './styles.less'



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};





const ModifyForm = props => {

    const [dictName, handleDictName] = useState('')
    const [currentType, handlecurrentType] = useState('')

    const [form] = Form.useForm();

    const { formData, rowData } = props
    const { onModifyForm } = props

    const handleEquipCategory = (updateData) => {
        updateData.testingParam = JSON.stringify(updateData.testingParams)

        return updateData
    }

    const onFormFinish = () => {
        console.log("rowData", rowData)
        let updateData = form.getFieldValue()
        if (Object.keys(updateData).length) {

            updateData.dictName = dictName
            updateData = Object.assign(rowData, updateData)
            if (currentType === 'EquipCategory') {
                updateData = handleEquipCategory(updateData)
            }
            console.log("updateData", updateData)

            onModifyForm(updateData)
        } else {
            message.error('并无修改任何数据');
        }
    };


    useEffect(() => {
        const { type, dictName } = formData
        if (type) {
            handlecurrentType(type)
        }
        if (dictName) {
            handleDictName(dictName)
        }
        console.log("formData", formData)
    }, [])





    return (
        <Form.Provider
            onFormFinish={onFormFinish}>
            <Form
                {...formItemLayout}
                form={form}
                name="modifyForm"
                onClick={() => { console.log("formData", formData) }}
                scrollToFirstError
            >
                {
                    Object.keys(formData).map(key => {
                        if (!formData[key].defaultValue) {
                            <Form.Item
                                name={key}
                                label={formData[key].zhName}
                                rules={[{ required: true }]}
                            >
                                <Input  />
                            </Form.Item>
                        }
                        if ((key === 'id') || (key === 'type') || (key === 'dictName')) {
                            return <></>
                        }
                        if (formData[key].hasOwnProperty('options')) {
                            return (
                                <Form.Item
                                    name={key}
                                    label={formData[key].zhName}
                                    rules={[{ required: true }]}
                                >
                                    <Select defaultValue={formData[key].defaultValue}>
                                        {
                                            Object.keys(formData[key].options).map(valueItem => {

                                                return (
                                                    <Option value={valueItem}>{formData[key].options[valueItem].text}</Option>
                                                )
                                            })
                                        }

                                    </Select>
                                </Form.Item>

                            )
                        }
                        return (
                            <Form.Item
                                name={key}
                                label={formData[key].zhName}
                                rules={[{ required: true }]}
                            >
                                <Input defaultValue={formData[key].defaultValue} />
                            </Form.Item>
                        )
                    })
                }


                <div className={styles.modifyBotton}>
                    <Button type="primary" onClick={onFormFinish}>确认修改</Button>
                </div>
            </Form>
        </Form.Provider>
    )
}

export default ModifyForm