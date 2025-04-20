import { MailFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import UserSolidSVG from "assets/jsx-svg/UserSolidSVG";
import "./styles.css";
import { useSearchParams } from "react-router-dom";

export default function UserForm({ onConfirm, isLoading, aiAgent }) {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const textColor = searchParams.get("textColor");

  const onFinish = (values) => {
    onConfirm(values);
  };

  return (
    <Form className="w-100 h-100" onFinish={onFinish} layout="vertical" form={form}>
      <Row gutter={[0, 24]} className="w-100 h-100 flex-column">
        <Col>
          <Typography className="fz-16" style={{ fontWeight: 600 }}>
            Please enter details below
          </Typography>
        </Col>
        <Col>
          <Form.Item name="name" label="Your Name" rules={[{ required: true }]}>
            <Input
              type="text"
              placeholder="your name"
              suffix={<UserSolidSVG fill={textColor} width={16} />}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input type="email" placeholder="your email" suffix={<MailFilled width={16} />} />
          </Form.Item>
        </Col>
        <Col flex={1}>
          <Typography className="fz-12">
            By proceeding, you confirm that you have read and agree to Vindo’s Terms of Use and
            Privacy Notice.
          </Typography>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-100" loading={isLoading}>
              {aiAgent ? "Join AI Call" : "Schedule A Call"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
