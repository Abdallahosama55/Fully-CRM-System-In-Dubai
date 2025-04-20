import { Button, Input, Form, Row, Col } from "antd";
import { useNotification } from "context/notificationContext";
import React, { useEffect, useState } from "react";
import StoreService from "services/store.service";
import { axiosCatch } from "utils/axiosUtils";

function AddTax({ id, handleCancel, setRefresh, tabsData }) {
  const [loading, setLoading] = useState(false);
  const { openNotificationWithIcon } = useNotification();
  const [forms] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    if (id) {
      await StoreService.editTax(id, values);
      openNotificationWithIcon("success", "Edit  Tax  sucessfully");
    } else {
      try {
        await StoreService.addTax(values);
        openNotificationWithIcon("success", "add  Tax  sucessfully");
      } catch (error) {
        axiosCatch(error);
      }
    }
    handleCancel();
    forms.resetFields();
    setRefresh && setRefresh((prev) => !prev);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      forms.setFieldValue("name", tabsData.name);
      forms.setFieldValue("value", tabsData.value);
    }
  }, [forms, tabsData, id]);
  return (
    <Form form={forms} layout="vertical" name="basic" onFinish={onFinish}>
      <Form.Item label="name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="value" name="value" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Row justify="center">
        <Col>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default AddTax;
