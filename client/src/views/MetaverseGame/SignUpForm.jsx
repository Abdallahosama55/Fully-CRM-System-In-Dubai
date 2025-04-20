import { EyeFilled, MailFilled } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Form, Input, Row, Typography } from "antd";
import UserSolidSVG from "assets/jsx-svg/UserSolidSVG";
import joinAvatar from "assets/images/JoinMeetingAvatar.png";
import { useState } from "react";
import CommonService from "services/common.service";
import axios from "axios";
import VerifyForm from "./VerifyForm";
import { useNotification } from "context/notificationContext";

const SignUpForm = ({ onVerify, isVerifing, setIsVerifing }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState("");
  const { openNotificationWithIcon } = useNotification();

  const onSignUp = (values) => {
    setIsLoading(true);
    CommonService.signUpJoinMeeting(values)
      .then(({ data }) => {
        setUserToken(data.data.token);
        localStorage.setItem("vindo-token", data.data.token);
        localStorage.setItem("isCustomer", true);
        axios.defaults.headers.authorization = data.data.token;
        setIsVerifing(true);
      })
      .catch((err) => {
        openNotificationWithIcon("error", err?.response?.data?.errors[0]);
      })
      .finally(() => setIsLoading(false));
  };

  const handleVerify = (otp) => {
    onVerify(otp, userToken);
  };

  return (
    <Row className="flex-column">
      {isVerifing ? (
        <VerifyForm onVerified={handleVerify} onCloseVerify={() => setIsVerifing(false)} />
      ) : (
        <>
          <Row style={{ padding: "32px 0 16px 0" }}>
            <Col xs={12} style={{ marginBottom: 16 }}>
              <Row justify="center">
                <Avatar src={joinAvatar} className="join-meet-img" />
              </Row>
            </Col>
            <Col xs={12} className="d-flex justify-center align-center flex-column">
              <Typography.Text style={{ fontWeight: "bold" }}>Sign Up</Typography.Text>
              <Typography.Text style={{ color: "gray" }}>
                Sign up to enable the ultimate experience
              </Typography.Text>
            </Col>
          </Row>
          <Col>
            <Form form={form} onFinish={onSignUp} layout="vertical" className="join-meet-form">
              <Row>
                <Col span={11}>
                  <Form.Item
                    name="username"
                    label="Name"
                    className="w-100"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Name",
                      },
                    ]}>
                    <Input
                      placeholder="Your name"
                      type="text"
                      className="enter-name"
                      suffix={<UserSolidSVG width={10} />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 11, offset: 2 }}>
                  <Form.Item
                    name="email"
                    label="Email"
                    className="w-100"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Email",
                      },
                    ]}>
                    <Input
                      placeholder="Your email"
                      type="email"
                      className="enter-email"
                      suffix={<MailFilled />}
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    name="password"
                    label="Password"
                    className="w-100"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your password",
                      },
                    ]}>
                    <Input
                      placeholder="*************"
                      type="password"
                      className="enter-password"
                      suffix={<EyeFilled />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 11, offset: 2 }}>
                  <Form.Item
                    name="confirmedPassword"
                    label="Confirm Password"
                    className="w-100"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your password",
                      },
                    ]}>
                    <Input
                      placeholder="*************"
                      type="password"
                      className="enter-password"
                      suffix={<EyeFilled />}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Divider styl={{ margin: "16px 0" }} />
                </Col>
                <Col span={24}>
                  <Form.Item name="mobileNumber" label="Mobile Number" className="w-100">
                    <Input
                      placeholder="your mobile number"
                      type="mobile"
                      className="enter-mobile"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Row>
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{
                      background: "#3A5EE3",
                      paddingInline: "1.5rem",
                      width: "100%",
                    }}
                    loading={isLoading}>
                    Verify
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </>
      )}
    </Row>
  );
};

export default SignUpForm;
