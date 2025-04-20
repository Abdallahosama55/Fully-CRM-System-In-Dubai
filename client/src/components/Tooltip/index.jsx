import { Button, Popover, Typography } from "antd";
import React, { useState } from "react";
import "./styles.css";

function TooltipTicket({ children, titleData }) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      open={open}
      placement="topLeft"
      onOpenChange={handleOpenChange}
      content={<TooltipTitle titleData={titleData} setOpen={setOpen} />}
    >
      {children}
    </Popover>
  );
}
export default TooltipTicket;

function TooltipTitle({ titleData, setOpen }) {
  const { number, title, Description } = titleData;
  return (
    <div className="tooltip-ticket">
      <Typography.Title className="tooltip-ticket-title">
        Ticket #{number} Details
      </Typography.Title>
      <div className="title">
        <Typography.Text style={{ fontWeight: "600" }}>Title:</Typography.Text>
        <Typography.Text>{title}</Typography.Text>
      </div>
      <div className="description">
        <Typography.Text style={{ fontWeight: "600" }}>
          Description:
        </Typography.Text>
        <Typography.Text>{Description}</Typography.Text>
      </div>
      <div className="close-button">
        <Button onClick={() => setOpen(false)}>Close</Button>
      </div>
    </div>
  );
}
