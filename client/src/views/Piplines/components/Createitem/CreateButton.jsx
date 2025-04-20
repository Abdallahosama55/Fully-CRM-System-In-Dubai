import React from "react";
import "./styles.css";
import { Col, Row } from "antd";
import { PiplinesFolderSVG, PlusSVG } from "assets/jsx-svg";
import CreateitemForm from "./CreateitemForm";
import { useDrawer } from "context/drawerContext";
function CreateButton() {
  const DrawerAPI = useDrawer();
  const onClose = () => {
    DrawerAPI.close();
  };
  return (
    <div
      onClick={() => {
        DrawerAPI.open("37%");
        DrawerAPI.setDrawerContent(<CreateitemForm onClose={onClose} />);
      }}
      className="create-button">
      <PlusSVG fill="#000" /> New Stage
    </div>
  );
}

export default CreateButton;
