import { Menu } from "antd";
import { useState } from "react";
import "./styles.css";

const TabsMenu = ({ tabs, defaultTabKey, onTabChanged }) => {
  const [currentTab, setCurrentTab] = useState(defaultTabKey ?? tabs?.[0]?.key);

  const onChange = (e) => {
    setCurrentTab(e.key);
    onTabChanged?.(e.key);
  };

  return (
    <Menu
      className="tabs-menu"
      onClick={onChange}
      selectedKeys={[currentTab]}
      mode="horizontal"
      items={tabs}
    />
  );
};

export default TabsMenu;
