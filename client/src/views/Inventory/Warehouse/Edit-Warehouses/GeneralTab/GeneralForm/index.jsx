import { Form, Input } from "antd";

export default function GeneralForm({ lang, warehousesdata, required }) {
  return (
    <section className="general-form">
      <Form.Item
        name={`warehousesName${lang}`}
        label="Warehouses Name"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} warehouse name`,
          },
        ]}
        initialValue={warehousesdata?.name}>
        <Input placeholder="Enter warehouses name" />
      </Form.Item>

      <Form.Item
        name={`description${lang}`}
        label="Warehouses  description"
        initialValue={warehousesdata?.description}
        rules={[
          {
            required: required,
            message: `Please enter ${lang} warehouse description`,
          },
        ]}>
        <Input.TextArea rows={8} placeholder="Enter warehouses description" />
      </Form.Item>

      <Form.Item
        initialValue={warehousesdata?.location}
        name={`warehousesLocation${lang}`}
        label="Warehouses Location">
        <Input placeholder="Enter Warehouses location" />
      </Form.Item>

      <Form.Item
        initialValue={warehousesdata?.metaTagTitle}
        name={`metaTagTitle${lang}`}
        label="Meta tag title">
        <Input placeholder="Enter meta tag title" />
      </Form.Item>

      <Form.Item
        initialValue={warehousesdata?.metaTagDescription}
        name={`metaTagDescription${lang}`}
        label="Meta tag description">
        <Input.TextArea placeholder="Enter meta tag description" rows={6} />
      </Form.Item>

      <Form.Item
        initialValue={warehousesdata?.metaTagKeywords}
        name={`metaTagKeyword${lang}`}
        label="Meta tag keywords">
        <Input.TextArea placeholder="Enter meta tag keywords" rows={4} />
      </Form.Item>
    </section>
  );
}
