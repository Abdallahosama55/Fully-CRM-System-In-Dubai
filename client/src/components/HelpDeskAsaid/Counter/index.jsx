import { Button, Col, Form, Input, Row, Typography } from "antd";

import {
  AddSVG,
  CounterFileSVG,
  FullNameSVG,
  SignatureSVG,
} from "assets/jsx-svg";

import "./styles.css";
import { useSearchParams } from "react-router-dom";
import { push, ref, set } from "firebase/database";
import { useContext, useState } from "react";
import userContext from "context/userContext";
import dayjs from "dayjs";

export default function Counter({ db }) {
  const [form] = Form.useForm();
  const { user } = useContext(userContext);
  const [searchParams] = useSearchParams();
  const [selectedBtn, setSelectedBtn] = useState(0);

  const onCounterBtnClick = (id) => {
    setSelectedBtn(id);
    const chatId = searchParams.get("chatId");
    const chatRef = ref(
      db,
      `Company/${user.companyId}/chats/${chatId}/messages`,
    );

    if (id === 1) {
      const newMessageRef = push(chatRef);
      set(newMessageRef, {
        message: "Can you provide me with your full name please?",
        date: dayjs().valueOf(),
        fromVindo: true,
      });
    }

    if (id === 2) {
      const newMessageRef = push(chatRef);
      set(newMessageRef, {
        message: "Can you provide me with your signature please?",
        date: dayjs().valueOf(),
        fromVindo: true,
      });
    }
  };

  const onFinish = (values) => {
    if (values.file || values.customField) {
      const chatId = searchParams.get("chatId");
      const chatRef = ref(
        db,
        `Company/${user.companyId}/chats/${chatId}/messages`,
      );

      const newMessageRef = push(chatRef);
      set(newMessageRef, {
        message: `Can you provide me with ${
          values.file || values.customField
        } ${values.file ? "file" : ""} please?`,
        date: dayjs().valueOf(),
        fromVindo: true,
      });
      form.resetFields();
    }
  };

  return (
    <section className="counter-section">
      <Row>
        <Typography.Text className="fz-18 fw-500">Counter</Typography.Text>
      </Row>

      <Row style={{ margin: "24px 0 24px" }}>
        <Typography.Text className="fz-16 fw-500">
          Ask Participants For Data or Files
        </Typography.Text>
      </Row>

      <Row gutter={[14, 16]}>
        {counterButtons.map((btn) => (
          <Col key={btn.id} xs={24} md={12}>
            <Button
              className="counter-btn w-100"
              type="button"
              style={{
                border:
                  selectedBtn === btn.id &&
                  (btn.id === 3 || btn.id === 4) &&
                  "1px solid #0318d6",
              }}
              onClick={() => onCounterBtnClick(btn.id)}
            >
              <Row gutter={[12, 0]} align="middle" wrap={false}>
                <Col>
                  <Row align="middle">
                    <btn.icon />
                  </Row>
                </Col>
                <Col>
                  <Typography.Text ellipsis>{btn.label}</Typography.Text>
                </Col>
              </Row>
            </Button>
          </Col>
        ))}
      </Row>

      {(selectedBtn === 3 || selectedBtn === 4) && (
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row style={{ marginTop: "2rem" }}>
            <Form.Item
              label={selectedBtn === 3 ? "File Name" : "Custom Field"}
              className="w-100"
              name={selectedBtn === 3 ? "file" : "customField"}
            >
              <Row gutter={[8, 8]} align="middle">
                <Col flex={1}>
                  <Input
                    autoFocus
                    placeholder={`Enter ${
                      selectedBtn === 3 ? "file name" : "custom field"
                    }`}
                  />
                </Col>
                <Col>
                  <Button htmlType="submit">Submit</Button>
                </Col>
              </Row>
            </Form.Item>
          </Row>
        </Form>
      )}
    </section>
  );
}

const counterButtons = [
  { id: 1, label: "Full Name", icon: FullNameSVG },
  { id: 2, label: "Signature", icon: SignatureSVG },
  { id: 3, label: "File", icon: CounterFileSVG },
  { id: 4, label: "Custom Field", icon: AddSVG },
];
