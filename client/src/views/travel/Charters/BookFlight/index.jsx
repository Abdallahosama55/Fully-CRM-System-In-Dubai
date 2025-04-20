import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";
// images
import { AirPlanColoredSVG, PlaneSVG, PluseSVG } from "assets/jsx-svg";
import default_flight_image from "assets/images/default_flight_image.png";
// style
import "./styles.css";
import usePageTitle from "hooks/usePageTitle";
import useSessionStorage from "hooks/useSessionStorage";
import { MEETING_PARTICIPANTS_STORAGE_KEY } from "constants/MEETING_PARTICIPANTS_STORAGE_KEY";
import SelectCustomerModal from "components/SelectCustomerModal";
import Box from "components/Box";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import { useDebounce } from "hooks/useDebounce";
import { queryClient } from "services/queryClient";
import { AntDesignOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { FLIGHT_REQUEST_STATUS } from "constants/BOOKING";
import Editor from "components/common/Editor";
import Card from "./components/Card";
import useBookFlight from "services/travel/charters/Mutations/useBookFlight";
import isValidJson from "utils/isValidJson";
import useCalculateFlightPriceCost from "services/travel/charters/Queries/useCalculateFlightPriceCost";
import ROUTER_URLS from "constants/ROUTER_URLS";
import useGetAirlineByCode from "services/Common/Queries/useGetAirlineByCode";
import AddToQuotation from "components/AddToQuotation";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";

const BookFlight = () => {
  usePageTitle(`Flight / Book`);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form] = useForm();
  const [formModal] = useForm();
  const adult = useWatch("adult", form);
  const child = useWatch("child", form);
  const infant = useWatch("infant", form);
  const travelares = useMemo(() => ({ adult, child, infant }), [adult, child, infant]);
  const debounceTravelares = useDebounce(travelares, 300);
  console.log("state", state);
  const outboundFlightPrice = useCalculateFlightPriceCost(
    {
      id: Array.isArray(state?.outboundFlight) ? state?.outboundFlight[0]?.id : null,
      ...debounceTravelares,
    },
    {
      enabled:
        state?.source !== "tbo" &&
        Boolean(Array.isArray(state?.outboundFlight) && state?.outboundFlight[0]?.id) &&
        debounceTravelares?.adult > 0,
    },
  );

  useEffect(() => {
    if (outboundFlightPrice?.data?.totalCoast) {
      form.setFieldValue("totalCoast", outboundFlightPrice?.data?.totalCoast);
    }

    if (outboundFlightPrice?.data?.totalPrice || outboundFlightPrice?.data?.totalSellPrice) {
      form.setFieldValue(
        "totalSellPrice",
        outboundFlightPrice?.data?.totalPrice || outboundFlightPrice?.data?.totalSellPrice,
      );
    }
  }, [outboundFlightPrice?.data]);

  const returnFlightPrice = useCalculateFlightPriceCost(
    {
      id: Array.isArray(state?.returnFlight) ? state?.returnFlight[0]?.id : null,
      ...debounceTravelares,
    },
    {
      enabled:
        state?.source !== "tbo" &&
        Boolean(Array.isArray(state?.returnFlight) && state?.returnFlight[0]?.id) &&
        debounceTravelares?.adult > 0,
    },
  );

  useEffect(() => {
    if (returnFlightPrice?.data?.totalCoast) {
      form.setFieldValue("backCost", returnFlightPrice?.data?.totalCoast);
    }

    if (returnFlightPrice?.data?.totalPrice || outboundFlightPrice?.data?.totalSellPrice) {
      form.setFieldValue(
        "backSale",
        returnFlightPrice?.data?.totalPrice || outboundFlightPrice?.data?.totalSellPrice,
      );
    }
  }, [returnFlightPrice?.data]);

  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const depounceName = useDebounce(searchCustomerName);
  const { data: customers, key } = useGetCustomers(
    { page: 1, limit: 10, body: { fullName: depounceName } },
    {
      select: (data) => {
        return data?.data?.data?.data;
      },
    },
  );

  const [participants, setParticipants] = useSessionStorage(MEETING_PARTICIPANTS_STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setCustomerId] = useState(undefined);

  // mutations
  const bookFlights = useBookFlight({
    onSuccess: (res) => {
      message.success("Flight booked successfully");
      navigate("/");
    },
    onError: (error) => {
      message.error("Something went wrong");
      console.log("error", error);
    },
  });

  useEffect(() => {
    if (!state) {
      navigate(-1);
    } else {
      if (state.adults) {
        form.setFieldsValue({
          adult: state.adults,
          child: state.childs,
          infant: state.infants,
        });
      }
    }
  }, [state]);

  const handelFinish = (values) => {
    if (participants && participants.length > 0 && !customerId) {
      setIsOpen(true);
      return;
    }

    const temp = {
      ...values,
      soruce: state?.source,
      customerId,
      type: state?.type,
      outboundFlightId: Array.isArray(state?.outboundFlight)
        ? state?.outboundFlight[0]?.id
        : undefined,
      returnFlightId: Array.isArray(state?.returnFlight) ? state?.returnFlight[0]?.id : undefined,
      isMeeting: customerId ? true : false,
      clientAccountId: isValidJson(values?.clientAccountId) ? undefined : values.clientAccountId, // If the clientAccountId is the same as the clientEmail, set it to undefined
      clientName: !isValidJson(values?.clientAccountId)
        ? undefined
        : JSON.parse(values?.clientAccountId)?.fullName,
      clientEmail: !isValidJson(values?.clientAccountId)
        ? undefined
        : JSON.parse(values?.clientAccountId)?.email,
      totalCoast: values?.totalCoast,
      totalSellPrice: values?.totalSellPrice,
      bookingInfo: state,
    };

    bookFlights.mutate(temp);
  };

  console.log("state", state);

  return (
    <div className="book_page">
      <Modal
        title="Add New Client"
        open={isAddClientModalOpen}
        onCancel={() => setIsAddClientModalOpen(false)}
        onOk={() => {
          formModal
            .validateFields()
            .then((values) => {
              if (
                customers &&
                customers.length > 0 &&
                customers.find((el) => el.id === JSON.stringify(values))
              ) {
                formModal.setFields([
                  {
                    name: "email",
                    errors: ["Client already exists"],
                  },
                  {
                    name: "fullName",
                    errors: ["Client already exists"],
                  },
                ]);
                return;
              }

              // Handle successful validation and update the query cache
              queryClient.setQueryData(key, (oldData) => {
                if (!oldData) {
                  return {
                    data: {
                      statusCode: 200,
                      data: {
                        count: 1,
                        data: [{ ...values, id: JSON.stringify(values) }], // New customer added
                      },
                      message: "Success",
                    },
                    status: 200,
                    statusText: "OK",
                    headers: {
                      "content-length": "824",
                      "content-type": "application/json; charset=utf-8",
                    },
                    config: {
                      // Same config from the original response
                    },
                    request: {},
                  };
                } else {
                  return {
                    ...oldData, // Keep the original data structure
                    data: {
                      ...oldData.data,
                      data: {
                        ...oldData.data.data,
                        count: oldData.data.data.count + 1, // Increment the count
                        data: [
                          ...oldData.data.data.data,
                          { ...values, id: JSON.stringify(values) },
                        ], // Append the new customer (values)
                      },
                    },
                  };
                }
              });
              form.setFieldValue("clientAccountId", JSON.stringify(values));
              form.setFieldValue("clientName", values.fullName);
              form.setFieldValue("clientEmail", values.email);
              // Close the modal after successfully adding the customer
              setIsAddClientModalOpen(false);
            })
            .catch((error) => {
              // Handle form validation errors
              console.log("Validation failed:", error);
            });
        }}>
        <Form form={formModal} layout="vertical">
          <Form.Item
            name="fullName"
            label="Name"
            style={{ marginBottom: 8 }}
            rules={[{ required: true, message: "Please input the client's name!" }]}>
            <Input placeholder="Enter client's name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject("Enter client email");
                  }
                  // Regular expression for validating email format
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                  if (!emailPattern.test(value)) {
                    return Promise.reject("Enter a valid email");
                  }

                  return Promise.resolve();
                },
              },
            ]}>
            <Input placeholder="Enter client's email" />
          </Form.Item>
        </Form>
      </Modal>
      {participants && (
        <SelectCustomerModal
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          participants={participants}
          handleOk={(id) => {
            setCustomerId(id);
            setIsOpen(false);
            form.submit();
          }}
        />
      )}
      <div className="page_content">
        <Box
          sx={{
            paddingBottom: "26px",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            className="content">
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              className={" fz-16 fw-500"}>
              <AirPlanColoredSVG /> Round Trip - Flight Details
            </Typography>
          </Box>
          <Divider className="divider" />
        </Box>
        {/* Hidden values */}
        <Form.Item name="clientName" hidden initialValue={undefined} />
        <Form.Item name="clientEmail" hidden initialValue={undefined} />
        <Form
          form={form}
          layout="vertical"
          onFinish={handelFinish}
          scrollToFirstError={{
            behavior: "smooth",
          }}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="clientAccountId" label={"Client"}>
                  <Select
                    showSearch
                    filterOption={false}
                    onSearch={(value) => setSearchCustomerName(value)}
                    dropdownRender={(menu) => (
                      <>
                        {menu || (
                          <div style={{ padding: 8, textAlign: "center" }}>No Clients Found</div>
                        )}
                        <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
                          <Button
                            type="link"
                            onClick={() => setIsAddClientModalOpen(true)}
                            icon={<PluseSVG color="#1890ff" />}>
                            Add New Client
                          </Button>
                        </div>
                      </>
                    )}
                    placeholder="Select Client"
                    options={
                      Array.isArray(customers) && customers?.length > 0
                        ? customers.map((el) => ({
                            label: (
                              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                {!el?.profileImage ? (
                                  <Avatar size={32} icon={<AntDesignOutlined />} />
                                ) : (
                                  <Avatar size={32} src={el?.profileImage} />
                                )}
                                <div>{el.fullName}</div>
                              </div>
                            ),
                            value: el?.id,
                          }))
                        : []
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="PNR" name={"PNR"}>
                  <Input placeholder="Enter PNR" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          {Array.isArray(state?.outboundFlight) &&
            state?.outboundFlight?.map((plane) => (
              <TableInfo
                {...plane}
                key={plane?.flightNo}
                source={{
                  id: plane?.flightNo,
                  from: plane?.fromAirPortInfo?.name,
                  time: dayjs(plane?.fromDateTime).utc().format("HH:mm A"),
                }}
                destination={{
                  id: plane?.flightNo,
                  from: plane?.toAirPortInfo?.name,
                  time: dayjs(plane?.toDateTime).utc().format("HH:mm A"),
                }}
              />
            ))}

          {Array.isArray(state?.returnFlight) &&
            state?.returnFlight?.map((plane) => (
              <TableInfo
                isBack
                key={plane?.flightNo}
                source={{
                  id: plane?.flightNo,
                  from: plane?.fromAirPortInfo?.name,
                  time: dayjs(plane?.fromDateTime).utc().format("HH:mm A"),
                }}
                destination={{
                  id: plane?.flightNo,
                  from: plane?.toAirPortInfo?.name,
                  time: dayjs(plane?.toDateTime).utc().format("HH:mm A"),
                }}
              />
            ))}
          <Row gutter={[16, 16]}>
            {state?.isFlightPriceAndCoastEditable && (
              <Col span={12}>
                <Form.Item name={"totalCoast"} label="Cost" initialValue={state?.totalCoast}>
                  <Input
                    placeholder="Enter cost"
                    type="number"
                    disabled={!state?.isFlightPriceAndCoastEditable}></Input>
                </Form.Item>
              </Col>
            )}
            <Col span={state?.isFlightPriceAndCoastEditable ? 12 : 24}>
              <Form.Item
                name={"totalSellPrice"}
                label="Sale price"
                initialValue={state?.totalSellPrice}>
                <Input
                  placeholder="Enter sale"
                  type="number"
                  disabled={!state?.isFlightPriceAndCoastEditable}></Input>
              </Form.Item>
            </Col>
          </Row>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  name={"adult"}
                  label="Adult"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject("Enter adults number");
                        }

                        if (value <= 0) {
                          return Promise.reject("adults must be more than one");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}>
                  <Input type="number" min={0} disabled={state?.source === "tbo"}></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={"child"}
                  label="Child"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (value && value < 0) {
                          return Promise.reject("Enter valid child number");
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}>
                  <Input type="number" min={0} disabled={state?.source === "tbo"}></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={"infant"}
                  label="Infant"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (value && value < 0) {
                          return Promise.reject("Enter valid infant number");
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}>
                  <Input type="number" min={0} disabled={state?.source === "tbo"}></Input>
                </Form.Item>
              </Col>
            </Row>
            {Number(adult) > 0 && (
              <>
                <Divider
                  style={{
                    borderStyle: "dashed",
                    borderWidth: "1px",
                    borderRadius: "8px",
                    borderColor: "#E5E5EA",
                  }}
                />
                <Typography.Text className="fw-600">Travelers</Typography.Text>
                <Box
                  sx={{
                    marginTop: "16px",
                    ".ant-table .ant-table-body": {
                      maxHeight: "150px !important",
                      minHeight: "150px !important",
                    },
                  }}>
                  {Number(adult) && (
                    <Table
                      columns={[
                        {
                          dataIndex: "type",
                          title: "Type",
                          width: 120,
                          render: (_, record, index) => {
                            let passengerType = "Infant";
                            let tempAdults = Number(adult);
                            let tempChilds = Number(child);

                            if (index < tempAdults) {
                              passengerType = "Adult";
                            } else if (index >= tempAdults && index < tempAdults + tempChilds) {
                              passengerType = "Child";
                            } else if (index >= tempAdults + tempChilds) {
                              passengerType = "Infant";
                            }

                            return (
                              <>
                                {passengerType}
                                <Form.Item
                                  hidden
                                  name={["passengers", index, "type"]}
                                  initialValue={passengerType.toUpperCase()}
                                />
                              </>
                            );
                          },
                        },
                        {
                          dataIndex: "title",
                          title: "Title",
                          width: 120,
                          render: (_, record, index) => (
                            <Form.Item
                              name={["passengers", index, "title"]}
                              rules={[{ required: true, message: "Please select a title" }]}>
                              <Select
                                options={[
                                  { label: "Mr", value: "Mr" },
                                  { label: "Ms", value: "MMsr" },
                                ]}
                                placeholder="Select title"
                              />
                            </Form.Item>
                          ),
                        },
                        {
                          dataIndex: "firstName",
                          title: "First Name",
                          width: 120,
                          render: (_, record, index) => (
                            <Form.Item
                              name={["passengers", index, "firstName"]}
                              rules={[{ required: true, message: "Please enter first name" }]}>
                              <Input placeholder="Enter first name" />
                            </Form.Item>
                          ),
                        },
                        {
                          dataIndex: "lastName",
                          title: "Last Name",
                          width: 120,
                          render: (_, record, index) => (
                            <Form.Item
                              name={["passengers", index, "lastName"]}
                              rules={[{ required: true, message: "Please enter last name" }]}>
                              <Input placeholder="Enter last name" />
                            </Form.Item>
                          ),
                        },
                        {
                          dataIndex: "age",
                          title: "Age",
                          width: 120,
                          render: (_, record, index) => (
                            <Form.Item
                              name={["passengers", index, "age"]}
                              rules={[
                                {
                                  validator: (_, value) => {
                                    if (!value) {
                                      return Promise.reject("Please enter age");
                                    }

                                    if (value <= 0) {
                                      return Promise.reject("Please enter valid age");
                                    }

                                    // Determine if the passenger is an adult or child or infant
                                    let tempAdults = Number(adult);
                                    let tempChilds = Number(child);

                                    if (index < tempAdults && value <= 12) {
                                      return Promise.reject("Adult age must be at least 13");
                                    } else if (
                                      index >= tempAdults &&
                                      index < tempAdults + tempChilds &&
                                      value > 12
                                    ) {
                                      return Promise.reject("Child age must be at most 12");
                                    } else if (index >= tempAdults + tempChilds && value > 2) {
                                      return Promise.reject("Infant age must be at most 2");
                                    }

                                    return Promise.resolve();
                                  },
                                },
                              ]}>
                              <Input placeholder="Enter age" type={"number"} />
                            </Form.Item>
                          ),
                        },
                        {
                          dataIndex: "passportId",
                          title: "Passport/ID",
                          width: 120,
                          render: (_, record, index) => (
                            <Form.Item
                              name={["passengers", index, "passportId"]}
                              rules={[{ required: true, message: "Please enter passport ID" }]}>
                              <Input placeholder="Enter passport/ID" />
                            </Form.Item>
                          ),
                        },
                        {
                          title: "Ticket No",
                          width: 120,
                          render: (_, record, index) => (
                            <Form.Item name={["passengers", index, "ticketNo"]}>
                              <Input placeholder="Enter ticket number" />
                            </Form.Item>
                          ),
                        },
                      ]}
                      pagination={false}
                      scroll={{ y: 400 }}
                      dataSource={[
                        ...new Array(
                          (Number(adult || 0) > 0 ? Number(adult) : 0) +
                            (Number(child || 0) > 0 ? Number(child) : 0) +
                            (Number(infant || 0) > 0 ? Number(infant) : 0),
                        ),
                      ]?.map((el) => ({
                        title: "Select",
                        firstName: "Enter",
                        lastName: "Enter",
                        age: "Enter",
                        passport: "Enter",
                        tk: "Enter",
                      }))}
                    />
                  )}
                </Box>
              </>
            )}
          </Card>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item initialValue={"cash"} label="Payment Type" name={"paymentType"}>
                <Select
                  options={[
                    {
                      label: "Cash",
                      value: "cash",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item initialValue={"FINALIZED"} label="Status" name={"status"}>
                <Select
                  options={[
                    { label: "Request pending", value: FLIGHT_REQUEST_STATUS.REQUEST_PENDING },
                    { label: "Finalized", value: FLIGHT_REQUEST_STATUS.FINALIZED },
                    { label: "Cancelled", value: FLIGHT_REQUEST_STATUS.CANCELLED },
                    {
                      label: "Request processing",
                      value: FLIGHT_REQUEST_STATUS.REQUEST_PROCESSING,
                    },
                    {
                      label: "Credit card failed",
                      value: FLIGHT_REQUEST_STATUS.CREDIT_CARD_FAILED,
                    },
                    {
                      label: "Amendment processing",
                      value: FLIGHT_REQUEST_STATUS.AMENDMENT_PROCESSING,
                    },
                    {
                      label: "Cancellation processing",
                      value: FLIGHT_REQUEST_STATUS.CANCELLATION_PROCESSING,
                    },
                    {
                      label: "Payment processing",
                      value: FLIGHT_REQUEST_STATUS.PAYMENT_PROCESSING,
                    },
                    {
                      label: "Payment outstanding",
                      value: FLIGHT_REQUEST_STATUS.PAYMENT_OUTSTANDING,
                    },
                    {
                      label: "Cancelled and refunded",
                      value: FLIGHT_REQUEST_STATUS.CANCELLED_AND_REFUNDED,
                    },
                    {
                      label: "Alternative advised",
                      value: FLIGHT_REQUEST_STATUS.ALTERNATIVE_ADVISED,
                    },
                    { label: "Reserved", value: FLIGHT_REQUEST_STATUS.RESERVED },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Booking Notes" name="bookingNote">
            <Editor />
          </Form.Item>
          <Form.Item label="Accounting Notes" name="accountingNote">
            <Editor />
          </Form.Item>
          <div style={{ position: "sticky", bottom: 0, width: "100%" }}>
            <Flex align="center" gap={6}>
              <Button block type="primary" htmlType="submit" loading={bookFlights?.isPending}>
                Book
              </Button>
              <AddToQuotation
                addButtonProps={{ style: { width: "44px", height: "44px" } }}
                item={{
                  type: QUOTATION_ITEM_TYPES.FLIGHT,
                  bookingKey: JSON.stringify({
                    outboundFlights: state?.outboundFlight?.map((el) => el?.id),
                    returnFlights: state?.returnFlight?.map((el) => el?.id),
                    type: state?.type,
                  }),
                  id: state?.outboundFlight[0]?.id,
                  price: (() => {
                    let total =
                      outboundFlightPrice?.data?.totalPrice ||
                      outboundFlightPrice?.data?.totalSellPrice ||
                      0;
                    total +=
                      returnFlightPrice?.data?.totalPrice ||
                      returnFlightPrice?.data?.totalSellPrice ||
                      0;
                    return total;
                  })(),
                  name: `${state?.type === "TWO_WAY" ? "(Two Way)" : "(One Way)"} From ${
                    state?.outboundFlight[0]?.fromAirPortInfo?.name
                  } To ${
                    state?.outboundFlight[state?.outboundFlight?.length - 1]?.toAirPortInfo?.name
                  }`,
                  arrivalDate: state?.fromDate,
                  departureDate: state?.toDate,
                  adults: adult ? Number(adult) : 0,
                  childs: child ? Number(child) : 0,
                  infants: infant ? Number(infant) : 0,
                }}
              />
            </Flex>
          </div>
        </Form>
      </div>
    </div>
  );
};

const TableInfo = ({ source, destination, isBack, airlineCompanyCode }) => {
  const airlineByCode = useGetAirlineByCode(airlineCompanyCode);
  return (
    <Card>
      <Flex justify="space-between">
        <Info {...source} title={"Source"} icon={<PlaneSVG />} />
        <Flex vertical gap={"2px"} align="center" justify="center">
          <img
            src={airlineByCode?.data?.logo}
            alt={"logo"}
            width={80}
            height={25}
            style={{ objectFit: "contain" }}
          />
          {isBack ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
        </Flex>
        <Info {...destination} title="destination" icon={<PlaneSVG />} />
      </Flex>
    </Card>
  );
};

const Info = ({ title, from, time, id, icon }) => {
  return (
    <Box style={{ width: "40%" }}>
      <Flex align="center" gap={8} style={{ marginBottom: "1rem" }}>
        {icon}
        <Typography.Title level={5} style={{ marginBottom: "0" }}>
          {title}
        </Typography.Title>
      </Flex>
      <Row gutter={32} className="w-100">
        <Col span={4} style={{ color: "#697281" }} className="fz-14 fw-400">
          From:
        </Col>
        <Col span={20}>{from}</Col>
      </Row>
      <Row gutter={32}>
        <Col span={4} style={{ color: "#697281" }} className="fz-14 fw-400">
          Time:
        </Col>
        <Col span={20}>{time}</Col>
      </Row>
      <Row gutter={32}>
        <Col span={4} style={{ color: "#697281" }} className="fz-14 fw-400">
          ID
        </Col>
        <Col span={20}>{id}</Col>
      </Row>
    </Box>
  );
};

export default BookFlight;
