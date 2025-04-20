import React, { useState, useEffect } from "react";

import Calendar from "./week";
import { daysToWeekObject, getDatesInWeek } from "./utils";

export function WeeklyCalendar({
  events,
  onEventClick,
  onSelectDate,
  weekends = false,
  value,
  meetingsPage,
  setEvents,
  setRefresh,
}) {
  const [startWeek, setStartWeek] = useState(getDatesInWeek(value || new Date()));
  const weekPeriod = {
    startDate: startWeek[0],
    endDate: startWeek[startWeek.length - 1],
  };

  useEffect(() => {
    if (value && getDatesInWeek(value)[0] !== startWeek[0]) {
      setStartWeek(getDatesInWeek(value));
    }
  }, [value]);

  useEffect(() => {
    onSelectDate && onSelectDate(startWeek);
  }, [startWeek]);

  const weekObject = daysToWeekObject(events, startWeek);
  return (
    <Calendar
      weekDates={weekPeriod}
      getDayEvents={weekObject}
      onEventClick={onEventClick}
      weekends={weekends}
      meetingsPage={meetingsPage}
      setEvents={setEvents}
      setRefresh={setRefresh}
    />
  );
}
