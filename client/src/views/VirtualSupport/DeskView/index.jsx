import React, { useState } from "react";
import { Col, Row } from "antd";
import MeetLeftSide from "../MeetLeftSide";
import "../styles.css";
import QueueTable from "../DeskQueue/Table";
import { useSearchParams } from "react-router-dom";
import Meeting from "views/Meeting";
const defaultActive = (value) => {
  switch (value) {
    case "MEETING_DESK":
      return "meeting";

    case "CUSTOMER_SERVICE_DESK":
      return "queue";
    default:
      return "queue";
  }
};
const omitMenu = (value) => {
  switch (value) {
    case "MEETING_DESK":
      return "queue";

    case "CUSTOMER_SERVICE_DESK":
      return "meeting";
    default:
      return "";
  }
};
const DeskView = () => {
  const [searchParams] = useSearchParams();
  const [collapsed, setCollapsed] = useState(true);
  const [active, setActive] = useState("meeting");
  return (
    <main className="virtual-support" style={{ minHeight: "100%" }}>
      <div style={{ display: "flex", height: "100vh" }} className="w-100" wrap={false}>
        <MeetLeftSide
          omitItems={[
            omitMenu(searchParams.get("meetingType")),
            "participant",
            "chat",
            "inventory",
            "tools",
            "counter",
            "counterUserSharedData",
            "crm",
            "productionTools",
            "desks",
          ]}
          isDesk={true}
          showCounterBtn={false}
          isHost={true}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeBtn={active}
          setActiveBtn={setActive}
          //   setHideSide={setHideSide}
          isMetaverseMeet={false}
        />

        <div
          style={{
            width: !collapsed ? "calc(100vw - 300px)" : "calc(100vw - 100px)",
            paddingInline: "4px",
            position: "relative",
            overflowY: "auto",
          }}>
          <Meeting isDesk></Meeting>
        </div>
      </div>
    </main>
  );
};
export default DeskView;
