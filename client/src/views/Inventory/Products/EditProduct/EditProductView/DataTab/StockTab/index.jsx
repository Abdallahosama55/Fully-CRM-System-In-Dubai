import { useState } from "react";
import { Button, Col, DatePicker, Form, Image, InputNumber, Row } from "antd";
import Infinity from "assets/images/Infinity.png";

export default function StockTab({ form }) {
  const [stockQuantityLimit, setStockQuantityLimit] = useState(false);

  return (
    <section className="general-form">
      <Form.Item label="Quantity">
        <Row className="input-with-btn-row">
          <Col flex={1}>
            <Form.Item name="stockQuantityLimit" noStyle>
              <InputNumber
                className="input-with-btn w-100"
                placeholder="Enter number of quantity or Leave blank for unlimited"
                disabled={stockQuantityLimit}
                min={1}
                max={1000000}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              onClick={() => {
                form.setFieldValue("stockQuantityLimit", "");
                setStockQuantityLimit((prev) => !prev);
              }}
              className="big-input-btn-Infinity"
              style={{ background: stockQuantityLimit && "#D7DAE2" }}>
              <Row justify="center" align="middle">
                <Image src={Infinity} />
              </Row>
            </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item name="stockMinimumQuantity" label="Minimum Quantity">
        <InputNumber
          className="w-100"
          placeholder="Enter product minimum ordered amount"
          min={1}
          max={1000000}
        />
      </Form.Item>

      <Form.Item name="stockDateAvailable" label="Date Available">
        <DatePicker
          placeholder="Pick date from the calendar"
          // suffixIcon={<CalendarSVG />}
          style={{ width: "100%" }}
        />
      </Form.Item>
    </section>
  );
}
