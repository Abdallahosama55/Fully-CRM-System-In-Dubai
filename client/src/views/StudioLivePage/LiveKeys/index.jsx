import { YoutubeFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";

import "./styles.css";

export default function LiveKeys({ setStreamCrdential, dropdownRef, setOpen }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const regex = /^rtmp:\/\/a\.rtmp\.youtube\.com\/live2\/[A-Za-z0-9-]{24}$/;

    const streamCrdential = values.liveUrl + "/" + values.liveKey;

    if (regex.test(streamCrdential)) {
      setStreamCrdential([streamCrdential]);
      message.success(
        "Your credential has been added, The go live will stream to your url",
      );
      setOpen(false);
    } else {
      message.info("Please enter correct values");
    }
  };

  return (
    <div className="live-keys" ref={dropdownRef}>
      <Row align="middle" gutter={[8, 0]}>
        <Col>
          <Row align="middle">
            <YoutubeFilled style={{ color: "#f00", fontSize: "20px" }} />
          </Row>
        </Col>
        <Col>
          <Typography.Text className="fw-600">
            Add Your Stream Credential
          </Typography.Text>
        </Col>
      </Row>

      <Form
        className="mt-1"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item name="liveKey" label="Live Key">
          <Input.Password placeholder="Type here" />
        </Form.Item>
        <Form.Item name="liveUrl" label="Live URL">
          <Input placeholder="Type here" />
        </Form.Item>

        <Form.Item>
          <Row gutter={[12, 12]}>
            <Col xs={24} lg={12}>
              <Button
                className="w-100"
                onClick={() => {
                  form.resetFields();
                  setOpen(false);
                  setStreamCrdential(null);
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col xs={24} lg={12}>
              <Button className="w-100" type="primary" htmlType="submit">
                Done
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
}
