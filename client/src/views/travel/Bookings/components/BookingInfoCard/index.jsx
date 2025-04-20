import { CarFilled } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { BuildingSVG, DateSVG, ExperiencesSVG, PlaneSVG, RateStarSVG } from "assets/jsx-svg";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import ROUTER_URLS from "constants/ROUTER_URLS";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const BookingInfoCard = ({ moduleType, data, maxWidth = "18dvw" }) => {
  if (!data?.accommodation && moduleType === BOOKINGS_TYPES.ACCOMMODATION) {
    console.log(data);
  }
  switch (moduleType) {
    case BOOKINGS_TYPES.ACCOMMODATION:
      return data?.id ? (
        <div style={{ maxWidth, width: "100%" }}>
          <Flex gap={8} align="center">
            <BuildingSVG color="#313342" />
            <Link
              to={
                ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS +
                data?.id +
                `?type=${BOOKINGS_TYPES.ACCOMMODATION}`
              }>
              #{data?.id}
            </Link>
          </Flex>
          <Typography.Paragraph className="d-flex">
            {data?.accommodation?.name && (
              <Typography.Text
                className="fz-12 gc"
                ellipsis={{ tooltip: data?.accommodation?.name }}>
                {data?.accommodation?.name}
              </Typography.Text>
            )}
            {data?.accommodation?.rate && (
              <span className="rate_stars">
                {[...new Array(data?.accommodation?.rate || 0)].map((el, index) => (
                  <RateStarSVG key={index} />
                ))}
              </span>
            )}
          </Typography.Paragraph>
          <p className="d-flex fz-12" style={{ alignItems: "center", gap: "6px" }}>
            <DateSVG color="#585A72" /> {dayjs(data.createdAt).format("YYYY/MM/DD")}
          </p>
        </div>
      ) : (
        <>accommodation has been deleted</>
      );
    case BOOKINGS_TYPES.EXPERIENCE:
      return data?.travelProduct ? (
        <div style={{ maxWidth, width: "100%" }}>
          <p>
            <ExperiencesSVG fill={"#313342"} />:{" "}
            <Link
              to={
                ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS +
                data?.id +
                `?type=${BOOKINGS_TYPES.EXPERIENCE}`
              }>
              #{data?.travelProduct?.id}
            </Link>
          </p>
          <Typography.Paragraph className="d-flex">
            <Typography.Text className="fz-12 gc" ellipsis>
              {data?.travelProduct?.title}
            </Typography.Text>
            <span className="rate_stars">
              {[...new Array(data?.travelProduct?.rate || 0)].map((el, index) => (
                <RateStarSVG key={index} />
              ))}
            </span>
          </Typography.Paragraph>
          <p className="d-flex fz-12" style={{ alignItems: "center", gap: "6px" }}>
            <DateSVG color="#585A72" /> {dayjs(data.createdAt).format("YYYY/MM/DD")}
          </p>
        </div>
      ) : (
        <>experience has been deleted</>
      );
    case BOOKINGS_TYPES.FLIGHT:
      return data?.flights ? (
        <div style={{ maxWidth, width: "100%" }}>
          <p>
            <PlaneSVG color="#313342" /> :{" "}
            <Link
              to={
                ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS +
                data?.id +
                `?type=${BOOKINGS_TYPES.FLIGHT}`
              }>
              #{data?.id}
            </Link>
          </p>
          <Typography.Paragraph ellipsis>#{data.flights.outboundFlightNo}</Typography.Paragraph>
          {data.flights.returnFlightNo && (
            <Typography.Paragraph ellipsis>#{data.flights.returnFlightNo}</Typography.Paragraph>
          )}
          <p className="d-flex fz-12" style={{ alignItems: "center", gap: "6px" }}>
            <DateSVG color="#585A72" /> {dayjs(data.createdAt).format("YYYY/MM/DD")}
          </p>
        </div>
      ) : (
        <>flights has been deleted</>
      );
    case BOOKINGS_TYPES.TRANSFER:
      return data?.id ? (
        <div style={{ maxWidth, width: "100%" }}>
          <p>
            <CarFilled fill="#313342" /> :{" "}
            <Link
              to={
                ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS +
                data?.id +
                `?type=${BOOKINGS_TYPES.TRANSFER}`
              }>
              #{data?.id}
            </Link>
          </p>
          <Typography.Paragraph ellipsis>
            {data?.name} (model:{data?.vehicle?.model})
          </Typography.Paragraph>
          <p className="d-flex fz-12" style={{ alignItems: "center", gap: "6px" }}>
            <DateSVG color="#585A72" /> {dayjs(data.createdAt).format("YYYY/MM/DD")}
          </p>
        </div>
      ) : (
        <>transfer has been deleted</>
      );
    case BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS:
      return data?.id ? (
        <div style={{ maxWidth, width: "100%" }}>
          <p>
            <CarFilled fill="#313342" /> :{" "}
            <Link
              to={
                ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS +
                data?.id +
                `?type=${BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS}`
              }>
              #{data?.id}
            </Link>
          </p>
          <Typography.Paragraph ellipsis>
            {data?.name} (model:{data?.vehicle?.model})
          </Typography.Paragraph>
          <p className="d-flex fz-12" style={{ alignItems: "center", gap: "6px" }}>
            <DateSVG color="#585A72" /> {dayjs(data.createdAt).format("YYYY/MM/DD")}
          </p>
        </div>
      ) : (
        <>transfer has been deleted</>
      );
    case BOOKINGS_TYPES.PACKAGES:
      return <p>PACKAGES IS COMMING SOON</p>;
    default:
      return <p>COMMING SOON</p>;
  }
};

export default BookingInfoCard;
