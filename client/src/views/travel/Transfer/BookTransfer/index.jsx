import LoadingPage from "components/common/LoadingPage";
import usePageTitle from "hooks/usePageTitle";
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetVehicleById from "services/travel/transfer/Queries/useGetVehicleById";
import Section from "./components/Section";
import { BagSVG, CarSVG, DateSVG, MoneySVG, TransferSVG, User2SVG } from "assets/jsx-svg";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  message,
  Row,
  Timeline,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import Map from "components/common/Map";
import SvgImage from "components/common/SvgImage";
import formatNumber from "utils/formatNumber";
// style
import "./styles.css";
// images
import default_car_image from "assets/images/default_car_image.jpg";
import passengerPNG from "assets/images/passengerPNG.png";
import documentsPNG from "assets/images/documentsPNG.png";
import moneyPNG from "assets/images/moneyPNG.png";
import useBookTransfer from "services/travel/booking/transfer/Mutations/useBookTransfer";
import ROUTER_URLS from "constants/ROUTER_URLS";
import SelectCustomerModal from "components/SelectCustomerModal";
import useSessionStorage from "hooks/useSessionStorage";
import { MEETING_PARTICIPANTS_STORAGE_KEY } from "constants/MEETING_PARTICIPANTS_STORAGE_KEY";
import AddToQuotation from "components/AddToQuotation";
const BookTransfer = () => {
  usePageTitle("Book Transfer");
  const [participants, setParticipants] = useSessionStorage(MEETING_PARTICIPANTS_STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setCustomerId] = useState(undefined);

  const { state } = useLocation();
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const { from, to, time, date, pax, finalPrice, distance, duration } = useMemo(
    () => state,
    [state],
  );

  console.log({ id, from, to, time, date, pax, finalPrice, distance, duration });
  const mapCenter = useMemo(
    () => ((from && from?.lat, from?.lng) ? [from?.lat, from?.lng] : [51.505, -0.09]),
    [from],
  );
  const mapDirections = useMemo(
    () =>
      from && from?.lat && from?.lng && to && to?.lat && to?.lng
        ? {
            source: {
              lat: from?.lat,
              lng: from?.lng,
            },
            destination: {
              lat: to?.lat,
              lng: to?.lng,
            },
          }
        : undefined,
    [from, to],
  );

  const [isBookStep, setIsBookStep] = useState(false);
  // API CALLS
  const vehicleById = useGetVehicleById(id, { enabled: !!id });
  // MUTATIONS
  const bookTransfer = useBookTransfer({
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

  const handelBook = (values) => {
    if (participants && participants.length > 0 && !customerId) {
      setIsOpen(true);
      return;
    }

    const temp = {
      from,
      to,
      date,
      time: dayjs(time, "hh:mm A").format("hh:mm"),
      ...values,
      noOfPassengers: pax,
      holderDOB: dayjs(values?.holderDOB).format("DD-MM-YYYY"),
      customerId,
      isMeeting: customerId ? true : false,
      vehicleId: id,
    };
    bookTransfer.mutate(temp);
  };

  if (vehicleById?.isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="book_page">
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
        <Breadcrumb style={{ marginBottom: "1rem" }}>
          <Breadcrumb.Item>Transfer</Breadcrumb.Item>
          <Breadcrumb.Item>
            {!isBookStep ? (
              `${vehicleById?.data?.vehicleBrand?.name} ${vehicleById?.data?.vehicleModel?.name}`
            ) : (
              <Typography.Link onClick={() => setIsBookStep(false)}>
                {vehicleById?.data?.vehicleBrand?.name} {vehicleById?.data?.vehicleModel?.name}
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
                src={vehicleById?.data?.image || default_car_image}
                onError={(e) => {
                  e.target.src = default_car_image;
                }}
                alt="vehicle"
                style={{ width: "100%" }}
              />
            </Col>
            <Col lg={8} md={12}>
              <div className="transfer_book_card">
                <p className="fz-16 fw-600" style={{ color: "#313343" }}>
                  Pick-up and drop-off
                </p>
                <Divider />
                <Timeline style={{ marginTop: "1rem" }}>
                  <Timeline.Item>
                    <Typography.Paragraph className="sm_text_regular" style={{ marginBottom: 0 }}>
                      {date ? dayjs(date, "DD-MM-YYYY").format("ddd, D MMM YYYY,") : ""} {time}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      className="xl_text_bold"
                      ellipsis={{ tooltip: from?.location }}
                      style={{ color: "var(--gray-700)", marginBottom: "0.5rem" }}>
                      {from?.location}
                    </Typography.Paragraph>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Typography.Paragraph className="sm_text_regular" style={{ marginBottom: 0 }}>
                      {date ? dayjs(date, "DD-MM-YYYY").format("ddd, D MMM YYYY") : ""}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      className="xl_text_bold"
                      ellipsis={{ tooltip: to?.location }}
                      style={{ color: "var(--gray-700)" }}>
                      {to?.location}
                    </Typography.Paragraph>
                  </Timeline.Item>
                </Timeline>
              </div>
            </Col>
            <Col lg={8} md={12}>
              <Map
                style={{ height: "100%", width: "100%", borderRadius: "8px", overflow: "hidden" }}
                center={mapCenter}
                directions={mapDirections}
              />
            </Col>
            <Col lg={16}>
              <Typography.Paragraph
                className="lg_text_bold"
                level={5}
                style={{ color: "var(--gray-700)", marginBottom: "1rem" }}>
                {vehicleById?.data?.vehicleBrand?.name} {vehicleById?.data?.vehicleModel?.name}
                {vehicleById?.data?.vehicleModel?.year
                  ? " - " + vehicleById?.data?.vehicleModel?.year
                  : ""}
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
                  {vehicleById?.data?.vehicleType?.name}
                </Typography.Paragraph>

                <Typography.Paragraph
                  className="xs_text_regular transfer_book_card_info_with_icon"
                  level={5}
                  style={{ color: "var(--gray-600)" }}>
                  <User2SVG />
                  {vehicleById?.data?.maxPax} Seats
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
                    {formatNumber(finalPrice)} USD
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
                      Distance
                    </p>
                    <p className="md_text_semibold" style={{ color: "var(--gray-700)" }}>
                      {distance}
                    </p>
                  </Flex>
                  <Flex justify="space-between">
                    <p className="sm_text_regular" style={{ color: "var(--gray-700)" }}>
                      Total
                    </p>
                    <p className="md_text_semibold" style={{ color: "var(--gray-700)" }}>
                      ${formatNumber(finalPrice || 0)}
                    </p>
                  </Flex>
                  <Flex align="center" gap={6} style={{ marginTop: "0.5rem" }}>
                    <Button type={"primary"} className="w-100" onClick={() => setIsBookStep(true)}>
                      Book
                    </Button>
                    <AddToQuotation
                      addButtonProps={{ style: { width: "44px", height: "44px" } }}
                      item={{
                        type: "TRANSFER",
                        id: id,
                        bookingKey: JSON.stringify({
                          type: "ONE_WAY",
                        }),
                        name: `${vehicleById?.data?.vehicleBrand?.name} ${vehicleById?.data?.vehicleModel?.name} From ${from?.location} To ${to?.location}`,
                        price: finalPrice,
                        arrivalDate: date,
                        adults: pax ? Number(pax) : 1,
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
                <Col md={12} xs={24}>
                  <Form.Item
                    name="holderFirstName"
                    label="First Name"
                    rules={[{ required: true, message: "Enter holder first name" }]}>
                    <Input placeholder="Enter first name" />
                  </Form.Item>
                </Col>
                <Col md={12} xs={24}>
                  <Form.Item
                    name="holderLastName"
                    label="Last Name"
                    rules={[{ required: true, message: "Enter holder last name" }]}>
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item
                    name="holderEmail"
                    label="Email"
                    rules={[
                      { required: true, message: "Enter contact email" },
                      { type: "email", message: "Enter valid email" },
                    ]}>
                    <Input type="email" placeholder="Enter Email" />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item
                    name="holderPhone"
                    label="Phone"
                    rules={[
                      {
                        validator: (_, value) => {
                          // Define a regex pattern for validating phone numbers
                          const phoneRegex =
                            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

                          if (!value || !phoneRegex.test(value)) {
                            return Promise.reject("Please enter a valid phone number");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <Input type={"tel"} placeholder="Enter phone number" />
                  </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                  <Form.Item
                    name="holderDOB"
                    label="Birth Date"
                    rules={[{ required: true, message: "Enter birth date" }]}>
                    <DatePicker
                      placeholder="Enter birth date"
                      className="w-100"
                      suffixIcon={<DateSVG />}
                    />
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
                  {finalPrice} USD
                </p>
              </Flex>
            </Section>
          )}
          {isBookStep && (
            <div className="book_btns space-between mt-1 mb-1">
              <Button type="default" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Flex>
                <Button type="primary" htmlType="submit">
                  Book
                </Button>
              </Flex>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default BookTransfer;
