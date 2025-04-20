import { EyeFilled, MailFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import UserSolidSVG from "assets/jsx-svg/UserSolidSVG";

const LoginForm = ({ isLoading, onLogin }) => {
  const [form] = Form.useForm();

  return (
    <Row className="flex-column">
      <Col
        className="d-flex justify-center align-center flex-column"
        style={{ padding: "32px 0 16px 0" }}>
        <Typography.Text style={{ fontWeight: "bold" }}>Login</Typography.Text>
        <Typography.Text style={{ color: "gray" }}>
          Please login to join the dimension
        </Typography.Text>
      </Col>
      <Col>
        <Form form={form} onFinish={onLogin} layout="vertical" className="join-meet-form">
          <Row>
            <Col span={24}>
              <Form.Item
                name="email"
                label="Username"
                className="w-100"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Your Username",
                  },
                ]}>
                <Input
                  placeholder="Your email"
                  type="email"
                  className="enter-name"
                  suffix={<UserSolidSVG width={10} />}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
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
                Login
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
