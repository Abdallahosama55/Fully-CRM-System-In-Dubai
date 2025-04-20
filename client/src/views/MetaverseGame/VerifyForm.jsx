import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useRef } from "react";

const VerifyForm = ({ onVerified, onCloseVerify }) => {
  const [form] = Form.useForm();
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const onVerify = (values) => {
    onVerified(Object.values(values).join("") || "");
  };

  // Function to focus on the next input field
  const focusNextInput = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Function to focus on the previous input field
  const focusPrevInput = (index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleCloseVerify = () => {
    form.resetFields();
    onCloseVerify();
  };

  return (
    <Row className="flex-column">
      <Col span={24}>
        <ArrowLeftOutlined className="clickable" onClick={handleCloseVerify} />
      </Col>
      <Col
        className="d-flex justify-center align-center flex-column"
        style={{ padding: "32px 0 16px 0" }}>
        <Typography.Text style={{ fontWeight: "bold" }}>Sign Up</Typography.Text>
        <Typography.Text style={{ color: "gray" }}>
          Verification number sent via email, please enter below
        </Typography.Text>
      </Col>
      <Col>
        <Form form={form} onFinish={onVerify} layout="vertical" className="join-meet-form">
          <Row>
            <Col span={24} className="d-flex align-center justify-center">
              {[1, 2, 3, 4].map((index) => (
                <Form.Item
                  key={index}
                  name={`code${index}`}
                  className="otp-input"
                  style={{ width: "40px", marginLeft: index !== 1 && "8px" }}
                  rules={[{ required: true, message: "" }]}>
                  <Input
                    ref={inputRefs[index - 1]} // Assign the ref to the input field
                    maxLength={1}
                    onChange={(e) => {
                      const value = e.target.value;
                      const isEmpty = value === "";
                      const isBackspace = e.nativeEvent.inputType === "deleteContentBackward";
                      if (isEmpty && isBackspace) {
                        focusPrevInput(index - 1);
                      } else {
                        focusNextInput(index - 1);
                      }
                    }}
                  />
                </Form.Item>
              ))}
            </Col>
          </Row>
          <Form.Item>
            <Row>
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  background: "#3A5EE3",
                  paddingInline: "1.5rem",
                  width: "100%",
                }}>
                Sign Up
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default VerifyForm;
