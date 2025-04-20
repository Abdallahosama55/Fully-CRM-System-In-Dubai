import { Row } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { hours } from "./utils";
import Hours from "./hours/Hours";
import CalendarService from "services/calendar.service";

import "./styles.css";

function Day({ today, refresh, setRefresh, meetingsPage = false }) {
  const [events, setEvents] = useState();
  useEffect(() => {
    (async () => {
      const res = await CalendarService.getData("day", today);
      setEvents(res.data.data);
    })();
  }, [today, refresh]);

  return (
    <div className="day">
      <div className="head">
        <div>GMT+03</div>
        <div className="day-head">{dayjs(today).format("ddd D")}</div>
      </div>
      {hours.map((hour, i) => (
        <Row key={i} className="row">
          <Hours
            setEvents={setEvents}
            setRefresh={setRefresh}
            meetingsPage={meetingsPage}
            hour={hour}
            events={events}
            today={today}
            numberOfHours={i}
          />
        </Row>
      ))}
    </div>
  );
}

export default Day;
