import React from "react";
import { Button, Input, Row, Col } from "antd";
import { PlusSVG, SearchSVG } from "assets/jsx-svg";

import dayjs from "dayjs";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { convertButtons } from "./utils";

import "./styles.css";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import { useDrawer } from "hooks/useDrawer";

function Header({ convert, today, setConvert, setTday, meetingsPage = false, setRefresh }) {
  const DrawerAPI = useDrawer();
  const addTody = () => {
    setTday(dayjs());
  };
  const next = () => {
    switch (convert) {
      case "Year":
        return setTday(dayjs(today).add(1, "year"));
      case "Month":
        return setTday(dayjs(today).add(1, "M"));
      case "Week":
        return setTday(dayjs(today).add(1, "week"));
      case "Day":
        return setTday(dayjs(today).add(1, "day"));
      default:
        break;
    }
  };
  const prev = () => {
    switch (convert) {
      case "Year":
        return setTday(dayjs(today).subtract(1, "year"));
      case "Month":
        return setTday(dayjs(today).subtract(1, "M"));
      case "Week":
        return setTday(dayjs(today).subtract(1, "week"));
      case "Day":
        return setTday(dayjs(today).subtract(1, "day"));
      default:
        break;
    }
  };

  const todayText = () => {
    return {
      Year: dayjs(today).format("YYYY"),
      Month: dayjs(today).format("MMMM"),
      Week: `${dayjs(today).startOf("week").format("DD")}-${dayjs(today)
        .endOf("week")
        .format("DD MMMM")}`,
      Day: "Today",
    };
  };
  return (
    <Row className="calender-header" align="middle" gutter={10}>
      {DrawerAPI.Render}
      <Col span={7}>
        <Row align="middle" justify="space-between" style={{ paddingInline: "10px" }}>
          <Col>
            <div className={`calender ${meetingsPage && "fz-16"}`}>
              {meetingsPage ? "Meetings" : "Calender"}
            </div>
          </Col>
          <Col>
            <Button onClick={addTody} className="today">
              {todayText()[convert]}
            </Button>
          </Col>
          <Col>
            <div className="arrows">
              <LeftOutlined onClick={prev} />
              <RightOutlined onClick={next} />
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={17}>
        <Row align="middle" justify="space-between">
          {!meetingsPage && (
            <Col>
              <div className="day">{dayjs(today).format("MMMM YYYY")}</div>
            </Col>
          )}
          <Col>
            <div className="search">
              <Input
                addonBefore={
                  <>
                    <SearchSVG color="#272942" />
                  </>
                }
                placeholder="Search anything…"
              />
            </div>
          </Col>
          <Col>
            <Row align="middle" gutter={16}>
              <Col className="convert-buttons">
                {convertButtons.map((button, i) => (
                  <Button
                    key={i}
                    onClick={() => setConvert(button)}
                    className={`${convert === button && "active"}`}>
                    {button}
                  </Button>
                ))}
              </Col>
              {meetingsPage && (
                <Col>
                  <Button
                    style={{ background: "#272942", color: "#fff" }}
                    onClick={() => {
                      DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd setRefresh={setRefresh} DrawerAPI={DrawerAPI}/>);
                      DrawerAPI.open("40%");
                    }}>
                    <Row align="middle" gutter={[8, 0]} wrap={false}>
                      <Col>
                        <Row align="middle">
                          <PlusSVG />
                        </Row>
                      </Col>
                      <Col>New Meeting</Col>
                    </Row>
                  </Button>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
