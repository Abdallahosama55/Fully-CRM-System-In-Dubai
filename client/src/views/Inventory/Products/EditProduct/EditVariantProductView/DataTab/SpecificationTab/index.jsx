import { Form, InputNumber, Select } from "antd";

export default function SpecificationTab() {
  return (
    <section className="general-form">
      <Form.Item name="specificationLengthClass" label="Length Class">
        <Select placeholder="Select length class">
          <Select.Option value="M">M</Select.Option>
          <Select.Option value="Cm">Cm</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="specificationWeightClass" label="Weight Class">
        <Select placeholder="Select weight class">
          <Select.Option value="KG">KG</Select.Option>
          <Select.Option value="Gram">Gram</Select.Option>
        </Select>
      </Form.Item>

      {/* <Form.Item label="Shipping class" name="shippingClass">
        <Select placeholder="Select shipping class"></Select>
      </Form.Item> */}

      <Form.Item name="specificationSortOrder" label="Sort Order">
        <InputNumber className="w-100" min={1} placeholder="1" />
      </Form.Item>
    </section>
  );
}
