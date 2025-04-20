import React from "react";
import { Image } from "antd";

import vbooking_logo_name from "../../../assets/images/vbookingLogo_name.png";

import RegistrationFrom from "./components/Form";

import "./styles.css";
import { useCompanyInfoContext } from "context/companyInfoContext";

const Registration = () => {
  const { metaShortDescription, description } = useCompanyInfoContext();
  return (
    <div className="content-holder">
      <div className="content-logo">
        <Image src={vbooking_logo_name} preview={false} />
        <div className="content-logo-text">
          <div className="title-one">{metaShortDescription?.split(" ").slice(0, 2).join(" ")}</div>
          <div className="title-two">{metaShortDescription?.split(" ").slice(2).join(" ")}</div>
          <div className="long-des">{description}</div>
        </div>
      </div>
      <div className="content-form">
        <RegistrationFrom />
      </div>
    </div>
  );
};

export default Registration;
