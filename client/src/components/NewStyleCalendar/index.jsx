import { useState } from "react";
import Year from "./year";
import Week from "./week";
import Header from "./header";
import Month from "./Month";
import Day from "./Day";
import LeftCalendar from "./left-calendar";
import { Row, Col } from "antd";

import "./styles.css";
import dayjs from "dayjs";
import Agenda from "./Agenda";

const NewStyleCalendar = () => {
  const [convert, setConvert] = useState("Week");
  const [today, setTday] = useState(dayjs());

  return (
    <div className="calendar-container">
      <Header today={today} setConvert={setConvert} setTday={setTday} convert={convert} />
      <Row className="body" gutter={10}>
        <Col style={{ maxWidth: "356px" }} span={7}>
          <LeftCalendar today={today} setTday={setTday} />
        </Col>
        <Col className="calendar-right-side">
          {convert === "Year" && <Year today={today} />}
          {convert === "Month" && <Month today={today} />}
          {convert === "Week" && <Week today={today} />}
          {convert === "Day" && <Day today={today} />}
          {convert === "Agenda" && <Agenda today={today} />}
        </Col>
      </Row>
    </div>
  );
};

export default NewStyleCalendar;
