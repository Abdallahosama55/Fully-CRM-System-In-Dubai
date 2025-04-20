import React from "react";
import CustomCollapse from "../../components/CustomCollapse";
// icons
import { CallSVG } from "assets/jsx-svg";
// style
import "./styles.css";
const CallCard = ({ Due, by, title, description, type }) => {
  return (
    <CustomCollapse
      isWithOutMenu={true}
      isWithDueLabel={true}
      by={by}
      by_label={
        type === "scheduled" ? "Call Scheduled created" : "Logged Call by"
      }
      by_icon={<CallSVG width="11px" height="11px" color="#000" />}
      Due={Due}
    >
      <div className="call_body">
        <div>{title}</div>
        <div className="gc fz-12">{description}</div>
      </div>
    </CustomCollapse>
  );
};

export default CallCard;
