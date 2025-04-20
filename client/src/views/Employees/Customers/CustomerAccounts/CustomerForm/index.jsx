import { Col, Drawer, Form, Input, Row, Select } from "antd";

import "./styles.css";
import TextArea from "antd/es/input/TextArea";

const NewCustomer = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const cancel = (e) => {
    e.preventDefault();
    onClose();
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="DeskQueue">
      <Drawer
        rootClassName="new-customer"
        title={
          <>
            <div>Create Customers Account</div>
          </>
        }
        width={"32%"}
        onClose={onClose}
        open={open}
      >
        <Form
          onFinish={onFinish}
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          className="form"
        >
          <div>
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                  {
                    value: "4",
                    label: "Identified",
                  },
                  {
                    value: "5",
                    label: "Resolved",
                  },
                  {
                    value: "6",
                    label: "Cancelled",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="contactName"
              label="Contact Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Email"
              label="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <Row justify={"end"} gutter={[16, 0]}>
            <button onClick={(e) => cancel(e)} className="cancel">
              Cancel
            </button>
            <button className="add">Create</button>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};
export default NewCustomer;
