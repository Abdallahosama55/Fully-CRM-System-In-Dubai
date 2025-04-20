import {
  Button,
  Collapse,
  Divider,
  Flex,
  Skeleton,
  Space,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InfoSVG } from "assets/jsx-svg";
import ROUTER_URLS from "constants/ROUTER_URLS";
import Badge from "components/common/Badge";

import useGetHotelRooms from "services/travel/booking/Accommodation/Queries/useGetHotelRooms";
import useGetLocalHotelRooms from "services/travel/accommodations/LocalHotels/Queries/useGetLocalHotelRooms";
import AddToQuotation from "components/AddToQuotation";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
import { getSearchParamsAsURIComponent, getSearchParamsFromURIComponent } from "utils/uri-params";
import TboRoomsSection from "./TboRoomsSection";
import isValidJson from "utils/isValidJson";
import TurboLoadingPage from "components/common/TurboLoadingPage";
const RoomsSection = ({ accommodationId, tboAccomodationInfo, setRateConditions }) => {
  const { search } = useLocation();
  const searchParams = useMemo(() => getSearchParamsFromURIComponent(search), [search]);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const navigate = useNavigate();
  const searchRequest = useMemo(() => {
    return {
      accommodationId,
      arrival: dayjs(searchParams?.arrival).format("YYYY-MM-DD"),
      departure: dayjs(searchParams?.departure).format("YYYY-MM-DD"),
      night: Math.abs(dayjs(searchParams?.arrival).diff(dayjs(searchParams?.departure), "day")),
      ...searchParams,
    };
  }, [accommodationId, searchParams]);
  // QUERIES
  // LOCAL HOTEL ROOMS
  const localHotelRooms = useGetLocalHotelRooms(
    { hotelCode: tboAccomodationInfo?.HotelCode, ...searchParams },
    { enabled: Boolean(searchParams?.isLocalBook) },
  );

  // SYSTEM HOTEL ROOMS
  const hotelRoomsQuery = useGetHotelRooms(searchRequest, {
    enabled: !searchParams?.isLocalBook,
  });

  const selectedRoomsData = useMemo(
    () =>
      selectedRooms?.map((selectedRoomKey, roomIndex) =>
        hotelRoomsQuery?.data?.roomsData?.[roomIndex]?.rooms?.find(
          (room) => room?.bookingKey === selectedRoomKey,
        ),
      ),
    [hotelRoomsQuery?.data, selectedRooms],
  );

  // IS TBO HOTEL FLAG
  const isTboHotel = useMemo(
    () => hotelRoomsQuery?.data?.source === "TBO",
    [hotelRoomsQuery?.data?.source],
  );

  // ROOMS QUERY
  const roomsQuery = useMemo(() => {
    if (searchParams?.isLocalBook) {
      return localHotelRooms;
    } else {
      if (
        Array.isArray(hotelRoomsQuery?.data?.accommodationInfo?.rateConditions) &&
        hotelRoomsQuery?.data?.accommodationInfo?.rateConditions?.length > 0
      ) {
        setRateConditions(hotelRoomsQuery?.data?.accommodationInfo?.rateConditions);
      }
      return hotelRoomsQuery;
    }
  }, [searchParams?.isLocalBook, localHotelRooms, hotelRoomsQuery]);

  // HANDLERS
  const handleRowSelection = (roomIndex, selectedRowKeys) => {
    setSelectedRooms((prev) =>
      prev?.map((room, index) => (index === roomIndex ? selectedRowKeys?.[0] : room)),
    );
  };

  useEffect(() => {
    if (Array.isArray(roomsQuery?.data?.roomsData)) {
      setSelectedRooms(
        roomsQuery?.data?.roomsData?.map(
          (room) => room?.rooms?.[0]?.bookingKey || room?.rooms?.[0]?.bookingCode,
        ),
      );
    }
  }, [roomsQuery?.data?.roomsData]);

  if (roomsQuery?.isLoading || roomsQuery?.isPending) {
    return <TurboLoadingPage height="400px" />;
  }

  if (isTboHotel) {
    return (
      <TboRoomsSection
        rooms={roomsQuery?.data?.roomsData}
        accommodation={roomsQuery?.data?.accommodationInfo}
        accommodationId={accommodationId}
        searchParams={searchParams}
      />
    );
  }

  return (
    <div>
      <div style={{ margin: "24px 0" }}>
        <Divider />
      </div>
      <Flex align="center" justify="space-between">
        <p className="fz-18 fw-500" style={{ marginBottom: "24px" }}>
          Available Rooms
        </p>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              navigate(
                ROUTER_URLS.TRAVEL.ACCOMMODATION.BOOK +
                  accommodationId +
                  `${getSearchParamsAsURIComponent({ ...searchParams, selectedRooms })}`,
                {
                  state: {
                    rooms: roomsQuery?.data?.roomsData
                      ?.map((room) =>
                        room?.rooms?.map((el) => ({
                          ...el,
                          name: el?.name || room?.roomName || room?.name || room?.Name,
                        })),
                      )
                      ?.flat()
                      ?.filter((room) =>
                        selectedRooms?.find(
                          (el) => el === room?.bookingKey || el === room?.bookingCode,
                        ),
                      ),
                    bookingKeys: selectedRooms,
                    accommodation: roomsQuery?.data?.accommodationInfo,
                    tboAccomodationInfo,
                    cancellationName: Array.isArray(roomsQuery?.data?.cancellationPolicy)
                      ? roomsQuery?.data?.cancellationPolicy?.[0]?.type
                      : undefined,
                  },
                },
              );
            }}>
            Book now
          </Button>
          {!searchParams?.isLocalBook && (
            <AddToQuotation
              addButtonProps={{ icon: undefined, children: "Add To Quotation", type: "" }}
              item={{
                type: QUOTATION_ITEM_TYPES.ACCOMMODATION,
                bookingKey: JSON.stringify(
                  selectedRooms?.map((el) => (isValidJson(el) ? JSON.parse(el)?.bookingKey : el)),
                ),
                bookingKeys: selectedRooms?.map((el) =>
                  isValidJson(el) ? JSON.parse(el)?.bookingKey : el,
                ),
                arrivalDate: searchParams?.arrival,
                departureDate: searchParams?.departure,
                name: roomsQuery?.data?.accommodationInfo?.accommodation?.name,
                adults: searchParams?.rooms?.reduce((acc, current) => acc + current?.adults, 0),
                childs: searchParams?.rooms?.reduce((acc, current) => acc + current?.childs, 0),
                id: accommodationId,
                price: selectedRoomsData?.reduce((acc, current) => acc + current?.amount, 0),
                rooms: selectedRoomsData?.map((room) => {
                  return {
                    name: room?.name?.toLowerCase(),
                    bookingKey: isValidJson(room?.bookingKey)
                      ? JSON.parse(room?.bookingKey)?.bookingKey
                      : room?.bookingKey,
                    adults: room?.adults,
                    childs: room?.children,
                    infants: room?.infants || 0,
                    price: room?.amount,
                  };
                }),
              }}
            />
          )}
        </Space>
      </Flex>
      <Tabs
        destroyInactiveTabPane={true}
        defaultActiveKey="0"
        items={roomsQuery?.data?.roomsData?.map((room, roomIndex) => ({
          key: room?.requestedRoomIndex,
          label: room?.roomName || room?.name || room?.Name,
          children: (
            <Table
              rowSelection={{
                type: "radio",
                selectedRowKeys: [selectedRooms[Number(room?.requestedRoomIndex)]] || [],
                onChange: (selectedRowKeys) =>
                  handleRowSelection(room?.requestedRoomIndex, selectedRowKeys),
              }}
              loading={roomsQuery?.isLoading || localHotelRooms?.isLoading}
              pagination={room?.rooms?.length > 10}
              dataSource={room?.rooms?.map((el) => {
                return {
                  ...el,
                  key: el?.bookingKey || el?.bookingCode,
                  childs: el?.children,
                  children: undefined,
                };
              })}
              columns={[
                {
                  title: "Room Name",
                  dataIndex: "name",
                  key: "name",
                  onCell: () => ({ style: { padding: "2.5rem 1rem" } }),
                  render: (text, rowData) => (
                    <p style={{ textTransform: "capitalize" }}>
                      {text ||
                        (Array.isArray(rowData?.Name) &&
                          rowData?.Name?.length > 0 &&
                          rowData?.Nam?.[0])}
                    </p>
                  ),
                },
                !searchParams?.isLocalBook && {
                  title: "Room Type",
                  dataIndex: "type",
                  key: "type",
                },
                !searchParams?.isLocalBook && {
                  title: "Room size",
                  dataIndex: "roomSize",
                  key: "roomSize",
                  render: (text) => (text ? <span>{text} m²</span> : "-"),
                },
                !searchParams?.isLocalBook && {
                  title: "Number of guests",
                  dataIndex: "numberOfGuest",
                  key: "numberOfGuest",
                  render: (text) => (text ? <span>{text}</span> : "-"),
                },
                searchParams?.isLocalBook && {
                  title: "Is Refundable",
                  dataIndex: "isRefundable",
                  key: "isRefundable",
                  render: (isRefundable) => (
                    <Badge
                      style={{ minWidth: "130px" }}
                      status={
                        typeof isRefundable === "string"
                          ? isRefundable === "No refund"
                            ? "warning"
                            : "success"
                          : isRefundable
                          ? "success"
                          : "warning"
                      }>
                      {typeof isRefundable === "string"
                        ? isRefundable
                        : isRefundable
                        ? "No refund"
                        : "refundable"}
                    </Badge>
                  ),
                },
                {
                  title: "Includes",
                  dataIndex: ["rate", "pensionName"],
                  key: "pensionName",
                  render: (text, rowData) => (
                    <p>{text || rowData?.inclusion || rowData?.Inclusion || "-"}</p>
                  ),
                },
                searchParams?.isLocalBook && {
                  title: "Meal Type",
                  dataIndex: ["rate", "mealType"],
                  key: "mealType",
                  render: (text, rowData) => (
                    <p>{text || rowData?.mealType || rowData?.MealType || "-"}</p>
                  ),
                },
                !searchParams?.isLocalBook && {
                  title: "Cancelation",
                  dataIndex: "cancellationPolicy",
                  key: "Cancelation",
                  render: () =>
                    Array.isArray(roomsQuery?.data?.cancellationPolicy) &&
                    roomsQuery?.data?.cancellationPolicy?.length > 1 ? (
                      <Collapse
                        ghost
                        expandIcon={() => null}
                        items={[
                          {
                            key: "2",
                            label: (
                              <Flex align="center" gap={"6px"}>
                                <Tooltip title={"Click to show"}>
                                  <InfoSVG />
                                </Tooltip>
                                <Typography.Paragraph
                                  className="fz-14"
                                  ellipsis={{
                                    tooltip: roomsQuery?.data?.cancellationPolicy?.[0]?.type,
                                  }}
                                  style={{
                                    marginBottom: "0",
                                    color:
                                      roomsQuery?.data?.cancellationPolicy?.[0]?.key?.type ===
                                      "Free cancellation"
                                        ? "#4BB543"
                                        : "#000",
                                  }}>
                                  {roomsQuery?.data?.cancellationPolicy?.[0]?.type}
                                </Typography.Paragraph>
                              </Flex>
                            ),
                            children: (
                              <div>
                                {Array.isArray(roomsQuery?.data?.cancellationPolicy) &&
                                  roomsQuery?.data?.cancellationPolicy?.length > 1 && (
                                    <>
                                      {roomsQuery?.data?.cancellationPolicy?.map((el, index) => {
                                        if (index !== 0) {
                                          return (
                                            <Typography.Paragraph
                                              className="fz-14"
                                              key={el.type}
                                              ellipsis={{
                                                tooltip: el.type,
                                              }}
                                              style={{
                                                marginBottom: "4px",
                                                color:
                                                  el?.key?.type === "Free cancellation"
                                                    ? "#4BB543"
                                                    : "#000",
                                              }}>
                                              {el.type}
                                            </Typography.Paragraph>
                                          );
                                        } else {
                                          return <> </>;
                                        }
                                      })}
                                    </>
                                  )}
                              </div>
                            ),
                          },
                        ]}
                      />
                    ) : (
                      <Typography.Paragraph
                        ellipsis={{ tooltip: roomsQuery?.data?.cancellationPolicy?.[0]?.type }}
                        className="fz-14"
                        style={{
                          marginBottom: "0",
                          color:
                            roomsQuery?.data?.cancellationPolicy?.[0]?.key?.type ===
                            "Free cancellation"
                              ? "#4BB543"
                              : "#000",
                        }}>
                        {roomsQuery?.data?.cancellationPolicy?.[0]?.type}
                      </Typography.Paragraph>
                    ),
                },
                {
                  title: "Price",
                  dataIndex: ["rate", "amount"],
                  key: "amount",
                  render: (text, rowData) => (
                    <span>
                      ${rowData?.amount || text || rowData?.totalFare || rowData?.TotalFare}
                    </span>
                  ),
                },
              ]?.filter(Boolean)}
            />
          ),
        }))}
      />
    </div>
  );
};

export default RoomsSection;

/*
{
    "bookingCode": "1178170!TB!2!TB!93876f5e-f6d3-4949-95f6-9e141b8bc0ab",
    "name": "Deluxe Room, 1 King Bed (Arabian Court),NonSmoking",
    "inclusion": "Free valet parking,Free breakfast",
    "totalFare": 3061.89,
    "totalTax": 526.82,
    "mealType": "BreakFast",
    "isRefundable": "No refund",
    "roomPromotion": "Free waterpark access for 2 per day",
    "supplement": [
        {
            "Index": 2,
            "Type": "AtProperty",
            "Description": "mandatory_tax",
            "Price": 20,
            "Currency": "AED"
        }
    ],
    "dayRate": [
        {
            "BasePrice": 1040.63
        }
    ],
    "cancelPolicies": [
        {
            "FromDate": "02-04-2025 00:00:00",
            "ChargeType": "Percentage",
            "CancellationCharge": 100
        }
    ],
    "requestedRoomIndex": 1,
    "adults": 1,
    "children": 1,
    "childrenAges": [
        3
    ]
}
*/
