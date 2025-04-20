import React, { useEffect, useState } from "react";
import "../style.css";

export default function CustomerInfoCard({ label, value, BGColor }) {
  return (
    <div className="customer-info-card" style={{ backgroundColor: BGColor }}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}
