  import { Button, Col, Flex, Row, Space, Typography } from "antd";
import React from "react";
import useGetAirlineByCode from "services/Common/Queries/useGetAirlineByCode";
import default_flight_image from "assets/images/default_flight_image.png";
import dayjs from "dayjs";
import { FlightSVG, ReturnFlightSVG, TimerSVG } from "assets/jsx-svg";

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

const FlightCard = ({
  data,
  isMultiple = false,
  isSelected,
  onSelect = () => {},
  onAdd = () => {},
}) => {
  return (
    <Row
      gutter={[12, 12]}
      style={{
        border: "1px solid red",
        borderRadius: "16px",
        padding: "24px 1rem",
        margin: "0rem 0.5rem 1.2rem 0.5rem",
        border: "1px solid #E5E5EA",
      }}>
      <Col md={18} xs={24}>
        <Flex vertical gap={16}>
          {data?.outboundFlight && <PlaneCard {...data?.outboundFlight} />}
          {data?.returnFlight && <PlaneCard {...data?.returnFlight} />}
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
          <p className="fz-16 fw-700">{data?.totalPrice && <p>${Number(data?.totalPrice)?.toFixed(3)}</p>}</p>
          <p className="fz-12 fw-500" style={{ color: "#D50000" }}>
            {data?.outboundFlight?.availableAlotment} Seats Left
          </p>
          <Button
            size="small"
            type={"primary"}
            onClick={() => {
              if (isMultiple) {
                onSelect({
                  ...data,
                });
              } else {
                onAdd({
                  ...data,
                });
              }
            }}
            style={{ padding: "1rem", marginTop: "10px" }}
            disabled={isMultiple ? isSelected : false}
            className="book_now_btn fz-12 fw-700">
            {isMultiple ? "Select" : "Add to Library"}
          </Button>
        </Flex>
      </Col>
    </Row>
  );
};

export default FlightCard;
