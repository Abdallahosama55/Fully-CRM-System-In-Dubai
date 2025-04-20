import { Button } from "antd";
import React from "react";
import AddNewFormsDrawer from "./AddNewFormsDrawer";
import "./style.css";
import { PlusSVG } from "assets/jsx-svg";
import { useDrawer } from "hooks/useDrawer";
import { useNavigate } from "react-router-dom";
const AddCharter = () => {
  const navigate = useNavigate();

  const handleOpenAddForm = () => {
    navigate("/crm/forms/info");
  };

  return (
    <>
  
      <Button onClick={handleOpenAddForm} icon={<PlusSVG />} type="primary">
        {" "}
        Create New Form
      </Button>
    </>
  );
};

export default AddCharter;
