import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Input, Row, Typography } from "antd";

import Box from "components/Box";
import { useDrawer } from "context/drawerContext";
import React, { useCallback } from "react";
import AddCurrency from "./AddCurrency";
const Header = () => {
  const DrawerAPI = useDrawer();
  const handleAdd = useCallback(() => {
    DrawerAPI.open("440px");
    DrawerAPI.setDrawerContent(<AddCurrency />);
  }, []);
  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={5}>Currencies</Typography.Title>
      <Flex gap={16}>
        <Input size="small" placeholder="Search..." prefix={<SearchOutlined />} />
        <Button onClick={handleAdd} size="small" type="primary">
          + Add new Currency
        </Button>
      </Flex>
    </Flex>
  );
};
export default Header;
