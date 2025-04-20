import React, { useEffect, useState } from "react";
import "../style.css";

export default function CustomerPropertyCard({ img }) {
  const heightImage = 100;
  const widthImage = 160;
  const myStyle = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url('" + img + "')",
    height: heightImage,
    width: widthImage,
    borderRadius: 10,
  };
  return (
    <div className="customer-Property-card">
      <div style={myStyle}></div>
    </div>
  );
}
