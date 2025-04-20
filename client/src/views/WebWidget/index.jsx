import React from "react";
import "./style.css";
import Header from "./Components/Header";
import ServicesCard from "./Components/ServicesCard";
import { Flex } from "antd";
import { Outlet } from "react-router-dom";
const items = [
  {
    link: "schedule-call",
    title: " Schedule a call",
    subTitle: "call",
    image: null,
    type: "call",
  },
  {
    type: "ticket",
    link: "ticket",
    title: "Submit ticket",
    subTitle: "send ticket",
    image: null,
  },
];
const WebWidget = ({ children }) => {
  return (
    <section className="web-widget-root">
      <Header />
      <div className=" content">
        <Flex gap={16} className="mt-1" justify="center">
          {items.map((item) => {
            return <ServicesCard key={item.title} {...item} />;
          })}
        </Flex>
      </div>
      {children && children}
    </section>
  );
};
export default WebWidget;
