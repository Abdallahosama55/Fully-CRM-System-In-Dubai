import { ClockCircleFilled } from "@ant-design/icons";
import { Flex, Tooltip, Typography } from "antd";
import {
  AirLineDownSVG,
  AirlineSVG,
  AllotmentSVG,
  ArrivalSVG,
  BadgeCheckSVG,
  CharterSourceSVG,
} from "assets/jsx-svg";
import Badge from "components/common/Badge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin

// Extend Day.js with the UTC plugin
dayjs.extend(utc);

// Remove the last occurrence of "Airport"
const removeLastAirport = (name) => {
  if (!name) return name; // Return if name is undefined or null

  const lastIndex = name?.toLowerCase()?.lastIndexOf("airport");
  if (lastIndex === -1 && name?.toLowerCase()?.endsWith("airport")) return name; // Return if "Airport" is not found

  return name.slice(0, lastIndex) + name.slice(lastIndex + "Airport".length);
};

export const renderColumns = (isHome = false) => {
  return [
    {
      width: "100px",
      ellipsis: true,
      fixed: "left",
      onCell: (record, index) => ({
        style: {
          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", // Alternate row colors
        },
      }),
      title: (
        <Flex gap={8} align="center">
          flight No
        </Flex>
      ),
      dataIndex: "flightNo",
      style: { zIndex: 20000 },
      key: "flightNo",
      editable: true,
      inputType: "text",
      render: (_, record) => (
        <p className="fw-700">
          {record?.outboundFlight?.flightNo ?? record?.outboundFlight?.flightNo}
        </p>
      ),
    },
    isHome && {
      width: "144px",
      ellipsis: true,
      editable: true,
      fixed: "left",
      onCell: (record, index) => ({
        style: {
          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", // Alternate row colors
        },
      }),
      style: { zIndex: 20000, background: "red" },
      title: (
        <Flex gap={8} align="center">
          <AirlineSVG />{" "}
          <Typography.Text ellipsis={{ tooltip: "Airline Name" }}>Airline Name</Typography.Text>
        </Flex>
      ),
      dataIndex: "airlineCompanyId",
      inputType: "airline",
      key: "airline",
      render: (_, record) => (
        <p className="fw-700" style={{ textTransform: "capitalize" }}>
          {record?.outboundFlight?.companyName ?? record?.outboundFlight?.airlineCompany?.name}
        </p>
      ),
    },
    isHome && {
      width: "144px",
      title: (
        <Flex gap={8} align="center">
          <CharterSourceSVG />{" "}
          <Typography.Text ellipsis={{ tooltip: "Source" }}>Source</Typography.Text>
        </Flex>
      ),
      key: "Source",
      dataIndex: "fromAirportId",
      editable: true,
      inputType: "airport",
      render: (_, record) => removeLastAirport(record?.outboundFlight?.fromAirPortInfo?.name),
    },
    isHome && {
      width: "144px",
      title: (
        <Flex gap={8} align="center">
          <AirLineDownSVG />{" "}
          <Typography.Text ellipsis={{ tooltip: "Destination" }}>Destination</Typography.Text>
        </Flex>
      ),
      key: "Destination",
      dataIndex: "toAirportId",
      inputType: "airport",
      editable: true,
      render: (_, record) => removeLastAirport(record?.outboundFlight?.toAirPortInfo?.name),
    },
    {
      width: "160px",
      title: (
        <Flex gap={8} align="center">
          <ClockCircleFilled />
          <Typography.Text ellipsis={{ tooltip: "Departure" }}>Departure</Typography.Text>
        </Flex>
      ),
      dataIndex: "fromDateTime",
      key: "Departure",
      ellipsis: true,
      editable: true,
      inputType: "dateTime",
      render: (_, record) => (
        <Tooltip
          title={
            isHome
              ? dayjs(record?.outboundFlight?.fromDateTime).utc().format("MMM D, YYYY h:mm A")
              : dayjs(record?.outboundFlight?.fromDateTime).format("MMM D, YYYY h:mm A")
          }>
          {isHome
            ? dayjs(record?.outboundFlight?.fromDateTime).utc().format("MMM D, YYYY h:mm A")
            : dayjs(record?.outboundFlight?.fromDateTime).format("MMM D, YYYY h:mm A")}
        </Tooltip>
      ),
    },
    {
      width: "160px",
      title: (
        <Flex gap={8} align="center">
          <ArrivalSVG />
          <Typography.Text ellipsis={{ tooltip: "Arrival" }}>Arrival</Typography.Text>
        </Flex>
      ),
      dataIndex: "toDateTime",
      ellipsis: true,
      key: "Arrival",
      editable: true,
      inputType: "dateTime",
      render: (_, record) => (
        <Tooltip
          title={
            isHome
              ? dayjs(record?.outboundFlight?.toDateTime).utc().format("MMM D, YYYY h:mm A")
              : dayjs(record?.outboundFlight?.toDateTime).format("MMM D, YYYY h:mm A")
          }>
          {isHome
            ? dayjs(record?.outboundFlight?.toDateTime).utc().format("MMM D, YYYY h:mm A")
            : dayjs(record?.outboundFlight?.toDateTime).format("MMM D, YYYY h:mm A")}
        </Tooltip>
      ),
    },
    {
      width: "80px",
      editable: true,
      title: (
        <Flex gap={8} align="center">
          <AllotmentSVG />{" "}
          <Typography.Text ellipsis={{ tooltip: "Allotment" }}>Allotment</Typography.Text>
        </Flex>
      ),
      inputType: "number",
      dataIndex: "alotment",
      key: "Allotment",
      render: (_, record) => record?.outboundFlight?.allotment ?? record?.outboundFlight?.alotment,
    },
    isHome && {
      width: "100px",
      title: (
        <Flex gap={8} align="center">
          <BadgeCheckSVG />{" "}
          <Typography.Text ellipsis={{ tooltip: "Status" }}>Status</Typography.Text>
        </Flex>
      ),
      dataIndex: "available",
      key: "available",
      render: (_, record) => (
        <Badge status={record?.outboundFlight?.status ? "success" : "error"}>
          {record?.outboundFlight?.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ].filter(Boolean);
};
