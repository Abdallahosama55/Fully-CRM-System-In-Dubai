import { UserOutlined } from "@ant-design/icons";

export const tableData = [
  {
    key: 1,
    activitiesNo: "#1",
    name: "Ali Omer",
    time: "9:30 am",
    callType: "-",
    deskName: "Desk1",
    status: "waiting",
    actions: "join",
  },
  {
    key: 2,
    activitiesNo: "#1",
    name: "Ali Omer",
    time: "9:30 am",
    callType: "-",
    deskName: "Desk1",
    status: "waiting",
    actions: "join",
  },
  {
    key: 3,
    activitiesNo: "#1",
    name: "Ali Omer",
    time: "9:30 am",
    callType: "-",
    deskName: "Desk1",
    status: "waiting",
    actions: "join",
  },
  {
    key: 4,
    activitiesNo: "#1",
    name: "Ali Omer",
    time: "9:30 am",
    callType: "-",
    deskName: "Desk1",
    status: "Finished",
  },
  {
    key: 5,
    activitiesNo: "#1",
    name: "Ali Omer",
    time: "9:30 am",
    callType: "-",
    deskName: "Desk1",
    status: "Finished",
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
