import { Avatar, Col, Row, Typography } from "antd";
import React from "react";

function UserTicket({ ticketData, assing = "ASSIGN TO" }) {
  return (
    <>
      <Col>
        <Row align="middle" gutter={[8, 0]} wrap={false}>
          <Col>
            <Avatar size={36} src={ticketData?.employee?.profileImage} />
          </Col>
          <Col>
            <Row>
              <Col xs={24} style={{ lineHeight: "11px" }}>
                <Typography.Text
                  style={{
                    fontSize: "11px",
                    color: "#8E8E93",
                  }}
                >
                  {assing}
                </Typography.Text>
              </Col>
              <Col xs={24}>
                <Typography.Text className="fz-12 fw-500">
                  {ticketData?.employee?.fullName}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default UserTicket;
