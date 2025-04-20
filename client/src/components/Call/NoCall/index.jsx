import { NoCallSVG, PhoneCallSVG } from "assets/jsx-svg";
import React from "react";
import { Typography } from "antd";
import "../call.css";
import Canceling from "../Canceling";

function NoCall() {
  return (
    <div className="call">
      <div className="call-main-img">
        <NoCallSVG />
      </div>
      <div className="texts">
        <Typography.Text className="description font-wight-600">
          No call can be made at the moment, the call time has expired <br />
          Set another date to make a new call
        </Typography.Text>
        <Canceling />
      </div>
    </div>
  );
}

export default NoCall;
