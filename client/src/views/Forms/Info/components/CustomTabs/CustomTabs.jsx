import React from "react";
import { Tabs } from "antd";
import "./CustomTabs.css";

const items = [
  {
    key: "1",
    label: "Info / Questions",
  },
  {
    key: "2",
    label: "Results",
  },
];

const CustomTabs = () => (
  <div className="tabs-container_wrapper">
    <Tabs defaultActiveKey="1" items={items} className="custom-tabs" />
  </div>
);

export default CustomTabs;
