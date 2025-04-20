import { useContext, useState } from "react";
import dayjs from "dayjs";
import { Avatar, Button, Col, Dropdown, Switch, Popconfirm, Row, Typography, Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
  ArrowDownSVG,
  CloseTicketSVG,
  DateSVG,
  EditSVG,
  EyeSVG,
  IconlyLightOutlineSettingSVG,
  ProjectSVG,
  TicketSVG,
  TypeSVG,
} from "assets/jsx-svg";
import TicketService from "services/ticket.service";
import { axiosCatch } from "utils/axiosUtils";

import "./styles.css";
import CustomerTicketService from "services/customerTicket.service";
import { updateFirebaseTicketDate } from "utils/firebase.utils";
import userContext from "context/userContext";
import UserTicket from "views/HelpDesk/components/userTicket";
import { useNotification } from "context/notificationContext";

export default function TicketHeader({
  ticketData,
  setTicketData,
  showDetials,
  setShowDetials,
  fromUser,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { openNotificationWithIcon } = useNotification();
  const [editLoading, setEditLoading] = useState({ type: "", loading: false });
  const { user } = useContext(userContext);

  const updatePriority = async (priority) => {
    try {
      setEditLoading({ type: "priority", loading: true });
      await TicketService.updatePriority({ priority }, ticketData.id);
      await updateFirebaseTicketDate(ticketData.id, user.companyId, `company-${Date.now()}`);
      setTicketData((prev) => ({
        ...prev,
        priority,
      }));
    } catch (err) {
      axiosCatch(err);
    } finally {
      setEditLoading({ type: "priority", loading: false });
    }
  };

  const updateStatus = async (status) => {
    try {
      setEditLoading({ type: "status", loading: true });
      await TicketService.updateStatus({ status: status ? "OPEN" : "CLOSED" }, ticketData.id);
      await updateFirebaseTicketDate(ticketData.id, user.companyId, `company-${Date.now()}`);
      setTicketData((prev) => ({
        ...prev,
        status: status ? "OPEN" : "CLOSED",
      }));
    } catch (err) {
      axiosCatch(err);
    } finally {
      setEditLoading({ type: "status", loading: false });
    }
  };

  const closeTicket = async () => {
    try {
      setEditLoading({ type: "closeTicket", loading: true });
      await CustomerTicketService.close(ticketData.id);
      openNotificationWithIcon("success", "Ticket Closed succesffuly");

      setTicketData((prev) => ({
        ...prev,
        status: "CLOSED",
      }));
    } catch (err) {
      axiosCatch(err);
    } finally {
      setEditLoading({ type: "closeTicket", loading: false });
    }
  };

  const updateType = async (type) => {
    try {
      setEditLoading({ type: "type", loading: true });
      await TicketService.updateType({ type }, ticketData.id);
      await updateFirebaseTicketDate(ticketData.id, user.companyId, `company-${Date.now()}`);

      setTicketData((prev) => ({
        ...prev,
        type,
      }));
    } catch (err) {
      axiosCatch(err);
    } finally {
      setEditLoading({ type: "type", loading: false });
    }
  };
  return (
    <Row className="main-ticket-info" justify="space-between" align="middle" gutter={[0, 16]}>
      <Col>
        <Row align="middle" gutter={[16, 16]}>
          {fromUser && (
            <Col>
              <Row justify="start" align="middle" gutter={[8, 0]} wrap={false}>
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
                      ticketData.customer.fullName
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                  </Avatar>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "180px",
                  }}>
                  <Typography.Text ellipsis className="fz-12 fw-500">
                    {ticketData.customer && ticketData.customer.fullName}
                  </Typography.Text>
                  <Typography.Text
                    ellipsis
                    style={{
                      fontSize: "11px",
                      color: "#8E8E93",
                    }}>
                    {ticketData.email}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          )}
          <Col>
            <Row wrap={false}>
              <div className="tickit-number-text">
                <Typography.Text ellipsis className="fw-500 fz-12">
                  TICKET NO.
                </Typography.Text>
              </div>
              <div className="tickit-number">
                <Typography.Text ellipsis className="fw-500 fz-12">
                  #{ticketData.id}
                </Typography.Text>
              </div>
            </Row>
          </Col>
          {!fromUser && (
            <Col>
              <Dropdown
                dropdownRender={(e) => (isEditing ? e : <></>)}
                menu={{
                  items: ticketPriority.map((priority) => ({
                    key: priority.value,
                    label: (
                      <Row align="middle" gutter={[8, 0]} wrap={false}>
                        <Col>
                          <Row align="middle">
                            <TicketSVG
                              style={{
                                width: "12px",
                                height: "12px",
                              }}
                              color={prioritysColor[priority.value]}
                            />
                          </Row>
                        </Col>
                        <Col>
                          <Typography.Text className="fz-12 fw-500">
                            {priority.label}
                          </Typography.Text>
                        </Col>
                      </Row>
                    ),
                  })),
                  activeKey: ticketData.priority,
                  onClick: (e) => updatePriority(e.key),
                }}
                trigger={["click"]}>
                <div className={`priority-tag ${isEditing ? "clickable" : undefined}`}>
                  {editLoading.type === "priority" && editLoading.loading ? (
                    <Row justify="center">
                      <LoadingOutlined />
                    </Row>
                  ) : (
                    <Row align="middle" gutter={[8, 0]} wrap={false}>
                      <Col>
                        <Row align="middle">
                          <TicketSVG
                            style={{
                              width: "12px",
                              height: "12px",
                            }}
                            color={prioritysColor[ticketData.priority]}
                          />
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text className="fz-12 fw-500">
                          {ticketData.priority} PRIORITY
                        </Typography.Text>
                      </Col>
                      {isEditing && (
                        <Col>
                          <Row align="middle">
                            <ArrowDownSVG
                              style={{
                                width: "8px",
                                height: "4.5px",
                              }}
                            />
                          </Row>
                        </Col>
                      )}
                    </Row>
                  )}
                </div>
              </Dropdown>
            </Col>
          )}
          <Col>
            <Dropdown
              dropdownRender={(e) => (isEditing ? e : <></>)}
              menu={{
                items: [
                  {
                    label: (
                      <Row gutter={20} align="middle">
                        <Col>Status</Col>
                        <Col>
                          <Switch
                            defaultChecked={ticketData.status === "OPEN"}
                            onClick={updateStatus}
                          />
                        </Col>
                      </Row>
                    ),
                  },
                ],
              }}
              trigger={["click"]}>
              <div
                className={`tickit-status ${isEditing ? "clickable" : ""}`}
                style={{
                  background: `${"#3A5EE3"}14`,
                  width: ticketData.status === "OPEN" ? "80px" : "95px",
                  height: "30px",
                }}>
                {editLoading.type === "status" && editLoading.loading ? (
                  <Row justify="center">
                    <LoadingOutlined />
                  </Row>
                ) : (
                  <Row align="middle" justify="center" gutter={[8, 0]}>
                    <Col>
                      <Typography.Text className="fz-12 fw-500" style={{ color: "#3A5EE3" }}>
                        {ticketData.status}
                      </Typography.Text>
                    </Col>
                    {isEditing && (
                      <Col>
                        <Row align="middle">
                          <ArrowDownSVG
                            color="#3A5EE3"
                            style={{
                              width: "8px",
                              height: "4.5px",
                            }}
                          />
                        </Row>
                      </Col>
                    )}
                  </Row>
                )}
              </div>
            </Dropdown>
          </Col>
        </Row>
      </Col>
      <Col>
        {isEditing ? (
          <Button
            onClick={() => {
              setIsEditing(false);
            }}
            style={{ height: "28px", borderColor: "" }}
            className="center-items">
            Save Changes
          </Button>
        ) : (
          <Row align="middle" gutter={[16, 16]}>
            {fromUser ? (
              ticketData.status !== "CLOSED" && (
                <Popconfirm
                  title="Close ticket"
                  description="Are you sure to close this ticket?"
                  onConfirm={() => closeTicket()}
                  okText="Yes"
                  cancelText="No">
                  <Row align="middle" gutter={[6, 0]} wrap={false} className="clickable">
                    <Col>
                      <Row align="middle">
                        <CloseTicketSVG color="#000" />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text className="fz-12 fw-500">Close</Typography.Text>
                    </Col>
                  </Row>
                </Popconfirm>
              )
            ) : (
              <Col>
                <Row
                  align="middle"
                  gutter={[6, 0]}
                  wrap={false}
                  onClick={() => {
                    setIsEditing(true);
                    setShowDetials(true);
                  }}
                  className="clickable">
                  <Col>
                    <Row align="middle">
                      <EditSVG style={{ width: "12px", hieght: "12px" }} color="#0318d6" />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text className="pc fz-12 fw-500">Edit</Typography.Text>
                  </Col>
                </Row>
              </Col>
            )}
            <Col>
              <Row
                align="middle"
                gutter={[6, 0]}
                wrap={false}
                onClick={() => setShowDetials((prev) => !prev)}
                className="clickable">
                <Col>
                  <Row align="middle">
                    <EyeSVG />
                  </Row>
                </Col>
                <Col>
                  <Typography.Text className="fz-12 fw-500">
                    {showDetials ? "Hide" : "Show"} Detials
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Col>
      <Col xs={24}>
        <Typography.Text>
          {ticketData.title}, {ticketTypeDisplay[ticketData.type] || ""}
        </Typography.Text>
      </Col>

      {showDetials && (
        <Col xs={24}>
          <Row gutter={[0, 16]}>
            <Col xs={24} xl={18} className="ticket-detials">
              <Typography.Paragraph>{ticketData.content}</Typography.Paragraph>
            </Col>

            <Col xs={24}>
              <Row align="middle" gutter={[40, 16]}>
                <Col>
                  <Row align="middle" gutter={[8, 0]} wrap={false}>
                    <Col>
                      <Row align="middle">
                        <DateSVG />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text className="fz-12 fw-600">
                        Issued on {dayjs(ticketData.updatedAt).format("DD-MM-YYYY HH:mmA")}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Dropdown
                    dropdownRender={(e) => (isEditing ? e : <></>)}
                    menu={{
                      items: ticketType.map((type) => ({
                        key: type.value,
                        label: (
                          <Typography.Text className="fz-12 fw-500" style={{ color: "#000" }}>
                            {type.label}
                          </Typography.Text>
                        ),
                      })),
                      activeKey: ticketData.status,
                      onClick: (e) => updateType(e.key),
                    }}
                    trigger={["click"]}>
                    <div className={isEditing ? "tickit-type" : undefined}>
                      {editLoading.type === "type" && editLoading.loading ? (
                        <Row justify="center">
                          <LoadingOutlined />
                        </Row>
                      ) : (
                        <Row align="middle" gutter={[8, 0]} wrap={false}>
                          <Col>
                            <Row align="middle">
                              <TypeSVG />
                            </Row>
                          </Col>
                          <Col>
                            <Typography.Text className="fz-12 fw-600">
                              Type: {ticketTypeDisplay[ticketData.type] || "-"}
                            </Typography.Text>
                          </Col>
                          {isEditing && (
                            <Col>
                              <Row align="middle">
                                <ArrowDownSVG
                                  style={{
                                    width: "8px",
                                    height: "4.5px",
                                  }}
                                />
                              </Row>
                            </Col>
                          )}
                        </Row>
                      )}
                    </div>
                  </Dropdown>
                </Col>

                <Col>
                  <div className={isEditing ? "tickit-type" : undefined}>
                    <Row align="middle" gutter={[8, 0]} wrap={false}>
                      <Col>
                        <Row align="middle">
                          <ProjectSVG />
                        </Row>
                      </Col>
                      <Col>
                        <Typography.Text className="fz-12 fw-600">
                          Project: {ticketData.project || "-"}
                        </Typography.Text>
                      </Col>
                      {isEditing && (
                        <Col>
                          <Row align="middle">
                            <ArrowDownSVG
                              style={{
                                width: "8px",
                                height: "4.5px",
                              }}
                            />
                          </Row>
                        </Col>
                      )}
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>

            {fromUser && (
              <Col xs={24}>
                <Row justify="start" align="middle" gutter={[8, 0]} wrap={false}>
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
                        ticketData.customer.fullName
                          ?.split(" ")
                          ?.map((n) => n[0])
                          ?.join("")}
                    </Avatar>
                  </Col>
                  <Col>
                    <Row>
                      {/* Waitting new API For ADDED BY infromation */}
                      <Col xs={24}>
                        <Typography.Text
                          style={{
                            fontSize: "11px",
                            color: "#8E8E93",
                          }}>
                          ADDED BY
                        </Typography.Text>
                      </Col>
                      <Col xs={24} style={{ lineHeight: "11px" }}>
                        <Typography.Text className="fz-12 fw-500">You</Typography.Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            )}
            <Row gutter={10}>
              {!fromUser && <UserTicket ticketData={ticketData} assing={"ADDED BY"} />}
              {!fromUser && <UserTicket ticketData={ticketData} />}
            </Row>
          </Row>
          <Row align="middle" justify="space-between" className=" pt-1">
            <Col span={24}>
              <Divider />
            </Col>
            <Col>
              <div>
                <Row align="middle" gutter={5}>
                  <Col>
                    <DateSVG />
                  </Col>
                  <Col>Last modified on {dayjs().format("DD-MM-YYYY hh:mmA")}</Col>
                </Row>
              </div>
            </Col>
            <Col>
              <div className="fz-11" style={{ color: "#3A5EE3", cursor: "pointer" }}>
                <Row align="middle" gutter={5}>
                  <Col>
                    <IconlyLightOutlineSettingSVG fill="#3A5EE3" />
                  </Col>
                  <Col>View & Edit Log</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
}

const ticketPriority = [
  {
    label: "High",
    value: "HIGH",
  },
  {
    label: "Meduim",
    value: "MEDIUM",
  },
  {
    label: "Low",
    value: "LOW",
  },
];

const ticketTypeDisplay = {
  SERVICE_REQUEST: "Service Request",
  COMPLAINT: "Complaint",
  INQUIRY: "Inquiry",
};
const ticketType = [
  {
    label: "Service Request",
    value: "SERVICE_REQUEST",
  },
  {
    label: "Complaint",
    value: "COMPLAINT",
  },
  {
    label: "Inquiry",
    value: "INQUIRY",
  },
];

const ticketStatus = ["OPEN", "INPROGRESS", "SOLVED", "WAITING_FOR_CUSTOMER", "CLOSED"];

const prioritysColor = {
  HIGH: "#F40055",
  MEDIUM: "#F8B51D",
  LOW: "#5EAF2F",
};
