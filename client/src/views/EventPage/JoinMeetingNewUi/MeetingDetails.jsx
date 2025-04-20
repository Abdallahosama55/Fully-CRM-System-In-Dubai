import { Col, Row, Typography, Grid } from "antd";
import dayjs from "dayjs";

import { CalenderSVG2, DateSVG, TimeSVG } from "assets/jsx-svg";
import AdmissionSVG from "assets/jsx-svg/AdmissionSVG";
import CategorySVG from "assets/jsx-svg/CategorySVG";
import ClockSVG from "assets/jsx-svg/ClockSVG2";
import noVerse from "assets/images/meetingBg.jpg";

import "./styles.css";

const durationUnits = {
  MIN: "minute",
  HOUR: "hour",
  DAY: "day",
};

const MeetingDetails = ({ eventData }) => {
  const eventDate = dayjs(eventData.startDate);
  // Calculate the end time by adding the duration in minutes to the start time
  const endEventTime = eventDate.add(
    eventData.duration || 0,
    durationUnits[eventData.durationUnit] || "minute",
  );
  const screens = Grid.useBreakpoint();
  const { xs } = screens;

  return (
    <Row gutter={[0, 24]}>
      {eventData.invitationCard && (
        <Row
          span={24}
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundSize: "cover",
            height: 210,
            backgroundImage: `url(${eventData?.invitationCard || noVerse})`,
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
          gutter={[8, 32]}>
          <Col xs={24}>
            <Row align="middle" gutter={[8, 0]} className="center-items">
              <Typography.Text className="fw-600" style={{ color: "white", fontSize: "18px" }}>
                {eventData?.title}
              </Typography.Text>
            </Row>
            <Row gutter={[8, 8]} className="center-items">
              <Col lg={5} xs={14}>
                <Row
                  align="middle"
                  gutter={[8, 0]}
                  style={{
                    background: "#FFFFFF33",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                  }}
                  className={`time-holder  ${xs ? "center-items" : "flex-row-reverse"}`}>
                  <Col>
                    <Row align="middle">
                      <DateSVG color="#ffffff" />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text className="fw-500" style={{ color: "white" }}>
                      {dayjs(eventData.date).format("MMM DD, YYYY")}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>

              <Col lg={5} xs={14} offset={xs ? 0 : 1}>
                <Row
                  align="middle"
                  gutter={[8, 0]}
                  className={` ${xs ? "center-items" : ""}`}
                  style={{
                    background: "#FFFFFF33",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                  }}>
                  <Col>
                    <Row align="middle">
                      <TimeSVG color="#ffffff" />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text className="fw-500" style={{ color: "white" }}>
                      {dayjs(eventData.date).format("HH:mm:ss")}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      <Row style={{ width: "100%" }}>
        <Col xs={12} lg={12}>
          <Typography.Text className="text-title" style={{ display: "flex" }}>
            <CalenderSVG2 style={{ marginRight: "8px" }} />
            Date
          </Typography.Text>
        </Col>

        <Col xs={12} lg={12} className="flex-row-reverse">
          <Typography.Text className="lbl-description">
            {dayjs(eventData?.date).format("MMM DD, YYYY") || "--"}
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col xs={12} lg={12}>
          <Typography.Text className="text-title" style={{ display: "flex" }}>
            <ClockSVG style={{ marginRight: "8px" }} />
            Time
          </Typography.Text>
        </Col>

        <Col xs={12} lg={12} className="flex-row-reverse">
          <Typography.Text className="lbl-description">
            {`${dayjs(eventData.startDate).format("hh:mm A") || "--"} - ${
              dayjs(endEventTime).format("hh:mm A") || "--"
            }`}
          </Typography.Text>
        </Col>
      </Row>

      <Row style={{ width: "100%" }}>
        <Col xs={12} lg={12}>
          <Typography.Text className="text-title" style={{ display: "flex" }}>
            <CategorySVG style={{ marginRight: "8px" }} />
            Category
          </Typography.Text>
        </Col>

        <Col xs={12} lg={12} className="flex-row-reverse">
          {eventData.tags
            ? eventData.tags.map((item) => (
                <Typography.Text
                  key={item}
                  className="lbl-description"
                  style={{ marginLeft: "8px" }}>
                  #{item}
                </Typography.Text>
              ))
            : "--"}
        </Col>
      </Row>

      <Row style={{ width: "100%" }}>
        <Col xs={12} lg={12}>
          <Typography.Text className="text-title" style={{ display: "flex" }}>
            <AdmissionSVG style={{ marginRight: "8px" }} />
            Admission
          </Typography.Text>
        </Col>

        <Col xs={12} lg={12} className="flex-row-reverse">
          <Typography.Text className="lbl-description">Free</Typography.Text>
        </Col>
      </Row>

      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Row gutter={[0, 12]} className="flex-column">
            <Typography.Text className="text-title">Description</Typography.Text>
            <Typography.Text className="lbl-description" style={{ display: "flex" }}>
              {`${eventData.description || `--`}`}
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default MeetingDetails;
