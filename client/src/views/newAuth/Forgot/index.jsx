import { useState } from "react";
import { Form, Input, Button, Flex } from "antd";
import { Link } from "react-router-dom";

import AuthService from "services/auth.service";
import { useNotification } from "context/notificationContext";

import "./styles.css";

const Forgot = () => {
  const [loading, setLoading] = useState(false);
  const { openNotificationWithIcon } = useNotification();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await AuthService.forgetPassword({ email: values.email });
      openNotificationWithIcon("success", "An Email Has Been Sent Successfully");
    } catch (error) {
      openNotificationWithIcon("error", error?.response?.data?.errors[0]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="forgot-container-card">
      <div className="forgot-title">Forgot password?</div>
      <Form onFinish={onFinish} name="forgot" layout="vertical" initialValues={{ remember: true }}>
        <Form.Item
          label="Enter your email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-100"
            style={{ background: "#9C25A0" }}>
            Reset password
          </Button>
        </Form.Item>
        <Flex justify="center">
          <Link to={`/vbooking-login`} className="register">
            Back to login screen
          </Link>
        </Flex>
      </Form>
    </div>
  );
};

export default Forgot;
