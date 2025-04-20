import { useContext, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import userContext from "context/userContext";
import AuthService from "services/auth.service";
import { axiosCatch } from "utils/axiosUtils";
import { useNotification } from "context/notificationContext";

export default function LoginEmployee({ setActiveTab }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { liveId } = useParams();
  const { openNotificationWithIcon } = useNotification();

  const login = async (values) => {
    setLoading(true);
    const { email, password } = values;
    const queryParams = new URLSearchParams(location.search);
    const link = queryParams.get("redirectUrl") || "/";
    try {
      const {
        data: { data: user },
      } = await AuthService.login({
        email: email,
        password: password,
      });
      localStorage.setItem("vindo-token", user.vindoWebDashboardAccessToken);
      setUser(user);
      axios.defaults.headers.authorization = user.vindoWebDashboardAccessToken;
      if (queryParams.get("token") && liveId) {
        navigate(
          {
            pathname: "/live-admin/" + liveId,
            search: {
              token: queryParams.get("token"),
            },
          },
          {
            replace: true,
          },
        );
      } else navigate(decodeURIComponent(link));
    } catch (error) {
      openNotificationWithIcon("error", error?.response?.data?.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Form form={form} layout="vertical" onFinish={login} requiredMark={false}>
        <Row>
          <Col xs={24}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please Enter E-mail",
                },
              ]}
              label="Email"
              className="w-100">
              <Input type="email" placeholder="Enter your email" className="login-inputs" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please Enter Password",
                },
              ]}
              label="Password"
              className="w-100">
              <Input.Password placeholder="Enter your password" className="login-inputs" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" align="middle" style={{ margin: "24px 0" }}>
          <Col xs={{ span: 9, offset: 15 }}>
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                className="sign-in-btn w-100"
                htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
