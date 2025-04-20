import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Typography } from "antd";

import { useDrawer } from "context/drawerContext";
import { useCallback } from "react";
import AddAirports from "./AddAirports";
const Header = () => {
  const DrawerAPI = useDrawer();
  const handleAdd = useCallback(() => {
    DrawerAPI.open("440px");
    DrawerAPI.setDrawerContent(<AddAirports close={DrawerAPI.close} />);
  }, []);
  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={5}>Airports</Typography.Title>
      <Flex gap={16}>
        <Input size="small" placeholder="Search..." prefix={<SearchOutlined />} />
        <Button onClick={handleAdd} size="small" type="primary">
          + Add new
        </Button>
      </Flex>
    </Flex>
  );
};
export default Header;
