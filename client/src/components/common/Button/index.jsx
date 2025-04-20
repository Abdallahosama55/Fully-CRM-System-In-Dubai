import React from "react";
import { Button } from "antd";
// style
import "./styles.css";
const CustomButton = ({
  children,
  type,
  icon,
  color = "",
  padding = "",
  className = "",
  ...rest
}) => {
  return (
    <Button
      style={padding ? { padding: padding } : {}}
      {...rest}
      type={type || "primary"}
      className={`btn ${className} ${color} ${Boolean(icon) ? "btn_with_icon" : ""}`}>
      {icon && <span className="btn_icon center-items">{icon}</span>}
      {children}
    </Button>
  );
};

export default CustomButton;
