import { ClockCircleFilled } from "@ant-design/icons";
import { Flex, Tooltip, Typography, Input } from "antd";
import { AirLineDownSVG, CharterSourceSVG } from "assets/jsx-svg";
import Badge from "components/common/Badge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { SaveOutlined } from "@ant-design/icons";

dayjs.extend(utc);

const removeLastAirport = (name) => {
  if (!name) return name;
  const lastIndex = name?.toLowerCase()?.lastIndexOf("airport");
  if (lastIndex === -1 && name?.toLowerCase()?.endsWith("airport")) return name;
  return name.slice(0, lastIndex) + name.slice(lastIndex + "Airport".length);
};

export const renderColumns = (
  isHome = false, 
  editingRows = {}, 
  setEditingRows = () => {}, 
  handleSave = () => {}, 
  handleCancel = () => {}
) => {
  return [
    isHome &&
     {
      width: "144px",
      title: (
        <Flex gap={8} align="center">
          <Typography.Text ellipsis={{ tooltip: "Name" }}>Name</Typography.Text>
        </Flex>
      ),
      key: "name",
      dataIndex: ["outboundFlight", "fromAirPortInfo", "name"], // Use path array
      render: (_, record) => removeLastAirport(record?.outboundFlight?.fromAirPortInfo?.name),
    },
    {
      width: "160px",
      title: (
        <Flex gap={8} align="center">
          <Typography.Text ellipsis={{ tooltip: "Date Created" }}>Date Created</Typography.Text>
        </Flex>
      ),
      dataIndex: "toDateTime",
      ellipsis: true,
      key: "DateCreated",
      editable: true,
      inputType: "dateTime",
      render: (_, record) => {
        const date = record?.outboundFlight?.toDateTime;
        if (!date) return null;
        
        const formattedDate = isHome 
          ? dayjs(date).utc().format("MMM D, YYYY h:mm A") 
          : dayjs(date).format("MMM D, YYYY h:mm A");
        
        return (
          <Tooltip title={formattedDate}>
            {formattedDate}
          </Tooltip>
        );
      },
    },
    {
      width: "80px",
      editable: true,
      title: (
        <Flex gap={8} align="center">
          <Typography.Text ellipsis={{ tooltip: "Responses" }}>Responses</Typography.Text>
        </Flex>
      ),
      inputType: "number",
      dataIndex: "Responses",
      key: "Responses",
      render: (_, record) => record?.outboundFlight?.allotment ?? record?.outboundFlight?.alotment ?? '-',
    },
    isHome && {
      width: "100px",
      title: (
        <Flex gap={8} align="center">
          <Typography.Text ellipsis={{ tooltip: "Status" }}>Status</Typography.Text>
        </Flex>
      ),
      dataIndex: "available",
      key: "available",
      render: (_, record) => (
        <Badge status={""}>
          {record?.outboundFlight?.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ].filter(Boolean);
};