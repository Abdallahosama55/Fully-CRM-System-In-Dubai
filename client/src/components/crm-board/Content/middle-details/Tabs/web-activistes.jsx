import React, { Fragment } from "react";
import "../styles.css";
import { DateSVG } from "assets/jsx-svg";
import dayjs from "dayjs";

const arrays = [1, 2, 3, 4, 5, 6];

function WebActivistes() {
  return (
    <div>
      <div className="carts web-activistes">
        <div className="time">
          <DateSVG width="10px" height="10px" color="#8E8E93" />
          {dayjs().format("ddd, MMMM DD, YYYY")}
        </div>
        {arrays.map((array) => (
          <Fragment key={array}>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <div>Jones stood in front of of addidas shoes</div>
              <div className="time">12:30 pm</div>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="carts web-activistes">
        <div className="time">
          <DateSVG width="10px" height="10px" color="#8E8E93" />
          {dayjs().format("ddd, MMMM DD, YYYY")}
        </div>
        {arrays.map((array) => (
          <Fragment key={array}>
            <div
              style={{
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <div>Jones stood in front of of addidas shoes</div>
              <div className="time">12:30 pm</div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default WebActivistes;
