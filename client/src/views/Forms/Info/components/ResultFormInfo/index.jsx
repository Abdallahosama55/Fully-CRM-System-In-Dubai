import React, { useState } from "react";
import { Input, DatePicker, Select, Table, Button, Space, Flex, Form } from "antd";
import { AppstoreOutlined, BarsOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { ArrowDownSVG, CalendarSVG, SearchSVG, User2SVG, UserSVG } from "assets/jsx-svg";
import "./ResultFormInfo.css";
import StatusFormSvg from "assets/jsx-svg/StatusFormSvg";
import UserTypeSVG from "assets/jsx-svg/UserTypeSVG";
import GitSvg from "assets/jsx-svg/GitSvg";
import ListShapeSVG from "assets/jsx-svg/ListShapeSVG";
import Git2SVG from "assets/jsx-svg/Git2SVG";
import ListShape2SVG from "assets/jsx-svg/ListShape2SVG";
import CustomTableInfo from "./components/CustomTableInfo";
import CustomPiplineInfo from "./components/CustomPiplineInfo";

const { Option } = Select;

const dataSource = [
  {
    key: "1",
    name: "John",
    email: "John@email.com",
    date: "Jan 7, 2025",
    userType: "Normal",
  },
  {
    key: "2",
    name: "Nash",
    email: "Nash@email.com",
    date: "Jan 7, 2025",
    userType: "Normal",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "User Type",
    dataIndex: "userType",
    key: "userType",
  },
];

const ResultFormInfo = () => {
  const [viewMode, setViewMode] = useState("list");

  return (
    <div style={{ height: "78vh", position: "relative", overflow: "hidden" }}>
    {/* Scrollable Content */}
    <div
      style={{
        height: "calc(78vh - 72px)", // Adjust height based on footer height
        overflowY: "auto",
        padding: 24,
        background: "#fff",
      }}>
      {/* Header and Filter Controls */}
      {viewMode === "list" && (
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}>
          {/* Search & Filter UI goes here */}
          {/* ... your code unchanged ... */}
        </div>
      )}

      {/* Toggle View Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}>
        <div
          style={{
            display: "flex",
            border: "1px solid #d9d9d9",
            borderRadius: 8,
            overflow: "hidden",
          }}>
          <Button
            type={viewMode === "list" ? "primary" : "text"}
            icon={viewMode === "list" ? <ListShape2SVG /> : <ListShapeSVG />}
            size="small"
            onClick={() => setViewMode("list")}
            style={{
              backgroundColor: viewMode === "list" ? "#D0DEF7" : "#fff",
              borderRadius: 0,
              borderRight: "1px solid #d9d9d9",
            }}
          />
          <Button
            type={viewMode === "grid" ? "primary" : "text"}
            icon={viewMode === "grid" ? <Git2SVG /> : <GitSvg />}
            size="small"
            onClick={() => setViewMode("grid")}
            style={{
              backgroundColor: viewMode === "grid" ? "#D0DEF7" : "#fff",
              color: viewMode === "grid" ? "#2F80ED" : "#8C8C8C",
              borderRadius: 0,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      {viewMode === "list" ? (
        <CustomTableInfo dataSource={dataSource} columns={columns} />
      ) : (
        <CustomPiplineInfo />
      )}
    </div>

    {/* Fixed Footer */}
{/* Fixed Footer */}
<div
  style={{
    position: "absolute",  // Changed from fixed to absolute
    bottom: 0,
    left: 0,
    right: 0,  // Added to stretch within parent
    padding: "16px 24px",
    background: "#fff",
    borderTop: "1px solid #f0f0f0",
    zIndex: 1000,
  }}>
  <div style={{ 
    display: "flex", 
    justifyContent: "space-between",
    maxWidth: "100%",  // Ensure it doesn't overflow parent
    margin: "0 auto"   // Center if parent is wider
  }}>
    <Space>
      <Button>Cancel</Button>
      <Button>Previous</Button>
    </Space>
    <Button type="primary">Save</Button>
  </div>
</div>
  </div>
  );
};

export default ResultFormInfo;