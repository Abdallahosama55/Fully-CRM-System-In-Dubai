import { useContext, useState, useEffect } from "react";
import { Col, Dropdown, Image, Row, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { get, onValue, ref, remove, set } from "firebase/database";

import { ChatCloseSVG, DownArrowSVG, EmployeeSVG } from "assets/jsx-svg";
import ReassignMenu from "views/Desks/TicketingDesk/ReassignMenu";
import userContext from "context/userContext";
import { filesExtentionsImg } from "utils/filesExtentionsImg";

import "./styles.css";
import { DownloadOutlined } from "@ant-design/icons";
import { useNotification } from "context/notificationContext";

export default function SiderChat({ selectedChatId, db, chatType }) {
  const { openNotificationWithIcon } = useNotification();
  const { user } = useContext(userContext);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [employeesFilesList, setEmployeesFilesList] = useState([]);
  const [customersFilesList, setCustomersFilesList] = useState([]);

  const assignChatToEmployee = (userId) => {
    setLoading(true);
    const chatsEmployeesRef = ref(
      db,
      `Company/${user.companyId}/chatsEmployees/${userId}/${
        selectedChatId || searchParams.get("chatId")
      }`,
    );
    const chatAssignedEmployeeRef = ref(
      db,
      `Company/${user.companyId}/chats/${
        selectedChatId || searchParams.get("chatId")
      }/assignedEmployees/${userId}`,
    );

    set(chatAssignedEmployeeRef, selectedChatId || searchParams.get("chatId"));

    const done = set(chatsEmployeesRef, selectedChatId || searchParams.get("chatId"));
    if (done) {
      setLoading(false);
      openNotificationWithIcon("success", "Employee Added successfully to chat");
    }
  };

  const archievChat = () => {
    const chatRef = ref(
      db,
      `Company/${user.companyId}/chats/${selectedChatId || searchParams.get("chatId")}`,
    );
    const archievedChatRef = ref(
      db,
      `Company/${user.companyId}/archievedChats/${selectedChatId || searchParams.get("chatId")}`,
    );

    get(chatRef).then((data) => {
      remove(chatRef);
      set(archievedChatRef, data.val());
    });
  };

  useEffect(() => {
    const filesRef = ref(
      db,
      `Company/${user.companyId}/chats/${selectedChatId || searchParams.get("chatId")}/files`,
    );

    onValue(filesRef, (data) => {
      const value = data.val();
      if (value) {
        setEmployeesFilesList(Object.values(value).filter((item) => item.fromVindo));
        setCustomersFilesList(Object.values(value).filter((item) => !item.fromVindo));
      } else {
        setEmployeesFilesList([]);
        setCustomersFilesList([]);
      }
    });
  }, [db, searchParams, selectedChatId, user.companyId]);

  return (
    <section className="sider-chat">
      <Row gutter={[16, 16]} justify="space-between">
        <Col>
          <Dropdown
            trigger={["click"]}
            dropdownRender={() =>
              chatType === "open" ? (
                <ReassignMenu onEmployeeSelect={assignChatToEmployee} clickLoading={loading} />
              ) : (
                <></>
              )
            }>
            <button
              className="add-participants-btn"
              disabled={chatType !== "open"}
              style={{
                cursor: chatType !== "open" && "not-allowed",
                background: chatType !== "open" && "#eee",
              }}>
              <Row wrap={false} align="middle" gutter={[6, 0]}>
                <Col>
                  <Row align="middle">
                    <EmployeeSVG />
                  </Row>
                </Col>
                <Col>Add Participants</Col>
                <Col>
                  <DownArrowSVG />
                </Col>
              </Row>
            </button>
          </Dropdown>
        </Col>
        <Col>
          <button
            className="end-chat-btn"
            onClick={() => {
              if (chatType === "open") {
                archievChat();
              }
            }}
            disabled={chatType !== "open"}
            style={{
              cursor: chatType !== "open" && "not-allowed",
              background: chatType !== "open" && "#ccc",
            }}>
            <Row align="middle" gutter={[6, 0]} wrap={false}>
              <Col>
                <Row align="middle">
                  <ChatCloseSVG />
                </Row>
              </Col>
              <Col>End</Col>
            </Row>
          </button>
        </Col>
      </Row>

      <Row>
        <div className="divider" />
      </Row>

      {employeesFilesList.length > 0 ? (
        <>
          <Row>
            <Typography.Text className="fw-500">Employees Files</Typography.Text>
          </Row>

          <Row gutter={[0, 16]} className="mt-1">
            {employeesFilesList.map((file) => (
              <Col xs={24} key={file.file}>
                <Row
                  justify="space-between"
                  align="middle"
                  wrap={false}
                  className="file-uploaded clickable"
                  onClick={() => {
                    if (file.file) {
                      window.open(file.file);
                    }
                  }}>
                  <Col flex={1}>
                    <Row align="middle" wrap={false} gutter={[16, 0]}>
                      <Col>
                        <Image
                          width={32}
                          height={32}
                          alt={file.message}
                          src={filesExtentionsImg(
                            `bla/${file.file.split(".")[file.file.split(".").length - 1]}`,
                          )}
                          preview={false}
                        />
                      </Col>
                      <Col flex={1}>
                        <Row justify={""} align="middle">
                          <Col>
                            <Row style={{ maxWidth: "140px" }}>
                              <Col xs={24}>
                                <Tooltip title={file.message}>
                                  <Typography.Text ellipsis>{file.message}</Typography.Text>
                                </Tooltip>
                              </Col>
                              <Col xs={24}>
                                <Typography.Text className="gc fz-12">
                                  {file.date && dayjs(file.date).format("MMM DD, YYYY")}
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row gutter={[8, 0]} align="middle">
                      <Col>
                        <Typography.Text className="gc fz-12">
                          {file.size && formatBytes(file.size)} s
                        </Typography.Text>
                      </Col>
                      <Col>
                        <DownloadOutlined />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </>
      ) : null}
      {customersFilesList.length > 0 ? (
        <>
          <Row className="mt-1">
            <Typography.Text className="fw-500">Customers Files</Typography.Text>
          </Row>

          <Row gutter={[0, 16]} className="mt-1">
            {customersFilesList.map((file) => (
              <Col xs={24} key={file.file}>
                <Row
                  justify="space-between"
                  align="middle"
                  wrap={false}
                  className="file-uploaded clickable"
                  onClick={() => {
                    if (file.file) {
                      window.open(file.file);
                    }
                  }}>
                  <Col flex={1}>
                    <Row align="middle" wrap={false} gutter={[16, 0]}>
                      <Col>
                        <Image
                          width={32}
                          height={32}
                          alt={file.message}
                          src={filesExtentionsImg(
                            `bla/${file.file.split(".")[file.file.split(".").length - 1]}`,
                          )}
                          preview={false}
                        />
                      </Col>
                      <Col flex={1}>
                        <Row justify={""} align="middle">
                          <Col>
                            <Row style={{ maxWidth: "140px" }}>
                              <Col xs={24}>
                                <Tooltip title={file.message}>
                                  <Typography.Text ellipsis>{file.message}</Typography.Text>
                                </Tooltip>
                              </Col>
                              <Col xs={24}>
                                <Typography.Text className="gc fz-12">
                                  {file.date && dayjs(file.date).format("MMM DD, YYYY")}
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row gutter={[8, 0]} align="middle">
                      <Col>
                        <Typography.Text className="gc fz-12">
                          {file.size && formatBytes(file.size)} s
                        </Typography.Text>
                      </Col>
                      <Col>
                        <DownloadOutlined />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </>
      ) : null}
    </section>
  );
}

function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
