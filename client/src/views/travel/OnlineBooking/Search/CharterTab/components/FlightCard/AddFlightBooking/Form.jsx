import { AntDesignOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
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
import TextArea from "antd/es/input/TextArea";
import { PluseSVG } from "assets/jsx-svg";
import Box from "components/Box";
import { FLIGHT_REQUEST_STATUS } from "constants/BOOKING";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import ROUTER_URLS from "constants/ROUTER_URLS";
import dayjs from "dayjs";
import { useDebounce } from "hooks/useDebounce";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import { queryClient } from "services/queryClient";
import useBookFlight from "services/travel/charters/Mutations/useBookFlight";
import isValidJson from "utils/isValidJson";
const FormContent = ({ data, DrawerAPI }) => {
  const [form] = useForm();
  const [formModal] = useForm();

  const adults = useWatch("adult", form);
  const child = useWatch("child", form);
  const infant = useWatch("infant", form);

  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const depounceName = useDebounce(searchCustomerName)
  const navigate = useNavigate();

  const { data: customers, key } = useGetCustomers(
    { page: 1, limit: 10, body: { fullName: depounceName } },
    {
      select: (data) => {
        return data?.data?.data?.data;
      },
    },
  );
  // mutations
  const bookFlights = useBookFlight({
    onSuccess: (res) => {
      message.success("Flight booked successfully");
      navigate(ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS + res?.data?.data + `?type=${BOOKINGS_TYPES.FLIGHT}`);
      DrawerAPI.close();
    },
    onError: (error) => {
      message.error("Something went wrong");
      console.log('error', error)
    }
  });

  return (
    <Form
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      layout="vertical"
      form={form}
      onFinish={(values) => {
        const temp = {
          ...values,
          clientAccountId: isValidJson(values?.clientAccountId) ? undefined : values.clientAccountId, // If the clientAccountId is the same as the clientEmail, set it to undefined
          clientName: !isValidJson(values?.clientAccountId) ? undefined : JSON.parse(values?.clientAccountId)?.fullName,
          clientEmail: !isValidJson(values?.clientAccountId) ? undefined : JSON.parse(values?.clientAccountId)?.email,
          totalCoast: (parseFloat(values?.goCost || 0) + parseFloat(values?.backCost || 0)),  // Sum of goCost and backCost
          totalSellPrice: (parseFloat(values?.goSale || 0) + parseFloat(values?.backSale || 0))  // Sum of goSale and backSale
        }

        bookFlights.mutate(temp)
        console.log("values", temp);
      }}
    >
      {/* Hidden values */}
      <Form.Item name="outboundFlightId" hidden initialValue={data?.outboundFlight?.id} />
      {data?.returnFlight && <Form.Item name="returnFlightId" hidden initialValue={data?.returnFlight?.id} />}
      <Form.Item name="type" hidden initialValue={data?.type} />
      <Form.Item name="clientName" hidden initialValue={undefined} />
      <Form.Item name="clientEmail" hidden initialValue={undefined} />

      {/* Modal for Adding New Client */}
      <Modal
        title="Add New Client"
        open={isAddClientModalOpen}
        onCancel={() => setIsAddClientModalOpen(false)}
        onOk={() => {
          formModal.validateFields()
            .then((values) => {
              if (customers && customers.length > 0 && customers.find(el => el.id === JSON.stringify(values))) {
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
                        data: [...oldData.data.data.data, { ...values, id: JSON.stringify(values) }], // Append the new customer (values)
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
        }}
      >
        <Form form={formModal} layout="vertical">
          <Form.Item
            name="fullName"
            label="Name"
            style={{ marginBottom: 8 }}
            rules={[{ required: true, message: "Please input the client's name!" }]}
          >
            <Input placeholder="Enter client's name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject("Enter client email")
                  }
                  // Regular expression for validating email format
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                  if (!emailPattern.test(value)) {
                    return Promise.reject("Enter a valid email");
                  }

                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input placeholder="Enter client's email" />
          </Form.Item>
        </Form>
      </Modal>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="clientAccountId" label={"Client"}>
              <Select
                showSearch
                filterOption={false}
                notFoundContent={null}
                onSearch={(value) => setSearchCustomerName(value)}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    {/* Add New Client Button in Dropdown */}
                    <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
                      <Button
                        type="link"
                        onClick={() => setIsAddClientModalOpen(true)}
                        icon={<PluseSVG color="#1890ff" />}
                      >
                        Add New Client
                      </Button>
                    </div>
                  </>
                )}
                placeholder="Select Client" options={customers?.map(el => ({
                  label: <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    {!el?.profileImage ? (
                      <Avatar size={32} icon={<AntDesignOutlined />} />
                    ) : (
                      <Avatar size={32} src={el?.profileImage} />
                    )}
                    <div> {el.fullName}</div>
                  </div>, value: el?.id
                }))} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="PNR" name={"PNR"}>
              <Input placeholder="Enter PNR" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <TableInfo
        source={{
          id: data?.outboundFlight.flightNo,
          from: data.outboundFlight?.fromAirPortInfo?.name,
          time: dayjs(data.outboundFlight.fromDateTime).utc().format("HH:mm a"),
        }}
        destination={{
          id: data?.outboundFlight.flightNo,
          from: data.outboundFlight?.toAirPortInfo?.name,
          time: dayjs(data.outboundFlight.toDateTime).utc().format("HH:mm a"),
        }}
      />
      {data.returnFlight && (
        <TableInfo
          isBack
          source={{
            id: data?.returnFlight.flightNo,
            from: data.returnFlight?.fromAirPortInfo?.name,
            time: dayjs(data.returnFlight.fromDateTime).utc().format("HH:mm a"),
          }}
          destination={{
            id: data?.returnFlight.flightNo,
            from: data.returnFlight?.toAirPortInfo?.name,
            time: dayjs(data.returnFlight.toDateTime).utc().format("HH:mm a"),
          }}
        />
      )}
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item name={"adult"} label="Adult" rules={[{
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject("Enter adults number");
                }

                if (value <= 0) {
                  return Promise.reject("adults must be more than one");
                }
                return Promise.resolve()
              }
            }]}>
              <Input type="number" min={0}></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"child"} label="Child" rules={[{
              validator: (_, value) => {
                if (value && value < 0) {
                  return Promise.reject("Enter valid child number");
                }

                return Promise.resolve()
              }
            }]}>
              <Input type="number" min={0}></Input>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={"infant"} label="Infant" rules={[{
              validator: (_, value) => {
                if (value && value < 0) {
                  return Promise.reject("Enter valid infant number");
                }

                return Promise.resolve()
              }
            }]}>
              <Input type="number" min={0}></Input>
            </Form.Item>
          </Col>
        </Row>
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
          {Number(adults || 0) &&
            <Table
              columns={[
                {
                  dataIndex: "type",
                  title: "Type",
                  width: 120,
                  render: (_, record, index) => {
                    let passengerType = "Infant";
                    let tempAdults = Number(adults);
                    let tempChilds = Number(child);

                    if (index < tempAdults) {
                      passengerType = "Adult";
                    } else if (index >= tempAdults && index < tempAdults + tempChilds) {
                      passengerType = "Child";
                    } else if (index >= tempAdults + tempChilds) {
                      passengerType = "Infant";
                    }

                    return <>
                      {passengerType}
                      <Form.Item hidden name={["passengers", index, "type"]} initialValue={passengerType.toUpperCase()} />
                    </>
                  },
                },
                {
                  dataIndex: "title",
                  title: "Title",
                  width: 120,
                  render: (_, record, index) => (
                    <Form.Item
                      name={["passengers", index, "title"]}
                      rules={[{ required: true, message: "Please select a title" }]}
                    >
                      <Select options={[
                        { label: "Mr", value: "Mr" },
                        { label: "Ms", value: "MMsr" },

                      ]} placeholder="Select title" />
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
                      rules={[{ required: true, message: "Please enter first name" }]}
                    >
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
                      rules={[{ required: true, message: "Please enter last name" }]}
                    >
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
                              return Promise.reject("Please enter age")
                            }

                            if (value <= 0) {
                              return Promise.reject("Please enter valid age")
                            }

                            // Determine if the passenger is an adult or child or infant
                            let tempAdults = Number(adults);
                            let tempChilds = Number(child);

                            if (index < tempAdults && value <= 12) {
                              return Promise.reject("Adult age must be at least 13");
                            } else if (index >= tempAdults && index < tempAdults + tempChilds && value > 12) {
                              return Promise.reject("Child age must be at most 12");
                            } else if (index >= tempAdults + tempChilds && value > 2) {
                              return Promise.reject("Infant age must be at most 2");
                            }

                            return Promise.resolve()
                          }
                        }]}
                    >
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
                      rules={[{ required: true, message: "Please enter passport ID" }]}
                    >
                      <Input placeholder="Enter passport/ID" />
                    </Form.Item>
                  ),
                },
                {
                  title: "Ticket No",
                  width: 120,
                  render: (_, record, index) => (
                    <Form.Item
                      name={["passengers", index, "ticketNo"]}
                      rules={[{ required: true, message: "Please enter ticket number" }]}
                    >
                      <Input placeholder="Enter ticket number" />
                    </Form.Item>
                  ),
                },
              ]}

              pagination={false}
              scroll={{ y: 400 }}
              dataSource={[...new Array(
                (Number(adults || 0) > 0 ? Number(adults) : 0)
                + (Number(child || 0) > 0 ? Number(child) : 0)
                + (Number(infant || 0) > 0 ? Number(infant) : 0))]?.map(el => ({
                  title: "Select",
                  firstName: "Enter",
                  lastName: "Enter",
                  age: "Enter",
                  passport: "Enter",
                  tk: "Enter",
                }))}
            />
          }
        </Box>
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
                { label: "request pending", value: FLIGHT_REQUEST_STATUS.REQUEST_PENDING },
                { label: "finalized", value: FLIGHT_REQUEST_STATUS.FINALIZED },
                { label: "cancelled", value: FLIGHT_REQUEST_STATUS.CANCELLED },
                { label: "request processing", value: FLIGHT_REQUEST_STATUS.REQUEST_PROCESSING },
                { label: "credit card failed", value: FLIGHT_REQUEST_STATUS.CREDIT_CARD_FAILED },
                { label: "amendment processing", value: FLIGHT_REQUEST_STATUS.AMENDMENT_PROCESSING },
                { label: "cancellation processing", value: FLIGHT_REQUEST_STATUS.CANCELLATION_PROCESSING },
                { label: "payment processing", value: FLIGHT_REQUEST_STATUS.PAYMENT_PROCESSING },
                { label: "payment outstanding", value: FLIGHT_REQUEST_STATUS.PAYMENT_OUTSTANDING },
                { label: "cancelled and refunded", value: FLIGHT_REQUEST_STATUS.CANCELLED_AND_REFUNDED },
                { label: "alternative advised", value: FLIGHT_REQUEST_STATUS.ALTERNATIVE_ADVISED },
                { label: "reserved", value: FLIGHT_REQUEST_STATUS.RESERVED },
              ]
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Booking Notes" name="bookingNote">
        <TextArea />
      </Form.Item>
      <Form.Item label="Accounting Notes" name="accountingNote">
        <TextArea />
      </Form.Item>
      <div style={{ position: "sticky", bottom: 0, width: "100%" }}>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

const TableInfo = ({ source, destination, isBack }) => {
  return (
    <Card>
      <Flex justify="space-between">
        <Info {...source} title={"Source"} />
        <Box sx={{ display: "flex" }}>
          {isBack ? <ArrowLeftOutlined /> : <ArrowRightOutlined />}
        </Box>
        <Info {...destination} title="destination" />
      </Flex>
      <Divider
        style={{
          borderStyle: "dashed",
          borderWidth: "1px",
          borderRadius: "8px",
          borderColor: "#E5E5EA",
        }}
      />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item name={isBack ? "backCost" : "goCost"} label="Cost">
            <Input placeholder="Enter cost" type="number"></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={isBack ? "backSale" : "goSale"} label="Sale">
            <Input placeholder="Enter sale" type="number"></Input>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

const Info = ({ title, from, time, id }) => {
  return (
    <Box sx={{ width: "240px" }}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Row gutter={32}>
        <Col span={12}>From:</Col>
        <Col span={12}>{from}</Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>Time:</Col>
        <Col span={12}>{time}</Col>
      </Row>{" "}
      <Row gutter={32}>
        <Col span={12}>ID</Col>
        <Col span={12}>{id}</Col>
      </Row>
    </Box>
  );
};
export default FormContent;
