import React from 'react'
import getBookingKeyInfo from '../../bookingKey.handel'
import { Col, DatePicker, Divider, Form, Input, Row, Select } from 'antd'
import dayjs from 'dayjs'
import { InfoSVG } from 'assets/jsx-svg'

const PassengersDataForm = ({ bookingKey }) => {
    return (
        <div>
            <Form.Item hidden initialValue={bookingKey} name={["rooms", 0, "bookingKey"]} />
            {
                [...new Array(getBookingKeyInfo(bookingKey).adults || 0)]?.map((_, index) => {
                    return <Row gutter={[12, 20]} key={index}>
                        <Form.Item
                            hidden
                            initialValue={"adult"}
                            name={["rooms", 0, "paxes", index, "type"]}
                        />
                        <Col span={24}>
                            <p className='fz-14 fw-600'>{index + 1}. Passenger (Adult)</p>
                        </Col>
                        {/* <Col md={4} xs={12}>
                            <Form.Item
                                name={["rooms", 0, "paxes", index, "salutation"]}
                                label="Title"
                                rules={[{ required: true, message: "Select salutation" }]}
                            >
                                <Select
                                    placeholder="Mr"
                                    options={[
                                        { label: "Mr", value: "Mr" },
                                        { label: "Mrs", value: "Mrs" },
                                    ]}
                                />
                            </Form.Item>
                        </Col> */}
                        <Col md={12} xs={24}>
                            <Form.Item
                                name={["rooms", 0, "paxes", index, "name"]}
                                label="First name"
                                rules={[{ required: true, message: "Enter first name" }]}
                            >
                                <Input
                                    placeholder="Enter First Name"
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                name={["rooms", 0, "paxes", index, "lastName"]}
                                label="Last name"
                                rules={[{ required: true, message: "Enter last name" }]}
                            >
                                <Input
                                    placeholder="Enter Last Name"
                                />
                            </Form.Item>
                        </Col>
                        {/* <Col md={5} xs={12}>
                            <Form.Item
                                name={["rooms", 0, "paxes", index, "dob"]}
                                label="Birth date"
                                rules={[{ required: true, message: "Enter Birth date" }]}
                            >
                                <DatePicker
                                    disabledDate={(current) => {
                                        return dayjs(current).isAfter(dayjs(new Date()))
                                    }}
                                    placeholder='YYYY-MM-DD'
                                    className='w-100'
                                />
                            </Form.Item>
                        </Col>
                        <Col md={5} xs={12}>
                            <Form.Item
                                name={["rooms", 0, "paxes", index, "nationality"]}
                                label="Nationality"
                                rules={[{ required: true, message: "Enter Nationality" }]}
                            >
                                <Select
                                    showSearch={true}
                                    placeholder="Palestinian"
                                    disabled={nationalitesQuery.isLoading}
                                    options={nationalitesQuery.data?.map(el => ({ label: el.nationality, value: el.nationality }))}
                                />
                            </Form.Item>
                        </Col> */}
                    </Row>
                })
            }

            {getBookingKeyInfo(bookingKey).childrenCount > 0 && <>
                <Divider />
                {
                    [...new Array(getBookingKeyInfo(bookingKey).childrenCount || 0)]?.map((_, index) => {
                        return <Row gutter={[12, 20]} key={index}>
                            <Form.Item
                                hidden
                                initialValue={"adult"}
                                name={["rooms", 0, "paxes", getBookingKeyInfo(bookingKey).adults + index, "type"]}
                            />
                            <Col span={24}>
                                <p className='fz-14 fw-600'>{getBookingKeyInfo(bookingKey).adults + index + 1}. Passenger (child)</p>
                            </Col>
                            {/* <Col md={4} xs={12}>
                                <Form.Item
                                    name={["rooms", 0, "paxes", getBookingKeyInfo(bookingKey).adults + index, "salutation"]}
                                    label="Title"
                                    rules={[{ required: true, message: "Select salutation" }]}
                                >
                                    <Select
                                        placeholder="Mr"
                                        options={[
                                            { label: "Boy", value: "Mr" },
                                            { label: "Girl", value: "Mrs" },
                                        ]}
                                    />
                                </Form.Item>
                            </Col> */}
                            <Col md={5} xs={12}>
                                <Form.Item
                                    name={["rooms", 0, "paxes", getBookingKeyInfo(bookingKey).adults + index, "name"]}
                                    label="First name"
                                    rules={[{ required: true, message: "Enter first name" }]}
                                >
                                    <Input
                                        placeholder="Enter First Name"
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={5} xs={12}>
                                <Form.Item
                                    name={["rooms", 0, "paxes", getBookingKeyInfo(bookingKey).adults + index, "lastName"]}
                                    label="Last name"
                                    rules={[{ required: true, message: "Enter last name" }]}
                                >
                                    <Input
                                        placeholder="Enter Last Name"
                                    />
                                </Form.Item>
                            </Col>
                            {/* <Col md={5} xs={12}>
                                <Form.Item
                                    name={["rooms", 0, "paxes", getBookingKeyInfo(bookingKey).adults + index, "dob"]}
                                    label="Birth date"
                                    rules={[{ required: true, message: "Enter Birth date" }]}
                                >
                                    <DatePicker
                                        disabledDate={(current) => {
                                            return current && current.isAfter(dayjs()) || current.isBefore(dayjs().subtract(18, 'year'), 'day');
                                        }}
                                        placeholder='YYYY-MM-DD'
                                        className='w-100'
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={5} xs={12}>
                                <Form.Item
                                    name={["rooms", 0, "paxes", getBookingKeyInfo(bookingKey).adults + index, "nationality"]}
                                    label="Nationality"
                                    rules={[{ required: true, message: "Enter Nationality" }]}
                                >
                                    <Select
                                        showSearch={true}
                                        placeholder="Palestinian"
                                        disabled={nationalitesQuery.isLoading}
                                        options={nationalitesQuery.data?.map(el => ({ label: el.nationality, value: el.nationality }))}
                                    />
                                </Form.Item>
                            </Col> */}
                        </Row>
                    })
                }
            </>}
            <p className="d-flex" style={{ gap: "6px", alignItems: "center" }}>
                <InfoSVG />
                <span>Use all given names and surnames exactly as they appear in your passport/iD to avoid boarding complications.</span>
            </p>
        </div>
    )
}

export default PassengersDataForm