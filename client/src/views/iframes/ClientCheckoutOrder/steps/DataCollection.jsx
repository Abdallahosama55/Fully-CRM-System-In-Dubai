import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import CountryInput from "components/common/CountryInput";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import React from "react";

const DataCollection = () => {
  return (
    <div>
      <Typography.Title level={4}>Enter Your Details</Typography.Title>
      <Divider />
      <Form.Item
        name={"name"}
        label={"Name"}
        rules={[{ required: true, message: "Name is required" }]}>
        <Input placeholder="name" />
      </Form.Item>
      <Form.Item
        name={"surname"}
        label={"Surname"}
        rules={[{ required: true, message: "Surname is required" }]}>
        <Input placeholder="surname" />
      </Form.Item>
      <Form.Item
        name={"email"}
        label={"Email"}
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Please enter a valid email" },
        ]}>
        <Input placeholder="tt@gmail.com" />
      </Form.Item>
      <Form.Item
        name={"mobile"}
        label={"Mobile"}
        rules={[{ required: true, message: "Mobile is required" }]}>
        <PhoneNumberInput />
      </Form.Item>
      <Form.Item
        name={"address1"}
        label={"Address 1"}
        rules={[{ required: true, message: "Address 1 is required" }]}>
        <Input placeholder="address" />
      </Form.Item>
      <Form.Item
        name={"address2"}
        label={"Address 2"}
        rules={[{ required: true, message: "Address 2 is required" }]}>
        <Input placeholder="address" />
      </Form.Item>
      <Form.Item
        name={"city"}
        label={"City"}
        rules={[{ required: true, message: "City is required" }]}>
        <Input placeholder="city" />
      </Form.Item>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name={"zipCode"}
            label={"Zip Code"}
            rules={[{ required: true, message: "Zip Code is required" }]}>
            <Input placeholder="zip code" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={"state"}
            label={"State"}
            rules={[{ required: true, message: "State is required" }]}>
            <Input placeholder="state" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name={"country"}
        label={"Country"}
        rules={[{ required: true, message: "Country is required" }]}>
        <CountryInput placeholder="country" />
      </Form.Item>
      <Button htmlType="submit" type="primary" block>
        Next
      </Button>
    </div>
  );
};

export default DataCollection;
