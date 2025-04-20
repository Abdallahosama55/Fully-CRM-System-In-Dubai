import { Col, Form, Input, Row } from "antd";
import Box from "components/Box";
import { useImperativeHandle } from "react";
import Footer from "./Footer";
import PhoneNumberInputObjectValue from "components/common/PhoneNumberInputObjectValue";
const ContactDetails = ({ onClose, next, onSubmit, isLoading, formRef, prev }) => {
  const [form] = Form.useForm();
  const handleOnSave = (data) => {
    onSubmit(data);
  };
  const onPrevious = async () => {
    await form.validateFields();
    prev(form.getFieldValue());
  };
  useImperativeHandle(formRef, () => ({
    valid: valid,
  }));
  const valid = async () => {
    await form.validateFields();
    return form.getFieldValue();
  };
  const onNext = async () => {
    await form.validateFields();
    next(form.getFieldValue());
  };
  return (
    <Box
      sx={{
        marginTop: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <Form
        form={form}
        onFinish={handleOnSave}
        size={"small"}
        layout="vertical"
        labelAlign="left"
        colon={false}
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 23,
        }}>
        <Row>
          <ContentDetailsFields />
        </Row>
      </Form>
      <Footer
        isLoading={isLoading}
        onCancel={onClose}
        onNext={onNext}
        onSave={() => form.submit()}
        onPrevious={onPrevious}></Footer>
    </Box>
  );
};
export const ContentDetailsFields = ({ column = 24 / 3 }) => {
  return (
    <>
      <Col span={column}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}>
          <Input placeholder="Write here" />
        </Form.Item>
      </Col>
      <Col span={column}>
        <Form.Item name={"telephone"} label="Phone Number">
          <Input placeholder="Write Here" />
        </Form.Item>
      </Col>
      <Col span={column}>
        <Box
          sx={{
            ".react-tel-input .form-control": {
              padding: "6.5px 14px 6.5px 60px",
              borderRadius: "6px",
            },
            ".custom-phone": {
              height: "33px",
            },
          }}>
          <Form.Item
            name={"mobile"}
            label="Mobile Number"
            rules={[
              {
                required: false,
              },
            ]}>
            <PhoneNumberInputObjectValue />
          </Form.Item>
        </Box>
      </Col>
    </>
  );
};
export default ContactDetails;
