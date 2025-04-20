import { Col, Form, Input, Row } from 'antd';
import UploadImage from 'components/common/UploadImage';
import React, { useEffect } from 'react'
import { API_BASE } from 'services/config';

const BannerForm = ({ form, data }) => {
    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data, form])

    return <Form form={form} layout='vertical'>
        <Row gutter={[8, 8]}>
            <Col span={24}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please enter section name" }]}
                    label={"Section name (will not appear to the end user)"}>
                    <Input
                        placeholder='section name'
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    name="height"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (value < 1) {
                                    return Promise.reject("Banner height must be at least 1px");
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                    label={"Banner height in pixels"}
                    initialValue={250}
                >
                    <Input
                        type="number"
                        min={1}
                    />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    name="link"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.reject("Banner link is required");
                                }

                                // Here, you can add custom validation logic.
                                // For example, you can check if the value is a valid URL.
                                const isValidUrl = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value);

                                if (!isValidUrl) {
                                    return Promise.reject("Please enter a valid URL for the banner link");
                                }

                                return Promise.resolve();
                            }
                        }
                    ]}
                    label={"Banner link"}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    name="image"
                    rules={[
                        {
                            validator: (_, value) => {
                                console.log(value)
                                if (!value) {
                                    return Promise.reject("Please enter banner image");
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                    label={"Banner image"}
                >
                    <UploadImage action={API_BASE + `common/upload-file`} />
                </Form.Item>
            </Col>
        </Row>
    </Form >
}

export default BannerForm