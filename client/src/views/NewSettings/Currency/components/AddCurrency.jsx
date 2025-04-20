import { Button, Form, Input, Select, Space, Typography } from "antd";
import Item from "antd/es/list/Item";
import Box from "components/Box";
import React from "react";
const AddCurrency = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Typography.Title level={5}>Add Currency</Typography.Title>
      <Space
        size={[24, 24]}
        className="w-100 "
        style={{ justifyContent: "space-between", height: "calc(100vh - 100px)" }}
        direction="vertical">
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name">
            <Input placeholder="Enter currency name" />
          </Form.Item>
          <Form.Item name="currency" label="Currency">
            <Select placeholder="Select currency" options={[]} />
          </Form.Item>
        </Form>
        <Box sx={{ width: "100%", paddingInline: "24px" }}>
          <Button className="w-100" type="primary">
            Save
          </Button>
        </Box>
      </Space>{" "}
    </>
  );
};

export default AddCurrency;
