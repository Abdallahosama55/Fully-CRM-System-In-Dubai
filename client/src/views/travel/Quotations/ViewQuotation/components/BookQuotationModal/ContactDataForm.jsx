import { Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Select } from "antd";
import { ArrowDownSVG } from "assets/jsx-svg";
import NationalityInput from "components/common/NationalityInput";
import PhoneNumberInput from "components/common/PhoneNumberInput";
import dayjs from "dayjs";
import React, { useEffect } from "react";
const disabledFutureDates = (current) => current && current > dayjs().endOf("day");
const disabledPastDates = (current) => current && current < dayjs().startOf("day");

const ContactDataForm = ({
  quotation,
  handelNext = () => {},
  handelPrev = () => {},
  inatialData = {},
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(inatialData);
  }, [inatialData]);

  const handelFinish = (values) => {
    console.log(values);
    handelNext(values);
  };

  return (
    <Form form={form} onFinish={handelFinish} layout="vertical">
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="holderFirstName"
            initialValue={quotation?.guestFirstName}
            rules={[{ required: true }]}>
            <Input placeholder="first name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="holderLastName"
            initialValue={quotation?.guestLastName}
            rules={[{ required: true }]}>
            <Input placeholder="last name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="holderEmail"
            initialValue={quotation?.guestEmail}
            rules={[{ type: "email", required: true }]}>
            <Input type="email" placeholder="email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Mobile"
            name="holderMobile"
            initialValue={quotation?.guestMobile}
            rules={[{ required: true }]}>
            <PhoneNumberInput />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Nationality"
            name="holderNationality"
            initialValue={"AE"}
            rules={[{ required: true }]}>
            <NationalityInput placeholder="nationality" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Gender" name="holderGender" rules={[{ required: true }]}>
            <Select
              placeholder="gender"
              suffixIcon={<ArrowDownSVG />}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Passport ID" name="holderPassportID" rules={[{ required: true }]}>
            <Input placeholder="passport ID" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Passport Expiry"
            name="holderPassportExpiry"
            rules={[{ required: true }]}
            initialValue={dayjs().add(2, "year")}>
            <DatePicker className="w-100" disabledDate={disabledPastDates} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Date of Birth"
            name="holderDateOfBirth"
            rules={[{ required: true }]}
            initialValue={dayjs().subtract(20, "year")}>
            <DatePicker className="w-100" disabledDate={disabledFutureDates} />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Flex align="center" justify="space-between">
        <Button onClick={() => handelPrev(form.getFieldsValue())}>Cancel</Button>
        <Button type={"primary"} onClick={() => form.submit()}>
          Next
        </Button>
      </Flex>
    </Form>
  );
};

export default ContactDataForm;
