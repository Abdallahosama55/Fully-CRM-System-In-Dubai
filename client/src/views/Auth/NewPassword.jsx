import { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useSearchParams } from "react-router-dom";
import { axiosCatch } from "utils/axiosUtils";
import AuthService from "services/auth.service";
import { useNotification } from "context/notificationContext";

export default function NewPassword({ setActiveTab, code, email }) {
  const { openNotificationWithIcon } = useNotification();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [searchParam] = useSearchParams();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const token = searchParam.get("token");
      if (token) {
        await AuthService.completeSignup({
          token,
          password: values.password,
        });
        openNotificationWithIcon("success", "Sign-up Completed, Please Login");
      } else {
        await AuthService.verifyForgetPassword({
          email,
          code,
          password: values.password,
        });
        openNotificationWithIcon("success", "Password Has Been Successfully Recovered");
      }
      setActiveTab("login");
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container">
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Row className="mb-1">
          <Typography.Title level={4}>New Password</Typography.Title>
        </Row>

        <Row>
          <Typography.Text>
            Please enter a Password.
            <br /> In order to get in to your account.
          </Typography.Text>
        </Row>

        <Row style={{ margin: "40px 0" }} gutter={[0, 0]}>
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
              <Input type="password" placeholder="Password" className="login-inputs" />
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
              <Input type="password" placeholder="Confirm Password" className="login-inputs" />
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
              Log in
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
