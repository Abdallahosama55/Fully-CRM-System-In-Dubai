import {
  AntDesignOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Image, Tooltip } from "antd";

import startMeetBg from "assets/images/startMeetBg.png";

export const columns = [
  {
    title: "Product details",
    dataIndex: "productDetails",
    key: "productDetails",
    width: "70%",
    render: ({ imgSrc, title }) => (
      <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <div>
          <Image
            style={{ borderRadius: "8px" }}
            width="36px"
            height="36px"
            preview={false}
            src={imgSrc}
          />
        </div>
        <div>{title}</div>
      </div>
    ),
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
    width: "15%",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: "15%",
  },
];
export const data = [
  {
    key: "1",
    productDetails: {
      imgSrc: startMeetBg,
      title: "John Brown",
    },
    qty: 32,
    price: "$3500",
  },
  {
    key: "2",
    productDetails: {
      imgSrc: startMeetBg,
      title: "John Brown",
    },
    qty: 32,
    price: "$3500",
  },
  {
    key: "3",
    productDetails: {
      imgSrc: startMeetBg,
      title: "John Brown",
    },
    qty: 32,
    price: "$3500",
  },
];

//

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
export const items = [
  getItem("20 min before", "sub1", null, [getItem("Item 1", "g1", null)]),
];
export const attendanceItems = [
  getItem(
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Avatar.Group
        size={15}
        maxCount={1}
        maxStyle={{ color: "#fff", backgroundColor: "#3A5EE3" }}
      >
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        <a href="https://ant.design">
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
        </a>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: "#1677ff" }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
      <div>
        Esther Howsrd, <span style={{ color: "#3A5EE3" }}>+1 more</span>
      </div>
    </div>,
    "sub1",
    null,
    [getItem("Item 1", "g1", null)],
  ),
];
