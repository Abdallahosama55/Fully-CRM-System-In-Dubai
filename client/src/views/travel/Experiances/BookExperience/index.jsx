import { Button, Carousel, Col, Form, message, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { ArrowRightSVG, CancelSVG, LeftArrow2SVG, LocationSVG2, RateStarSVG } from "assets/jsx-svg";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Section from "../components/Section";
// images
import passengerPNG from "assets/images/passengerPNG.png";
import contactUsPNG from "assets/images/contactUsPNG.png";
import documentsPNG from "assets/images/documentsPNG.png";
import moneyPNG from "assets/images/moneyPNG.png";
// style
import "./styles.css";
import PassengersDataForm from "./components/PassengersDataForm";
import TermsAndCondation from "./components/TermsAndCondation";
import ContactDataForm from "./components/ContactDataForm";
import useBookExperience from "services/travel/booking/Experience/Mutations/useBookExperience";
import useGetContactInfo from "services/travel/experiance/BookingTab/Querys/useGetContactInfo";
import dayjs from "dayjs";
import usePageTitle from "hooks/usePageTitle";
import useSessionStorage from "hooks/useSessionStorage";
import { MEETING_PARTICIPANTS_STORAGE_KEY } from "constants/MEETING_PARTICIPANTS_STORAGE_KEY";
import SelectCustomerModal from "components/SelectCustomerModal";
import Description from "components/common/Description";
import ROUTER_URLS from "constants/ROUTER_URLS";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
export const SYSTEM_CONTACT_INFORMTION_KEY = {
  TITLE: "title",
  EMAIL: "email",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  PHONE_NUMBER: "phoneNumber",
  NATIONALITY: "nationality",
  GENDER: "gender",
  LANGUAGE: "language",
  ADDRESS: "address",
  ORGANIZATION: "organization",
  PERSONAL_ID_NUMBER: "personalIDNumber",
  PASSPORT_ID: "passportID",
  PASSPORT_EXPIRY: "passportExpiry",
  DATE_OF_BIRTH: "dateOfBirth",
};

const BookExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = useForm();
  const { state } = useLocation();
  // booking key
  const experienceId = state?.bookingKey?.split("|")?.[1];
  const finalPrice = state?.bookingKey?.split("|")?.[3];

  const contactInfoQuery = useGetContactInfo(experienceId, { enabled: !!experienceId });

  usePageTitle(
    `Book / ${state?.productData?.title ? state.productData.title : ""}`,
    state?.productData?.title,
  );
  const [participants, setParticipants] = useSessionStorage(MEETING_PARTICIPANTS_STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setCustomerId] = useState(undefined);
  const bookExperienceMutation = useBookExperience({
    onSuccess: (res, payload) => {
      console.log(res);
      message.success("Book experiance done");
      // Call the travelAddToCart function in the main window
      if (window.opener && typeof window.opener.travelAddToCart === "function") {
        console.log("RUN RUN RUN");
        window.opener.travelAddToCart(customerId);
      } else {
        console.error("addToCart function is not available in the main window.");
      }
      navigate(
        ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS +
          `${res?.travelProductBookingId}?type=${BOOKINGS_TYPES.EXPERIENCE}`,
      );
    },
    onError: () => {
      message.error("Somthing went wrong");
    },
  });

  const handelFinish = (values) => {
    if (Array.isArray(participants) && participants.length > 0 && !customerId) {
      setIsOpen(true);
      return;
    }

    bookExperienceMutation.mutate({
      ...values,
      holderPhoneNumber: values.holderPhoneNumber,
      holderDateOfBirth: values.holderDateOfBirth
        ? dayjs(values.holderDateOfBirth).format("YYYY-MM-DD")
        : undefined,
      holderPassportExpiry: values.holderPassportExpiry
        ? dayjs(values.holderPassportExpiry).format("YYYY-MM-DD")
        : undefined,
      holderAddress: values?.holderAddress ? values?.holderAddress?.city : undefined,
      paxes: values?.paxes?.map((pax) => {
        return {
          ...pax,
          phoneNumber: pax.phoneNumber,
          dateOfBirth: pax.dateOfBirth ? dayjs(pax.dateOfBirth).format("YYYY-MM-DD") : undefined,
          passportExpiry: pax.passportExpiry
            ? dayjs(pax.passportExpiry).format("YYYY-MM-DD")
            : undefined,
          address: pax?.address ? pax?.address?.city : undefined,
        };
      }),
      cancellationKey: state.cancellationKey,
      sessionIds: [state.sessionId],
      customerId,
      isMeeting: customerId ? true : false,
    });
  };

  return (
    <div className="book_experiance_page">
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
        <Form
          layout="vertical"
          onFinish={handelFinish}
          form={form}
          scrollToFirstError={{ behavior: "smooth" }}>
          <Section title="Experience">
            <div className="experience_info">
              <Row gutter={[16, 16]}>
                <Col md={12} sm={24}>
                  <Carousel
                    arrows
                    nextArrow={
                      <div>
                        <ArrowRightSVG color={"#3A5EE3"} />
                      </div>
                    }
                    prevArrow={
                      <div>
                        <LeftArrow2SVG color={"#3A5EE3"} />
                      </div>
                    }
                    infinite={true}>
                    {state?.productData?.images?.map((image) => (
                      <img
                        className="experience_card_image"
                        src={image.url}
                        alt={state.productData.title}
                        key={image.url}
                      />
                    ))}
                  </Carousel>
                </Col>
                <Col md={12} sm={24}>
                  <div className="info_body">
                    <div className="experience_data">
                      <div className="title">
                        <Typography.Title level={2} className="fz-24 fw-700">
                          {state.productData.title}
                        </Typography.Title>
                      </div>
                      <span className="rate_stars">
                        {[...new Array(state.productData.rate || 0)].map((el, index) => (
                          <RateStarSVG key={index} />
                        ))}
                      </span>
                      <div className="info_with_icon location">
                        <div>
                          <LocationSVG2 fill="#697281" />
                        </div>
                        <Typography.Text ellipsis>{state.productData.location}</Typography.Text>
                      </div>
                      {state?.cancellationKey && (
                        <div className="info_with_icon">
                          <CancelSVG />
                          <Typography.Text ellipsis>
                            Cancellation Policy:{" "}
                            <span className="cancellation fw-600 fz-14">
                              {state?.cancellationKey?.type}
                            </span>
                          </Typography.Text>
                        </div>
                      )}
                      <Description description={state?.productData?.description} />
                    </div>
                    <div className="info_body-price_section">
                      <span className="gc fz-12 fw-400">total</span>
                      <Typography.Text className="fz-18 fw-700" ellipsis>
                        {finalPrice}
                      </Typography.Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Section>
          <Section
            title="Passengers Data"
            icon={<img src={passengerPNG} alt="passengerPNG" />}
            className="mt-1">
            <PassengersDataForm
              questions={contactInfoQuery?.data?.productBookingPassengerContact}
              bookingKey={state?.bookingKey}
              adults={state?.categories?.adults}
              childs={state?.categories?.childs}
            />
          </Section>
          <Section
            title="Contact Information"
            icon={<img src={contactUsPNG} alt="contactUsPNG" />}
            className="mt-1">
            <ContactDataForm
              questions={contactInfoQuery?.data?.productBookingMainContact}
              experienceId={experienceId}
            />
          </Section>
          <Section
            title="Terms and conditions"
            icon={<img src={documentsPNG} alt="documentsPNG" />}
            className="mt-1">
            <TermsAndCondation
            // cancellationPolicy={state.cancellationName}
            // smokingAllowed={state.room.smokingAllowed}
            />
          </Section>
          <Section title="Total Due" icon={<img src={moneyPNG} alt="moneyPNG" />} className="mt-1">
            <div className="space-between">
              <span className="fz-16 fw-500">Gross Total Due</span>
              <span className="fz-22 fw-700">${finalPrice}</span>
            </div>
          </Section>
          <div className="book_btns space-between mt-1 mb-1">
            <Button type="default" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button type="primary" htmlType="submit" disabled={bookExperienceMutation?.isPending}>
              Book
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookExperience;
