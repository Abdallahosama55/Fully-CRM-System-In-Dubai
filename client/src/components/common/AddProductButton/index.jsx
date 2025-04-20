import React from "react";
import { Row } from "antd";
import "./styles.css";

function AddProductButton({
  cancel,
  className,
  addName = "Add",
  CancelName = "Cancel",
  onClick,
  htmlType,
}) {
  return (
    <Row
      className={`add-cancel-buttons ${className}`}
      justify={"end"}
      gutter={[16, 0]}
    >
      <button onClick={(e) => cancel(e)} className="cancel fz-13 fw-500">
        {CancelName}
      </button>
      {onClick ? (
        <button type={htmlType} onClick={onClick} className="add fz-13 fw-500">
          {addName}
        </button>
      ) : (
        <button type={htmlType} className="add fz-13 fw-500">
          {addName}
        </button>
      )}
    </Row>
  );
}

export default AddProductButton;
