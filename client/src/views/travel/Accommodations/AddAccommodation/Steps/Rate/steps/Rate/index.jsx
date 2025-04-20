import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Skeleton,
  Table,
  Tabs,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import CustomButton from "components/common/Button";
import AddSupplementOnRoom from "./components/AddSupplementOnRoom";
import AddSupplementOnOccupation, { APPLICABLE_ON } from "./components/AddSupplementOnOccupation";

// HOOKS
import { useDrawer } from "hooks/useDrawer";
// API CALLS
import useGetSeasonsList from "services/travel/accommodations/Rate/Seasons/Queries/useGetSeasonsList";
import useSeasonByID from "services/travel/accommodations/Rate/Seasons/Queries/useSeasonByID";
import useGetRateBySeasonID from "services/travel/accommodations/Rate/Rate/Queries/useGetRateBySeasonID";
import useAddRate from "services/travel/accommodations/Rate/Rate/Mutations/useAddRate";
// ICONS
import { ArrowRightSVG, BackArrow, Delete2SVG, EditSVG, PlusSVG } from "assets/jsx-svg";

import { queryClient } from "services/queryClient";
// utils
import { v4 as uuidv4 } from "uuid";
import { STEPS_KEYS } from "..";
import useGetSeasonsType from "services/travel/accommodations/Rate/Seasons/Queries/useGetSeasonsType";
import useAddAutomatically from "services/travel/accommodations/Availability/Mutations/useAddAutomatically";

// constants
const TYPE_OF_SALE = {
  PER_PERSON: "perPerson",
  PER_ROOM: "perRoom",
};

const TYPE_OF_SUPPLEMENT = {
  SUPPLEMENT_ON_OCCUPATION: "SUPPLEMENT_ON_OCCUPATION",
  SUPPLEMENT_ON_ROOM: "SUPPLEMENT_ON_ROOM",
};

