import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { LeftArrowSVG } from "assets/jsx-svg";

export default function EmbedLink({ setActiveBtn, fastboard }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await fastboard?.manager.addApp({
      kind: "EmbeddedPage",
      options: { title: "Embed" },
      attributes: {
        src: values.link,
      },
    });
    form.resetFields();
  };

  return (
    <Form
      onFinish={onFinish}
      requiredMark={false}
      form={form}
      layout="vertical"
      name="youtune"
    >
      <div className="clickable" onClick={() => setActiveBtn("participant")}>
        <Row wrap={false} gutter={[6, 0]} align="middle">
          <Col>
            <Row align="middle">
              <LeftArrowSVG
                color="#8E8E93"
                style={{ width: "14px", height: "14px" }}
              />
            </Row>
          </Col>
          <Col>
            <Typography.Text style={{ color: "#8E8E93" }}>Back</Typography.Text>
          </Col>
        </Row>
      </div>

      <Form.Item
        className="mt-1"
        label="Add Embed Link"
        name="link"
        rules={[
          {
            required: true,
            message: "Please Add Link",
          },
        ]}
      >
        <Input placeholder="Enter Here" />
      </Form.Item>

      <Row justify="end" className="mt-1">
        <Button htmlType="submit" type="primary">
          Open
        </Button>
      </Row>
    </Form>
  );
}
