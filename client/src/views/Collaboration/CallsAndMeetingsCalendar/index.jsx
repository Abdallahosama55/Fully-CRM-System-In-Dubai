import { useState } from "react";
import dayjs from "dayjs";
import { Row, Col } from "antd";

import Day from "components/Calendar/Day";
import Header from "components/Calendar/header";
import LeftCalendar from "components/Calendar/left-calendar";
import Year from "components/Calendar/year";
import Month from "components/Calendar/Month";
import Week from "components/Calendar/week";

import "./styles.css";

function Meetings() {
  const [convert, setConvert] = useState("Day");
  const [today, setTday] = useState(dayjs());
  const [refresh, setRefresh] = useState(true);

  return (
    <div className="calendar-container meetings">
      <Header
        today={today}
        setConvert={setConvert}
        setTday={setTday}
        convert={convert}
        meetingsPage={true}
        setRefresh={setRefresh}
      />
      <Row className="body" gutter={10}>
        <Col style={{ maxWidth: "356px" }} span={7}>
          <LeftCalendar today={today} setTday={setTday} />
        </Col>
        <Col className="calendar-right-side">
          {convert === "Day" && (
            <Day today={today} meetingsPage={true} setRefresh={setRefresh} refresh={refresh} />
          )}
          {convert === "Year" && (
            <Year today={today} meetingsPage={true} setRefresh={setRefresh} refresh={refresh} />
          )}
          {convert === "Month" && (
            <Month today={today} meetingsPage={true} setRefresh={setRefresh} refresh={refresh} />
          )}
          {convert === "Week" && (
            <Week today={today} meetingsPage={true} setRefresh={setRefresh} refresh={refresh} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Meetings;
