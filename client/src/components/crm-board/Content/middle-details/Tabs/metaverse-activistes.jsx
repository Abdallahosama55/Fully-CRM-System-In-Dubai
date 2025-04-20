import React from "react";
import { DateSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import { Col, Image, Row } from "antd";
import startMeetBg from "assets/images/startMeetBg.png";

// style
import "../styles.css";
const arrays = [1, 2, 3, 4, 5, 6];
function MetaverseActivistes() {
  return (
    <>
      {arrays.map((array) => (
        <Row key={array} className="metaverse-activistes">
          <Col span={14}>
            <div className="time">
              <DateSVG width="10px" height="10px" color="#8E8E93" />
              {dayjs().format("ddd, MMMM DD, YYYY")}
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div>Jones stood in front of of addidas shoes</div>
              <div className="time">12:30 pm</div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div>Jones stood in front of of addidas shoes</div>
              <div className="time">12:30 pm</div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div>Jones stood in front of of addidas shoes</div>
              <div className="time">12:30 pm</div>
            </div>
          </Col>
          <Col className="name-img" span={6}>
            <div>Verese name</div>
            <Image preview={false} src={startMeetBg} />
          </Col>
        </Row>
      ))}
    </>
  );
}

export default MetaverseActivistes;
