import { Form, Input } from "antd";

export default function GeneralForm({ lang, required }) {
  return (
    <section className="general-form">
      <Form.Item
        name={`brandsName${lang}`}
        label="Brand Name"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} brands name`,
          },
        ]}>
        <Input placeholder="Enter brands name" />
      </Form.Item>

      <Form.Item
        name={`description${lang}`}
        label="Brand  description"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} brands description`,
          },
        ]}>
        <Input.TextArea rows={8} placeholder="Enter brands description" />
      </Form.Item>

      <Form.Item name={`metaTagTitle${lang}`} label="Meta tag title">
        <Input placeholder="Enter meta tag title" />
      </Form.Item>

      <Form.Item name={`metaTagDescription${lang}`} label="Meta tag description">
        <Input.TextArea placeholder="Enter meta tag description" rows={6} />
      </Form.Item>

      <Form.Item name={`metaTagKeyword${lang}`} label="Meta tag keywords">
        <Input.TextArea placeholder="Enter meta tag keywords" rows={4} />
      </Form.Item>
    </section>
  );
}
