import React, { useEffect, useMemo, useState } from "react";
import BookRoomSection from "./components/BookRoomSection";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import RoomInfo from "./components/RoomInfo";
import { Button, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import PassengersDataForm from "./components/PassengersDataForm";
import ContactDataForm from "./components/ContactDataForm";
import TermsAndCondation from "./components/TermsAndCondation";
import dayjs from "dayjs";
import usePreBook from "services/travel/booking/Accommodation/Mutations/usePreBook";
// images
import { HomeColoredSVG } from "assets/jsx-svg";
import passengerPNG from "assets/images/passengerPNG.png";
import contactUsPNG from "assets/images/contactUsPNG.png";
import documentsPNG from "assets/images/documentsPNG.png";
import moneyPNG from "assets/images/moneyPNG.png";
// style
import "./styles.css";
import usePageTitle from "hooks/usePageTitle";
import useSessionStorage from "hooks/useSessionStorage";
import { MEETING_PARTICIPANTS_STORAGE_KEY } from "constants/MEETING_PARTICIPANTS_STORAGE_KEY";
import SelectCustomerModal from "components/SelectCustomerModal";
import useBookAccommodationLocal from "services/travel/accommodations/Tbo/mutations/useBookAccommodationLocal";
import isValidJson from "utils/isValidJson";
import { getSearchParamsFromURIComponent } from "utils/uri-params";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
const BookRoom = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const searchParams = useMemo(() => getSearchParamsFromURIComponent(search), [search]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form] = useForm();
  // set page title
  usePageTitle(
    state?.accommodation
      ? `Book / ${
          (state?.accommodation?.name ? state.accommodation.name : "", state?.accommodation?.name)
        }`
      : `Book / ${state?.tboAccomodationInfo?.name}`,
  );
  const [participants, setParticipants] = useSessionStorage(MEETING_PARTICIPANTS_STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);
  const [customerId, setCustomerId] = useState(undefined);
  const bookAccommodationLocal = useBookAccommodationLocal({
    onSuccess: (res) => {
      console.log(res);
      message.success("Booking done successfully");

      navigate(
        ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS + `${res?.data?.bookingId}?type=ACCOMMODATION`,
      );
    },
  });

  const preBookMutation = usePreBook({
    onSuccess: (res) => {
      console.log(res);
      if (res?.statusCode === 200) {
        message.success("Booking done successfully");
        if (window.opener && typeof window.opener.travelAddToCart === "function") {
          window.opener.travelAddToCart(customerId);
        } else {
          console.error("addToCart function is not available in the main window.");
        }

        navigate(
          ROUTER_URLS.TRAVEL.BOOKING.BOOKING_DETAILS +
            `${res?.data?.bookingId}?type=${BOOKINGS_TYPES.ACCOMMODATION}`,
        );
      }
    },
    onError: (error) => message.error(error.message),
  });

  useEffect(() => {
    if (!state) {
      navigate(ROUTER_URLS.TRAVEL.ACCOMMODATION.VIEW + id);
    }
  }, [state]);

  const handelFinish = (values) => {
    if (Array.isArray(participants) && participants.length > 0 && !customerId) {
      setIsOpen(true);
      return;
    }

    const temp = {
      ...values,
      holderEmail: values.holderEmail,
      holderMobile: values?.holderMobile,
      customerId,
      isMeeting: customerId ? true : false,
      startDate: searchParams?.arrival,
      endDate: searchParams?.departure,
      nationality: searchParams?.nationality,
      hotelCode: state?.accommodation?.id,
      hotelName: state?.accommodation?.name,
      hotelCity: isValidJson(state?.accommodation?.city)
        ? JSON.parse(state?.accommodation?.city)?.city
        : state?.accommodation?.city,
      hotelCountry: isValidJson(state?.accommodation?.city)
        ? JSON.parse(state?.accommodation?.city)?.country
        : state?.accommodation?.city,
      lat: state?.accommodation?.lat,
      lng: state?.accommodation?.lng,
      rooms: values.rooms.map((room) => {
        return {
          ...room,
          bookingKey: isValidJson(room?.bookingKey)
            ? JSON.parse(room?.bookingKey)?.bookingKey
            : room?.bookingKey,
          paxes: room.paxes.map((el) => ({
            ...el,
            dateOfBirth:
              el?.type === "child" && dayjs(el?.dateOfBirth).isValid()
                ? dayjs(el?.dateOfBirth).format("YYYY-MM-DD")
                : undefined,
          })),
        };
      }),
    };

    if (searchParams?.isLocalBook) {
      bookAccommodationLocal.mutate({
        ...temp,
        paxes: values?.rooms[0].paxes.map((el) => ({
          ...el,
          dateOfBirth: dayjs(el?.dateOfBirth).format("YYYY-MM-DD"),
        })),
        pax: `${searchParams?.adults}${
          searchParams?.childsAges ? "-" + searchParams.childsAges : ""
        }`,
        MealType: state?.room?.MealType,
        lat: state?.tboAccomodationInfo?.lat,
        lng: state?.tboAccomodationInfo?.lng,
        startDate: searchParams?.arrival,
        endDate: searchParams?.departure,
        hotelCode: state?.tboAccomodationInfo?.HotelCode,
        roomPrice: state?.room?.TotalFare,
        roomName: Array.isArray(state?.room?.Name) ? state?.room?.Name[0] : "",
        hotelCountry: isValidJson(state?.tboAccomodationInfo?.city)
          ? JSON.parse(state?.tboAccomodationInfo?.city)?.country
          : "",
        hotelCity: isValidJson(state?.tboAccomodationInfo?.city)
          ? JSON.parse(state?.tboAccomodationInfo?.city)?.city
          : "",
        hotelName: state?.tboAccomodationInfo?.name,
      });
      return;
    }

    preBookMutation.mutate(temp);
  };

  return (
    <div className="book_page">
      <div className="page_content">
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handelFinish}
          scrollToFirstError={{
            behavior: "smooth",
          }}>
          <BookRoomSection title="Home" icon={<HomeColoredSVG />}>
            <RoomInfo
              tboAccomodationInfo={state?.tboAccomodationInfo}
              rooms={state.rooms}
              rate={state.rate}
              totalPrice={
                state?.totalPrice
                  ? state?.totalPrice
                  : state?.rooms
                      ?.reduce(
                        (acc, room) =>
                          acc +
                          Number(
                            room?.amount ||
                              room?.rate?.amountWithPromotion ||
                              room?.rate?.amount ||
                              room?.totalFare ||
                              room?.TotalFare ||
                              0,
                          ),
                        0,
                      )
                      ?.toFixed(2)
              }
              accommodation={state.accommodation}
            />
          </BookRoomSection>
          {state?.rooms?.map((room, index) => {
            return (
              <BookRoomSection
                key={index}
                title={room?.name ? room?.name : `Room ${index + 1} passengers data`}
                icon={<img src={passengerPNG} alt="passengerPNG" />}>
                <PassengersDataForm
                  roomIndex={index}
                  mealType={room?.mealType}
                  adults={room?.adults}
                  childsAges={
                    room?.childrenAges || Array.isArray(searchParams?.rooms)
                      ? searchParams?.rooms[index]?.children
                      : ""
                  }
                  room={room}
                  bookingKey={room?.bookingKey || room?.bookingCode}
                />
              </BookRoomSection>
            );
          })}
          <BookRoomSection
            title="Contact Information"
            icon={<img src={contactUsPNG} alt="contactUsPNG" />}>
            <ContactDataForm />
          </BookRoomSection>
          <BookRoomSection
            title="Terms and conditions"
            icon={<img src={documentsPNG} alt="documentsPNG" />}>
            <TermsAndCondation
              cancellationPolicy={state?.cancellationName}
              smokingAllowed={state?.room?.smokingAllowed}
            />
          </BookRoomSection>
          <BookRoomSection title="Total Due" icon={<img src={moneyPNG} alt="moneyPNG" />}>
            <div className="space-between">
              <span className="fz-16 fw-500">Gross Total Due</span>
              <span className="fz-22 fw-700">
                {state?.totalPrice
                  ? state?.totalPrice
                  : state?.rooms
                      ?.reduce(
                        (acc, room) =>
                          acc +
                          Number(
                            room?.amount ||
                              room?.rate?.amountWithPromotion ||
                              room?.rate?.amount ||
                              room?.totalFare ||
                              room?.TotalFare ||
                              0,
                          ),
                        0,
                      )
                      ?.toFixed(2)}{" "}
                {state.accommodation?.currencyCode || "USD"}
              </span>
            </div>
          </BookRoomSection>
          <div className="book_btns space-between">
            <Button type="default" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={preBookMutation?.isPending || bookAccommodationLocal?.isPending}>
              Book
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BookRoom;
