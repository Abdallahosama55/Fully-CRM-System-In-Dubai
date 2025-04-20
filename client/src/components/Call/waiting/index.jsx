import { PhoneCallSVG, WaitingSVG } from "assets/jsx-svg";
import React from "react";
import { Typography } from "antd";
import "../call.css";
import Canceling from "../Canceling";

function Waiting() {
  return (
    <div className="call">
      <div className="call-main-img">
        <WaitingSVG />
      </div>
      <div className="texts">
        <Typography.Text className="main-text">
          THE CALL DATE HAS NOT STARTED YET
        </Typography.Text>
        <Typography.Text className="description">
          Your call begins on Thursday at 8:00 pm
        </Typography.Text>
        <Canceling />
      </div>
    </div>
  );
}

export default Waiting;
