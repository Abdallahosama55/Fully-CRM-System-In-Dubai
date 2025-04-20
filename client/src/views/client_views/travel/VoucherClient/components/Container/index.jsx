import React from "react";
// style
import "./styles.css";
const Container = ({ children }) => {
  return (
    <div className="voucher_page">
      <div className="voucher_page_container">{children}</div>
    </div>
  );
};

export default Container;
