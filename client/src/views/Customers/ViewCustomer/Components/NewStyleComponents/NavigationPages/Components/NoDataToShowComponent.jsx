import React, { useEffect, useState } from "react";
import "../../../../style.css";
import { NoDataToShowSVG } from "assets/jsx-svg";

export default function NoDataToShowComponent() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <NoDataToShowSVG />
        <div
          style={{
            marginTop: 24,
            color: "#030713",
            fontSize: 14,
            letterSpacing: 0.28,
            fontWeight: 500,
          }}>
          There’s No Data To Show Here
        </div>
      </div>
    </div>
  );
}
