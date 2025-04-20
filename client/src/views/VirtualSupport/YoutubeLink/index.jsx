import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { LeftArrowSVG } from "assets/jsx-svg";

export default function YoutubeLink({ setActiveBtn, fastboard }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const pattern = new RegExp(
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
    );

    if (pattern.test(values.link)) {
      const regex = /[?&]v=([^&#]*)/;
      const videoId = values.link.match(regex);
      console.log(fastboard);
      await fastboard?.manager.addApp({
        kind: "Plyr",
        options: { title: "YouTube" },
        attributes: {
          src: `https://www.youtube.com/embed/${videoId[1]}`,
          provider: "youtube",
        },
      });
      form.resetFields();
    } else {
      message.error("test");
    }
  };

  return (
    <Form onFinish={onFinish} requiredMark={false} form={form} layout="vertical" name="youtune">
      <div className="clickable" onClick={() => setActiveBtn("participant")}>
        <Row wrap={false} gutter={[6, 0]} align="middle">
          <Col>
            <Row align="middle">
              <LeftArrowSVG color="#8E8E93" style={{ width: "14px", height: "14px" }} />
            </Row>
          </Col>
          <Col>
            <Typography.Text style={{ color: "#8E8E93" }}>Back</Typography.Text>
          </Col>
        </Row>
      </div>

      <Form.Item
        className="mt-1"
        label="Add Video Link"
        name="link"
        rules={[
          {
            required: true,
            message: "Please Add Link",
          },
        ]}>
        <Input placeholder="Enter Here" />
      </Form.Item>

      <Row justify="end" className="mt-1">
        <Button htmlType="submit" type="primary">
          Play
        </Button>
      </Row>
    </Form>
  );
}
