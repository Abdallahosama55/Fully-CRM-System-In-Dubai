import React, { useEffect, useState } from "react";
import UserSolidSVG from "../../../../assets/jsx-svg/UserSolidSVG";

export default function CustomerMainInfoComponent({ img, name, jobTitle }) {
  return (
    <div className="customer-card">
      <div>{img ? <img src={img} /> : <UserSolidSVG style={{ height: 80 }} />}</div>
      <div className="name">{name}</div>
      <div className="job-title">{jobTitle}</div>
    </div>
  );
}
