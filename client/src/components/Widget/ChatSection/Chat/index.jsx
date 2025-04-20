import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Avatar, Col, Form, Input, Row, Typography } from "antd";

import TextUrl from "components/TextUrl";

import logo from "assets/images/logo.png";

import "./styles.css";
import { SendSVG } from "assets/jsx-svg";

import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

export default function Chat() {
  const messagesEndRef = useRef();
  const [form] = Form.useForm();
  const [messages, setMessages] = useState(chat);

  const onFinish = (values) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 2, owner: true, message: values.newMessage },
    ]);
    form.setFieldValue("newMessage", "");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <main className="chat-main">
        <div
          style={{
            overflowY: "auto",
            marginTop: "2px",
            paddingInlineEnd: "0.2rem",
            overflowX: "hidden",
            maxHeight: "320px",
          }}>
          <Row justify="center">
            <Typography.Text className="fz-10" style={{ color: "#AEAEB2" }}>
              {dayjs().isToday()
                ? `Today, ${dayjs().format("HH:mm a")}`
                : `${dayjs().format("HH:mm a")}`}
            </Typography.Text>
          </Row>
          {messages.map((message) => (
            <Row
              key={message.id}
              justify={message.owner ? "end" : "start"}
              gutter={message.owner ? 0 : [6, 0]}
              wrap={false}
              align="middle"
              style={{ margin: "12px 0" }}>
              {!message.owner && (
                <Col>
                  <Avatar
                    size={32}
                    src={logo}
                    style={{
                      background: "#fff",
                      boxShadow: "0px 0px 6px #0000001A",
                      objectFit: "cover",
                    }}
                  />
                </Col>
              )}
              <Col style={{ maxWidth: "180px" }}>
                <Row justify={message.owner ? "end" : "start"}>
                  <div
                    className="chat-message"
                    style={{
                      borderRadius: message.owner && "12px 12px 4px 12px",
                      textAlign: "left",
                    }}>
                    <TextUrl text={message.message} />
                  </div>
                </Row>
              </Col>

              <div ref={messagesEndRef} />
            </Row>
          ))}
        </div>

        <Form form={form} onFinish={onFinish} style={{ marginTop: "12px" }}>
          <Row align="middle" wrap={false}>
            <Col flex={1}>
              <Row align="middle" gutter={[4, 0]} wrap={false}>
                <Col flex={1}>
                  <Form.Item name="newMessage" initialValue={""} noStyle>
                    <Input
                      style={{ borderRadius: "12px", border: "none" }}
                      placeholder="Type a message "
                      onPressEnter={() =>
                        messagesEndRef.current?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <div className="chat-send-btn" onClick={() => form.submit()}>
                    <SendSVG />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </main>
    </div>
  );
}

const chat = [
  {
    id: 1,
    owner: false,
    message: "Hi Reem! Vindo live chat here!",
    image: logo,
  },
  { id: 2, owner: true, message: "Hello vindo!", image: logo },
  {
    id: 3,
    owner: false,
    message: "Hi Reem! Vindo live chat here!",
    image: logo,
  },
  { id: 4, owner: true, message: "Hello vindo!", image: logo },
  { id: 5, owner: true, message: "Hello vindo!", image: logo },
  {
    id: 6,
    owner: false,
    message: "Hi Reem! Vindo live chat here!",
    image: logo,
  },
];
