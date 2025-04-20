import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { Avatar, Col, Dropdown, Input, Row, Typography } from "antd";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";

import { firebaseConfig } from "utils/firebase.utils";
import { SearchSVG, WhiteChatSVG } from "assets/jsx-svg";
import userContext from "context/userContext";
import Chat from "./Chat";

import "./styles.css";

export default function LiveChat({ isHelpDesk }) {
  const { user } = useContext(userContext);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatType, setChatType] = useState("open");
  const [searchParams, setSearchParams] = useSearchParams();
  const [customerChatsIds, setCustomerChatsIds] = useState([]);
  const [employeesChatsIds, setEmployeesChatsIds] = useState([]);
  const [customerChats, setCustomerChats] = useState({});
  const [customerChatsSearch, setCustomerChatsSearch] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const db = getDatabase();

  useMemo(() => {
    setCustomerChatsSearch(
      Object.values(customerChats).filter((chat) =>
        chat?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
      ),
    );
  }, [customerChats, searchQuery]);

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    const chatId = searchParams.get("chatId");
    if (chatId) {
      setSelectedChatId(chatId);
    } else {
      setSelectedChatId(null);
    }
  }, [searchParams]);

  // get channles
  useEffect(() => {
    searchParams.delete("chatId");
    setSearchParams(searchParams);
    if (chatType === "open") {
      const channlesRef = ref(db, `Company/${user.companyId}/unAssignedChats`);
      const chatsEmployeesRef = ref(db, `Company/${user.companyId}/chatsEmployees/${user.id}`);

      onValue(channlesRef, (data) => {
        const value = data.val();

        if (value) {
          setCustomerChatsIds(Object.keys(value));
        } else {
          setCustomerChatsIds([]);
        }
      });

      onValue(chatsEmployeesRef, (data) => {
        const value = data.val();

        if (value) {
          setEmployeesChatsIds(Object.keys(value));
        } else {
          setEmployeesChatsIds([]);
        }
      });
    } else {
      const archievedChatsRef = ref(db, `Company/${user.companyId}/archievedChats`);

      onValue(archievedChatsRef, (data) => {
        const value = data.val();
        if (value) {
          setCustomerChatsIds(Object.keys(value));
          setEmployeesChatsIds([]);
        } else {
          setCustomerChatsIds([]);
          setEmployeesChatsIds([]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatType, db, user.id]);

  useEffect(() => {
    const ids = [...new Set([...customerChatsIds, ...employeesChatsIds])];

    setCustomerChats((prev) => {
      Object.keys(prev).forEach((chatId) => {
        if (!ids.includes(chatId)) {
          delete prev[chatId];
        }
      });

      return { ...prev };
    });

    ids.forEach((chatId) => {
      const chatsEmployeesRef = ref(
        db,
        `Company/${user.companyId}/${
          chatType === "open" ? "chats" : "archievedChats"
        }/${chatId}/info`,
      );

      onValue(chatsEmployeesRef, (data) => {
        const infoData = data.val();
        if (infoData) {
          setCustomerChats((prev) => {
            prev[chatId] = infoData;
            return { ...prev };
          });
        } else {
          setCustomerChats((prev) => {
            delete prev[chatId];
            return { ...prev };
          });
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeesChatsIds, customerChatsIds, db]);

  const assignChatToEmployee = (chatId) => {
    const infoRef = ref(db, `Company/${user.companyId}/chats/${chatId}/info`);
    const channlesRef = ref(db, `Company/${user.companyId}/unAssignedChats/${chatId}`);
    const chatsEmployeesRef = ref(
      db,
      `Company/${user.companyId}/chatsEmployees/${user.id}/${chatId}`,
    );
    const chatAssignedEmployeeRef = ref(
      db,
      `Company/${user.companyId}/chats/${chatId}/assignedEmployees/${user.id}`,
    );

    set(chatAssignedEmployeeRef, chatId);

    const updates = {};

    updates[`/numberOfUnreadMessages`] = 0;

    remove(channlesRef);
    set(chatsEmployeesRef, chatId);
    update(infoRef, updates);
  };

  const getNumberOfUnreadMessages = useCallback(() => {
    let sum = 0;
    Object.values(customerChatsSearch).forEach((chat) => (sum += chat.numberOfUnreadMessages));
    return sum;
  }, [customerChatsSearch]);

  return (
    <section className="desk-live-chat">
      <Row
        className="desk-live-chat-main"
        style={{
          minHeight: isHelpDesk && "100vh",
          borderRadius: isHelpDesk && "0px",
        }}>
        <Col flex={1}>
          {selectedChatId ? (
            <Chat db={db} chatType={chatType} selectedChat={selectedChat} isHelpDesk={isHelpDesk} />
          ) : (
            <div className="not-select center-items">
              <div className="chat-icon-not-select">
                <WhiteChatSVG color="#000" style={{ width: "30px", height: "30px" }} />
              </div>

              <Typography.Text className="fz-18 fw-600">Live chat Desk</Typography.Text>
              <Typography.Text>Select Conversation to view details here</Typography.Text>
            </div>
          )}
        </Col>
        {isHelpDesk ? null : (
          <Col style={{ borderLeft: "1px solid #f2f2f4", width: "300px" }}>
            <Row align="middle" justify="space-between" style={{ margin: "16px" }}>
              <Col style={{ marginInlineEnd: "20px" }}>
                <Row align="middle" gutter={[8, 8]}>
                  <Col>
                    <Typography.Text className="fw-500">Conversations</Typography.Text>
                  </Col>
                  <Col style={{ width: "70px" }}>
                    {getNumberOfUnreadMessages() > 0 ? (
                      <Typography.Text ellipsis className="new-message">
                        {getNumberOfUnreadMessages()} New
                      </Typography.Text>
                    ) : null}
                  </Col>
                </Row>
              </Col>
              <Col>
                <Dropdown
                  dropdownRender={() => (
                    <div className="search-dropdown-search">
                      <Input.Search onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                  )}
                  trigger={["click"]}>
                  <button className="search-btn">
                    <SearchSVG color="#000" />
                  </button>
                </Dropdown>
              </Col>
            </Row>

            <Row style={{ margin: "0 16px 16px 16px" }}>
              <div className="chat-type-btns-wraper w-100">
                <Row gutter={[8, 0]}>
                  <Col xs={12}>
                    <button
                      className={`chat-type-btn ${
                        chatType === "open" && "chat-type-btn-active"
                      } w-100`}
                      onClick={() => setChatType("open")}>
                      Open
                    </button>
                  </Col>
                  <Col xs={12}>
                    <button
                      className={`chat-type-btn ${
                        chatType === "archieved" && "chat-type-btn-active"
                      } w-100`}
                      onClick={() => setChatType("archieved")}>
                      Archieved
                    </button>
                  </Col>
                </Row>
              </div>
            </Row>

            <Row style={{ maxHeight: "65vh", overflowY: "auto" }}>
              {Object.values(customerChatsSearch)
                ?.sort((a, b) => b.date - a.date)
                ?.map((chat) => (
                  <Col
                    key={chat.chatId}
                    xs={24}
                    style={{
                      padding: "16px",
                      borderBottom: "1px solid #F2F2F4",
                    }}>
                    <Row
                      align="middle"
                      wrap={false}
                      gutter={[8, 0]}
                      className="clickable"
                      onClick={() => {
                        setSelectedChat(chat);
                        setSearchParams({ chatId: chat.chatId });
                        assignChatToEmployee(chat.chatId);
                      }}>
                      <Col>
                        <Avatar
                          size={38}
                          className="fz-12 fw-600"
                          style={{ background: "#0318D626", color: "#0318D6" }}>
                          {chat.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                      </Col>
                      <Col flex={1}>
                        <Row>
                          <Col xs={24}>
                            <Row justify="space-between" align="middle" wrap={false}>
                              <Col flex={1}>
                                <Typography.Text
                                  style={{ width: "120px" }}
                                  ellipsis
                                  className="fw-500">
                                  {chat.name || ""}
                                </Typography.Text>
                              </Col>
                              <Col>
                                <Typography.Text style={{ color: "#AEAEB2" }} className="fz-12">
                                  {dayjs(chat.date).format("DD MMM hh:mm A")}
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>

                          <Col xs={24}>
                            <Row justify="space-between" align="middle" wrap={false}>
                              <Col flex={1}>
                                <Typography.Text
                                  ellipsis
                                  style={{
                                    fontSize: "11px",
                                    color: "#8E8E93",
                                    maxWidth: "200px",
                                  }}>
                                  {chat.lastMessage}
                                </Typography.Text>
                              </Col>
                              {chat.numberOfUnreadMessages ? (
                                <Col>
                                  <div className="unread-message-number">
                                    {chat.numberOfUnreadMessages}
                                  </div>
                                </Col>
                              ) : null}
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                ))}
            </Row>
          </Col>
        )}
      </Row>
    </section>
  );
}
