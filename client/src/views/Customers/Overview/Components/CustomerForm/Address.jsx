import { useImperativeHandle } from "react";
import { Col, Form, Input, Row } from "antd";
import Box from "components/Box";
import Footer from "./Footer";
import CountryInput from "components/common/CountryInput";
import CityInput from "components/common/CityInput";
const Address = ({ prev, next, onSubmit, isLoading, formRef }) => {
  const [form] = Form.useForm();
  const onFinish = (data) => {
    onSubmit({ ...data, city: data?.city ? data?.city?.city : "" });
    form.resetFields();
  };
  useImperativeHandle(formRef, () => ({
    valid: valid,
  }));
  const valid = async () => {
    await form.validateFields();
    return form.getFieldValue();
  };
  const onNext = () => {
    next(form.getFieldValue());
  };
  const onPrevious = () => {
    prev(form.getFieldValue());
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
        onFinish={onFinish}
        form={form}
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
          <AddressContent form={form} />
        </Row>
      </Form>
      <Footer
        isLoading={isLoading}
        onPrevious={onPrevious}
        onNext={onNext}
        onSave={() => {
          form.submit();
        }}></Footer>
    </Box>
  );
};
export const AddressContent = ({ columns = 12, streetColumn = 24, form }) => {
  return (
    <>
      <Col span={columns}>
        <Form.Item label="Country" name="countryCode">
          <CountryInput />
        </Form.Item>
      </Col>

      <Col span={columns}>
        <Form.Item label="City" name="city">
          <CityInput />
        </Form.Item>
      </Col>
      <Col span={columns}>
        <Form.Item label="Zip Code" name={"zipCode"}>
          <Input placeholder="Enter Zip Code" />
        </Form.Item>
      </Col>
      <Col span={streetColumn}>
        <Form.Item label="Street" name={"street"}>
          <Input placeholder="Enter Street" />
        </Form.Item>
      </Col>
    </>
  );
};
export default Address;
