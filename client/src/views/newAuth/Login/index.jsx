import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col, Flex } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";
import AuthService from "services/auth.service";

import "./styles.css";
import { useCompanyInfoContext } from "context/companyInfoContext";

const LogIn = () => {
  const { openNotificationWithIcon } = useNotification();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { name } = useCompanyInfoContext();

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
    <div className="login-container-card">
      <div className="login-title">
        Login to {""}
        <span>{name}</span> Dashboard
      </div>
      <Form
        onFinish={login}
        form={form}
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Row gutter={[16, 16]} className="login-checkbox-row">
          <Col>
            <Checkbox>Remember me</Checkbox>
          </Col>
          <Col>
            <Link to={`/new-forgot`} className="forgot">
              Forgot password
            </Link>
          </Col>
        </Row>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="w-100"
            style={{ background: "#9C25A0" }}>
            Sign In
          </Button>
        </Form.Item>
        <Flex justify="center" gap={16}>
          <div className="account">Don't have an account?</div>
          <Link to="/registration" className="register">
            Register
          </Link>
        </Flex>
      </Form>
    </div>
  );
};

export default LogIn;
