import { UserOutlined } from "@ant-design/icons";
import logo from "assets/images/logo.png";

export const tableData = [
  {
    key: 1,
    logo: `${logo}`,
    name: "Warehouse 1",
    description: "Description her",
    status: "Active",
    sortOrder: 1,
    action: {
      id: 1,
      customerBusinessId: 1,
    },
  },
];

const handleMenuClick = (e) => {
  console.log("click", e);
};
const items = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "3rd menu item",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "4rd menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];
export const menuProps = {
  items,
  onClick: handleMenuClick,
};
