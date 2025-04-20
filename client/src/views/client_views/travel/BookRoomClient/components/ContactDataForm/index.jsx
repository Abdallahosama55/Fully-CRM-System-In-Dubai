import { Col, Form, Input, Row } from 'antd'
import { InfoSVG } from 'assets/jsx-svg'
import PhoneNumberInput from 'components/common/PhoneNumberInput'
import React from 'react'

const ContactDataForm = () => {
    return (
        <Row gutter={[12, 12]}>
            <Col md={12} xs={24}>
                <Form.Item
                    name="holderEmail"
                    label="Email"
                    rules={[{ required: true, message: "Enter contact email" }]}
                    extra={<p className="d-flex" style={{ gap: "6px", alignItems: "center", marginTop: "0.2rem" }}>
                        <InfoSVG />
                        <span style={{ color: "#000" }}>Confirmation will be sent to this email address.</span>
                    </p>}
                >
                    <Input type="email" placeholder='Enter Email' />
                </Form.Item>
            </Col>
            <Col md={12} xs={24}>
                <Form.Item
                    name="holderMobile"
                    label="Phone"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (!value || !value?.length < 7) {
                                    return Promise.reject('Please enter a valid phone number');
                                }

                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <PhoneNumberInput />
                </Form.Item>
            </Col>
        </Row >

    )
}

export default ContactDataForm