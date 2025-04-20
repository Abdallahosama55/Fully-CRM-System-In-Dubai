import React from "react";
import "./styles.css";
const TemplateLayout = ({
  logo = { link: "https://placehold.co/150x50" },
  waterMark,
  secondaryColor,
  primaryColor,
  activeVoucher,
  voucherFont,
  children,
}) => {
  return (
    <div
      className="template_page"
      style={{ "--primary-color": `${primaryColor}`, "--secoundry-color": `${secondaryColor}`, "--font-family": `${voucherFont}` }}>
      {/* {waterMark?.link && <img src={waterMark?.link} alt="logo" className="template_watermark" />}  */}
      <div className="template_header template_space_between">
        <img src={logo?.link} alt="logo" className="template_header_logo" />
        <p className="template_header_title primary_color fz-20 fw-700">{activeVoucher}</p>
      </div>
      {children}
    </div>
  );
};

export default TemplateLayout;
