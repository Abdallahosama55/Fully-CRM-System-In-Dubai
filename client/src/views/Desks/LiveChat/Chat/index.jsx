import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { onValue, push, ref, set, update } from "firebase/database";
import { Avatar, Col, Dropdown, Form, Image, Input, Row, Typography } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { FolderSVG, SendSVG, SmileSVG } from "assets/jsx-svg";

import TextUrl from "components/TextUrl";
import userContext from "context/userContext";
import SiderChat from "../SiderChat";

import "./styles.css";
import { axiosCatch } from "utils/axiosUtils";
import CommonService from "services/common.service";
import { useNotification } from "context/notificationContext";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

export default function Chat({ selectedChatId, db, chatType, selectedChat, isHelpDesk }) {
  const inputRef = useRef();
  const { openMessage } = useNotification();
  const { user } = useContext(userContext);
  const [searchParams] = useSearchParams();
  const messagesEndRef = useRef();
  const [form] = Form.useForm();
  const [messages, setMessages] = useState({});
  const [fileLoading, setFileLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onFinish = (values) => {
    if (values.newMessage) {
      const infoRef = ref(
        db,
        `Company/${user.companyId}/chats/${selectedChatId || searchParams.get("chatId")}/info`,
      );
      const messagesRef = ref(
        db,
        `Company/${user.companyId}/chats/${selectedChatId || searchParams.get("chatId")}/messages`,
      );

      const newPostRef = push(messagesRef);
      set(newPostRef, {
        message: values.newMessage,
        date: dayjs().valueOf(),
        fromVindo: true,
      });

      const updates = {};

      updates[`/numberOfUnreadMessages`] = 0;
      update(infoRef, updates);

      form.setFieldValue("newMessage", "");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const messagesRef = ref(
      db,
      `Company/${user.companyId}/${chatType === "open" ? "chats" : "archievedChats"}/${
        selectedChatId || searchParams.get("chatId")
      }/messages`,
    );

    onValue(messagesRef, (data) => {
      const value = data.val();
      if (value) {
        setMessages(data.val());
      } else {
        setMessages({});
      }
    });
  }, [chatType, db, searchParams, selectedChatId, user.companyId, user.id]);

  const onUploadFile = async (fileList) => {
    if (fileList[0]) {
      if (fileList[0].size / 1024 > 4096) {
        openMessage({ type: "info", message: "File must be less than 4MB" });
        return;
      }

      try {
        setFileLoading(true);
        const res = await CommonService.uploadFile(fileList[0]);

        const infoRef = ref(
          db,
          `Company/${user.companyId}/chats/${selectedChatId || searchParams.get("chatId")}/info`,
        );
        const filesRef = ref(
          db,
          `Company/${user.companyId}/chats/${selectedChatId || searchParams.get("chatId")}/files`,
        );
        const messagesRef = ref(
          db,
          `Company/${user.companyId}/chats/${
            selectedChatId || searchParams.get("chatId")
          }/messages`,
        );

        const newPostRef = push(messagesRef);
        set(newPostRef, {
          message: fileList[0].name,
          file: res.data.uploadedFiles.file,
          date: dayjs().valueOf(),
          fromVindo: true,
        });

        const newFileRef = push(filesRef);
        set(newFileRef, {
          message: fileList[0].name,
          file: res.data.uploadedFiles.file,
          size: fileList[0].size,
          date: dayjs().valueOf(),
          fromVindo: true,
        });

        const updates = {};

        updates[`/numberOfUnreadMessages`] = 0;
        update(infoRef, updates);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setFileLoading(false);
      }
    }
  };

  return (
    <section className="main-live-chat">
      <Row className="h-100" style={{ flexDirection: isHelpDesk && "row-reverse" }}>
        <Col xs={0} xl={isHelpDesk ? 8 : 9}>
          <SiderChat db={db} selectedChatId={selectedChatId} chatType={chatType} />
        </Col>
        <Col
          xs={24}
          xl={isHelpDesk ? 16 : 15}
          style={{ height: isHelpDesk ? "100%" : `calc(100% - 75px)` }}>
          {selectedChat && (
            <div className="chat-header-info">
              <Row gutter={[16, 0]}>
                <Col>
                  <Avatar
                    size={38}
                    className="fz-12 fw-600"
                    style={{ background: "#0318D626", color: "#0318D6" }}>
                    {"sami sabbah"
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                </Col>
                <Col flex={1}>
                  <Row>
                    <Col xs={24}>
                      <Typography.Text style={{ maxWidth: "120px" }} ellipsis className="fw-500">
                        {selectedChat.name || ""}
                      </Typography.Text>
                    </Col>

                    <Col xs={24}>
                      <Typography.Text
                        ellipsis
                        style={{
                          fontSize: "11px",
                          color: "#8E8E93",
                          maxWidth: "200px",
                        }}>
                        {selectedChat.email}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          )}
          <div
            className="live-chat-chat h-100"
            style={{
              maxHeight: isHelpDesk && "calc(100vh - 144px)",
            }}>
            <Row justify="center">
              <Typography.Text className="fz-12" style={{ color: "#AEAEB2" }}>
                {dayjs(selectedChat?.date).isToday()
                  ? `Today, ${dayjs(selectedChat?.date).format("hh:mm A")}`
                  : `${dayjs(selectedChat?.date).format("hh:mm A")}`}
              </Typography.Text>
            </Row>
            {messages &&
              Object.entries(messages).map(([key, value]) => {
                let fileIsImage = false;
                if (value.file) {
                  fileIsImage = ["jpg", "jpeg", "png", "webp"].includes(
                    value.file.split(".")[value.file.split(".").length - 1],
                  );
                }
                return (
                  <Row
                    key={key}
                    justify={value.fromVindo ? "end" : "start"}
                    gutter={value.fromVindo ? 0 : [6, 0]}
                    wrap={false}
                    align="middle"
                    style={{ margin: "12px 0" }}>
                    <Col style={{ maxWidth: "300px" }}>
                      <Row
                        align="middle"
                        justify={value.fromVindo ? "end" : "start"}
                        gutter={[16, 0]}
                        wrap={false}
                        style={{
                          flexDirection: value.fromVindo && "row-reverse",
                        }}>
                        <Col flex={1}>
                          <div
                            className={`live-chat-chat-message ${
                              value.file && !fileIsImage && "clickable"
                            }`}
                            style={{
                              borderRadius: value.fromVindo && "12px 12px 4px 12px",
                              textAlign: "left",
                              background: value.fromVindo && "#3A5EE3",
                            }}
                            onClick={() => {
                              if (value.file && !fileIsImage) {
                                window.open(value.file);
                              }
                            }}>
                            {value.file ? (
                              fileIsImage ? (
                                <>
                                  <Image
                                    style={{
                                      maxWidth: "200px",
                                      maxHeight: "400px",
                                      borderRadius: "12px",
                                    }}
                                    src={value.file}
                                    preview={false}
                                  />
                                </>
                              ) : (
                                <Row align="middle" gutter={[6, 0]}>
                                  <Col>
                                    <Typography.Text
                                      className="fz-12"
                                      style={{
                                        color: value.fromVindo && "#fff",
                                      }}>
                                      {value.message}
                                    </Typography.Text>
                                  </Col>
                                  <Col>
                                    <DownloadOutlined
                                      style={{
                                        color: value.fromVindo && "#fff",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              )
                            ) : (
                              <TextUrl
                                text={value.message}
                                style={{
                                  fontSize: "12px",
                                  color: value.fromVindo && "#fff",
                                }}
                              />
                            )}
                          </div>
                        </Col>
                        <Col>
                          <Typography.Text className="gc" style={{ fontSize: "11px" }} ellipsis>
                            {dayjs(value?.date).format("hh:mm A")}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Col>

                    <div ref={messagesEndRef} />
                  </Row>
                );
              })}
          </div>

          <Form form={form} onFinish={onFinish}>
            <div className="live-chat-control">
              <Row align="middle" gutter={[8, 0]}>
                <Col>
                  <div
                    className="live-chat-control-icon"
                    onClick={() => {
                      if (!fileLoading) {
                        inputRef?.current?.click();
                      }
                    }}
                    onChange={(e) => onUploadFile(e.target.files)}>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      style={{ display: "none" }}
                      ref={inputRef}
                    />
                    {fileLoading ? <LoadingOutlined /> : <FolderSVG />}
                  </div>
                </Col>
                <Col flex={1}>
                  <Form.Item name="newMessage" initialValue={""} noStyle>
                    <Input
                      variant="borderless"
                      style={{
                        background: "#2729440F",
                        borderRadius: "20px",
                        height: "40px",
                      }}
                      onPressEnter={() =>
                        messagesEndRef.current?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                      placeholder="Type your message ..."
                      disabled={chatType !== "open"}
                      autoComplete="false"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Dropdown
                    trigger={["click"]}
                    placement="topLeft"
                    open={open}
                    dropdownRender={() => (
                      <Picker
                        data={data}
                        onEmojiSelect={(emoji) => {
                          form.setFieldValue(
                            "newMessage",
                            form.getFieldValue("newMessage") + emoji.native,
                          );
                        }}
                        portal={false}
                        onClickOutside={() => setOpen(false)}
                      />
                    )}>
                    <div
                      className="smile-emoji"
                      onClick={() => {
                        setTimeout(() => {
                          setOpen((prev) => !prev);
                        }, 10);
                      }}>
                      <SmileSVG />
                    </div>
                  </Dropdown>
                </Col>
                <Col>
                  <div
                    className="live-chat-control-icon"
                    style={{
                      background: chatType === "open" ? "#1131DA" : "#333",
                      cursor: chatType !== "open" && "not-allowed",
                    }}
                    onClick={() => {
                      if (chatType === "open") {
                        form.submit();
                      }
                    }}>
                    <SendSVG color="#fff" />
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Row>
    </section>
  );
}
