import { Table } from "antd";
import { DateSVG, TimeSVG } from "assets/jsx-svg";
import dayjs from "dayjs";
import React from "react";
import { columns, data } from "./utils";

function Purchases() {
  return (
    <div>
      <div className="carts purchases">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "600" }}>Order #122 (3 Products)</div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              fontSize: "12px",
              color: "#8E8E93",
            }}
          >
            <div>
              <DateSVG width="10px" height="10px" color="#8E8E93" />{" "}
              {dayjs().format("ddd, MMMM DD, YYYY")}
            </div>
            <div>
              <TimeSVG width="10px" height="10px" color="#8E8E93" />{" "}
              {dayjs().format("h:ma")}
            </div>
          </div>
        </div>
        <div>
          <Table pagination={false} columns={columns} dataSource={data} />
          <div className="purchases-des">
            <div>Shipping</div>
            <div>$20</div>
          </div>
          <div className="purchases-des total">
            <div>Total</div>
            <div style={{ color: "#3A5EE3", fontWeight: "600" }}>$5220</div>
          </div>
        </div>
      </div>
      <div className="carts">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontWeight: "600" }}>Order #122 (3 Products)</div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              fontSize: "12px",
              color: "#8E8E93",
            }}
          >
            <div>
              <DateSVG width="10px" height="10px" color="#8E8E93" />{" "}
              {dayjs().format("ddd, MMMM DD, YYYY")}
            </div>
            <div>
              <TimeSVG width="10px" height="10px" color="#8E8E93" />{" "}
              {dayjs().format("h:ma")}
            </div>
          </div>
        </div>
        <div>
          <Table pagination={false} columns={columns} dataSource={data} />
          <div className="purchases-des">
            <div>Shipping</div>
            <div>$20</div>
          </div>
          <div className="purchases-des total">
            <div>Total</div>
            <div style={{ color: "#3A5EE3", fontWeight: "600" }}>$5220</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Purchases;
