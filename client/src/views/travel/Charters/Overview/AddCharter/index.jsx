import { Button } from "antd";
import React from "react";
import AddCharterDrawer from "./AddCharterDrawer";
import "./style.css";
import { PlusSVG } from "assets/jsx-svg";
import { useDrawer } from "hooks/useDrawer";
const AddCharter = () => {
  const DrawerAPI = useDrawer();
  const handleOpenAddCharter = () => {
    DrawerAPI.open("85%");
    DrawerAPI.setDrawerContent(<AddCharterDrawer close={DrawerAPI.close} />);
  };
  return (
    <>
      {DrawerAPI.Render}
      <Button onClick={handleOpenAddCharter} icon={<PlusSVG />} type="primary">
        {" "}
        New
      </Button>
    </>
  );
};

export default AddCharter;
