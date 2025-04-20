import {
  IconIonicSVG,
  PhoneCallSVG,
  RainbowSVG,
  SoundMaxSVG,
} from "assets/jsx-svg";
import React from "react";
import { Image, Typography } from "antd";
import logo from "assets/images/logo.png";

import "../call.css";
import MicOffSVG from "assets/jsx-svg/MicOffSVG";

function Call() {
  return (
    <div className="call gap">
      <div className="call-main-img">
        <div className="main-and-logo">
          <RainbowSVG />
          <div className="logo">
            <div>
              <Image
                preview={false}
                width={60}
                height={60}
                src={logo}
                className="clickable"
              />
            </div>
          </div>
        </div>
        <div className="VindoCustomer">
          <Typography.Text>Vindo Customer Support</Typography.Text>
          <br />
          <Typography.Text>00:01</Typography.Text>
        </div>
      </div>
      <div className="texts">
        <div className="You-are-muted">
          <IconIonicSVG />
          <Typography.Text>You are muted, unmute to talk.</Typography.Text>
        </div>

        <div className="phone-stats">
          <div className="Sound-max">
            <SoundMaxSVG />
          </div>
          <div className="phone-call">
            <PhoneCallSVG />
          </div>
          <div className="Mic-off">
            <MicOffSVG />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Call;
