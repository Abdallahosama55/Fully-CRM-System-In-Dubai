import { Avatar, Breadcrumb, Col, Dropdown, Form, Input, Row, Typography } from "antd";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

import CustomerTicketService from "services/customerTicket.service";
import { ArrowLeftSVG, AttatchSVG, SendSVG, SmileSVG } from "assets/jsx-svg";
import TicketService from "services/ticket.service";
import { axiosCatch } from "utils/axiosUtils";
import TicketHeader from "./TicketHeader";
import TicketFile from "./TicketFile";
import TicketReply from "./TicketReply";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import "./styles.css";
import userContext from "context/userContext";
import dragContext from "context/dragContext";
import { getDatabase, onValue, ref } from "firebase/database";
import { updateFirebaseTicketDate } from "utils/firebase.utils";
import { useNotification } from "context/notificationContext";
import Box from "components/Box";

export default function TicketView({ isHelpDesk, fromUser = false }) {
  const { user } = useContext(userContext);
  const { dragData, setDragData } = useContext(dragContext);
  const { id } = useParams();
  const repliesRef = useRef();
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [form] = Form.useForm();
  const [ticketData, setTicketData] = useState({});
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [showDetials, setShowDetials] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [maxRepliesHight, setMaxRepliesHight] = useState("55vh");
  const [reAssignLoading, setReAssignLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [updatedAt, setUpdatedAt] = useState("");
  const [firstRender, setFirstRender] = useState(true);
  const db = getDatabase();
  const { openNotificationWithIcon } = useNotification();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let res;
        if (fromUser) {
          res = await CustomerTicketService.getById(id);
        } else {
          res = await TicketService.getById(id);
        }
        setTicketData(res.data.data);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [fromUser, id, updatedAt]);

  useEffect(() => {
    const ticketRef = ref(db, `Company/${ticketData.companyId}/ticket/${ticketData.id}`);
    onValue(ticketRef, (snapShot) => {
      const value = snapShot.val();
      if (value && !firstRender) {
        if ((fromUser && value.includes("company")) || (!fromUser && value.includes("user"))) {
          setUpdatedAt(Date.now());
        }
      } else {
        setFirstRender(false);
      }
    });
  }, [db, firstRender]);

  const onFinish = async (values) => {
    if ((values.reply || uploadedFiles.length > 0) && !addLoading) {
      try {
        setAddLoading(true);

        const formData = new FormData();
        uploadedFiles.forEach((file, index) => {
          formData.append(index, file);
        });
        formData.append("ticketId", ticketData.id);
        formData.append(
          "newReplay",
          JSON.stringify({
            id: ticketData.replay ? ticketData.replay.length + 2 : 1,
            fromVindo: !fromUser,
            message: values.reply || "",
            date: `${dayjs().format("DD MM, YYYY")} at ${dayjs().format("HH:mm A")}`,
          }),
        );

        let res;
        if (fromUser) {
          res = await CustomerTicketService.addReplay(formData);
          updateFirebaseTicketDate(ticketData.id, ticketData.companyId, `user-${Date.now()}`);
        } else {
          res = await TicketService.addReplay(formData);
          updateFirebaseTicketDate(ticketData.id, user.companyId, `company-${Date.now()}`);
        }

        setTicketData((prev) => ({
          ...prev,
          replay: res.data.data[1][0].replay,
        }));
        setUploadedFiles([]);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setAddLoading(false);
      }

      form.setFieldValue("reply", "");
    }
  };

  useEffect(() => {
    setMaxRepliesHight(window.pageYOffset + repliesRef.current?.getBoundingClientRect().top);
  }, [showDetials]);

  useMemo(() => {
    setShowDetials(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHelpDesk]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticketData]);

  const onDrop = useCallback(
    async (e) => {
      e.preventDefault();
      const employeeId = dragData.employeeId;

      if (employeeId) {
        try {
          setReAssignLoading(true);
          await TicketService.reassignTicket(
            {
              employeeId: dragData.employeeId,
            },
            ticketData.id,
          );
          await updateFirebaseTicketDate(ticketData.id, user.companyId, `company-${Date.now()}`);

          setTicketData((prev) => {
            return { ...prev, employeeId: dragData.employeeId };
          });
          openNotificationWithIcon("success", "Ticket has been re-assigned successfully");
        } catch (err) {
          axiosCatch(err);
        } finally {
          setReAssignLoading(false);
          setDragData({
            dragging: false,
            dropText: "",
            dimId: null,
            file: null,
          });
        }
      }
    },
    [dragData.employeeId, setDragData, ticketData.id],
  );

  const fileDelete = (fileName) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };
  return (
    <div>
      <Box sx={{ margin: "18px" }}>
        <Breadcrumb
          items={[
            {
              title: (
                <Link unstable_viewTransition to="/desks/ticketing-desk" className="black">
                  <ArrowLeftSVG></ArrowLeftSVG> Ticketing Desk
                </Link>
              ),
            },
            {
              title: <div className="blue">{ticketData?.title}</div>,
            },
          ]}
        />
      </Box>
      <Col
        flex={1}
        className="ticket-view-replay-wraper"
        style={{
          height: isHelpDesk ? "100vh" : fromUser ? "calc(100% - 83px)" : "calc(100% - 78px)",
        }}>
        {dragData.dragging && (
          <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="dragover-overlay">
            {dragData.dropText}
          </div>
        )}

        {reAssignLoading && (
          <div className="dragover-overlay">
            <LoadingOutlined />
          </div>
        )}
        {loading ? (
          <Row
            style={{
              height: isHelpDesk ? "100vh" : fromUser ? "calc(100% - 83px)" : "calc(100% - 78px)",
            }}
            align="middle"
            justify="center">
            <LoadingOutlined />
          </Row>
        ) : (
          <>
            {!fromUser && (
              <Row
                justify="start"
                align="middle"
                gutter={[8, 0]}
                wrap={false}
                className="ticket-view">
                <Col>
                  <Avatar
                    size={36}
                    style={{
                      background: "#0318D626",
                      color: "#0318D6",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}>
                    {ticketData.customer &&
                      ticketData.customer?.fullName &&
                      ticketData.customer?.fullName
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                  </Avatar>
                </Col>
                <Col>
                  <Row>
                    <Col xs={24}>
                      <Typography.Text className="fz-12 fw-500">
                        {ticketData?.customer && ticketData?.customer?.fullName}
                      </Typography.Text>
                    </Col>
                    <Col xs={24} style={{ lineHeight: "11px" }}>
                      <Typography.Text
                        style={{
                          fontSize: "11px",
                          color: "#8E8E93",
                        }}>
                        {ticketData?.email}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}

            <div className="ticket-view-replay">
              <div className="ticket-view-replay-tickits">
                <Row style={{ flexDirection: "column" }} className="h-100">
                  <Col>
                    <TicketHeader
                      ticketData={ticketData}
                      setTicketData={setTicketData}
                      showDetials={showDetials}
                      setShowDetials={setShowDetials}
                      fromUser={fromUser}
                    />
                  </Col>
                  <Col
                    flex={1}
                    style={{
                      maxHeight: `calc(100vh - ${maxRepliesHight + 73}px)`,
                      overflowY: "auto",
                      padding: "8px 12px",
                    }}
                    ref={repliesRef}>
                    {ticketData?.attachment?.customer?.length ? (
                      <div className="ticket-replay" key={ticketData.attachment.customer[0]}>
                        <Row gutter={[0, 16]}>
                          <Col xs={24}>
                            <Row justify="space-between" align="middle" gutter={[16, 16]}>
                              <Col>
                                <Row gutter={[8, 8]} align="middle">
                                  <Col>
                                    <Avatar
                                      size={36}
                                      style={{
                                        background: "#0318D626",
                                        color: "#0318D6",
                                        fontWeight: "600",
                                        fontSize: "12px",
                                      }}
                                      className="vindo-avatar">
                                      {ticketData.customer &&
                                        ticketData?.customer?.fullName
                                          ?.split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                    </Avatar>
                                  </Col>
                                  <Col>
                                    <Row>
                                      <Col xs={24}>
                                        <Typography.Text className="fz-12 fw-500">
                                          {ticketData.customer && ticketData.customer.fullName}
                                        </Typography.Text>
                                      </Col>
                                      <Col xs={24} style={{ lineHeight: "11px" }}>
                                        <Typography.Text
                                          style={{
                                            fontSize: "11px",
                                            color: "#8E8E93",
                                          }}>
                                          {ticketData.email}
                                        </Typography.Text>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                              <Col>
                                <Typography.Text
                                  style={{
                                    fontSize: "11px",
                                    color: "#8E8E93",
                                  }}>
                                  {dayjs(ticketData.updatedAt).format("DD MM,YYYY") +
                                    " at " +
                                    dayjs(ticketData.updatedAt).format("HH:mm A")}
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                          <Col xs={24}>
                            <Row gutter={[0, 8]}>
                              <Col xs={24}>
                                <Typography.Text>{ticketData.content}</Typography.Text>
                              </Col>
                              <Col xs={24}>
                                <TicketFile attachment={ticketData.attachment.customer[0]} />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    {ticketData.replay?.map((reply) => {
                      if (!reply.content?.id) {
                        return <></>;
                      }
                      return <TicketReply reply={reply} ticketData={ticketData} />;
                    })}
                    <div ref={messagesEndRef} />
                  </Col>
                </Row>
              </div>

              <Form form={form} onFinish={onFinish} className="ticket-view-replay-interactions">
                {uploadedFiles.length ? (
                  <Row gutter={[12, 12]} className="ticket-view-replay-files">
                    {uploadedFiles.map((file) => (
                      <Col key={file.id}>
                        <TicketFile file={file} fileDelete={fileDelete} />
                      </Col>
                    ))}
                  </Row>
                ) : null}

                <Row wrap={false} gutter={[16, 0]} align="middle">
                  <Col flex={1}>
                    <Form.Item initialValue="" noStyle name="reply">
                      <Input
                        placeholder="Type your message..."
                        className="ticket-view-replay-interactions-input"
                        disabled={
                          ticketData.status === "CLOSED" ||
                          (!fromUser && user.id !== ticketData.employeeId)
                        }
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
                            form.setFieldValue("reply", form.getFieldValue("reply") + emoji.native);
                          }}
                          portal={false}
                          onClickOutside={() => setOpen(false)}
                        />
                      )}>
                      <div
                        onClick={() => {
                          setTimeout(() => {
                            setOpen((prev) => !prev);
                          }, 10);
                        }}
                        className="smile"
                        style={{
                          pointerEvents:
                            (ticketData.status === "CLOSED" ||
                              (!fromUser && user.id !== ticketData.employeeId) ||
                              addLoading) &&
                            "none",
                        }}>
                        <SmileSVG />
                      </div>
                    </Dropdown>
                  </Col>
                  <Col>
                    <Row align="middle">
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        ref={inputRef}
                        onChange={(e) =>
                          setUploadedFiles((prev) => {
                            let files = e.target.files;
                            if (prev.length === 0) {
                              return Object.values(files);
                            }
                            const addedArr = [];
                            const currentFilesName = prev.map((file) => file.name);
                            Object.values(files).forEach((addedFile) => {
                              if (!currentFilesName.includes(addedFile.name)) {
                                addedArr.push(addedFile);
                              }
                            });
                            return [...prev, ...addedArr];
                          })
                        }
                        multiple
                      />
                      <AttatchSVG
                        style={{
                          pointerEvents:
                            (ticketData.status === "CLOSED" ||
                              (!fromUser && user.id !== ticketData.employeeId) ||
                              addLoading) &&
                            "none",
                        }}
                        className="clickable"
                        onClick={() => {
                          if (
                            ticketData.status === "CLOSED" ||
                            (!fromUser && user.id !== ticketData.employeeId) ||
                            addLoading
                          ) {
                            return;
                          }
                          inputRef?.current?.click();
                        }}
                      />
                    </Row>
                  </Col>
                  <Col>
                    <button
                      className="center-items send-btn"
                      style={{
                        pointerEvents:
                          (ticketData.status === "CLOSED" ||
                            (!fromUser && user.id !== ticketData.employeeId) ||
                            addLoading) &&
                          "none",
                        background:
                          (ticketData.status === "CLOSED" ||
                            (!fromUser && user.id !== ticketData.employeeId)) &&
                          "#eee",
                        cursor:
                          (ticketData.status === "CLOSED" ||
                            (!fromUser && user.id !== ticketData.employeeId)) &&
                          "not-allowed",
                      }}>
                      {addLoading ? (
                        <LoadingOutlined style={{ color: "#fff" }} />
                      ) : (
                        <SendSVG color="#fff" />
                      )}
                    </button>
                  </Col>
                </Row>
              </Form>
            </div>
          </>
        )}
      </Col>
    </div>
  );
}
