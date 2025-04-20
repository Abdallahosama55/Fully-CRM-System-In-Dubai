import { CallBusySVG, PhoneCallSVG } from "assets/jsx-svg";
import React from "react";
import { Typography } from "antd";
import "../call.css";
import Canceling from "../Canceling";

function Busy() {
  return (
    <div className="call">
      <div className="call-main-img">
        <CallBusySVG />
      </div>
      <div className="texts">
        <Typography.Text className="main-text">please wait</Typography.Text>
        <Typography.Text className="description">
          Other clients are waiting for you
          <br /> You will be linked with a member of staff once all
          <br /> existing calls have ended
        </Typography.Text>
        <Canceling />
      </div>
    </div>
  );
}

export default Busy;
