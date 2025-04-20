import { useEffect, useRef, useState, useContext } from "react";
import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import { useChat } from "@livekit/components-react";

import { extractSystemCommand } from "../utils";

import userContext from "context/userContext";
import avatar from "assets/images/avatar.png";
import { SendSVG } from "assets/jsx-svg";
import "./styles.css";

export default function TranscriptionTile({
  noMarign = false,
  isHost,
  meetingMetadata,
  agentRoomMessages,
}) {
  const [messagesDisplay, setMessagesDisplay] = useState([]);
  const { send: sendChat } = useChat();
  const { user } = useContext(userContext);
  const [form] = Form.useForm();
  const messageListEndRef = useRef();

  useEffect(() => {
    if (messageListEndRef.current) {
      messageListEndRef.current?.scrollIntoView();
    }
  }, [messageListEndRef.current]);

  useEffect(() => {
    (async () => {
      if (agentRoomMessages) {
        messageListEndRef.current?.scrollIntoView();
        setMessagesDisplay(
          agentRoomMessages.filter((message) => {
            const systemCommand = extractSystemCommand(message.message);
            if (message.message === "") {
              return false;
            } else if (systemCommand) {
              return false;
            } else {
              return true;
            }
          }),
        );
      }
    })();
  }, [agentRoomMessages]);

  const onFinish = async (values) => {
    const msg = values?.message?.trim();

    if (msg) {
      sendChat(msg);
      form.setFieldValue("message", "");
      messageListEndRef.current?.scrollIntoView();
    }
  };

  return (
    <>
      <Typography.Text className="fz-18 fw-500">Chat</Typography.Text>
      <Row className="support-chat" style={{ margin: noMarign && "24px 0rem" }}>
        <div className="meet-chat-panel">
          <div className="chat-list">
            {messagesDisplay?.map((message, index) => {
              return (
                <Row
                  key={index}
                  align="top"
                  wrap={false}
                  style={{
                    flexDirection: message.isSelf && "row-reverse",
                    alignItems: "end",
                  }}>
                  <Image
                    preview={false}
                    width={25}
                    height={25}
                    src={message.isSelf && user?.profileImage ? user?.profileImage : avatar}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div
                    className="chat-message"
                    style={{
                      marginInlineEnd: message.isSelf && "0.5rem",
                      borderRadius: message.isSelf ? "15px 15px 3px 15px" : "15px 15px 15px 3px",
                      backgroundColor: message.isSelf ? "#E5E5EA" : "#3A5EE3",
                    }}>
                    <div>
                      <Row justify={message.isSelf ? "end" : "start"}>
                        <Typography.Text
                          className="fz-12 fw-600"
                          style={message.isSelf ? undefined : { color: "white" }}>
                          {message.name}
                        </Typography.Text>
                      </Row>
                    </div>
                    <div>
                      <Row justify={message.isSelf ? "end" : "start"}>
                        <Typography.Text
                          className="fw-400"
                          style={message.isSelf ? undefined : { color: "white" }}>
                          {message.message}
                        </Typography.Text>
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
              <Form.Item style={{ position: "absolute", right: 40 }}>
                <Button type="text" shape="circle" className="center-items" htmlType="submit">
                  <SendSVG
                    color="#3A5EE3"
                    style={{ width: "18px", height: "18px", rotate: "45deg" }}
                  />
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </Row>
    </>
  );
}
