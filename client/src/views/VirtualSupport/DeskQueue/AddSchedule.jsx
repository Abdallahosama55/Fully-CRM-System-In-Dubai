import React from "react";
import { Button } from "antd";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import MeetingAddIcon from "assets/jsx-svg/MeetingAddIcon";
import { useDrawer } from "context/drawerContext";

const AddSchedule = () => {
  const DrawerAPI = useDrawer();
  return (
    <Button
      style={{ color: "white" }}
      classNames="virtial-support-desk-queue-add-schedual-button"
      onClick={() => {
        DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd setRefresh={() => {}} />);
        DrawerAPI.open("40%");
      }}
      icon={<MeetingAddIcon fill="#fff" />}>
      Add Schedule
    </Button>
  );
};

export default AddSchedule;
