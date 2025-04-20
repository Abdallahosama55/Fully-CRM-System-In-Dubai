import React from "react";
import { Button, Col, Flex, message, Row, Space, Tooltip, Typography } from "antd";
import default_flight_image from "assets/images/default_flight_image.png";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DeleteSVG, FlightSVG, ReturnFlightSVG, TimerSVG } from "assets/jsx-svg";
import { useDrawer } from "hooks/useDrawer";
import useGetAirlineByCode from "services/Common/Queries/useGetAirlineByCode";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import useAddToQuotation from "services/travel/quotation/Mutations/useAddToQuotation";
import { useParams } from "react-router-dom";
import useDeleteQuotationItem from "services/travel/quotation/Mutations/useDeleteQuotationItem";
dayjs.extend(utc);

const FlightCard = ({
  data,
  isDeletable,
  isAddItemCard = false,
  onAddItem,
  arrivalDate,
  departureDate,
  paxes,
  onDeletItem,
}) => {
  const DrawerAPI = useDrawer();
  const { id } = useParams();
  console.log("data?.details?.outboundFlight", data?.details?.outboundFlight);
  // MUTATUIONS
  const deleteQuotationItem = useDeleteQuotationItem({
    onSuccess: () => {
      message.success("Item deleted successfully");
      onDeletItem();
    },
    onError: (error) => {
      message?.error(error?.message || "something went wrong");
    },
  });

  const addToQuotation = useAddToQuotation(
    {
      onSuccess: () => {
        message.success("Item added to trip");
        onAddItem();
      },
      onError: (error) => {
        message?.error(error?.message || "something went wrong");
      },
    },
    { enabled: isAddItemCard },
  );

  const handelDelete = () => {
    deleteQuotationItem.mutate(data?.id);
  };

  const onAddClick = () => {
    addToQuotation.mutate({
      qutationId: id,
      item: {
        type: QUOTATION_ITEM_TYPES.FLIGHT,
        id: data?.outboundFlight[0]?.id,
        name: `${data?.type === "TWO_WAY" ? "(Two Way)" : "(One Way)"} From ${
          data?.outboundFlight[0]?.fromAirPortInfo?.name
        } To ${data?.outboundFlight[data?.outboundFlight?.length - 1]?.toAirPortInfo?.name}`,
        bookingKey: JSON.stringify({
          outboundFlights: data?.outboundFlight?.map((el) => el?.id),
          returnFlights: data?.returnFlight?.map((el) => el?.id),
          type: data?.type,
        }),
        price: data?.totalPrice,
        arrivalDate,
        departureDate,
        ...paxes,
      },
    });
  };

  return (
    <Row
      gutter={[12, 12]}
      style={{
        border: "1px solid red",
        borderRadius: "16px",
        padding: "24px 1rem",
        marginBottom: "1.2rem",
        border: "1px solid #E5E5EA",
        position: "relative",
      }}>
      {DrawerAPI.Render}
      {isDeletable && (
        <Tooltip title="Delete this item">
          <Button
            icon={<DeleteSVG color="currentColor" />}
            danger
            loading={deleteQuotationItem?.isPending}
            type="primary"
            className="table_action_button delete_quotation_item_button"
            onClick={handelDelete}
          />
        </Tooltip>
      )}

      <Col md={18} xs={24}>
        <Flex vertical gap={16}>
          {!isAddItemCard &&
            Array.isArray(data?.details?.outboundFlight) &&
            data?.details?.outboundFlight?.map((plane, index) => (
              <PlaneCard {...plane} key={index} />
            ))}
          {!isAddItemCard &&
            Array.isArray(data?.details?.returnFlight) &&
            data?.details?.returnFlight?.map((plane, index) =>
              plane?.id ? <PlaneCard {...plane} key={index} isItReturnFlight={true} /> : <></>,
            )}
          {isAddItemCard &&
            Array.isArray(data?.outboundFlight) &&
            data?.outboundFlight?.map((plane, index) => <PlaneCard {...plane} key={index} />)}
          {isAddItemCard &&
            Array.isArray(data?.returnFlight) &&
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
          {!isAddItemCard && (
            <p className="fz-16 fw-700">
              {data?.details?.outboundFlight[0]?.currencyCode === "USD" ? "$" : ""}
              {data?.price}
              {data?.details?.outboundFlight[0]?.currencyCode !== "USD" &&
                data?.details?.outboundFlight[0]?.currencyCode}
            </p>
          )}
          {isAddItemCard && (
            <p className="fz-16 fw-700">
              {data?.outboundFlight[0]?.currencyCode === "USD" ? "$" : ""}
              {data?.totalPrice}
              {data?.outboundFlight[0]?.currencyCode !== "USD" &&
                data?.outboundFlight[0]?.currencyCode}
            </p>
          )}
          {!isAddItemCard
            ? Array.isArray(data?.details?.outboundFlight) && (
                <p className="fz-12 fw-500" style={{ color: "#D50000" }}>
                  {data?.details?.outboundFlight[0]?.availableAlotment} Seats Left
                </p>
              )
            : Array.isArray(data?.outboundFlight) && (
                <p className="fz-12 fw-500" style={{ color: "#D50000" }}>
                  {data?.outboundFlight[0]?.availableAlotment} Seats Left
                </p>
              )}
          {isAddItemCard && (
            <Button
              type="primary"
              size="small"
              onClick={onAddClick}
              loading={addToQuotation.isLoading}>
              Add To Trip
            </Button>
          )}
        </Flex>
      </Col>
    </Row>
  );
};

export default FlightCard;

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
