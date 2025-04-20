import { Tabs } from "antd";
import React from "react";
import CustomButton from "components/common/Button";
// style
import "./style.css";
// images
import flights_header_bg from "assets/images/flights_header_bg.webp"
import hotels_header_bg from "assets/images/hotels_header_bg.webp"
import experiences_header_bg from "assets/images/experiences_header_bg.webp"
import transfer_header_bg from "assets/images/transfer_header_bg.webp"


import { ONLINE_BOOKING_TABS_KEYS } from "../../Serach";

const BookingTabs = ({ tab, items, onChange }) => {
  return (
    <>
      <div className="booking_tabs_btns" style={{
        backgroundImage: `url(${(() => {
          switch (tab) {
            case ONLINE_BOOKING_TABS_KEYS.FLIGHTS:
              return flights_header_bg
            case ONLINE_BOOKING_TABS_KEYS.HOTELS:
              return hotels_header_bg
            case ONLINE_BOOKING_TABS_KEYS.EXPERIENCES:
              return experiences_header_bg
            case ONLINE_BOOKING_TABS_KEYS.TRANSFER:
              return transfer_header_bg
            default:
              return flights_header_bg;
          }
        })()})`
      }}>
        <div>
          {items?.map(el => <CustomButton
            key={el.key}
            className={`booking_tabs_btn ${tab === el.key ? " active_tab_btn" : ""}`}
            onClick={() => onChange(el.key)}
            icon={el.icon}
          >{el.label}</CustomButton>)}
        </div>
      </div>
      <div className="booking_tabs_container">
        <div className="booking_tabs">
          <Tabs
            activeKey={tab}
            onChange={onChange}
            destroyInactiveTabPane
            defaultActiveKey={ONLINE_BOOKING_TABS_KEYS.FLIGHTS}
            type="card"
            size={"small"}
            items={items}
          />
        </div>
      </div>
    </>
  );
};
export default BookingTabs;
