import { Button, Collapse, Flex, Table, Tabs, Tooltip, Typography } from "antd";
import { InfoSVG } from "assets/jsx-svg";
import React, { useEffect, useState } from "react";
import isValidJson from "utils/isValidJson";

const SystemRoomsSection = ({ onAddToTrip, roomsData, cancellationPolicy, isAddToTripLoading }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    if (Array.isArray(roomsData)) {
      setSelectedRooms(
        roomsData?.map((room) => room?.rooms?.[0]?.bookingKey || room?.rooms?.[0]?.bookingCode),
      );
    }
  }, [roomsData]);

  const handleRowSelection = (roomIndex, selectedRowKeys) => {
    setSelectedRooms((prev) =>
      prev?.map((room, index) => (index === roomIndex ? selectedRowKeys?.[0] : room)),
    );
  };
  return (
    <div>
      <Flex align="center" justify="space-between">
        <p className="fz-18 fw-500">Available Rooms</p>
        <Button
          size="small"
          type="primary"
          loading={isAddToTripLoading}
          onClick={() => {
            const selectedRoomsData = selectedRooms?.map((selectedRoomKey, roomIndex) =>
              roomsData?.[roomIndex]?.rooms?.find((room) => room?.bookingKey === selectedRoomKey),
            );
            if (!selectedRoomsData || selectedRoomsData?.length === 0) {
              return;
            }
            onAddToTrip({
              name: "",
              bookingKey: JSON.stringify(
                selectedRooms?.map((el) => (isValidJson(el) ? JSON.parse(el)?.bookingKey : el)),
              ),
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
            });
          }}>
          Add To Trip
        </Button>
      </Flex>
      <Tabs
        destroyInactiveTabPane={true}
        defaultActiveKey="0"
        items={roomsData?.map((room) => ({
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
                  render: (text, rowData) => (
                    <p style={{ textTransform: "capitalize" }}>
                      {text ||
                        (Array.isArray(rowData?.Name) &&
                          rowData?.Name?.length > 0 &&
                          rowData?.Nam?.[0])}
                    </p>
                  ),
                },
                {
                  title: "Room Type",
                  dataIndex: "type",
                  key: "type",
                },
                {
                  title: "Room size",
                  dataIndex: "roomSize",
                  key: "roomSize",
                  render: (text) => (text ? <span>{text} m²</span> : "-"),
                },
                {
                  title: "Number of guests",
                  dataIndex: "numberOfGuest",
                  key: "numberOfGuest",
                  render: (text) => (text ? <span>{text}</span> : "-"),
                },
                {
                  title: "Includes",
                  dataIndex: ["rate", "pensionName"],
                  key: "pensionName",
                  render: (text, rowData) => (
                    <p>{text || rowData?.inclusion || rowData?.Inclusion || "-"}</p>
                  ),
                },
                {
                  title: "Cancelation",
                  dataIndex: "cancellationPolicy",
                  key: "Cancelation",
                  render: () =>
                    Array.isArray(cancellationPolicy) && cancellationPolicy?.length > 1 ? (
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
                                    tooltip: cancellationPolicy?.[0]?.type,
                                  }}
                                  style={{
                                    marginBottom: "0",
                                    color:
                                      cancellationPolicy?.[0]?.key?.type === "Free cancellation"
                                        ? "#4BB543"
                                        : "#000",
                                  }}>
                                  {cancellationPolicy?.[0]?.type}
                                </Typography.Paragraph>
                              </Flex>
                            ),
                            children: (
                              <div>
                                {Array.isArray(cancellationPolicy) &&
                                  cancellationPolicy?.length > 1 && (
                                    <>
                                      {cancellationPolicy?.map((el, index) => {
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
                        ellipsis={{ tooltip: cancellationPolicy?.[0]?.type }}
                        className="fz-14"
                        style={{
                          marginBottom: "0",
                          color:
                            cancellationPolicy?.[0]?.key?.type === "Free cancellation"
                              ? "#4BB543"
                              : "#000",
                        }}>
                        {cancellationPolicy?.[0]?.type}
                      </Typography.Paragraph>
                    ),
                },
                {
                  title: "Price",
                  dataIndex: ["rate", "amount"],
                  key: "amount",
                  render: (text, rowData) => <span>${rowData?.amount}</span>,
                },
              ]?.filter(Boolean)}
            />
          ),
        }))}
      />
    </div>
  );
};

export default SystemRoomsSection;
