import { Popover } from "antd";
import React from "react";
import Content from "./content";
import "./styles.css";

function PopoverCalendar({
  children,
  data,
  date,
  setRefresh,
  meetingsPage = false,
  day,
  showJoin = true,
}) {
  return (
    <Popover
      overlayClassName={`popover-calendar ${meetingsPage && "meet-page"}`}
      placement={`${meetingsPage ? "topLeft" : "leftBottom"}`}
      content={
        <Content
          data={data}
          date={date}
          meetingsPage={meetingsPage}
          setRefresh={setRefresh}
          day={day}
          showJoin={showJoin}
        />
      }>
      {children}
    </Popover>
  );
}

export default PopoverCalendar;
