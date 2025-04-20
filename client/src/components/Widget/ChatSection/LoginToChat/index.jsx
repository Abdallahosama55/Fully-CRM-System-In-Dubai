import { Col, Form, Input, Row, Typography } from "antd";
import { BackArrow, LeftArrowSVG } from "assets/jsx-svg";

export default function LoginToChat({ setSelectedService, setUserData }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setUserData(values);
    console.log(values);
  };

  return (
    <>
      <div
        style={{ width: "18px" }}
        className="clickable"
        onClick={() => setSelectedService(null)}
      >
        <BackArrow color="#000" />
      </div>

      <Row justify="center" style={{ marginTop: "24px", textAlign: "center" }}>
        <Col xs={24}>
          <Typography.Text className="fw-500 fz-16">
            Let's Start
          </Typography.Text>
        </Col>
        <Col xs={24}>
          <Typography.Text style={{ color: "#8E8E93" }} className="fz-10">
            Please Share name and email to proceed
          </Typography.Text>
        </Col>
      </Row>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: "20px" }}
        className="widget-chat-login"
      >
        <Form.Item
          name="email"
          label="Enter Your E-mail"
          rules={[{ required: true, message: "Please Enter Email" }]}
        >
          <Input placeholder="ex: ahmed@gmail.com" />
        </Form.Item>
        <Form.Item name="name" label="Enter Your Name">
          <Input placeholder="ex: ahmed ali" />
        </Form.Item>

        <Form.Item style={{ marginTop: "20px" }}>
          <Row justify="end">
            <button className="start-btn">
              <LeftArrowSVG style={{ rotate: "180deg" }} />
            </button>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
