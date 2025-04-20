import { Button, Col, Form, Input, Row, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
// style
import "./styles.css"
import UploadImage from 'components/UploadImage';
const MediaImageModal = ({ data, onDelete, onSave }) => {
    const [form] = Form.useForm();
    const [isCover, setIsCover] = useState(data.isCover);

    useEffect(() => {
        if (data) {
            setIsCover(data.isCover)
            form.setFieldsValue(data)
        }
    }, [data])

    const handelSave = (values) => {
        onSave({ ...data, ...values, isCover })
    }

    return <div className='media_modal'>
        <Typography.Paragraph className='text-center'>Select Cover Photo</Typography.Paragraph>
        <Form layout='vertical' form={form} onFinish={handelSave}>
            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <Form.Item name="url">
                        <UploadImage className="media_upload_input" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Caption" name="caption">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Alternate Text" name="alternateText">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Flags" name="flags">
                        <Select mode='tags' />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Button
                        style={{
                            background: "#FF0000",
                            color: "#fff"
                        }}
                        onClick={() => {
                            onDelete(data.id);
                        }}>Delete</Button>
                </Col>
                <Col span={8} className='center-items'>
                    <Button
                        style={{ background: "#E0E0E0" }}
                        disabled={isCover}
                        onClick={() => {
                            setIsCover(prev => !prev);
                        }}>Use A Cover Photo</Button>
                </Col>
                <Col span={8} className='justyify-end'>
                    <Button
                        style={{
                            background: "#272942",
                            color: "#fff",
                        }}
                        htmlType='submmit'
                    >Save</Button>
                </Col>
            </Row>
        </Form>
    </div>
}

export default MediaImageModal