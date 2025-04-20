import React from "react";
// style
import "./styles.css";
const HomeSection = ({ children, title, ...props }) => {
  return (
    <div className="ask_genie_home_section" {...props}>
      {title && <p className="lg_text_semibold ask_genie_home_section_title">{title}</p>}
      {children}
    </div>
  );
};

export default HomeSection;
