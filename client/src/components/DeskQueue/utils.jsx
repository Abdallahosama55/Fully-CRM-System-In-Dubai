import { UserOutlined } from "@ant-design/icons";

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

export const tableDataCustomer = [
  {
    key: 1,
    Number: "#1",
    employee: "Ali Mohamed",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 2,
    Number: "#2",
    employee: "Ali Mohamed",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 3,
    Number: "#3",
    employee: "Ali Mohamed",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 4,
    Number: "#4",
    employee: "Ali Mohamed",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 5,
    Number: "#5",
    employee: "Ali Mohamed",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
];
export const tableDataAll = [
  {
    key: 1,
    Number: "#1",
    employee: "Ali Mohamed",
    deskName: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 2,
    Number: "#2",
    employee: "Ali Mohamed",
    deskName: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 3,
    Number: "#3",
    employee: "Ali Mohamed",
    deskName: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 4,
    Number: "#4",
    employee: "Ali Mohamed",
    deskName: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 5,
    Number: "#5",
    employee: "Ali Mohamed",
    deskName: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
];

export const tableMeetingDesk = [
  {
    key: 1,
    Number: "#1",
    deskname: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 2,
    Number: "#2",
    deskname: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 3,
    Number: "#3",
    deskname: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 4,
    Number: "#4",
    deskname: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
  {
    key: 5,
    Number: "#5",
    deskname: "Desk1",
    ServiceType: "Metavers",
    Customermail: "Ali@gmail.com",
    Customer: "Ali",
    time: "9:30 am",
  },
];

export const Buttons = [
  {
    id: 1,
    name: "All Desks",
  },
  {
    id: 2,
    name: "Customer Service",
  },
  {
    id: 3,
    name: "Meetings Desk",
  },
];


