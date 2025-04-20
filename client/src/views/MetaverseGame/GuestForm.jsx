import { Avatar, Button, Col, Form, Input, Row, Typography } from "antd";
import joinAvatar from "assets/images/JoinMeetingAvatar.png";
import UserSolidSVG from "assets/jsx-svg/UserSolidSVG";

const GuestForm = ({ isLoading, onLogin }) => {
  const [form] = Form.useForm();

  const onLoginFinished = (values) => {
    onLogin(values);
  };

  return (
    <Row className="flex-column">
      <Col
        className="d-flex justify-center align-center flex-column"
        style={{ padding: "32px 0 16px 0" }}>
        <Typography.Text style={{ fontWeight: "bold" }}>Guest</Typography.Text>
        <Typography.Text style={{ color: "gray" }}>I'm just looking around</Typography.Text>
      </Col>
      <Col>
        <Form form={form} onFinish={onLoginFinished} layout="vertical" className="join-meet-form">
          <Row>
            <Col xs={24} style={{ marginBottom: 16 }}>
              <Row justify="center">
                <Avatar src={joinAvatar} className="join-meet-img" />
              </Row>
            </Col>
            <Col span={24}>
              <Form.Item
                name="name"
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
                Join
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default GuestForm;
