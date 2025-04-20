import { Col, Row, Typography, Avatar, Tooltip } from "antd";
import React from "react";
import dayjs from "dayjs";

import { EditSVG, IconlyLightOutlineCalendar, IconlyLightOutlineTimeCircle } from "assets/jsx-svg";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";

import "./styles.css";
import { useDrawer } from "hooks/useDrawer";

function Content({ data, date, day, meetingsPage, showJoin, setRefresh }) {
  const DrawerAPI = useDrawer();
  const {
    id,
    description,
    name,
    fromTime,
    toTime,
    meetingLink,
    endTime,
    startTime,
    title,
    invites,
  } = data;

  return (
    <>
    {DrawerAPI.Render}
      <div className="popover-calendar-title">
        <Row align="middle" justify="space-between">
          <Col>
            <Tooltip title={name || title || "New Meeting"}>
              <Typography.Title style={{ maxWidth: "180px" }} ellipsis>
                {name || title || "New Meeting"}
              </Typography.Title>
            </Tooltip>
          </Col>
          <Col style={{ cursor: "pointer" }}>
            <div
              onClick={() => {
                DrawerAPI.open("40%");
                DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd id={id} setRefresh={setRefresh} DrawerAPI={DrawerAPI} />);
              }}>
              <EditSVG color="#3A5EE3" />
            </div>
          </Col>
        </Row>
        <div className="title-time">
          <div>
            <div className="center-items">
              <IconlyLightOutlineCalendar />
            </div>
            <Typography.Text>
              {startTime
                ? dayjs(`${startTime}`).format("dd, MMMM")
                : dayjs(`${date}T${fromTime}`).format("dd, MMMM")}
            </Typography.Text>
          </div>
          <div>
            <div className="center-items">
              <IconlyLightOutlineTimeCircle />
            </div>
            <Typography.Text>
              {startTime
                ? `${dayjs(`${startTime}`).format("h:mm")} - ${dayjs(`${endTime}`).format("h:mmA")}`
                : `${dayjs(`${date}T${fromTime}`).format("h:mm")} - ${dayjs(
                    `${date}T${toTime}`,
                  ).format("h:mmA")}`}
            </Typography.Text>
          </div>
        </div>
        <hr />
      </div>
      <div className="popover-calendar-content">
        {description && (
          <div className="description-container">
            <div className="description">{description}</div>
          </div>
        )}

        <Row>
          <Col span={24} className="fz-14 fw-500">
            Members ({invites ? invites.length : "0"})
          </Col>
          <Col span={24} className="invites">
            {invites &&
              invites.map((invite) => (
                <Row align="middle" style={{ paddingTop: "8px" }} gutter={12}>
                  <Col>
                    <Avatar size={32} icon={<div>{invite.slice(0, 2)}</div>} />
                  </Col>
                  <Col>
                    <div className="invites fw-500">{invite}</div>
                  </Col>
                </Row>
              ))}
          </Col>
        </Row>

        {showJoin && (
          <>
            <div className="join  meetings-page-join">
              <a href={meetingLink} target="_blank" rel="noreferrer">
                Join
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Content;
