import { Image, Statistic } from "antd";
import userContext from "context/userContext";
import { useContext } from "react";
import logo from "assets/images/logo.png";

const StatisticWithUerData = ({ value }) => {
  const { user } = useContext(userContext);
  return <Statistic prefix={user.symbol} value={value} />;
};

export const columns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => (
      <Image
        alt="order img"
        preview={false}
        src={image || logo}
        width={50}
        height={50}
        style={{ borderRadius: "4px" }}
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
    ellipsis: true,
    render: (price) => <StatisticWithUerData value={price} />,
  },
  {
    title: "Tax",
    dataIndex: "tax",
    ellipsis: true,
    render: (tax) => <StatisticWithUerData value={tax} />,
  },
  {
    title: "Total",
    dataIndex: "total",
    ellipsis: true,
    align: "end",
    render: (total) => <StatisticWithUerData value={total} />,
  },
];
