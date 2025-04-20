import { useContext, useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNotification } from "context/notificationContext";

import UserContext from "context/userContext";
import AuthService from "services/auth.service";

import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function SignupEmployee({ setActiveTab }) {
  const { openNotificationWithIcon } = useNotification();

  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { liveId } = useParams();
  const signUp = async (values) => {
    setLoading(true);
    const { confirmPassword, ...data } = values;
    const queryParams = new URLSearchParams(location.search);
    const link = queryParams.get("redirectUrl") || "/";
    try {
      const {
        data: { data: user },
      } = await AuthService.signupEmployee(data);

      // localStorage.setItem("vverse-token", user.customerWebDashboardAccessToken);
      localStorage.setItem("vindo-token", user.vindoWebDashboardAccessToken);
      localStorage.setItem("time-zone", user.timeZone);
      // FirebaseAuthState(user?.firebaseToken);
      axios.defaults.headers.authorization = user.vindoWebDashboardAccessToken;
      setUser(user);
      if (queryParams.get("token") && liveId) {
        navigate(
          {
            pathname: "/live-admin/" + liveId + "?token=" + queryParams.get("token"),
          },
          {
            replace: true,
          },
        );
      } else navigate(link);
    } catch (error) {
      var { errors } = error?.response.data;
      openNotificationWithIcon("error", errors[0]);
      // axiosCatch(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Form form={form} layout="vertical" onFinish={signUp} requiredMark={false}>
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
              label={<Typography.Text className="fz-16 fw-500 gc">Email</Typography.Text>}
              className="w-100">
              <Input type="email" placeholder="Enter your email" className="login-inputs" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please Enter Full Name",
                },
              ]}
              label={<Typography.Text className="fz-16 fw-500 gc">Full Name</Typography.Text>}
              className="w-100">
              <Input placeholder="Enter Full name" className="login-inputs" />
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
              label={<Typography.Text className="fz-16 fw-500 gc">Password</Typography.Text>}
              className="w-100">
              <Input.Password placeholder="Enter your password" className="login-inputs" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="confirmedPassword"
              label={
                <Typography.Text className="fz-16 fw-500 gc">Confirm Password</Typography.Text>
              }
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please Enter Confirm Password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords that you entered do not match!"),
                    );
                  },
                }),
              ]}
              className="w-100">
              <Input.Password placeholder="Confirm your password" className="login-inputs" />
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
                Sign Up
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
