import { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { axiosCatch } from "utils/axiosUtils";
import AuthService from "services/auth.service";
import { useNotification } from "context/notificationContext";

export default function SetPassword({ setActiveTab, email }) {
  const { openNotificationWithIcon } = useNotification();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await AuthService.verifyForgetPassword({
        email,
        code: values.code,
        password: values.password,
      });
      openNotificationWithIcon("success", "Password Has Been Successfully Recovered");
      setActiveTab("login");
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
    }
  };

  function truncateText(email) {
    var parts = email.split("@");
    var username = parts[0];
    var domain = parts[1];
    var replacedUsername = username.slice(0, 2) + "***" + username.slice(-2);
    var replacedEmail = replacedUsername + "@" + domain;
    return replacedEmail;
  }

  return (
    <div className="card-container">
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Row className="mb-1">
          <Typography.Title level={4}>Set New Password</Typography.Title>
        </Row>

        <Row>
          <Typography.Text>
            Please enter a Password.
            <br /> In order to get in to your account.
          </Typography.Text>
        </Row>

        <Row style={{ margin: "40px 0" }}>
          <Col span={24}>
            <Form.Item name="email" label="Email" className="w-100">
              <Input type="email" className="login-inputs" defaultValue={email} disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please Enter Password",
                },
              ]}
              className="w-100">
              <Input.Password type="password" placeholder="Password" className="login-inputs" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please Enter Exact Password",
                },
              ]}
              className="w-100">
              <Input.Password
                type="password"
                placeholder="Confirm Password"
                className="login-inputs"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                width: "170px",
                fontSize: "1rem",
                borderRadius: "14px",
              }}
              loading={loading}>
              Set
            </Button>
          </Form.Item>
        </Row>

        <Row style={{ marginTop: "40px" }}>
          <Typography.Text className="fz-12">
            Protected by reCAPTCHA and subject to the{" "}
            <span style={{ color: "#3A5EE3" }}>Vindo Privacy Policy</span> and{" "}
            <span style={{ color: "#3A5EE3" }}>Terms of Service.</span>
          </Typography.Text>
        </Row>
      </Form>
    </div>
  );
}
