import { Form, Input } from "antd";

export default function GeneralForm({ lang, required }) {
  return (
    <section className="general-form">
      <Form.Item
        name={`categoreisName${lang}`}
        label="Category Name"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} Category name`,
          },
        ]}>
        <Input placeholder="Enter category name" />
      </Form.Item>

      <Form.Item
        name={`description${lang}`}
        label="Category  description"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} category description`,
          },
        ]}>
        <Input.TextArea rows={8} placeholder="Enter category description" />
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