const Rate = ({ id: accommodationId, moveTo }) => {
  const [seasonId, setSeasonId] = useState(null);
  const [form] = useForm();
  const DrawerAPI = useDrawer();
  const [supplements, setSupplements] = useState([]);

  // Queries
  const seasonsListQuery = useGetSeasonsList(accommodationId);
  const seasonByIdQuery = useSeasonByID(seasonId, { enabled: !!seasonId });
  const rateBySeasonIDQuery = useGetRateBySeasonID(seasonId, { enabled: !!seasonId });
  const seasonsTypeQuery = useGetSeasonsType(accommodationId, {});
  // mutations
  const addAutomatically = useAddAutomatically();
  const seassons = useMemo(() => {
    let temp = [];
    if (seasonsTypeQuery?.data?.type && seasonsListQuery?.data?.data) {
      temp = seasonsListQuery?.data?.data.filter((el) => el.type === seasonsTypeQuery?.data?.type);
    }
    return temp;
  }, [seasonsTypeQuery?.data?.type, seasonsListQuery?.data?.data]);
  // GET INATIAL VALUES
  useEffect(() => {
    const roomsPrice = rateBySeasonIDQuery.data?.roomsPrice;
    if (!roomsPrice) {
      return;
    }

    roomsPrice.forEach((room, roomIndex) => {
      room.pensionsPrices.forEach((price, priceIndex) => {
        form.setFieldValue(
          [seasonId, "roomsPrice", roomIndex, "pensionsPrices", priceIndex, "price"],
          Number(price.price),
        );
        form.setFieldValue(
          [seasonId, "roomsPrice", roomIndex, "pensionsPrices", priceIndex, "typeOfSale"],
          price.typeOfSale,
        );
      });
    });

    roomsPrice.forEach((priceObject) => {
      const temp = [];

      if (Array.isArray(priceObject?.supplementsOccupation)) {
        priceObject.supplementsOccupation.forEach((data) => {
          if (data && typeof data === "object") {
            temp.push({
              ...data,
              kids: data.children,
              children: undefined,
              seasonRoomId: priceObject?.seasonRoomId,
              supplementID: uuidv4(),
              supplementType: TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_OCCUPATION,
            });
          }
        });
      }

      if (Array.isArray(priceObject?.supplementsRoom)) {
        priceObject.supplementsRoom.forEach((data) => {
          temp.push({
            ...data,
            seasonRoomId: priceObject?.seasonRoomId,
            supplementID: uuidv4(),
            supplementType: TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_ROOM,
          });
        });
      }

      setSupplements([...temp]);
    });
  }, [rateBySeasonIDQuery.data, rateBySeasonIDQuery.isSuccess, seasonByIdQuery.data]);

  // set the active id for the season for first time
  useEffect(() => {
    if (seasonsListQuery.isSuccess && seassons.length > 0) {
      setSeasonId(seassons[0]?.id);
    }
  }, [seassons]);

  // Mutations
  const addRateMutation = useAddRate({
    onSuccess: () => {
      message.success("Rate updated successfully");
      queryClient.invalidateQueries(rateBySeasonIDQuery.key);
      addAutomatically.mutate({ accommodationId });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handelFinish = (data) => {
    const { roomsPrice } = data[seasonId];
    addRateMutation.mutate({
      accommodationId,
      seasonId,
      roomsPrice: roomsPrice.map((room) => {
        return {
          ...room,
          supplementsRoom: supplements.filter(
            (supplement) =>
              supplement.supplementType === TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_ROOM &&
              room.seasonRoomId === supplement.seasonRoomId,
          ),
          supplementsOccupation: supplements
            .filter(
              (supplement) =>
                supplement.supplementType === TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_OCCUPATION &&
                room.seasonRoomId === supplement.seasonRoomId,
            )
            .map((el) => ({ ...el, children: el.kids })),
        };
      }),
    });
  };

  if (seasonsListQuery.isLoading) {
    return <Skeleton active />;
  }

  return (
    <div>
      {DrawerAPI.Render}
      <div className="move_header space-between mb-1">
        <div className="prev move_link" onClick={() => moveTo(STEPS_KEYS.SEASONS)}>
          <BackArrow color="#000" /> All Seasons
        </div>
        <div className="next move_link" onClick={() => moveTo(STEPS_KEYS.PROMOTION)}>
          Promotion <ArrowRightSVG color="#000" />
        </div>
      </div>

      <Tabs
        items={seassons?.map((season) => ({
          key: season.id,
          label: season.name,
          children: seasonByIdQuery.isLoading ? (
            <Skeleton active />
          ) : (
            // ROOMS IN THE SEASON LOOP
            <Form key={season.id} layout="vertical" form={form} onFinish={handelFinish}>
              <div>
                {seasonByIdQuery.data?.seasonRooms?.map((room, roomIndex) => {
                  return (
                    <div key={room.id} className="room_block">
                      <Form.Item
                        hidden
                        name={[seasonId, "roomsPrice", roomIndex, "roomId"]}
                        initialValue={room.id}
                      />
                      <Form.Item
                        hidden
                        name={[seasonId, "roomsPrice", roomIndex, "seasonRoomId"]}
                        initialValue={room.seasonRoomId}
                      />
                      <Row gutter={[12, 12]}>
                        <Col lg={5} xs={24}>
                          <p className="fz-16 fw-600">
                            {room.name}{" "}
                            <Typography.Text className="fw-400" ellipsis>
                              ({room.roomType.name})
                            </Typography.Text>
                          </p>
                        </Col>
                        <Col lg={11} xs={24}>
                          {/* PENSIONS IN THE SEASON LOOP */}
                          {seasonByIdQuery.data?.seasonPensions?.map((pension, pensionIndex) => (
                            <Fragment key={pension.id}>
                              <Form.Item
                                hidden
                                name={[
                                  seasonId,
                                  "roomsPrice",
                                  roomIndex,
                                  "pensionsPrices",
                                  pensionIndex,
                                  "seasonRoomId",
                                ]}
                                initialValue={room.seasonRoomId}
                              />
                              <Form.Item
                                hidden
                                name={[
                                  seasonId,
                                  "roomsPrice",
                                  roomIndex,
                                  "pensionsPrices",
                                  pensionIndex,
                                  "roomId",
                                ]}
                                initialValue={room.id}
                              />
                              <Form.Item
                                hidden
                                name={[
                                  seasonId,
                                  "roomsPrice",
                                  roomIndex,
                                  "pensionsPrices",
                                  pensionIndex,
                                  "seasonPensionId",
                                ]}
                                initialValue={pension.seasonPensionId}
                              />
                              <Row gutter={[12, 12]}>
                                <Col lg={12} xs={24}>
                                  <Form.Item
                                    required
                                    label={`Price for ${pension.name}`}
                                    rules={[
                                      {
                                        validator: (_, value) => {
                                          if (!value) {
                                            return Promise.reject(
                                              `Enter price for ${pension.name}`,
                                            );
                                          }

                                          if (value < 0) {
                                            return Promise.reject(`price can't be less than 0`);
                                          }

                                          return Promise.resolve();
                                        },
                                      },
                                    ]}
                                    name={[
                                      seasonId,
                                      "roomsPrice",
                                      roomIndex,
                                      "pensionsPrices",
                                      pensionIndex,
                                      "price",
                                    ]}>
                                    <Input
                                      type="number"
                                      min={0}
                                      placeholder={`Enter Price for ${pension.name}`}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col lg={12} xs={24}>
                                  <Form.Item
                                    required
                                    label={"Type of Sale"}
                                    initialValue={TYPE_OF_SALE.PER_PERSON}
                                    rules={[
                                      {
                                        required: true,
                                        message: `Select ${pension.name} price type`,
                                      },
                                    ]}
                                    name={[
                                      seasonId,
                                      "roomsPrice",
                                      roomIndex,
                                      "pensionsPrices",
                                      pensionIndex,
                                      "typeOfSale",
                                    ]}>
                                    <Select
                                      placeholder="Select Type of Sale"
                                      className="w-100"
                                      options={[
                                        { label: "per person", value: TYPE_OF_SALE.PER_PERSON },
                                        { label: "per room", value: TYPE_OF_SALE.PER_ROOM },
                                      ]}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Fragment>
                          ))}
                        </Col>
                        <Col lg={4} xs={12}>
                          <Button
                            style={{ borderColor: "#3A5EE3", width: "100%" }}
                            icon={<PlusSVG fill="#3A5EE3" />}
                            onClick={() => {
                              DrawerAPI.setDrawerContent(
                                <AddSupplementOnOccupation
                                  DrawerAPI={DrawerAPI}
                                  onAdd={(data) => {
                                    setSupplements((prev) => [
                                      ...prev,
                                      {
                                        ...data,
                                        seasonRoomId: room.seasonRoomId,
                                        supplementID: uuidv4(),
                                        supplementType: TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_OCCUPATION,
                                      },
                                    ]);
                                    DrawerAPI.close();
                                  }}
                                  onEdit={(newData) => {
                                    setSupplements((prev) =>
                                      prev?.map((oldSupplement) => {
                                        if (oldSupplement.supplementID === newData.supplementID) {
                                          return newData;
                                        }
                                        return oldSupplement;
                                      }),
                                    );
                                    DrawerAPI.close();
                                  }}
                                />,
                              );
                              DrawerAPI.open("40%");
                            }}>
                            <Typography.Text style={{ color: "#3A5EE3" }}>
                              Supplements
                            </Typography.Text>
                          </Button>
                        </Col>
                        <Col lg={4} xs={12}>
                          <Button
                            style={{ borderColor: "#3A5EE3", width: "100%" }}
                            icon={<PlusSVG fill="#3A5EE3" />}
                            onClick={() => {
                              DrawerAPI.setDrawerContent(
                                <AddSupplementOnRoom
                                  DrawerAPI={DrawerAPI}
                                  onAdd={(data) => {
                                    setSupplements((prev) => [
                                      ...prev,
                                      {
                                        ...data,
                                        seasonRoomId: room.seasonRoomId,
                                        supplementID: uuidv4(),
                                        supplementType: TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_ROOM,
                                      },
                                    ]);
                                  }}
                                  onEdit={(newData) => {
                                    setSupplements((prev) =>
                                      prev?.map((oldSupplement) => {
                                        if (oldSupplement.supplementID === newData.supplementID) {
                                          return newData;
                                        }
                                        return oldSupplement;
                                      }),
                                    );
                                  }}
                                />,
                              );
                              DrawerAPI.open("35%");
                            }}>
                            <Typography.Text style={{ color: "#3A5EE3" }}>
                              Room Supplements
                            </Typography.Text>
                          </Button>
                        </Col>
                      </Row>
                      {supplements?.filter(
                        (supplement) => supplement.seasonRoomId === room.seasonRoomId,
                      )?.length > 0 && (
                        <Table
                          className="mt-1"
                          columns={[
                            {
                              title: "Type",
                              key: "supplementType",
                              dataIndex: "supplementType",
                              render: (value) =>
                                value === TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_OCCUPATION
                                  ? "On Occupation"
                                  : "On Room",
                            },
                            {
                              title: "Value",
                              key: "value",
                              dataIndex: "value",
                              render: (value, rowData) =>
                                `${
                                  rowData?.supplementType === TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_ROOM
                                    ? ""
                                    : rowData?.plus_minus === "plus"
                                    ? "+"
                                    : "-"
                                }${value}${rowData?.type.toLowerCase() === "fixed" ? "$" : "%"}`,
                            },
                            {
                              title: "Occupation",
                              key: "value",
                              dataIndex: "value",
                              render: (_, rowData) => {
                                let text = "TEMP";
                                if (
                                  rowData?.supplementType === TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_ROOM
                                ) {
                                  text = `Note: ${rowData?.note}`;
                                } else {
                                  text = `${rowData?.adult > 0 ? `${rowData?.adult} adult` : ""} ${
                                    rowData?.kids > 0
                                      ? rowData?.adult > 0
                                        ? `+ ${rowData?.kids} child`
                                        : `${rowData?.kids} child`
                                      : ""
                                  } applicable on ${
                                    rowData?.applicableFor === "all" ? "every" : ""
                                  } ${
                                    rowData?.applicableOn === APPLICABLE_ON.CHILD
                                      ? " child"
                                      : " adult"
                                  } ${rowData?.onPersonNo ? `number ${rowData?.onPersonNo}` : ``} ${
                                    rowData?.applicableOn === APPLICABLE_ON.CHILD
                                      ? ` - age between ${rowData?.minAge} and ${rowData?.maxAge}`
                                      : ""
                                  }`;
                                }

                                return text;
                              },
                            },
                            {
                              title: "",
                              dataIndex: "supplementID",
                              key: "supplementID",
                              render: (editID, rowData) => (
                                <div className="actions">
                                  <Button
                                    size="small"
                                    onClick={() => {
                                      if (
                                        rowData?.supplementType ===
                                        TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_OCCUPATION
                                      ) {
                                        DrawerAPI.setDrawerContent(
                                          <AddSupplementOnOccupation
                                            DrawerAPI={DrawerAPI}
                                            data={rowData}
                                            onAdd={(data) => {
                                              setSupplements((prev) => [
                                                ...prev,
                                                {
                                                  ...data,
                                                  seasonRoomId: room.seasonRoomId,
                                                  supplementID: uuidv4(),
                                                  supplementType:
                                                    TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_OCCUPATION,
                                                },
                                              ]);
                                              DrawerAPI.close();
                                            }}
                                            onEdit={(newData) => {
                                              setSupplements((prev) =>
                                                prev?.map((oldSupplement) => {
                                                  if (
                                                    oldSupplement.supplementID ===
                                                    newData.supplementID
                                                  ) {
                                                    return newData;
                                                  }
                                                  return oldSupplement;
                                                }),
                                              );
                                              DrawerAPI.close();
                                            }}
                                          />,
                                        );
                                        DrawerAPI.open("40%");
                                      } else {
                                        DrawerAPI.setDrawerContent(
                                          <AddSupplementOnRoom
                                            DrawerAPI={DrawerAPI}
                                            data={rowData}
                                            onAdd={(data) => {
                                              setSupplements((prev) => [
                                                ...prev,
                                                {
                                                  ...data,
                                                  seasonRoomId: room.seasonRoomId,
                                                  supplementID: uuidv4(),
                                                  supplementType:
                                                    TYPE_OF_SUPPLEMENT.SUPPLEMENT_ON_ROOM,
                                                },
                                              ]);
                                            }}
                                            onEdit={(newData) => {
                                              setSupplements((prev) =>
                                                prev?.map((oldSupplement) => {
                                                  if (
                                                    oldSupplement.supplementID ===
                                                    newData.supplementID
                                                  ) {
                                                    return newData;
                                                  }
                                                  return oldSupplement;
                                                }),
                                              );
                                            }}
                                          />,
                                        );
                                        DrawerAPI.open("35%");
                                      }
                                    }}>
                                    <EditSVG />
                                  </Button>
                                  <Button
                                    size="small"
                                    style={{ borderColor: "red" }}
                                    onClick={() =>
                                      setSupplements((prev) =>
                                        prev.filter((el) => el.supplementID !== editID),
                                      )
                                    }>
                                    <Delete2SVG color="red" />
                                  </Button>
                                </div>
                              ),
                            },
                          ]}
                          dataSource={supplements?.filter(
                            (supplement) => supplement.seasonRoomId === room.seasonRoomId,
                          )}
                        />
                      )}
                      {roomIndex !== seasonByIdQuery.data?.seasonRooms?.length - 1 && <Divider />}
                    </div>
                  );
                })}
                <div className="d-flex" style={{ justifyContent: "flex-end" }}>
                  <Button htmlType="submit" type="primary" className="mt-1">
                    Save rate
                  </Button>
                </div>
              </div>
            </Form>
          ),
        }))}
        onChange={(key) => setSeasonId(key)}
      />
    </div>
  );
};

export default Rate;
