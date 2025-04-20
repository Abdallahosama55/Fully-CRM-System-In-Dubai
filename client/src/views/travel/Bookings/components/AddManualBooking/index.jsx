import { Button, Dropdown, Typography } from "antd";
import { ArrowDownSVG, PlusSVG } from "assets/jsx-svg";
import React, { useState } from "react";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import AddHotelManualBooking from "./AddHotelManualBooking";
import AddExperienceManualBooking from "./AddExperienceManualBooking";
import AddFilghtManualBooking from "./AddFlightManualBooking";
import AddTransfersManualBooling from "./AddTransfersManualBooling";

const AddManualBooking = ({ type, refetch }) => {
  const [activeType, setActiveType] = useState(BOOKINGS_TYPES.ACCOMMODATION);
  const [isOpen, setIsOpen] = useState(false);
  const [isActionDropDownOpen, setIsActionDropDownOpen] = useState(false);

  return (
    <>
      {type === BOOKINGS_TYPES.ALL ? (
        <Dropdown
          trigger={[]}
          open={isActionDropDownOpen}
          onOpenChange={(value) => setIsActionDropDownOpen(value)}
          menu={{
            items: [
              {
                key: BOOKINGS_TYPES.FLIGHT,
                label: <p>Flight Booking</p>,
                onClick: () => setActiveType(BOOKINGS_TYPES.FLIGHT),
              },
              {
                key: BOOKINGS_TYPES.ACCOMMODATION,
                label: <p>Hotel Booking</p>,
                onClick: () => setActiveType(BOOKINGS_TYPES.ACCOMMODATION),
              },
              {
                key: BOOKINGS_TYPES.EXPERIENCE,
                label: <p>Experiance Booking</p>,
                onClick: () => setActiveType(BOOKINGS_TYPES.EXPERIENCE),
              },
              {
                key: BOOKINGS_TYPES.TRANSFER,
                label: <p>Transfer Booking</p>,
                onClick: () => setActiveType(BOOKINGS_TYPES.TRANSFER),
              },
            ],
          }}>
          <>
            <div
              style={{
                borderRadius: "8px",
                display: "flex",
                background: "var(--vbooking-b900)",
              }}>
              <Button
                type="text"
                style={{
                  height: "40px",
                  borderInlineEnd: "1px solid rgba(255, 255, 255, 0.20)",
                  width: "calc(100% - 35px)",
                }}
                onClick={() => {
                  setIsOpen(true);
                }}
                icon={<PlusSVG />}>
                <Typography.Text
                  className="sm_text_medium"
                  ellipsis={{ tooltip: "Created itinerary" }}
                  style={{ color: "#fff" }}>
                  {activeType === BOOKINGS_TYPES.FLIGHT
                    ? "Flight Booking"
                    : activeType === BOOKINGS_TYPES.TRANSFER
                    ? "Transfer Booking"
                    : activeType === BOOKINGS_TYPES.EXPERIENCE
                    ? "Experiance Booking"
                    : "Hotel Booking"}
                </Typography.Text>
              </Button>

              <Button
                onClick={() => setIsActionDropDownOpen((prev) => !prev)}
                type="text"
                style={{ color: "#fff", height: "40px", width: "35px" }}
                icon={<ArrowDownSVG color="#fff" />}
              />
            </div>
          </>
        </Dropdown>
      ) : (
        <Button
          type="text"
          style={{
            height: "40px",
            background: "var(--vbooking-b900)",
          }}
          onClick={() => {
            setIsOpen(true);
            setActiveType(type);
          }}
          icon={<PlusSVG />}>
          <Typography.Text
            className="sm_text_medium"
            ellipsis={{ tooltip: "Created itinerary" }}
            style={{ color: "#fff" }}>
            {type === BOOKINGS_TYPES.FLIGHT
              ? "Flight Booking"
              : type === BOOKINGS_TYPES.TRANSFER
              ? "Transfer Booking"
              : type === BOOKINGS_TYPES.EXPERIENCE
              ? "Experiance Booking"
              : type === BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS
              ? "Transfer Booking"
              : "Hotel Booking"}
          </Typography.Text>
        </Button>
      )}
      {(() => {
        switch (activeType) {
          case BOOKINGS_TYPES.FLIGHT:
            return (
              <AddFilghtManualBooking
                isOpen={isOpen}
                close={() => setIsOpen(false)}
                refetch={refetch}
              />
            );
          case BOOKINGS_TYPES.TRANSFER:
            return (
              <div>
                {/* Flight Rental */}
                {/* Flight Rental */}
                {/* Flight Rental */}
              </div>
            );
          case BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS:
            return (
              <AddTransfersManualBooling
                isOpen={isOpen}
                close={() => setIsOpen(false)}
                refetch={refetch}
              />
            );
          case BOOKINGS_TYPES.EXPERIENCE:
            return <AddExperienceManualBooking isOpen={isOpen} close={() => setIsOpen(false)} />;
          case BOOKINGS_TYPES.ACCOMMODATION:
            return <AddHotelManualBooking isOpen={isOpen} close={() => setIsOpen(false)} />;
          default:
            return;
            break;
        }
      })()}
    </>
  );
};

export default AddManualBooking;
