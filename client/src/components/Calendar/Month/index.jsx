import { Calendar } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.css";
import MonthMeet from "./month/monthMeet";
import dayjs from "dayjs";
import CalendarService from "services/calendar.service";

function Month({ today, meetingsPage, setRefresh, refresh }) {
  const [events, setEvents] = useState();

  useEffect(() => {
    (async () => {
      const res = await CalendarService.getData("month", today);
      setEvents(res.data.data);
    })();
  }, [today, refresh]);

  const cellRender = (current, info) => {
    return (
      <MonthMeet
        current={current}
        events={events}
        setEvents={setEvents}
        setRefresh={setRefresh}
        meetingsPage={meetingsPage}
      />
    );
  };
  return (
    <div className="month">
      <Calendar cellRender={cellRender} headerRender={() => <></>} value={today || dayjs()} />
    </div>
  );
}

export default Month;
