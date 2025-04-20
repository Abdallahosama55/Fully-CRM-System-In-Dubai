import React, { useEffect } from 'react'
import { API_BASE } from 'services/config';

import { Col, Form, Input, Radio, Row } from 'antd'
import UploadImagesInput from 'components/common/UploadImagesInput';
const SliderForm = ({ form, data }) => {
    useEffect(() => {
        if (data?.id) {
            form.setFieldsValue(data);
        }
    }, [data, form])

    return (
        <Form form={form} layout='vertical'>
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
                                        return Promise.reject("Slider height must be at least 1px");
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                        label={"Slider height in pixels"}
                        initialValue={350}
                    >
                        <Input
                            type="number"
                            min={1}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="dotesPositioning"
                        label={"Slider pagination dots position"}
                        initialValue={"end"}
                    >
                        <Radio.Group>
                            <Radio value="no-dotes" style={{ margin: "0 2rem 0 0" }}>No dotes</Radio>
                            <Radio value="start">Start</Radio>
                            <Radio value="center">Center</Radio>
                            <Radio value="end">End</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="images"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (!value || value?.length < 1) {
                                        return Promise.reject("Please enter at least on image");
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                        label={"Slider images"}
                    >
                        <UploadImagesInput
                            action={API_BASE + `common/upload-file`}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form >
    )
}

export default SliderForm