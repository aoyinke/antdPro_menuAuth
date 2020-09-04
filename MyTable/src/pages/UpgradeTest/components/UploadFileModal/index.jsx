import React, { useState } from 'react'
import { connect } from 'umi';
import { Form, Input, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import CreateUploadFileModal from '@/components/createInfoModal'
import globalStyles from '@/global.less'
import { uploadUpgradeFile } from '../../service'

const { Dragger } = Upload;

const UploadFileModal = (props) => {

    const [uploadFile, handleUploadFile] = useState(null)
    const { uploadFileModalVisible } = props
    const { dispatch } = props

    const uploadProps = {
        name: "file",
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },
        beforeUpload: (file) => {

            handleUploadFile(() => file)
            return false
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    const onFinish = async (values) => {
        const formData = new FormData()
        formData.append('file', uploadFile)
        const res = await uploadUpgradeFile({ file: formData, version: values.version })
        if (res.code === 200) {
            message.success("测试文件上传成功")
            dispatch({
                type: "UpgradeTestModel/changeUploadFileModalVisible",
                payload: false
            })
        } else {
            message.success(`测试文件上传失败${res.message || res.code}`)
        }
    }
    return (
        <CreateUploadFileModal
            title="上传升级测试文件"
            onCancel={() => {
                dispatch({
                    type: "UpgradeTestModel/changeUploadFileModalVisible",
                    payload: false
                })
            }}
            modalVisible={uploadFileModalVisible}
        >
            <Form
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item
                    label="版本号"
                    name="version"
                    rules={[
                        {
                            required: true,
                            message: '请输入版本号',
                        },
                        {
                            message: '只能输入数字',
                            pattern: /^[0-9]+$/
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖拽进行上传</p>

                    </Dragger>
                </Form.Item>

                <Form.Item >
                    <div className={globalStyles.flexCenter}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </div>


                </Form.Item>
            </Form>
        </CreateUploadFileModal >
    )

}


export default connect(({ UpgradeTestModel }) => ({
    uploadFileModalVisible: UpgradeTestModel.uploadFileModalVisible,
}))(React.memo(UploadFileModal))