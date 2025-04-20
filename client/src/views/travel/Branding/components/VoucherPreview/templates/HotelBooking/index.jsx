import React, { useEffect, useState } from "react";
// style
import "./styles.css";
import TemplateLayout from "../Layout";
import VOUCHER_TYPES from "constants/VOUCHER_TYPES";
const HotelBooking = ({
  logo,
  waterMark,
  primaryColor,
  secondaryColor,
  activeVoucher,
  voucherHeaderText,
  voucherEmail,
  voucherPhone,
  voucherFont,
  Icon,
}) => {
  return (
    <TemplateLayout
      logo={logo}
      waterMark={waterMark}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      activeVoucher={activeVoucher}
      voucherFont={voucherFont}>
      <div className="template_body">
        <div className="template_body_section">
          <div className="template_space_between template_flex_start">
            <div style={{ width: "100%", maxWidth: "100%" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  alignContent: "center",
                  padding: "4px",
                }}>
                <p className="fz-10 fw-400 color_dark_gray">BOOKING ID:</p>
                <p className="fz-10 fw-700 color_black">LB02610</p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  alignContent: "center",
                  backgroundColor: "#f8fafbdd",
                  padding: "4px",
                }}>
                <p className="fz-10 fw-400 color_dark_gray">SUPPLIER REF. NO.:</p>
                <p className="fz-10 fw-700 color_black">BO01234567891</p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  alignContent: "center",
                  padding: "4px",
                }}>
                <p className="fz-10 fw-400 color_dark_gray">GUEST NAME:</p>
                <p className="fz-10 fw-700 color_black">
                  MR John Doe, MRS John Doe, MR John Doe ( 8 years old), MR Doe Nash, MRS Doe Nash,
                  MR Doe Nash ( 7 years old).
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  alignContent: "center",
                  backgroundColor: "#f8fafbdd",
                  padding: "4px",
                }}>
                <p className="fz-10 fw-400 color_dark_gray"> ISSUED:</p>
                <p className="fz-10 fw-700 color_black">Wed, 11 Sep, 2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className="template_body_section">
          <div className="hotel_booking_temp">
            <div className="hotel_booking_temp_left">
              <div className="hotel_booking_temp_header">
                <p>
                  {Icon}
                  <span className="fz-12 fw-400 color_white margin_start_8">
                    {VOUCHER_TYPES.ACCOMMODATION === activeVoucher
                      ? "Hotel Booking Details"
                      : "Experience Details"}
                  </span>
                </p>
              </div>
              <div className="hotel_booking_temp_body">
                <p className="fz-10 fw-400 color_dark_gray">Check in</p>
                <p className="fz-12 fw-600 color_black">Wed, 14 Sep, 2024</p>
                <p className="fz-10 fw-400 color_dark_gray">Hotel:</p>
                <p className="fz-12 fw-600 color_black">Sample Hotel*******</p>
                <p className="fz-10 fw-400 color_dark_gray">Address:</p>
                <p className="fz-12 fw-600 color_black" style={{ maxWidth: "120px" }}>
                  55 Princess Square London United Kingdom
                </p>
              </div>
            </div>
            <div className="hotel_booking_temp_right">
              <div className="hotel_booking_temp_header"></div>
              <div className="hotel_booking_temp_body template_space_between">
                <div className="w-50">
                  <p className="fz-10 fw-400 color_dark_gray">Check in</p>
                  <p className="fz-12 fw-600 color_black">Wed, 20 Sep, 2024</p>
                  <p className="fz-10 fw-400 color_dark_gray">Number of rooms:</p>
                  <p className="fz-12 fw-600 color_black">2</p>
                  <p className="fz-10 fw-400 color_dark_gray">Number of adults:</p>
                  <p className="fz-12 fw-600 color_black">2</p>
                </div>
                <div className="w-50">
                  <p className="fz-10 fw-400 color_dark_gray">Meal:</p>
                  <p className="fz-12 fw-600 color_black">With Break fast</p>
                  <p className="fz-10 fw-400 color_dark_gray">Room type:</p>
                  <p className="fz-12 fw-600 color_black">2 Twin Room</p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              paddingBottom: "12px",
            }}>
            <p className="fz-10 fw-400 color_dark_gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac fermentum neque,
              quis scelerisque tortor. Quisque nec est pulvinar, molestie eros non, tristique velit.
            </p>
            <img
              src="https://files.crpton.com/images/hd-blue-round-approved-stamp.png"
              style={{ width: "50px" }}
            />
          </div>
        </div>
        <div
          style={{
            "--primary-color": `#${primaryColor}`,
            "--secoundry-color": `#${secondaryColor}`,
          }}
          className="template_body_section">
          <p className="primary_color fz-12 fw-700">Note </p>
          <p className="fz-10 fw-400 color_dark_gray">
            All rooms are guaranteed on the day of arrival. In the case pf a no-show, your room(s)
            will be released and you will be subject to the terms & conditions of the
            cancellation/no-show policy specified at the time you made the booking as well as noted
            in the confirmation email.
          </p>
        </div>

        <div
          style={{
            "--primary-color": `#${primaryColor}`,
            "--secoundry-color": `#${secondaryColor}`,
          }}
          className="">
          <p className="primary_color fz-12 fw-700">Map </p>
          <img
            src="https://placehold.co/200x160"
            style={{ width: "100%", height: "160px", objectFit: "cover" }}
          />
        </div>
      </div>
    </TemplateLayout>
  );
};

export default HotelBooking;
