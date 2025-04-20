import React, { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  message,
  Radio,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import AirportInput from "components/common/AirportInput";
import { OneWaySVG, SearchSVG, TwoWaysSVG } from "assets/jsx-svg";
import useGetTurboEngineFlights from "services/travel/packages/turboEngine/Queries/useGetTurboEngineFlights";
import { useDebounce } from "hooks/useDebounce";
import FlightCard from "../../Cards/FlightCard";
import { PACKAGE_LIBRARY_ITEMS_TYPES } from "constants/PACKAGE_TYPES";
import SelectItemType from "../../SelectItemType";
import { DeleteOutlined, StarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import useAddFlightToLibrary from "services/travel/packages/turboEngine/Mutations/useAddFlightToLibrary";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const TurboEngineFlightsModal = ({ onCancel, onUpdate, tripId }) => {
  const [form] = useForm();
  const [itemType, setItemType] = useState(PACKAGE_LIBRARY_ITEMS_TYPES.SINGLE);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const search = useWatch("search", form);
  const searchDebounced = useDebounce(search, 300);

  const fetchNextRef = useRef(null);

  const turboEngineFlights = useGetTurboEngineFlights(
    {
      type: searchDebounced?.type,
      fromAirportId: searchDebounced?.fromAirportId,
      toAirportId: searchDebounced?.toAirportId,
    },
    { enabled: false },
  );
  // Mutations
  const addFlight = useAddFlightToLibrary({
    onSuccess: () => {
      message.success("Flight added to library");
      onUpdate();
    },
    onError: (error) => {
      message.error(error?.message || "Failed to add flight to library");
    },
  });
  // Infinite Scroll: Fetch next page when #fetch_next is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && turboEngineFlights.hasNextPage) {
          turboEngineFlights.fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (fetchNextRef.current) {
      observer.observe(fetchNextRef.current);
    }

    return () => {
      if (fetchNextRef.current) {
        observer.unobserve(fetchNextRef.current);
      }
    };
  }, [turboEngineFlights.hasNextPage]);
  const handelAddSingle = (item) => {
    addFlight.mutate({
      tripId,
      selectedFlights: [
        {
          name: `From ${item?.outboundFlight?.fromAirPortInfo?.name} To ${item?.outboundFlight?.toAirPortInfo?.name}`,
          isDefault: true,
          price: item?.totalPrice,
          outboundFlightId: item?.outboundFlight?.id,
          returnFlightId: item?.returnFlight?.id,
          type: item?.type,
        },
      ],
    });
  };
  const handelAddSelectedItems = () => {
    if (!selectedItems || !Array.isArray(selectedItems) || selectedItems?.length === 0) {
      onUpdate();
      return;
    }

    addFlight.mutate({
      tripId,
      selectedFlights: selectedItems?.map((flight) => {
        return {
          name: `From ${flight?.outboundFlight?.fromAirPortInfo?.name} To ${flight?.outboundFlight?.toAirPortInfo?.name}`,
          isDefault: flight?.isDefault,
          price: flight?.totalPrice,
          outboundFlightId: flight?.outboundFlight?.id,
          returnFlightId: flight?.returnFlight?.id,
          type: flight?.type,
        };
      }),
    });
  };

  return (
    <>
      {activeStep === 1 ? (
        <>
          <div></div>
          <div className="select_item_type">
            <SelectItemType
              canChangeByLocation={false}
              itemType={itemType}
              setItemType={setItemType}
            />
          </div>
        </>
      ) : (
        <>
          <Typography.Title level={5} className="lg_text_semibold modal_title">
            Flights
          </Typography.Title>
          <div className="search_engine_block">
            <Form form={form} onFinish={turboEngineFlights.refetch}>
              <div style={{ marginBottom: "0.5rem" }}>
                <Flex align="center" justify="space-between">
                  <Form.Item name={["search", "type"]} initialValue={"ONE_WAY"} noStyle>
                    <Radio.Group className="radio_with_icon">
                      <Radio value={"TWO_WAY"}>
                        <Flex gap={2} align="center" style={{ height: "100%" }}>
                          <TwoWaysSVG />
                          <span className="sm_text_regular">Round Trip</span>
                        </Flex>
                      </Radio>
                      <Radio value={"ONE_WAY"}>
                        <Flex gap={2} align="center">
                          <OneWaySVG />
                          <span className="sm_text_regular">One Way</span>
                        </Flex>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </Flex>
              </div>
              <Row gutter={[12, 12]}>
                <Col span={21}>
                  <Row gutter={[12, 12]}>
                    <Col md={12} xs={24}>
                      <Form.Item
                        name={["search", "fromAirportId"]}
                        rules={[{ required: true, message: "Enter from airport" }]}>
                        <AirportInput placeholder={"From airport"} className="w-100" />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                      <Form.Item
                        name={["search", "toAirportId"]}
                        rules={[{ required: true, message: "Enter to airport" }]}>
                        <AirportInput placeholder={"To airport"} className="w-100" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={3}>
                  <Button
                    icon={<SearchSVG color={"#FFF"} />}
                    type="primary"
                    htmlType="submit"
                    loading={turboEngineFlights?.isFetching}
                    className="w-100">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <div className="search_engine_results">
            <Flex className="selected_items_container" gap={8} style={{ marginBottom: "1rem" }}>
              {itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST &&
                selectedItems.map((flight) => (
                  <div
                    key={flight?.outboundFlightId}
                    style={{
                      background: "#fff",
                      padding: "6px",
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                    }}>
                    <Flex align="center" justify="space-between" gap={8}>
                      <div>
                        <Typography.Paragraph
                          className="fz-14 fw-500"
                          style={{ marginBottom: "4px", textTransform: "capitalize" }}>
                          {flight?.outboundFlight?.flightNo} (
                          {dayjs
                            .utc(flight?.outboundFlight?.fromDateTime)
                            .format("DD MMM hh:mm A [GMT]")}
                          )
                        </Typography.Paragraph>
                        {flight?.returnFlight && (
                          <Typography.Paragraph
                            style={{ marginBottom: "0", maxWidth: "150px" }}
                            ellipsis={{ tooltip: flight?.accommodationName }}
                            className="fz-12 fw-400 gc">
                            / {flight?.returnFlight?.flightNo} (
                            {dayjs
                              .utc(flight?.returnFlight?.fromDateTime)
                              .format("DD MMM hh:mm A [GMT]")}
                            )
                          </Typography.Paragraph>
                        )}
                      </div>
                      <Space>
                        <Tooltip title="Delete room">
                          <Button
                            icon={<DeleteOutlined />}
                            className="table_action_button"
                            danger
                            type="primary"
                            onClick={() => {
                              setSelectedItems((prev) => {
                                const isDeletedItemTheDefult = prev.find(
                                  (el) => el?.outboundFlightId === flight?.outboundFlightId,
                                )?.isDefault;
                                let temp = prev.filter(
                                  (item) => item?.outboundFlightId !== flight?.outboundFlightId,
                                );

                                if (isDeletedItemTheDefult && temp?.length > 0) {
                                  temp = [{ ...temp[0], isDefault: true }, ...temp.slice(1)];
                                }

                                return temp;
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip title={flight?.isDefault ? "Default" : "Set as default"}>
                          <Button
                            icon={<StarOutlined />}
                            className="table_action_button"
                            type={flight?.isDefault ? "primary" : "default"}
                            onClick={() => {
                              setSelectedItems((prev) => {
                                return prev.map((item) => {
                                  if (item?.outboundFlightId === flight?.outboundFlightId) {
                                    return { ...item, isDefault: true };
                                  } else {
                                    return { ...item, isDefault: false };
                                  }
                                });
                              });
                            }}
                          />
                        </Tooltip>
                      </Space>
                    </Flex>
                  </div>
                ))}
            </Flex>
            {turboEngineFlights?.data &&
              turboEngineFlights?.data?.pages
                ?.map((item) => item?.rows)
                .flat()
                ?.map((flight, index) => {
                  return (
                    <FlightCard
                      data={flight}
                      isMultiple={itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST}
                      isSelected={selectedItems?.find(
                        (el) => el?.outboundFlightId === flight?.outboundFlight?.id,
                      )}
                      key={index}
                      onSelect={(item) => {
                        setSelectedItems((prev) => {
                          if (prev.length === 0) {
                            return [
                              {
                                ...item,
                                outboundFlightId: flight?.outboundFlight?.id,
                                returnFlightId: flight?.returnFlight?.id,
                                isDefault: true,
                              },
                            ];
                          } else {
                            return [
                              ...prev,
                              {
                                ...item,
                                outboundFlightId: flight?.outboundFlight?.id,
                                returnFlightId: flight?.returnFlight?.id,
                                isDefault: false,
                              },
                            ];
                          }
                        });
                      }}
                      onAdd={(item) => handelAddSingle(item)}
                    />
                  );
                })}
            {/* Observer target */}
            <div ref={fetchNextRef} />
          </div>
        </>
      )}
      <Divider />
      <Flex align="center" justify="space-between" gap={8} style={{ marginTop: "8px" }}>
        {activeStep === 1 ? (
          <>
            <Button size="small" onClick={onCancel}>
              Cancel
            </Button>
            <Button size="small" type="primary" onClick={() => setActiveStep(2)}>
              Next
            </Button>
          </>
        ) : (
          <>
            <Button size="small" onClick={() => setActiveStep(1)}>
              Previous
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={
                itemType === PACKAGE_LIBRARY_ITEMS_TYPES.SELECT_ONE_FROM_LIST
                  ? handelAddSelectedItems
                  : onCancel
              }>
              Finish
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};

export default TurboEngineFlightsModal;
