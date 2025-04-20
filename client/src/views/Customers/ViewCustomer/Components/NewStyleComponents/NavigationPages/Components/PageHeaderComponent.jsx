import React, { useEffect, useState } from "react";
import EditCustomerSVG from "assets/jsx-svg/EditCustomerSVG";

export default function PageHeaderComponent({ title, onEditClicked, isEditState, setIsEditState }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 13,
        marginTop: 13,
      }}>
      <div
        style={{
          color: "#030713",
          fontSize: 14,
          fontWeight: 600,
        }}>
        {title}
      </div>
      {onEditClicked &&
        (isEditState ? (
          <div
            onClick={() => setIsEditState(!isEditState)}
            style={{ cursor: "pointer", color: "red" }}>
            <span style={{ marginRight: 4 }}>{/* <EditCustomerSVG /> */}</span>
            Close
          </div>
        ) : (
          <div onClick={onEditClicked} style={{ cursor: "pointer", color: "#3a5ee3" }}>
            <span style={{ marginRight: 4 }}>
              <EditCustomerSVG />
            </span>
            Edit
          </div>
        ))}
    </div>
  );
}
