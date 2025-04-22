import React from "react";
// style
import "./styles.css";
import { Button, Col, Flex, Row, Space, Typography } from "antd";
import default_flight_image from "assets/images/default_flight_image.png";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FlightSVG, ReturnFlightSVG, TimerSVG } from "assets/jsx-svg";
import { useDrawer } from "hooks/useDrawer";
import { useNavigate } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import formatNumber from "utils/formatNumber";
import useGetAirlineByCode from "services/Common/Queries/useGetAirlineByCode";
import { getCurrencySymbol } from "utils/getCurrencySymbol";
dayjs.extend(utc);

const PlaneCard = ({
  isItReturnFlight = false,
  airlineCompany,
  fromDateTime,
  toDateTime,
  fromAirPortInfo,
  toAirPortInfo,
  airlineCompanyCode,
}) => {
  const airlineByCode = useGetAirlineByCode(airlineCompanyCode);
  return (
    <Row gutter={[8, 8]}>
      <Col md={6} xs={24}>
        <Flex style={{ height: "100%" }} vertical align="center">
          <img
            width={70}
            height={20}
            style={{ objectFit: "cover" }}
            src={airlineByCode?.data?.logo || default_flight_image}
            alt="airline company logo"
            onError={(e) => (e.target.src = default_flight_image)}
          />

          {!airlineByCode?.data?.logo && (
            <p className="fz-12 fw-500" style={{ color: "#697281" }}>
              {airlineCompany?.name}
            </p>
          )}
        </Flex>
      </Col>
      <Col md={18} xs={24}>
        <Row gutter={[8, 8]}>
          <Col span={8}>
            <Flex style={{ height: "100%" }} vertical align="center" justify="center" gap={8}>
              <p className="fz-16 fw-700" style={{ color: "#313343" }}>
                {dayjs.utc(fromDateTime).format("DD MMM hh:mm A [GMT]")}
              </p>
              <Typography.Paragraph
                ellipsis={{ tooltip: fromAirPortInfo?.name }}
                className="fz-14 fw-400"
                align="center"
                style={{ color: "#697281", margin: "0", maxWidth: "100%" }}>
                {fromAirPortInfo?.name}
              </Typography.Paragraph>
              <p className="fz-14 fw-400" style={{ color: "#697281" }}>
                #{fromAirPortInfo?.id}
              </p>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex style={{ height: "100%" }} vertical align="center" justify="center" gap={12}>
              <Space size={2} className="fz-12 fw-400" style={{ color: "#697281" }}>
                <TimerSVG /> {dayjs(toDateTime).diff(dayjs(fromDateTime), "hour")}h
              </Space>
              <div style={{ position: "relative", margin: "0 1rem" }}>
                <div style={{ width: "140px", borderTop: "1px dashed #CBCBCB" }} />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%)",
                  }}>
                  {isItReturnFlight ? <ReturnFlightSVG /> : <FlightSVG />}
                </div>
              </div>
              <p className="fz-12 fw-400" style={{ color: "#697281" }}>
                {isItReturnFlight ? "Return" : "Outbound"}
              </p>
            </Flex>
          </Col>
          <Col span={8}>
            <Flex style={{ height: "100%" }} vertical align="center" justify="center" gap={8}>
              <p className="fz-16 fw-700" style={{ color: "#313343" }}>
                {dayjs.utc(toDateTime).format("DD MMM hh:mm A [GMT]")}
              </p>
              <Typography.Paragraph
                ellipsis={{ tooltip: toAirPortInfo?.name }}
                className="fz-14 fw-400"
                style={{ color: "#697281", margin: "0", maxWidth: "100%" }}>
                {toAirPortInfo?.name}
              </Typography.Paragraph>
              <p className="fz-14 fw-400" style={{ color: "#697281" }}>
                #{toAirPortInfo?.id}
              </p>
            </Flex>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const FlightCard = ({ data, travelers, fromDate, toDate }) => {
  const DrawerAPI = useDrawer();
  const naivgate = useNavigate();
  return (
    <Row
      gutter={[12, 12]}
      style={{
        border: "1px solid red",
        borderRadius: "16px",
        padding: "24px 1rem",
        marginBottom: "1.2rem",
        border: "1px solid #E5E5EA",
      }}>
      {DrawerAPI.Render}
      <Col md={18} xs={24}>
        <Flex vertical gap={16}>
          {Array.isArray(data?.outboundFlight) &&
            data?.outboundFlight?.map((plane, index) => <PlaneCard {...plane} key={index} />)}
          {Array.isArray(data?.returnFlight) &&
            data?.returnFlight?.map((plane, index) => (
              <PlaneCard {...plane} key={index} isItReturnFlight={true} />
            ))}
        </Flex>
      </Col>
      <Col md={6} xs={24}>
        <Flex
          vertical
          align="center"
          justify="center"
          style={{
            borderLeft: "1px dashed #CBCBCB",
            height: "100%",
            marginLeft: "2rem",
            paddingLeft: "2rem",
          }}
          gap={2}>
          <p className="fz-16 fw-700">
            {data?.totalPrice || data?.totalSellPrice?.toFixed(2)?.toLocaleString()}{" "}
            {getCurrencySymbol(data?.currencyCode)}
          </p>
          <p className="fz-12 fw-500" style={{ color: "#D50000" }}>
            {data?.outboundFlight[0]?.availableAlotment} Seats Left
          </p>
          <Button
            size="small"
            type={"primary"}
            style={{ marginTop: "10px" }}
            onClick={() => {
              naivgate(ROUTER_URLS.TRAVEL.FLIGHTS.BOOK, {
                state: {
                  ...data,
                  ...travelers,
                  toDate,
                  fromDate,
                },
              });
            }}>
            Select
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default FlightCard;
