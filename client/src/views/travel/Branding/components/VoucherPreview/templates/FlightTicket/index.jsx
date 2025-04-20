import React, { useEffect, useState } from "react";
// style
import "./styles.css";
import TemplateLayout from "../Layout";
const FlightTicket = ({
  logo,
  waterMark,
  primaryColor,
  secondaryColor,
  activeVoucher,
  voucherHeaderText,
  voucherEmail,
  voucherPhone,
  voucherFont,
}) => {
  return (
    <TemplateLayout
      voucherFont={voucherFont}
      logo={logo}
      waterMark={waterMark}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      activeVoucher={activeVoucher}>
      <div className="template_body">
        <div className="template_body_section">
          <div className="template_space_between template_flex_start">
            <div>
              <p className="fz-10 fw-400 color_dark_gray">PREPARED FOR</p>
              <p className="fz-14 fw-700 color_black">MR John Doe</p>
              <p className="fz-10 fw-400 color_dark_gray mt-12">E-TICKET NUMBER</p>
              <p className="fz-14 fw-700 color_black">TN01234567891</p>
              <p className="fz-10 fw-400 color_dark_gray mt-12">BOOKING REFERENCE</p>
              <p className="fz-14 fw-700 color_black">BO01234567891</p>
            </div>
            <div>
              <p className="fz-10 fw-400 color_dark_gray">
                {voucherEmail ? <p className="fz-10 fw-600">Email: {voucherEmail}</p> : ""}
                {voucherPhone ? (
                  <p className="fz-10 fw-600">
                    Phone: {voucherPhone.prefix + " " + voucherPhone.mobile}
                  </p>
                ) : (
                  ""
                )}
                {voucherHeaderText}
              </p>
            </div>
          </div>
        </div>

        <div className="template_body_section">
          <div className="flight_ticket">
            <div className="flight_ticket_left">
              <div className="flight_ticket_header">
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} fill="none">
                    <g clipPath="url(#a)">
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M12.775.583c-.41 0-.805.164-1.095.454L9.824 2.893a.642.642 0 0 1-.61.17L1.867 1.224l-.654.654a.642.642 0 0 0 .167 1.028L7 5.717 4.433 8.284H1.622a.642.642 0 0 0-.574.354l-.465.929L3.15 10.85l1.283 2.567.929-.464a.642.642 0 0 0 .355-.574V9.567L8.283 7l2.81 5.62a.642.642 0 0 0 1.028.167l.654-.654-1.837-7.347a.642.642 0 0 1 .169-.61l1.856-1.855c.29-.291.454-.685.454-1.096a.642.642 0 0 0-.642-.642Z"
                        clipRule="evenodd"
                        style={{
                          fill: "#fff",
                          fillOpacity: 1,
                        }}
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path
                          fill="#fff"
                          d="M0 0h14v14H0z"
                          style={{
                            fill: "#fff",
                            fillOpacity: 1,
                          }}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="fz-12 fw-400 color_white margin_start_8">FLIGHT E-TICKET</span>
                </p>
              </div>
              <div className="flight_ticket_body">
                <img src="https://placehold.co/80x30" className="flight_ticket_company_logo" />
                <p className="fz-10 fw-400 color_dark_gray">FLIGHT NUMBER</p>
                <p className="fz-12 fw-600 color_black">PR 452</p>
                <p className="fz-10 fw-400 color_dark_gray">DURATION</p>
                <p className="fz-12 fw-600 color_black">1 hour 50 min</p>
                <p className="fz-10 fw-400 color_dark_gray">CLASS</p>
                <p className="fz-12 fw-600 color_black">Economy (V)</p>
              </div>
            </div>
            <div className="flight_ticket_divider"></div>
            <div className="flight_ticket_right">
              <div className="flight_ticket_header">
                <p className="fz-12 fw-400 color_white">
                  DEPARTURE:
                  <span className="fz-12 fw-700 margin_start_8">Wed., 27. Sep. 2024</span>
                </p>
              </div>
              <div className="flight_ticket_body template_space_between">
                <div className="w-50">
                  <p className="fz-10 fw-400 color_dark_gray">GES</p>
                  <p className="fz-12 fw-600 color_black">General Santos</p>
                  <p className="fz-10 fw-400 color_dark_gray">Departing</p>
                  <p className="fz-12 fw-600 color_black">11:10</p>
                  <p className="fz-10 fw-400 color_dark_gray">Terminal</p>
                  <p className="fz-12 fw-600 color_black">N/A</p>
                </div>
                <div className="w-50">
                  <p className="fz-10 fw-400 color_dark_gray">MNL</p>
                  <p className="fz-12 fw-600 color_black">Manila</p>
                  <p className="fz-10 fw-400 color_dark_gray">Arriving</p>
                  <p className="fz-12 fw-600 color_black">13:00</p>
                  <p className="fz-10 fw-400 color_dark_gray">Terminal</p>
                  <p className="fz-12 fw-600 color_black">N/A</p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <table className="template_table">
            <thead className="template_table_header">
              <tr>
                <td className="fz-10 fw-600">E-ticket number</td>
                <td className="fz-10 fw-600">Airline Booking Ref</td>
                <td className="fz-10 fw-600">Name</td>
                <td className="fz-10 fw-600">Status</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fz-10 fw-400">TN01234567891</td>
                <td className="fz-10 fw-400">BO01234567891</td>
                <td className="fz-10 fw-400">MR John Doe</td>
                <td className="fz-10 fw-400">--</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="fz-10 fw-400 color_dark_gray">
          This is a computer generated document & does not need a signature and stamp
        </p>
      </div>
    </TemplateLayout>
  );
};

export default FlightTicket;
