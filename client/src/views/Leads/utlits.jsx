import { UserOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
export const data = [
  {
    id: "1",
    numberTabletApp: "07",
    app: "tablet app",
    headerPointerColor: "#F40055",
    img: "",
    name: "Paradise travel",
    Due_Date: "25-May-2020",
    AssigneeBY: "By Mohammad Abdallah",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    Status: "Via Call",
    members: [],
  },
  {
    id: "2",
    numberTabletApp: "07",
    app: "tablet app",
    headerPointerColor: "F40055",
    img: "",
    name: "Paradise travel",
    Due_Date: "25-May-2020",
    AssigneeBY: "By Mohammad Abdallah",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    Status: "Via Call",
    members: [],
  },
  {
    id: "3",
    numberTabletApp: "07",
    app: "tablet app",
    headerPointerColor: "F40055",
    img: "",
    name: "Paradise travel",
    Due_Date: "25-May-2020",
    AssigneeBY: "By Mohammad Abdallah",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    Status: "Via Call",
    members: [],
  },
  {
    id: "4",
    numberTabletApp: "07",
    app: "tablet app",
    headerPointerColor: "F40055",
    img: "",
    name: "Paradise travel",
    Due_Date: "25-May-2020",
    AssigneeBY: "By Mohammad Abdallah",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    Status: "Via Call",
    members: [],
  },
  {
    id: "5",
    numberTabletApp: "07",
    app: "tablet app",
    headerPointerColor: "F40055",
    img: "",
    name: "Paradise travel",
    Due_Date: "25-May-2020",
    AssigneeBY: "By Mohammad Abdallah",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    Status: "Via Call",
    members: [],
  },
  {
    id: "6",
    numberTabletApp: "07",
    app: "tablet app",
    headerPointerColor: "F40055",
    img: "",
    name: "Paradise travel",
    Due_Date: "25-May-2020",
    AssigneeBY: "By Mohammad Abdallah",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    Status: "Via Call",
    members: [],
  },
];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: "Lead",
    background: "rgb(63 185 237 / 9%)",
    numberColor: "#3FB9ED",
    amount: "$209,200",
    items: data,
  },
  [uuidv4()]: {
    title: "Proposal mads",
    background: "rgb(58 94 227 / 9%)",
    numberColor: "#3A5EE3",
    amount: "$209,200",
    items: [],
  },
  [uuidv4()]: {
    title: "Contrace",
    background: "rgb(106 46 248 / 9%)",
    numberColor: "#6A2EF8",
    amount: "$209,200",
    items: [],
  },
  [uuidv4()]: {
    title: "Won",
    background: "rgb(151 65 165 / 9%)",
    numberColor: "#9741A5",
    amount: "$209,200",
    items: [],
  },
  [uuidv4()]: {
    title: "Lose",
    background: "rgb(248 46 142 / 9%)",
    numberColor: "#F82E8E",
    amount: "$209,200",
    items: [],
  },
};

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
