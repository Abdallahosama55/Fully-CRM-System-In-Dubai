import { Tabs } from "antd";
import React from "react";
import CustomButton from "components/common/Button";
// style
import "./style.css";
// images
import flights_header_bg from "assets/images/flights_header_bg.webp";
import hotels_header_bg from "assets/images/hotels_header_bg.webp";
import experiences_header_bg from "assets/images/experiences_header_bg.webp";
import transfer_header_bg from "assets/images/transfer_header_bg.webp";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import AskGenieWithStarSVG from "assets/jsx-svg/AskGenieWithStarSVG";

const BookingTabs = ({ tab, items, onChange }) => {
  return (
    <>
      <div className="booking_tabs_btns">
        <div>
          {items?.map((el) => (
            <CustomButton
              key={el.key}
              className={`booking_tabs_btn ${tab === el.key ? " active_tab_btn" : ""}`}
              onClick={() => onChange(el.key)}
              icon={el.icon}>
              {el.label}
            </CustomButton>
          ))}
        </div>
      </div>
      <div className="booking_tabs_container">
        <div className={`booking_tabs_wrapper`}>
          <div
            className="booking_tabs"
            style={{ width: tab === "ASK_GENIE" ? "calc(100% - 226px)" : "100%" }}>
            <Tabs
              activeKey={tab}
              onChange={onChange}
              destroyInactiveTabPane
              defaultActiveKey={BOOKINGS_TYPES.FLIGHTS}
              type="card"
              size={"small"}
              items={items}
            />
          </div>
          {tab === "ASK_GENIE" && <AskGenieWithStarSVG />}
        </div>
      </div>
    </>
  );
};
export default BookingTabs;
