import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useState } from "react";
const ListColumns = ({ menuProps }) => {
  const [item, setItem] = useState(menuProps[0]);
  const handleMenuClick = (data) => {
    setItem(menuProps.find((item) => item.key == data.key));
  };
  return (
    <Dropdown
      menu={{ onClick: handleMenuClick, items: menuProps.filter((data) => data.key !== item.key) }}>
      <Space>
        {item.label}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};
export default ListColumns;
