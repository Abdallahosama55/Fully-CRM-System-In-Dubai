import { UserOutlined } from "@ant-design/icons";

export const tableData = [
  {
    key: 1,
    name: "Ali Omer",
    type: "Leave",
    time: "30-5-2023 12:00Am",
    to: "30-5-2023 12:00Am",
    employees: "All",
    status: "Expired",
  },
  {
    key: 2,
    name: "Ali Omer",
    type: "Leave",
    time: "30-5-2023 12:00Am",
    to: "30-5-2023 12:00Am",
    employees: "All",
    status: "ongoing",
  },
  {
    key: 3,
    name: "Ali Omer",
    type: "Leave",
    time: "30-5-2023 12:00Am",
    to: "30-5-2023 12:00Am",
    employees: "All",
    status: "Expired",
  },
  {
    key: 4,
    name: "Ali Omer",
    type: "Leave",
    time: "30-5-2023 12:00Am",
    to: "30-5-2023 12:00Am",
    employees: "All",
    status: "Upcoming",
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
