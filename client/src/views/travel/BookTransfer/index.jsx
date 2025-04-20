import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Timeline,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { AntDesignOutlined } from "@ant-design/icons";

import LoadingPage from "components/common/LoadingPage";
import usePageTitle from "hooks/usePageTitle";
import Section from "./components/Section";
import formatNumber from "utils/formatNumber";
import { useDebounce } from "hooks/useDebounce";
import useGetVehicleById from "services/travel/transfer/Queries/useGetVehicleById";
import { useAirportHotelTransferBooking } from "services/travel/dashboard";
import TransferModal from "./components/Modal";
import useGetCustomers from "services/Customers/Querys/useGetCustomers";
import ROUTER_URLS from "constants/ROUTER_URLS";
import SvgImage from "components/common/SvgImage";

// images
import { BagSVG, CarSVG, MoneySVG, PluseSVG, TransferSVG, User2SVG } from "assets/jsx-svg";
import default_car_image from "assets/images/default_car_image.jpg";
import passengerPNG from "assets/images/passengerPNG.png";
import documentsPNG from "assets/images/documentsPNG.png";
import moneyPNG from "assets/images/moneyPNG.png";
import AddToQuotation from "components/AddToQuotation";

// style
import "./styles.css";
import QUOTATION_ITEM_TYPES from "constants/QUOTATION_ITEM_TYPES";
const BookTransfer = () => {
  /*
  {
    "name": "First Qutation",
    "guestFirstName": "John",
    "guestLastName": "Doe",
    "guestEmail": "Doe@gmail.com",
    "guestMobile": "+972598653456",
    "guestTitle": "Mr",
    // "qutationId": 1, // when add to exist qutation
    "item": {
        "type": "HOTEL",
        "name": "Single", // item name ( hotel name, experince name, ... )
        "bookingKey": "20250125|20250126|3|4|1|7|1|1", // if exist
        "arrivalDate": "2025-02-01",
        "departureDate": "2025-02-10", // if exist
        "price": 77.46,
        "id": 67 // item id from search response
    }
}
  */
  usePageTitle("Booking Transfer");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const depounceName = useDebounce(searchCustomerName);
  const { data: customers } = useGetCustomers(
    { page: 1, limit: 10, body: { fullName: depounceName } },
    {
      select: (data) => {
        return data?.data?.data?.data;
      },
    },
  );

  const { state } = useLocation();
  const [form] = useForm();
  const navigate = useNavigate();

  const { transfer, searchInfo, departing, returning } = useMemo(() => {
    return state;
  }, [state]);
  console.log(transfer, searchInfo, "qqqqqqqqqqqqqqqqqqqqq");

  const [isBookStep, setIsBookStep] = useState(false);
  // API CALLS
  const vehicleById = useGetVehicleById(transfer.vehicleId, { enabled: !!transfer.vehicleId });
  // MUTATIONS
  const bookTransfer = useAirportHotelTransferBooking({
    onSuccess: () => {
      message.success("Transfer booked successfully");
      setTimeout(() => {
        navigate(ROUTER_URLS.TRAVEL.BOOKING.INDEX);
      }, 500);
    },
    onError: (error) => {
      message.error(error?.message || "Something went wrong");
    },
  });

  if (vehicleById?.isLoading) {
    return <LoadingPage />;
  }

  const handelBook = (data) => {
    const value = {
      transferId: transfer.id,
      holderAccountId: data.holderEmail ? undefined : data.clientAccountId,
      holderEmail: data.holderEmail,
      holderName: data.holderName,
      noOfPassengers: searchInfo.pax,
      type: searchInfo.type,
      departureDateTime: departing,
      returnDateTime: searchInfo.type === "TWO_WAY" ? returning : undefined,
      meetingDetails: data.meetingDetails,
      transferMode: searchInfo.transferMode,
    };
    bookTransfer.mutate(value);
  };

  return (
    <div className="book_page">
      <div className="page_content">
        <Breadcrumb style={{ marginBottom: "1rem" }}>
          <Breadcrumb.Item>Transfer</Breadcrumb.Item>
          <Breadcrumb.Item>
            {!isBookStep ? (
              `${transfer?.vehicleBrand} ${transfer?.vehicleModel}`
            ) : (
              <Typography.Link onClick={() => setIsBookStep(false)}>
                {transfer?.vehicleBrand} {transfer?.vehicleModel}
              </Typography.Link>
            )}
          </Breadcrumb.Item>
          {isBookStep && (
            <Breadcrumb.Item>
              <p style={{ color: "var(--vbooking-b900)" }}>Checkout</p>
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
        <Section title={"Vehicle"} icon={<CarSVG />}>
          <Row gutter={[12, 24]}>
            <Col lg={8} md={24}>
              <Image
                height={"100%"}
                className="transfer_book_card transfer_book_card_image"
                src={transfer?.vehicleImage || default_car_image}
                onError={(e) => {
                  e.target.src = default_car_image;
                }}
                alt="vehicle"
                style={{ width: "100%" }}
              />
            </Col>
            <Col lg={16} md={12}>
              <div className="transfer_book_card">
                <p className="fz-16 fw-600" style={{ color: "#313343" }}>
                  Pick-up and drop-off
                </p>
                <Divider />
                <Timeline style={{ marginTop: "1rem" }}>
                  <Timeline.Item>
                    <Typography.Paragraph className="sm_text_regular" style={{ marginBottom: 0 }}>
                      {departing ? dayjs(departing).format("ddd, D MMM YYYY,") : ""}{" "}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      className="xl_text_bold"
                      ellipsis={{ tooltip: searchInfo.from.name }}
                      style={{ color: "var(--gray-700)", marginBottom: "0.5rem" }}>
                      {searchInfo.from.name}
                    </Typography.Paragraph>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Typography.Paragraph className="sm_text_regular" style={{ marginBottom: 0 }}>
                      {returning ? dayjs(returning).format("ddd, D MMM YYYY") : ""}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      className="xl_text_bold"
                      ellipsis={{ tooltip: searchInfo.to.name }}
                      style={{ color: "var(--gray-700)" }}>
                      {searchInfo.to.name}
                    </Typography.Paragraph>
                  </Timeline.Item>
                </Timeline>
              </div>
            </Col>

            <Col lg={16}>
              <Typography.Paragraph
                className="lg_text_bold"
                level={5}
                style={{ color: "var(--gray-700)", marginBottom: "1rem" }}>
                {transfer?.vehicleBrand} {transfer?.vehicleModel}
                {transfer?.vehicleYear ? " - " + transfer?.vehicleYear : ""}
              </Typography.Paragraph>
              <Flex gap={24}>
                <Typography.Paragraph
                  className="xs_text_regular transfer_book_card_info_with_icon"
                  level={5}
                  style={{ color: "var(--gray-600)" }}>
                  {vehicleById?.data?.vehicleType?.icon ? (
                    <SvgImage
                      svgContent={vehicleById?.data?.vehicleType?.icon}
                      className="transfer_book_card_info_with_icon_svg_container"
                    />
                  ) : (
                    <TransferSVG width={20} height={20} viewBox="0 0 24 24" />
                  )}
                  {transfer?.vehicleType}
                </Typography.Paragraph>

                <Typography.Paragraph
                  className="xs_text_regular transfer_book_card_info_with_icon"
                  level={5}
                  style={{ color: "var(--gray-600)" }}>
                  <User2SVG />
                  {transfer?.maxPax} Seats
                </Typography.Paragraph>

                <Typography.Paragraph
                  className="xs_text_regular transfer_book_card_info_with_icon"
                  level={5}
                  style={{ color: "var(--gray-600)" }}>
                  <BagSVG />
                  {vehicleById?.data?.maxBags} Bags
                </Typography.Paragraph>
                <Typography.Paragraph
                  className="xs_text_regular transfer_book_card_info_with_icon"
                  level={5}
                  style={{ color: "var(--gray-600)" }}>
                  <MoneySVG color={"#344054"} />
                  Initial Price: ${formatNumber(vehicleById?.data?.initialPrice)} ,Per Per Kilo:${" "}
                  {formatNumber(vehicleById?.data?.distanePricePerKilo)}
                </Typography.Paragraph>
              </Flex>
            </Col>
            <Col lg={8}>
              {isBookStep ? (
                <Flex justify="flex-end" gap={4} align="center">
                  <p className="fz-14 fw-400" style={{ color: "#697281" }}>
                    total
                  </p>
                  <p className="fz-18 fw-700" style={{ color: "#313342" }}>
                    {formatNumber(transfer.priceWithPricingModel)} {transfer.currencyCode}
                  </p>
                </Flex>
              ) : (
                <div className="transfer_book_card">
                  <p className="fz-16 fw-600" style={{ color: "#313343" }}>
                    Price breakdown
                  </p>
                  <Divider />
                  <Flex justify="space-between">
                    <p className="sm_text_regular" style={{ color: "var(--gray-700)" }}>
                      Initial Price
                    </p>
                    <p className="md_text_semibold" style={{ color: "var(--gray-700)" }}>
                      ${formatNumber(vehicleById?.data?.initialPrice || 0)}
                    </p>
                  </Flex>
                  <Flex justify="space-between">
                    <p className="sm_text_regular" style={{ color: "var(--gray-700)" }}>
                      Price Per Kilo
                    </p>
                    <p className="md_text_semibold" style={{ color: "var(--gray-700)" }}>
                      ${formatNumber(vehicleById?.data?.distanePricePerKilo || 0)}
                    </p>
                  </Flex>
                  <Divider />

                  <Flex justify="space-between">
                    <p className="sm_text_regular" style={{ color: "var(--gray-700)" }}>
                      Total
                    </p>
                    <p className="md_text_semibold" style={{ color: "var(--gray-700)" }}>
                      ${formatNumber(transfer.priceWithPricingModel || 0)}
                    </p>
                  </Flex>
                  <Flex align="center" gap={6} style={{ marginTop: "0.5rem" }}>
                    <Button type={"primary"} className="w-100" onClick={() => setIsBookStep(true)}>
                      Book
                    </Button>
                    <AddToQuotation
                      addButtonProps={{ style: { width: "44px", height: "44px" } }}
                      item={{
                        type: QUOTATION_ITEM_TYPES.TRANSFER,
                        id: transfer.id,
                        bookingKey: JSON.stringify({
                          type: searchInfo?.type,
                        }),
                        adults: searchInfo?.pax,
                        name: `${vehicleById?.data?.vehicleBrand?.name} ${vehicleById?.data?.vehicleModel?.name} From ${searchInfo?.from?.name} To ${searchInfo.to.name}`,
                        price: transfer.priceWithPricingModel,
                        arrivalDate: dayjs(departing).format("YYYY-MM-DD"),
                        departureDate:
                          searchInfo.type === "TWO_WAY"
                            ? dayjs(returning).format("YYYY-MM-DD")
                            : undefined,
                      }}
                    />
                  </Flex>
                </div>
              )}
            </Col>
          </Row>
        </Section>
        {!isBookStep && (
          <Section title={"Important Information"}>
            <ul style={{ paddingInlineStart: "2rem" }}>
              <li style={{ color: "darkred" }}>
                if you wish to change the pick up time please contact our operations after
                completing the booking
              </li>
              <li>
                I have reviewed and agreed on the Terms & Conditions, Disclaimer , Cancellation
                Charges, Rates and Commission offered for this booking.
              </li>
            </ul>
          </Section>
        )}
        <Form form={form} layout="vertical" onFinish={handelBook}>
          {isBookStep && (
            <Section
              title="Holder data"
              icon={<img src={passengerPNG} alt="passengerPNG" />}
              className="mt-1">
              <Row gutter={[12, 12]}>
                <Col md={24} xs={24}>
                  {/* Modal for Adding New Client */}
                  <TransferModal
                    isAddClientModalOpen={isAddClientModalOpen}
                    setIsAddClientModalOpen={setIsAddClientModalOpen}
                    form={form}
                  />
                  <Form.Item name="holderName" hidden={true}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="holderEmail" hidden={true}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: "Client name is required" }]}
                    name="clientAccountId"
                    label={"Client"}>
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
                              icon={<PluseSVG color="#1890ff" />}>
                              Add New Client
                            </Button>
                          </div>
                        </>
                      )}
                      placeholder="Select Client"
                      options={customers?.map((el) => ({
                        label: (
                          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                            {!el?.profileImage ? (
                              <Avatar size={32} icon={<AntDesignOutlined />} />
                            ) : (
                              <Avatar size={32} src={el?.profileImage} />
                            )}
                            <div> {el.fullName}</div>
                          </div>
                        ),
                        value: el?.accountId,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col md={24} xs={24}>
                  <Form.Item name={"meetingDetails"} label={"meeting Details"}>
                    <Input.TextArea rows={4} placeholder="meeting Details" />
                  </Form.Item>
                </Col>
              </Row>
            </Section>
          )}
          {isBookStep && (
            <Section
              title="Terms and conditions"
              icon={<img src={documentsPNG} alt="documentsPNG" />}
              className="mt-1">
              <div className="terms_and_condation">
                <Form.Item
                  name="term_1_check"
                  rules={[{ required: true, message: "Read and accept this conditions" }]}
                  valuePropName="checked">
                  <Checkbox>
                    <div>
                      <p className="fz-14 fw-700">I accept the following terms and conditions: </p>
                      <p className="fz-14 fw-400 mb-1">
                        By checking this box, I acknowledge and agree to the hotel’s reservation
                        policy, cancellation policy, check-in/check-out times, payment requirements,
                        damage responsibility, and pet policy as outlined above.
                      </p>
                      <p className="fz-14 fw-400">
                        <span className="fz-14 fw-600">1. Introduction:</span>
                        <span className="gc">
                          {" "}
                          By using Vindo, you agree to these terms and conditions.
                        </span>
                      </p>
                      <p className="fz-14 fw-400">
                        <span className="fz-14 fw-600">2. Eligibility:</span>
                        <span className="gc">
                          {" "}
                          Users must be 18+ and meet specific requirements for activities.
                        </span>
                      </p>
                      <p className="fz-14 fw-400">
                        <span className="fz-14 fw-600">3. Booking and Payment:</span>
                        <span className="gc">
                          {" "}
                          Bookings are subject to availability and must be paid in full at the time
                          of booking. Prices may vary.
                        </span>
                      </p>
                      <p className="fz-14 fw-400">
                        <span className="fz-14 fw-600">6. Activity Providers:</span>
                        <span className="gc">
                          {" "}
                          The app acts as an intermediary and isn’t responsible for the quality or
                          safety of activities. Disputes must be resolved with the provider.
                        </span>
                      </p>
                      <p className="fz-14 fw-400">
                        <span className="fz-14 fw-600">7. Liability:</span>
                        <span className="gc">
                          {" "}
                          The app isn’t liable for any damages arising from app use or participation
                          in activities.
                        </span>
                      </p>
                      <p className="fz-14 fw-400">
                        <span className="fz-14 fw-600">8. Privacy:</span>
                        <span className="gc">
                          {" "}
                          Your information is collected and used per our{" "}
                          <a href="" className="gc fw-500" style={{ textDecoration: "underline" }}>
                            Privacy Policy
                          </a>
                          . By using the app, you agree to this.
                        </span>
                      </p>
                      <p className="fz-14 fw-400">
                        <span className="fz-14 fw-600">8. Changes:</span>
                        <span className="gc">
                          {" "}
                          We may update these terms at any time. Continued use of the app means you
                          accept the changes.
                        </span>
                      </p>
                    </div>
                  </Checkbox>
                </Form.Item>
              </div>
            </Section>
          )}
          {isBookStep && (
            <Section
              title="Total Due"
              icon={<img src={moneyPNG} alt="moneyPNG" />}
              className="mt-1">
              <Flex
                justify={"space-between"}
                align="center"
                style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                <p className="fz-16 fw-500" style={{ color: "#313343" }}>
                  Gross Total Due
                </p>
                <p className="fz-22 fw-700" style={{ color: "#313343" }}>
                  {transfer.priceWithPricingModel} {transfer.currencyCode}
                </p>
              </Flex>
            </Section>
          )}
          {isBookStep && (
            <div className="book_btns space-between mt-1 mb-1">
              <Button type="default" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button type="primary" htmlType="submit" disabled={false}>
                Book
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default BookTransfer;
