import { Divider, Typography } from "antd";
import { AirPlanColoredSVG } from "assets/jsx-svg";
import React from "react";
const Header = ({ step }) => {
  return (
    <div className="header">
      <div className="content">
        <Typography className={"title fz-16 fw-500"}>
          <AirPlanColoredSVG /> View Forms
        </Typography>
      </div>
      <Divider className="divider" />
    </div>
  );
};
export default Header;
