import React, { useEffect, useState } from "react";

export default function TabComponent({ id, title, icon, isSelected, onClickTab }) {
  const selectedBackgroundColor = "#3A5EE3";
  const notSelectedBackgroundColor = "#FFFFFF";
  const selectedContentColor = "#FFFFFF";
  const notSelectedContentColor = "#8E8E93";

  return (
    <div
      onClick={() => onClickTab(id)}
      className="tab-item"
      style={{
        backgroundColor: isSelected ? selectedBackgroundColor : notSelectedBackgroundColor,
        width: 150,
      }}>
      <div style={{ height: "20px" }}>
        {React.cloneElement(icon, {
          color: isSelected ? selectedContentColor : notSelectedContentColor,
          fill: isSelected ? selectedContentColor : notSelectedContentColor,
        })}
      </div>
      <div style={{ color: isSelected ? selectedContentColor : notSelectedContentColor }}>
        {title}
      </div>
    </div>
  );
}
