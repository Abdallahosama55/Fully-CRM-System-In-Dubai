import { useContext, useState } from "react";
import { Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import userContext from "context/userContext";
import AuthService from "services/auth.service";
import { axiosCatch } from "utils/axiosUtils";
import { useNotification } from "context/notificationContext";

import GoogleSVG from "assets/jsx-svg/GoogleSVG";
import AppleSVG from "assets/jsx-svg/AppleSVG";
import FacebookSVG from "assets/jsx-svg/FacebookSVG";

export default function Login({ setActiveTab }) {
  const { openNotificationWithIcon } = useNotification();

  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();

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
      localStorage.removeItem("isCustomer");
      localStorage.setItem("time-zone", user.timeZone);

      setUser(user);
      axios.defaults.headers.authorization = user.vindoWebDashboardAccessToken;
      navigate(decodeURIComponent(link));
    } catch (error) {
      openNotificationWithIcon("error", error?.response?.data?.errors[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-container">
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

        <Row justify="space-between" align="middle" style={{ marginTop: "24px" }}>
          <Col>
            <Typography.Text
              className="clickable"
              style={{ color: "#2D2D2D" }}
              onClick={() => setActiveTab("forgotPassword")}>
              Forgot your password?
            </Typography.Text>
          </Col>
          <Col>
            <Form.Item className="w-100">
              <Button loading={loading} type="primary" className="sign-in-btn" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Divider>
          <Typography.Text style={{ color: "#8E8E93" }}>or</Typography.Text>
        </Divider>

        <Row gutter={[0, 24]} className="mt-1">
          <Col xs={24}>
            <Row justify="center" gutter={[16, 16]}>
              <Col>
                <div className="login-icons">
                  <Row align="middle">
                    <FacebookSVG />
                  </Row>
                </div>
              </Col>
              <Col>
                <div className="login-icons">
                  <Row align="middle">
                    <GoogleSVG />
                  </Row>
                </div>
              </Col>
              <Col>
                <div className="login-icons">
                  <Row align="middle">
                    <AppleSVG />
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>
          {/* <Col xs={24}>
            <Row justify="center">
              <Typography.Text style={{ color: "#8E8E93" }}>
                Don't have an account?{" "}
                <span style={{ color: "#000" }} className="clickable">
                  Sign Up
                </span>
              </Typography.Text>
            </Row>
          </Col> */}
        </Row>

        <Row style={{ marginTop: "45px" }}>
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
