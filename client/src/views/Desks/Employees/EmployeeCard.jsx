import { Avatar, Card, Typography } from "antd";
import { EditClockSVG } from "assets/jsx-svg";

import { useCallback } from "react";
import { stringAvatar } from "utils/string";
const EmployeeCard = ({ name, jobPosition, profileImage, isSelected, id, handleClick }) => {
  const onClick = useCallback(
    (event) => {
      if (typeof handleClick !== "function") return;
      handleClick(event, id);
    },
    [id],
  );

  const handleOpenEditWorkHour = () => {};

  return (
    <Card
      onClick={onClick}
      style={{
        border: `2px solid ${isSelected ? "#3A5EE3" : "#e5e5ea"}`,
      }}
      classNames="desks-employees-employee-card">
      <div
        style={{ cursor: "pointer", textAlign: "right" }}
        onClick={(e) => {
          e.stopPropagation();
          handleOpenEditWorkHour();
        }}>
        <EditClockSVG />
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}>
        <Avatar size={60} src={profileImage} {...stringAvatar(name)}></Avatar>
        <div style={{ display: "contents" }}>
          <Typography.Text ellipsis className="fw-500 fz-12">
            {name}
          </Typography.Text>
          <Typography.Text ellipsis style={{ color: "#8E8E93" }} className="fw-400 fz-12">
            {jobPosition ?? "-"}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
};
export default EmployeeCard;
