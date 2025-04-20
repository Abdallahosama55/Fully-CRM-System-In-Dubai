import { Col, Form, InputNumber, Row, Select } from "antd";

export default function SpecificationTab({ virtual }) {
  return (
    <section className="general-form">
      {!virtual && (
        <>
          <Form.Item name="specificationLengthClass" label="Length Class">
            <Select placeholder="Select length class">
              <Select.Option value="M">M</Select.Option>
              <Select.Option value="Cm">Cm</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="dim" label="Dimensions (L X W X H)">
            <Row gutter={21} wrap={false}>
              <Col xs={8}>
                <Form.Item name="specificationLength" noStyle>
                  <InputNumber placeholder="Length" className="w-100" />
                </Form.Item>
              </Col>
              <Col xs={8}>
                <Form.Item name="specificationWidth" noStyle>
                  <InputNumber className="w-100" placeholder="Width" />
                </Form.Item>
              </Col>
              <Col xs={8}>
                <Form.Item name="specificationHeight" noStyle>
                  <InputNumber className="w-100" placeholder="Height" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item name="specificationWeightClass" label="Weight Class">
            <Select placeholder="Select weight class">
              <Select.Option value="KG">KG</Select.Option>
              <Select.Option value="Gram">Gram</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="specificationWeight" label="Weight">
            <InputNumber className="w-100" min={1} placeholder="Enter product weight" />
          </Form.Item>
        </>
      )}

      <Form.Item name="specificationSortOrder" label="Sort Order">
        <InputNumber className="w-100" min={1} max={1000000} placeholder="1" />
      </Form.Item>
    </section>
  );
}
