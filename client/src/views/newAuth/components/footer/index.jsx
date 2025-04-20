import { Link } from "react-router-dom";

import Title from "./Title";

import footerLogo from "../../../../assets/images/footerLogo.png";
import payment1 from "../../../../assets/images/payment1.png";
import payment2 from "../../../../assets/images/payment2.png";
import payment3 from "../../../../assets/images/payment3.png";
import {
  FacebookFooterSVG,
  InstagramFooterSVG,
  LinkedInFooterSVG,
  TwitterFooterSVG,
  WhatUsAppFooterSVG,
} from "../../../../assets/jsx-svg";

import "./footer.css";
import { useCompanyInfoContext } from "context/companyInfoContext";
import { Image } from "antd";

const socialLinks = [
  {
    icon: <LinkedInFooterSVG />,
    url: "",
  },
  {
    icon: <FacebookFooterSVG />,
    url: "",
  },
  {
    icon: <InstagramFooterSVG />,
    url: "",
  },
  {
    icon: <TwitterFooterSVG />,
    url: "",
  },
  {
    icon: <WhatUsAppFooterSVG />,
    url: "",
  },
];

function Footer() {
  const { image } = useCompanyInfoContext();
  return (
    <footer className="footer">
      <div className="social-section-content">
        <div className="social-section">
          <div className="footer-logo-container">
            <Image src={image || footerLogo} alt="logo" height={48} />
          </div>
          <div className="social-links-container">
            <Title title="Connect with us" titleColor="text-white" className="" />
            <ul className="social-links">
              {socialLinks.map((link, index) => (
                <li key={index} className="social-icon">
                  <Link to={link.url} className="social-link">
                    {link.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-divider">
          <Title
            title="Awards: Best Travel Tech 2022."
            titleColor="text-white"
            className="footer-text"
          />
          <Title
            title="Trusted by 10,000+ agents globally."
            titleColor="text-white"
            className="footer-text"
          />
          <div className="payment-section">
            <Title
              title="Secure Payments:"
              titleColor="text-white"
              className="footer-text no-border"
            />
            <div className="payment-icons">
              {[payment1, payment2, payment3].map((payment, index) => (
                <img key={index} src={payment} alt="payment" />
              ))}
            </div>
          </div>
        </div>
        <div className="footer-divider">
          <Title title="© 2025 V Booking. All rights reserved." titleColor="footer-text" />
          <Title
            title="Designed and Powered by V Booking Tech Solutions."
            titleColor="text-white"
            className="footer-text no-border"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
