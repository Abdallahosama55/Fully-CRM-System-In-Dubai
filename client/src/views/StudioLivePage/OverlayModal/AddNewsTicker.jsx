import { Col, ColorPicker, Form, Input, Radio, Row, Typography } from "antd";
import { ColorPickerSVG } from "assets/jsx-svg";

export default function AddNewsTicker({
  form,
  textColor,
  backgroundColor,
  setBackgroundColor,
  setTextColor,
}) {
  return (
    <Form form={form} layout="vertical" style={{ marginTop: "24px" }}>
      <Row>
        <Form.Item name="type">
          <Radio.Group defaultValue={1}>
            <Radio value={1}>Static</Radio>
            <Radio value={2}>DYNAMIC</Radio>
          </Radio.Group>
        </Form.Item>
      </Row>

      <Form.Item name="text" label="TICKER’S Text">
        <Input placeholder="write here" />
      </Form.Item>

      <Form.Item>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col>
            <Typography.Text>TEXT COLOR</Typography.Text>
          </Col>
          <Col>
            <ColorPicker onChange={(e) => setTextColor(e)}>
              <div
                className="color-picker-holder clickable center-items"
                style={{
                  backgroundColor:
                    typeof textColor === "string"
                      ? textColor
                      : textColor.toHexString(),
                }}
              >
                <ColorPickerSVG />
              </div>
            </ColorPicker>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col>
            <Typography.Text>Background COLOR</Typography.Text>
          </Col>
          <Col>
            <ColorPicker onChange={(e) => setBackgroundColor(e)}>
              <div
                className="color-picker-holder clickable center-items"
                style={{
                  backgroundColor:
                    typeof backgroundColor === "string"
                      ? backgroundColor
                      : backgroundColor.toHexString(),
                }}
              >
                <ColorPickerSVG />
              </div>
            </ColorPicker>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}
