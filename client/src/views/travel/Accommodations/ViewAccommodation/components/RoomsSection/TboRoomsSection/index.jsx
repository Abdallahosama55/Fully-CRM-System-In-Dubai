import React from "react";
import "./styles.css";
import { Button, Col, Flex, Row, Typography, Card, Divider, Table } from "antd";
import { useNavigate } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { getSearchParamsAsURIComponent } from "utils/uri-params";
import AddToQuotation from "components/AddToQuotation";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import PersonSVG from "assets/jsx-svg/PersonSVG";
import { ChildFaceSVG } from "assets/jsx-svg";
import dayjs from "dayjs";

const TboRoomsSection = ({ rooms, accommodationId, accommodation, searchParams }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ margin: "24px 0" }}>
        <Divider />
      </div>
      <p className="fz-18 fw-500" style={{ marginBottom: "24px" }}>
        Available Rooms
      </p>
      {rooms?.map((room, index) => (
        <div className="room_compination_card" key={index}>
          <div className="room_compination_card_header">
            <Flex align="center" justify="space-between">
              <Typography.Paragraph
                className="fz-14 fw-600 color-primary"
                ellipsis={{
                  tooltip: new Intl.ListFormat("en", {
                    style: "long",
                    type: "conjunction",
                  }).format(room?.Name?.map((el) => el?.toLowerCase()) || []),
                }}
                style={{ maxWidth: "70%", marginBottom: 0 }}>
                {new Intl.ListFormat("en", {
                  style: "long",
                  type: "conjunction",
                }).format(room?.Name?.map((el) => el?.toLowerCase()) || [])}
              </Typography.Paragraph>
              <Flex align="center" gap={10}>
                <p className="room_compination_card_header_room_price">${room?.TotalFare}</p>
                <Button
                  style={{ width: "110px" }}
                  type="primary"
                  onClick={() => {
                    navigate(
                      ROUTER_URLS.TRAVEL.ACCOMMODATION.BOOK +
                        accommodationId +
                        `${getSearchParamsAsURIComponent({
                          ...searchParams,
                          selectedRooms: room?.Name?.map((el, index) => {
                            return {
                              name: el?.toLowerCase(),
                              bookingKey: room?.BookingCode,
                              adults: room?.paxes?.[index]?.adults,
                              childAges: room?.paxes?.[index]?.childrenAges?.join("-"),
                            };
                          }),
                        })}`,
                      {
                        state: {
                          totalPrice: room?.TotalFare,
                          rooms: room?.Name?.map((el, index) => {
                            return {
                              name: el?.toLowerCase(),
                              bookingKey: room?.BookingCode,
                              adults: room?.paxes?.[index]?.adults,
                              children: room?.paxes?.[index]?.children,
                              mealType: room?.MealType,
                            };
                          }),
                          accommodation: accommodation,
                          tboAccomodationInfo: accommodation,
                          cancellationName: undefined,
                        },
                      },
                    );
                  }}>
                  Book
                </Button>

                <AddToQuotation
                  item={{
                    type: QUOTATION_ITEM_TYPES.ACCOMMODATION,
                    adults: searchParams?.rooms?.reduce((acc, current) => acc + current?.adults, 0),
                    childs: searchParams?.rooms?.reduce((acc, current) => acc + current?.childs, 0),
                    id: accommodationId,
                    name: accommodation?.name
                      ? `${accommodation?.name} / ${room?.Name?.[0] ?? ""}`
                      : room?.Name?.[0] ?? "",
                    bookingKey: room?.BookingCode,
                    bookingCode: room?.BookingCode,
                    arrivalDate: searchParams?.arrival,
                    departureDate: searchParams?.arrival,
                    price: room?.TotalFare,
                    rooms: room?.Name?.map((el, index) => {
                      return {
                        name: el?.toLowerCase(),
                        bookingCode: room?.BookingCode,
                        bookingKey: room?.BookingCode,
                        adults: room?.paxes?.[index]?.adults,
                        childs: room?.paxes?.[index]?.children,
                        infants: room?.paxes?.[index]?.infants || 0,
                        basePrice: room?.DayRates?.[index]?.[0]?.BasePrice,
                        totalFare: room?.TotalFare,
                      };
                    }),
                  }}
                  addButtonProps={{
                    type: "",
                    icon: "",
                    children: "Add to trip",
                  }}
                />
              </Flex>
            </Flex>
          </div>
          <div className="room_compination_card_body">
            <Table
              pagination={false}
              dataSource={room?.Name?.map((el, index) => {
                return {
                  name: el?.toLowerCase(),
                  bookingCode: room?.BookingCode,
                  paxes: room?.paxes?.[index],
                  infants: room?.paxes?.[index]?.infants || 0,
                  basePrice: room?.DayRates?.[index]?.[0]?.BasePrice || 0,
                  totalFare: room?.TotalFare,
                  inclusion: room?.Inclusion,
                  cancellationPolicy: room?.CancelPolicies?.[0],
                  supplement: room?.Supplements?.[index]?.[0],
                };
              })}
              columns={[
                {
                  title: "Room No",
                  key: "paxes",
                  dataIndex: "paxes",
                  render: (paxes, rowData, index) => (
                    <Flex align="center" gap={4}>
                      <p>Room {index + 1}</p>
                      <Flex align="center">
                        <span>{"("}</span>
                        <PersonSVG /> <span>x{paxes?.adults}</span>
                        {!paxes?.children && <span>{")"}</span>}
                        {paxes?.children > 0 && (
                          <>
                            <span>, </span>
                            <ChildFaceSVG />
                            <span>x{paxes?.children}</span>
                            <span>{")"}</span>
                          </>
                        )}
                      </Flex>
                    </Flex>
                  ),
                },
                {
                  title: "Room Name",
                  dataIndex: "name",
                  key: "name",
                  width: "180px",
                },
                {
                  title: "Inclusions",
                  dataIndex: "inclusion",
                  key: "inclusion",
                },
                room?.Supplements && {
                  title: "Supplement",
                  dataIndex: "supplement",
                  key: "supplement",
                  width: "200px",
                  render: (supplement) => {
                    const isAtProperty = supplement?.Type === "AtProperty";
                    const label = isAtProperty ? "Pay at property" : "Included in total";
                    console.log(supplement);
                    return (
                      <div key={index}>
                        <p>
                          {`${supplement?.Price} ${
                            supplement?.Currency
                          }, ${supplement?.Description?.replace(/_/g, " ")} `}
                        </p>
                        <p
                          className="fz-12 fw-500"
                          style={{ color: isAtProperty ? "var(--color-gray-600)" : "#008D47" }}>
                          ({label})
                        </p>
                      </div>
                    );
                  },
                },
                {
                  title: "Cancellation Policy",
                  dataIndex: "cancellationPolicy",
                  key: "cancellationPolicy",
                  render: (cancellationPolicy) => {
                    if (
                      cancellationPolicy?.ChargeType === "Percentage" &&
                      cancellationPolicy?.CancellationCharge === 100
                    ) {
                      return (
                        <div>
                          <p className="xs_text_regular" style={{ color: "#008D47" }}>
                            Free Cancellation
                          </p>
                          {cancellationPolicy?.FromDate && (
                            <p className="fz-10 fw-400" style={{ color: "#008D47" }}>
                              From
                              {dayjs(cancellationPolicy?.FromDate, "DD-MM-YYYY HH:mm:ss")?.format(
                                " DD - MMM - YYYY",
                              )}
                            </p>
                          )}
                          {cancellationPolicy?.ToDate && (
                            <p className="fz-10 fw-400" style={{ color: "#008D47" }}>
                              Until
                              {dayjs(cancellationPolicy?.ToDate, "DD-MM-YYYY HH:mm:ss")?.format(
                                " DD - MMM - YYYY",
                              )}
                            </p>
                          )}
                        </div>
                      );
                    }

                    if (
                      cancellationPolicy?.ChargeType === "Percentage" &&
                      cancellationPolicy?.CancellationCharge === 0
                    ) {
                      <div>
                        <p className="xs_text_regular color-gray-600">Non Refundable</p>
                        {cancellationPolicy?.FromDate && (
                          <p className="fz-10 fw-400 color-gray-600">
                            From
                            {dayjs(cancellationPolicy?.FromDate, "DD-MM-YYYY HH:mm:ss")?.format(
                              " DD - MMM - YYYY",
                            )}
                          </p>
                        )}
                        {cancellationPolicy?.ToDate && (
                          <p className="fz-10 fw-400 color-gray-600">
                            Until
                            {dayjs(cancellationPolicy?.ToDate, "DD-MM-YYYY HH:mm:ss")?.format(
                              " DD - MMM - YYYY",
                            )}
                          </p>
                        )}
                      </div>;
                    }

                    return (
                      <div>
                        <p className="xs_text_regular color-gray-600">
                          {cancellationPolicy?.CancellationCharge}{" "}
                          {cancellationPolicy?.ChargeType === "Percentage" ? "%" : "$"}
                        </p>
                        {cancellationPolicy?.FromDate && (
                          <p className="fz-10 fw-400 color-gray-600">
                            From
                            {dayjs(cancellationPolicy?.FromDate, "DD-MM-YYYY HH:mm:ss")?.format(
                              " DD - MMM - YYYY",
                            )}
                          </p>
                        )}
                        {cancellationPolicy?.ToDate && (
                          <p className="fz-10 fw-400 color-gray-600">
                            Until
                            {dayjs(cancellationPolicy?.ToDate, "DD-MM-YYYY HH:mm:ss")?.format(
                              " DD - MMM - YYYY",
                            )}
                          </p>
                        )}
                      </div>
                    );
                  },
                },
                {
                  title: "Price",
                  dataIndex: "basePrice",
                  key: "basePrice",
                  render: (price) => <p className="fz-14 fw-700 color-gray-600">${price}</p>,
                },
              ]?.filter(Boolean)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TboRoomsSection;
