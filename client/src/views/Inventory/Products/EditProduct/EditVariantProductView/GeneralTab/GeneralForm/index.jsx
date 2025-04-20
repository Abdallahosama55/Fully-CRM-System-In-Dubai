import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select } from "antd";
import AddProductButton from "components/common/AddProductButton";
import checkFileds from "utils/checkFields";

export default function GeneralForm({ required, form, lang, onClose }) {
  return (
    <section className="general-form">
      <Form.Item
        name={`productName${lang}`}
        label="Product Name"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} product name`,
          },
        ]}>
        <Input placeholder="Enter  product name" />
      </Form.Item>

      <Form.Item name={`shortDescription${lang}`} label="Product short description">
        <Input.TextArea rows={8} placeholder="Enter product short description" />
      </Form.Item>

      <Form.Item
        name={`description${lang}`}
        label="Product description"
        rules={[
          {
            required: required,
            message: `Please enter ${lang} product description`,
          },
        ]}>
        <Input.TextArea rows={8} placeholder="Enter product description" />
      </Form.Item>

      <Form.Item name={`productsTags${lang}`} label="Products tags">
        <Select placeholder="Type tag then press enter" open={false} mode="tags"></Select>
      </Form.Item>

      <Form.Item name={`tagTitle${lang}`} label="Meta tag title">
        <Input placeholder="Enter meta tag title" />
      </Form.Item>
      <Form.Item name={`tagDescription${lang}`} label="Meta tag description">
        <Input.TextArea placeholder="Enter meta tag description" rows={6} />
      </Form.Item>
      <Form.Item name={`customTab${lang}`} label="customTab">
        <Form.List name={`customTab${lang}`}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, i) => (
                <Row
                  key={i}
                  style={{ marginTop: i > 0 ? "10px" : undefined }}
                  align="middle"
                  gutter={[10, 0]}>
                  <Col span={7}>
                    <Form.Item
                      {...restField}
                      rules={[{ required: required, message: "Please enter title" }]}
                      name={[name, "title"]}>
                      <Input placeholder="title" />
                    </Form.Item>
                  </Col>
                  <Col span={23}>
                    <Form.Item
                      {...restField}
                      rules={[{ required: required, message: "Please description title" }]}
                      name={[name, "description"]}>
                      <Input.TextArea placeholder="description" />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Tabs
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Form.Item>
        <Row justify="end">
          <AddProductButton
            addName="Next"
            htmlType="submit"
            onClick={() => checkFileds(form)}
            cancel={onClose}
          />
        </Row>
      </Form.Item>
    </section>
  );
}
