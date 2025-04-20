import { Form, Input } from "antd";

export default function GeneralForm({ lang, brandsdata, required }) {
  return (
    <section className="general-form">
      <Form.Item
        name={`brandsName${lang}`}
        label="Brand Name"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} Brand name`,
          },
        ]}
        initialValue={brandsdata?.name}>
        <Input placeholder="Enter brands name" />
      </Form.Item>

      <Form.Item
        name={`description${lang}`}
        label="Brand  description"
        initialValue={brandsdata?.description}
        rules={[
          {
            required: required,
            message: `Please enter ${lang} brand description`,
          },
        ]}>
        <Input.TextArea rows={8} placeholder="Enter brands description" />
      </Form.Item>

      <Form.Item
        initialValue={brandsdata?.metaTagTitle}
        name={`metaTagTitle${lang}`}
        label="Meta tag title">
        <Input placeholder="Enter meta tag title" />
      </Form.Item>

      <Form.Item
        initialValue={brandsdata?.metaTagDescription}
        name={`metaTagDescription${lang}`}
        label="Meta tag description">
        <Input.TextArea placeholder="Enter meta tag description" rows={6} />
      </Form.Item>

      <Form.Item
        initialValue={brandsdata?.metaTagKeywords}
        name={`metaTagKeyword${lang}`}
        label="Meta tag keywords">
        <Input.TextArea placeholder="Enter meta tag keywords" rows={4} />
      </Form.Item>
    </section>
  );
}
