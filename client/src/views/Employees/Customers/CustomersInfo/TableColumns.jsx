import { Avatar, Col, Dropdown, Row, Tooltip, Typography } from "antd";
import { CloseTicketSVG, EyeSVG, MoreSVG, TicketSVG } from "assets/jsx-svg";
import { useRef, useState } from "react";
import TooltipTicket from "components/Tooltip";
import { AntDesignOutlined } from "@ant-design/icons";

export const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    width: 80,
    align: "center",
    render: (_, { priority, id }) => <Avatar size={32} icon={<AntDesignOutlined />} />,
  },
  {
    title: "Customer name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    ellipsis: true,
    width: 150,
  },
  {
    title: "Contact category",
    dataIndex: "category",
    key: "category",
    ellipsis: true,
    width: 200,
  },
  {
    title: "Activity type",
    dataIndex: "type",
    key: "type",
    ellipsis: true,
    width: 200,
  },

  {
    title: "Phone/mobile",
    dataIndex: "mobile",
    key: "mobile",
    ellipsis: true,
    width: 150,
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    align: "center",
    width: 100,
    render: (_, { status, id }) => {
      let color = "";
      if (status === "OPEN") {
        color = "#0318D6";
      } else {
        color = "#F40055";
      }

      return (
        <Row justify="center" key={id}>
          <Typography.Text
            key={id}
            ellipsis
            style={{
              background: `${color}0F`,
              borderRadius: "8px",
              color: color,
              width: "76px",
              height: "30px",
            }}
            className="center-items">
            {status}
          </Typography.Text>
        </Row>
      );
    },
  },

  {
    title: " ",
    key: "actions",
    dataIndex: "actions",
    align: "center",
    width: 90,
    render: (_, { link, id, employeeId, setReRenderWhenAssign, status, setStatus }) => (
      <ActionsRender
        id={id}
        link={link}
        employeeId={employeeId}
        status={status}
        setStatus={setStatus}
        setReRenderWhenAssign={setReRenderWhenAssign}
      />
    ),
  },
];

const ActionsRender = ({ setStatus }) => {
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      arrow>
      <MoreSVG style={{ rotate: "90deg" }} />
    </Dropdown>
  );
};

const prioritysColor = {
  HIGH: "#F40055",
  MEDIUM: "#F8B51D",
  LOW: "#5EAF2F",
};

export const dataSource = [
  {
    key: "1",
    avatar: <Avatar size={32} icon={<AntDesignOutlined />} />,
    name: "Mike",
    age: 32,
    address: "Jenin - Jenin",
    category: "VIP",
    type: "VIP",
    mobile: "000000",
    status: "OPEN",
  },
];

const items = [
  {
    key: "1",
    label: (
      <div>
        <EyeSVG /> View
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div style={{ color: "red" }}>
        <CloseTicketSVG /> Cancel
      </div>
    ),
  },
];
