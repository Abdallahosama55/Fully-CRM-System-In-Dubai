import { Popover } from "antd";
import React, { useRef, useState } from "react";
import Content from "./content";
import "./styles.css";

function PopoverCalendar({
  children,
  data,
  date,

  meetingsPage = false,
  day,
  showJoin = true,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <Popover
      open={visible}
      ref={ref}
      onOpenChange={setVisible}
      trigger="click"
      overlayClassName={`popover-calendar ${meetingsPage && "meet-page"}`}
      placement={`${meetingsPage ? "topLeft" : "leftBottom"}`}
      content={
        <Content
          handleClose={handleClose}
          data={data}
          date={date}
          meetingsPage={meetingsPage}
          day={day}
          showJoin={showJoin}
        />
      }>
      {children}
    </Popover>
  );
}

export default PopoverCalendar;
