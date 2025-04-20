import { useParams } from "react-router-dom";
import { useEffect, useRef, useContext, useState, useMemo } from "react";
import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import { getDatabase, onValue, ref, push, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { LoadingOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

import { firebaseConfig } from "utils/firebase.utils";
import userContext from "context/userContext";

import { SendSVG } from "assets/jsx-svg";
import avatar from "assets/images/avatar.png";

import "./styles.css";

export default function MeetChat({ noMarign = false, isHost, meetingMetadata }) {
  const [messages, setMessages] = useState([]);
  const [form] = useForm();
  const db = getDatabase();
  const { meetingId } = useParams();
  const { user } = useContext(userContext);
  const messageListEndRef = useRef();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const msg = values?.message?.trim();

    if (msg) {
      const infoRef = ref(db, `Company/${user.companyId}/meeting/chats/${meetingId}/massages`);

      const newPostRef = push(infoRef);
      set(newPostRef, {
        text: msg,
        date: dayjs().valueOf(),
        isEmployee: isHost,
        id: user.id,
        fullName: user.fullName,
        profileImage: user.profileImage || "",
      });
      form.setFieldValue("message", "");
      messageListEndRef.current?.scrollIntoView();
    }
  };

  useEffect(() => {
    if (messages.length) {
      messageListEndRef.current?.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    const referencenew = ref(db, `Company/${user.companyId}/meeting/chats/${meetingId}/massages`);
    onValue(referencenew, (data) => {
      const value = data.val();

      if (value) {
        setMessages(Object.values(value));
      } else {
        setMessages([]);
      }
    });
  }, [db, meetingId, user.companyId]);

  if (loading) {
    return (
      <div className="w-100 h-100 center-items">
        <LoadingOutlined />
      </div>
    );
  }

  return (
    <>
      <Typography.Text className="fz-18 fw-500">Chat</Typography.Text>
      <Row className="support-chat" style={{ margin: noMarign && "24px 0rem" }}>
        <div className="meet-chat-panel">
          <div className="chat-list">
            {messages?.map((message, index) => {
              return (
                <Row
                  key={index}
                  align="top"
                  wrap={false}
                  style={{
                    flexDirection: message.id === user.id && "row-reverse",
                  }}>
                  <Image
                    preview={false}
                    width={25}
                    height={25}
                    src={message.profileImage || avatar}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div
                    className="chat-message"
                    style={{
                      marginInlineEnd: message.id === user.id && "0.5rem",
                      borderRadius: message.id === user.id && "15px 3px 15px 15px",
                      backgroundColor: message.id === user.id && "#DFE5FB",
                    }}>
                    <div>
                      <Row justify={message.id === user.id ? "end" : "start"}>
                        <Typography.Text className="fz-12 fw-600">
                          {message.fullName}
                        </Typography.Text>
                      </Row>
                    </div>
                    <div>
                      <Row justify={message.id === user.id ? "end" : "start"}>
                        <Typography.Text className="fw-400">{message.text}</Typography.Text>
                      </Row>
                    </div>
                  </div>
                </Row>
              );
            })}
            <span
              ref={messageListEndRef}
              style={{
                minHeight: "1px",
                overflowAnchor: "auto",
                scrollMarginBottom: "50px",
              }}
            />
          </div>

          <Form form={form} onFinish={onFinish}>
            <Row align="middle" justify="space-between" wrap={false}>
              <Col flex={1} className="mr-1">
                <Form.Item name="message">
                  <Input
                    placeholder="Message.."
                    disabled={!isHost && !meetingMetadata.permissions?.chat}
                  />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item>
                  <Button type="primary" shape="circle" className="center-items" htmlType="submit">
                    <SendSVG color="#fff" style={{ width: "18px", height: "18px" }} />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    </>
  );
}
