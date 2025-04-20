import { Form, Input, Radio, Select } from "antd";
// style
import "./styles.css";
import { useParams } from "react-router-dom";
import allTimezones from "constants/TIME_ZONES";
import PhoneNumberInputObjectValue from "components/common/PhoneNumberInputObjectValue";
const ContactInfo = () => {
  const { id } = useParams();
  return (
    <div>
      <Form.Item name={["contact", "phone"]} label="Phone Number">
        <PhoneNumberInputObjectValue />
      </Form.Item>
      <Form.Item
        name={["contact", "email"]}
        label="Mail"
        rules={[{ required: true, message: "Please Enter Phone" }]}>
        <Input type="email" placeholder="Enter E-Mail" disabled={id ? true : false} />
      </Form.Item>
      <Form.Item name={["contact", "gender"]} label="Gender">
        <Radio.Group>
          <Radio value="M">Male</Radio>
          <Radio value="F">Female</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
};

export default ContactInfo;
