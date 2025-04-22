import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { ArrowDownSVG } from "assets/jsx-svg";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import UploadInput from "components/common/UploadInput";
import React from "react";
import { TRAVEL_API_URL } from "services/travel/config";

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
      <Form
        form={form}
        onFinish={(values) => {
          handelFinish({ ...values, image: values?.image?.link });
          form.resetFields();
        }}
        layout="vertical">
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
          <Col span={24}>
            <Form.Item
              name={"image"}
              label={"Cover image"}
              rules={[{ required: true, message: "cover image is required" }]}>
              <UploadInput
                action={TRAVEL_API_URL + "common/add-image"}
                name={"image"}
                maxText="1000 X 1000"
                maxHeight={"150px"}
                imagePreviwSize="150px"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NewQuotationModal;
