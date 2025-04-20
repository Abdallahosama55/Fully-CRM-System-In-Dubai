import React, { useState, useEffect } from "react";
import { WeeklyCalendar } from "./weekFull";

import "./styles.css";
import dayjs from "dayjs";
import CalendarService from "services/calendar.service";

function Week({ today, meetingsPage = false, refresh, setRefresh }) {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await CalendarService.getData("week", today);
      setData(res.data.data);
    })();
  }, [today, refresh]);

  useEffect(() => {
    const formattedMeetings = [];

    for (const [date, dateInfo] of Object.entries(data)) {
      const meetings = dateInfo.meetings || [];

      for (const meeting of meetings) {
        const startTimeStr = `${date}T${meeting.fromTime}.000Z`;
        const endTimeStr = `${date}T${meeting.toTime}.000Z`;
        const title = meeting.name || "";
        const description = meeting.description || null;
        const meetingLink = meeting.meetingLink || "";
        const eventId = meeting.id || null;
        const invites = meeting.invites || null;

        const startTime = new Date(startTimeStr);
        const endTime = new Date(endTimeStr);

        const formattedMeeting = {
          id: meeting.id,
          startTime: startTime,
          endTime: endTime,
          title: title,
          description: description,
          meetingLink: meetingLink,
          eventId: eventId,
          invites: invites,
        };

        formattedMeetings.push(formattedMeeting);
      }
    }
    setEvents(formattedMeetings);
  }, [data]);

  return (
    <div className="week">
      <WeeklyCalendar
        meetingsPage={meetingsPage}
        weekends={true}
        events={events}
        value={today && new Date(dayjs(today).format("MM-DD-YYYY"))}
        setEvents={setEvents}
        setRefresh={setRefresh}
      />
    </div>
  );
}

export default Week;
