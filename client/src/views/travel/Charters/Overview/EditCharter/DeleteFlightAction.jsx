import { Col, Popconfirm } from "antd";
import { DeleteSVG } from "assets/jsx-svg";
import React from "react";
const DeleteFlightAction = ({ id, handleDelete }) => {
  const onClick = () => {
    handleDelete(id);
  };
  return (
    <Col>
      <Popconfirm
        title="Delete flight?"
        description="Are you sure to delete this row?"
        onConfirm={() => onClick()}
        okText="Yes"
        cancelText="No">
        <DeleteSVG className="clickable" />
      </Popconfirm>
    </Col>
  );
};
export default DeleteFlightAction;
