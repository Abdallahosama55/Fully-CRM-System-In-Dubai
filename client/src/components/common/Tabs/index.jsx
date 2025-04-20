import React from "react";
import { Tabs as AntTabs } from "antd";
import "./styles.css";
const Tabs = ({ className = "", ...props }) => {
  return <AntTabs className={"our_custom_tabs " + className} {...props} />;
};

export default Tabs;
