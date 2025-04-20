import { Avatar, Col, Row, Typography } from "antd";
import TicketFile from "../TicketFile";

import logo from "assets/images/vverse.png";

export default function TicketReply({ reply, ticketData }) {
  return (
    <div
      className="ticket-replay"
      key={reply.content.id}
      style={{
        background: reply.content.fromVindo && "#2729420f",
        borderColor: reply.content.fromVindo && "transparent",
      }}>
      <Row gutter={[0, 16]}>
        <Col xs={24}>
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Row gutter={[8, 8]} align="middle">
                <Col>
                  <Avatar
                    size={36}
                    style={{
                      background: reply.content.fromVindo ? "#fff" : "#0318D626",
                      color: "#0318D6",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                    className="vindo-avatar"
                    src={reply.content.fromVindo && logo}>
                    {ticketData.customer &&
                      ticketData.customer.fullName
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                  </Avatar>
                </Col>
                <Col>
                  <Row>
                    <Col xs={24}>
                      <Typography.Text className="fz-12 fw-500">
                        {reply.content.fromVindo
                          ? "Vindo Virtual support"
                          : ticketData.customer && ticketData.customer.fullName}
                      </Typography.Text>
                    </Col>
                    <Col xs={24} style={{ lineHeight: "11px" }}>
                      <Typography.Text
                        style={{
                          fontSize: "11px",
                          color: "#8E8E93",
                        }}>
                        {reply.content.fromVindo ? "vindo@vverse.co" : ticketData.email}
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
                {reply.content.date}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row gutter={[0, 8]}>
            <Col xs={24}>
              <Typography.Text className="fz-12">{reply.content.message}</Typography.Text>
            </Col>
            {reply.files.length ? (
              <Col xs={24}>
                <Row gutter={[12, 12]}>
                  {reply.files.map((file) => (
                    <Col>
                      <TicketFile attachment={file} />
                    </Col>
                  ))}
                </Row>
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
