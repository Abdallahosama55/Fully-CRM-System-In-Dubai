import { Form, Input } from 'antd';

export default function ModelTab() {
  return (
    <section className="general-form">
      <Form.Item name="model" label="Model">
        <Input placeholder="Enter product model" />
      </Form.Item>

      <Form.Item name="sku" label="SKU (Stock Keeping Unit)">
        <Input placeholder="Enter product sku" />
      </Form.Item>

      <Form.Item name="location" label="Location">
        <Input placeholder="Enter product location" />
      </Form.Item>
    </section>
  );
}
