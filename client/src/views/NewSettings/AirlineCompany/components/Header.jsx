import { Button, Flex, Input, Typography } from "antd";

import { useDrawer } from "context/drawerContext";
import { useCallback } from "react";
import AddAirlineCompany from "./AddAirlineCompany";
import {  PlusSVG } from "assets/jsx-svg";
const Header = () => {
  const DrawerAPI = useDrawer();
  const handleAdd = useCallback(() => {
    DrawerAPI.open("440px");
    DrawerAPI.setDrawerContent(<AddAirlineCompany close={DrawerAPI.close} />);
  }, []);
  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={5}>Airline Companies</Typography.Title>
      <Flex gap={16}>
        <Button onClick={handleAdd} type="primary" icon={<PlusSVG />}>
          New
        </Button>
      </Flex>
    </Flex>
  );
};
export default Header;
