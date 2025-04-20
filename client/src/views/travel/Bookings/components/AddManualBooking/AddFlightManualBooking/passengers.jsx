import { Col, Form, Input, InputNumber, Row, Select, Typography } from "antd";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import React from "react";

const Passengers = ({ type, number }) => {
  return (
    <>
      <Typography.Title level={5}>
        {number} - {type}
      </Typography.Title>
      <Row gutter={[12, 12]}>
        <Col span={4}>
          <Form.Item
            name={["passengers", `${number}-${type}`.toUpperCase(), "type"]}
            hidden={true}
            initialValue={`${type}`.toUpperCase()}>
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={"MR"}
            name={["passengers", `${number}-${type}`.toUpperCase(), "title"]}
            label="title"
            rules={[{ required: true }]}>
            <Select
              placeholder="title"
              options={[
                { label: "Ms.", value: "MS" },
                { label: "Mr.", value: "MR" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name={["passengers", `${number}-${type}`.toUpperCase(), "firstName"]}
            label="First Name"
            rules={[{ required: true }]}>
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name={["passengers", `${number}-${type}`.toUpperCase(), "lastName"]}
            label="Last Name"
            rules={[{ required: true }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Form.Item
            name={["passengers", `${number}-${type}`.toUpperCase(), "email"]}
            label="email"
            rules={[{ required: true }, { type: "email", message: "Entar valid email" }]}>
            <Input type="email" placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={["passengers", `${number}-${type}`.toUpperCase(), "mobile"]}
            label="mobile"
            rules={[{ required: true }]}>
            <PhoneNumberInput />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <Form.Item
            name={["passengers", `${number}-${type}`.toUpperCase(), "age"]}
            label="age"
            rules={[{ required: true }]}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={["passengers", `${number}-${type}`.toUpperCase(), "passportId"]}
            label="passportId"
            rules={[{ required: true }]}>
            <Input placeholder="passportId" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={["passengers", `${number}-${type}`.toUpperCase(), "ticketNo"]}
            label="ticketNo"
            rules={[{ required: true }]}>
            <Input placeholder="ticketNo" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Passengers;
