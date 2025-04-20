import { useEffect } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

export default function VerificationCode({ setActiveTab, email, setCode }) {
  const [form] = useForm();

  const onFinish = (values) => {
    let code = Object.values(values);
    setCode(code.join(""));
    setActiveTab("newPassword");
  };

  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    const [, fieldIndex] = name.split("-");

    // Check if they hit the max character length
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(fieldIndex, 10) < 4) {
        // Get the next input field
        const nextSibling = document.querySelector(
          `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`,
        );

        // If found, focus the next field
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }
  };

  const handleKeyDown = (event) => {
    const { name } = event.target;
    const [, fieldIndex] = name.split("-");

    if (event.key === "Backspace" || event.key === "Delete") {
      // Check if it's not the last input field
      if (parseInt(fieldIndex, 10) < 5) {
        form.setFieldValue(`numbr${parseInt(fieldIndex, 10)}`, "");

        const prevSibling = document.querySelector(
          `input[name=ssn-${parseInt(fieldIndex, 10) - 1}]`,
        );

        // If found, focus the next field
        if (prevSibling !== null) {
          // if (event.key === "Backspace") {
          setTimeout(() => {
            prevSibling.focus();
            prevSibling.select();
          }, 1);
        }
      }
    }
  };

  function truncateText(email) {
    var parts = email.split("@");
    var username = parts[0];
    var domain = parts[1];
    var replacedUsername = username.slice(0, 2) + "***" + username.slice(-2);
    var replacedEmail = replacedUsername + "@" + domain;
    return replacedEmail;
  }

  useEffect(() => {
    const pasteListner = window.document.addEventListener(
      "paste",
      function (evt) {
        const code = evt.clipboardData.getData("text/plain");
        if (code.length === 4) {
          code.split("").forEach((char, index) => {
            form.setFieldValue(`numbr${index + 1}`, char);
          });
        }
      },
    );

    return () => window.document.removeEventListener("paste", pasteListner);
  }, []);

  return (
    <div className="card-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Row className="mb-1">
          <Typography.Title level={4}>Forgot password</Typography.Title>
        </Row>

        <Row>
          <Typography.Text>
            Enter the 4 digit code sent to your email
            <br /> {truncateText(email)}
          </Typography.Text>
        </Row>

        <Row
          className="phone-ver-wrapper"
          wrap={false}
          style={{ margin: "50px 0" }}
        >
          <Col>
            <Form.Item
              name="numbr1"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Input
                maxLength={1}
                name="ssn-1"
                placeholder="•"
                className="phone-ver-input"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Form.Item>
          </Col>
          <Col>
            {" "}
            <Form.Item
              name="numbr2"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Input
                maxLength={1}
                placeholder="•"
                name="ssn-2"
                className="phone-ver-input"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="numbr3"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Input
                maxLength={1}
                placeholder="•"
                name="ssn-3"
                className="phone-ver-input"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Form.Item>
          </Col>
          <Col>
            {" "}
            <Form.Item
              name="numbr4"
              rules={[
                {
                  required: true,
                  message: false,
                },
              ]}
            >
              <Input
                maxLength={1}
                placeholder="•"
                name="ssn-4"
                className="phone-ver-input"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                width: "170px",
                fontSize: "1rem",
                borderRadius: "14px",
              }}
            >
              Next
            </Button>
          </Form.Item>
        </Row>

        <Row style={{ marginTop: "40px" }}>
          <Typography.Text className="fz-12">
            Protected by reCAPTCHA and subject to the{" "}
            <span style={{ color: "#3A5EE3" }}>Vindo Privacy Policy</span> and{" "}
            <span style={{ color: "#3A5EE3" }}>Terms of Service.</span>
          </Typography.Text>
        </Row>
      </Form>
    </div>
  );
}
