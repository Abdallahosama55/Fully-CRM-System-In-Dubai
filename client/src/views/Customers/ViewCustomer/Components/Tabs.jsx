import React, { createFactory, useState } from "react";
import UserSolidSVG from "../../../../assets/jsx-svg/UserSolidSVG";
import TabComponent from "./TabComponent";

export default function Tabs({ items, onClick, setSelectdTab }) {
  const [tabsItems, setTabsItems] = useState(items || []);
  const onClickTab = (id) => {
    setSelectdTab(id);
    onClick(id);
    setTabsItems(
      tabsItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            isSelected: true,
          };
        } else {
          return {
            ...item,
            isSelected: false,
          };
        }
      }),
    );
  };
  return (
    <div style={{ display: "flex" }}>
      {tabsItems?.map((item) => (
        <div style={{ marginRight: 10 }}>
          <TabComponent
            onClickTab={onClickTab}
            id={item.id}
            icon={item.icon}
            isSelected={item.isSelected}
            title={item.title}
            key={item.id}
          />
        </div>
      ))}
    </div>
  );
}
