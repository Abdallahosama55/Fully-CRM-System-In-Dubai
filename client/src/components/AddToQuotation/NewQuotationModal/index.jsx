import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { ArrowDownSVG } from "assets/jsx-svg";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import React from "react";

const NewQuotationModal = ({ isOpen, close, handelFinish, loading = false }) => {
  const [form] = useForm();

  return (
    <Modal
      width={600}
      open={isOpen}
      onCancel={close}
      onOk={form.submit}
      okButtonProps={{ loading: loading }}
      title={"New Quotation"}
      okText="Add Quotation">
      <Form form={form} onFinish={handelFinish} layout="vertical">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              name={"name"}
              label={"Quotation name"}
              rules={[{ required: true, message: "Quotation name is required" }]}>
              <Input placeholder="Quotation name" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name={"guestTitle"}
              label={"Guest Title"}
              rules={[{ required: true, message: "title is required" }]}>
              <Select
                suffixIcon={<ArrowDownSVG />}
                placeholder="title"
                options={[
                  {
                    label: "Mr",
                    value: "Mr",
                  },
                  {
                    label: "Mrs",
                    value: "Mrs",
                  },
                  {
                    label: "Ms",
                    value: "Ms",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name={"guestFirstName"}
              label={"First name"}
              rules={[{ required: true, message: "First name is required" }]}>
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name={"guestLastName"}
              label={"Last name"}
              rules={[{ required: true, message: "Last name is required" }]}>
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"guestEmail"}
              label={"Email"}
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter valid email" },
              ]}>
              <Input type="email" placeholder="email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"guestMobile"}
              label={"Phone"}
              rules={[{ required: true, message: "Phone name is required" }]}>
              <PhoneNumberInput />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewQuotationModal;
