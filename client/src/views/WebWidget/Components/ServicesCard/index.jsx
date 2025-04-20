import React from "react";
import { Flex } from "antd";
import { Link } from "react-router-dom";

import "./style.css";

const customCss = (type) => {
  switch (type) {
    case "call":
      return {
        background: "linear-gradient(180deg, rgb(39 96 243 / 11%) 0%, #2760f326 100%)",
      };
    case "ticket":
      return {
        background: "linear-gradient(180deg, rgb(249 83 162 / 9%) 0%, #f953a23b 100%)",
      };
    default:
      return {};
  }
};
const avatarCustomColor = (type) => {
  switch (type) {
    case "call":
      return {
        background: "#2779f3",
      };
    case "ticket":
      return {
        background: "#f953a2",
      };
    default:
      return {};
  }
};
const ServicesCard = ({ type, title, link, subTitle }) => {
  return (
    <section style={customCss(type)} className={"widget-services-card"}>
      <Flex justify="center">
        <div style={avatarCustomColor(type)} className={"circle"}></div>
      </Flex>
      <div className="item">
        <p className="title">{title}</p>
        <p className="sub-title ">{subTitle}</p>
      </div>
      <Link to={link}>
        <div className="btn">Start</div>
      </Link>
    </section>
  );
};
export default ServicesCard;
