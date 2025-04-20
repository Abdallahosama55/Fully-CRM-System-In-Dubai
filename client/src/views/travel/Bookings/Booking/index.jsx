import { Tabs } from "antd";
import React, { useMemo, useState } from "react";
// style
import "./styles.css";
import usePageTitle from "hooks/usePageTitle";
import useGetHotelBookingById from "services/travel/booking/common/Queries/useGetHotelBookingById";
import { useParams, useSearchParams } from "react-router-dom";
import BOOKINGS_TYPES from "constants/BOOKINGS_TYPES";
import ContactTab from "./components/ContactTab";
import PricingTab from "./components/PricingTab";
import PaymentTransactionsTab from "./components/PaymentTransactionsTab";
import GeneralTab from "./components/GeneralTab";
import InvoicesTab from "./components/InvoicesTab";
import useGetExperienceBookingById from "services/travel/booking/common/Queries/useGetExperienceBookingById";
import useGetFlightBookingById from "services/travel/booking/common/Queries/useGetFlightBookingById";
import useGetTransferBookingById from "services/travel/booking/common/Queries/useGetTransferBookingById";
import useGetAirportHotelTransferBookingById from "services/travel/booking/common/Queries/useGetAirportHotelTransferBookingById";

const Booking = () => {
  const [activeTab, setActiveTab] = useState("General");
  usePageTitle(`Booking /${activeTab}`);
  const { id } = useParams(); // extracts the 'id' from the URL
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const hotelBookingData = useGetHotelBookingById(
    { id },
    { enabled: !!id && type === BOOKINGS_TYPES.ACCOMMODATION },
  );
  const experienceBookingData = useGetExperienceBookingById(
    { id },
    { enabled: !!id && type === BOOKINGS_TYPES.EXPERIENCE },
  );
  const flightBookingData = useGetFlightBookingById(
    { id },
    { enabled: !!id && type === BOOKINGS_TYPES.FLIGHT },
  );
  const transferBookingData = useGetTransferBookingById(
    { id },
    { enabled: !!id && type === BOOKINGS_TYPES.TRANSFER },
  );
  const airportHotelTransferBookingData = useGetAirportHotelTransferBookingById(
    { id },
    { enabled: !!id && type === BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS },
  );

  const isLoading = useMemo(
    () =>
      hotelBookingData?.isLoading ||
      experienceBookingData?.isLoading ||
      flightBookingData?.isLoading ||
      transferBookingData?.isLoading ||
      airportHotelTransferBookingData?.isLoading,
    [
      hotelBookingData?.isLoading,
      experienceBookingData?.isLoading,
      flightBookingData?.isLoading,
      transferBookingData?.isLoading,
      airportHotelTransferBookingData?.isLoading,
    ],
  );
  return (
    <div className="booking_page">
      <Tabs
        animated={false}
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
        }}
        items={[
          {
            key: "General",
            label: "General",
            children: (
              <GeneralTab
                type={type}
                refetchData={() => {
                  switch (type) {
                    case BOOKINGS_TYPES.ACCOMMODATION:
                      return hotelBookingData?.refetch();
                    case BOOKINGS_TYPES.FLIGHT:
                      return flightBookingData?.refetch();
                    case BOOKINGS_TYPES.EXPERIENCE:
                      return experienceBookingData?.refetch();
                    case BOOKINGS_TYPES.RENTAL:
                      return transferBookingData?.refetch();
                    case BOOKINGS_TYPES.AIRPORT_HOTEL_TRANSFERS:
                      return transferBookingData?.refetch();
                    default:
                      hotelBookingData?.refetch();
                      flightBookingData?.refetch();
                      experienceBookingData?.refetch();
                      transferBookingData?.refetch();
                      transferBookingData?.refetch();
                      break;
                  }
                }}
                isLoading={isLoading}
                data={
                  hotelBookingData?.data?.generalTab ||
                  experienceBookingData?.data?.generalTab ||
                  flightBookingData?.data?.generalTab ||
                  transferBookingData?.data?.generalTab ||
                  airportHotelTransferBookingData?.data?.generalTab
                }
              />
            ),
          },
          {
            key: "Contact",
            label: "Contact",
            children: (
              <ContactTab
                type={type}
                isLoading={isLoading}
                data={
                  hotelBookingData?.data?.contactTab ||
                  experienceBookingData?.data?.contactTab ||
                  flightBookingData?.data?.contactTab ||
                  transferBookingData?.data?.contactTab ||
                  airportHotelTransferBookingData?.data?.contactTab
                }
              />
            ),
          },
          {
            key: "Pricing",
            label: "Pricing",
            children: (
              <PricingTab
                type={type}
                isLoading={isLoading}
                data={
                  hotelBookingData?.data?.pricingTab ||
                  experienceBookingData?.data?.pricingTab ||
                  flightBookingData?.data?.pricingTab ||
                  transferBookingData?.data?.pricingTab ||
                  airportHotelTransferBookingData?.data?.pricingTab
                }
              />
            ),
          },
          {
            key: "Payment transactions",
            label: "Payment transactions",
            children: (
              <PaymentTransactionsTab
                type={type}
                isLoading={isLoading}
                data={
                  hotelBookingData?.data?.paymentTransactionsTab ||
                  experienceBookingData?.data?.paymentTransactionsTab ||
                  flightBookingData?.data?.paymentTransactionsTab ||
                  transferBookingData?.data?.paymentTransactionsTab ||
                  airportHotelTransferBookingData?.data?.paymentTransactionsTab
                }
              />
            ),
          },
          {
            key: "Invoices",
            label: "Invoices",
            children: (
              <InvoicesTab
                type={type}
                bookingInfo={{
                  type,
                  bookingId:
                    hotelBookingData?.data?.generalTab.refId ||
                    experienceBookingData?.data?.generalTab.refId ||
                    flightBookingData?.data?.generalTab.refId,
                  passengers:
                    hotelBookingData?.data?.generalTab?.passengersData ||
                    experienceBookingData?.data?.generalTab?.passengersData ||
                    flightBookingData?.data?.generalTab?.passengersData ||
                    transferBookingData?.data?.generalTab?.passengersData ||
                    airportHotelTransferBookingData?.data?.generalTab?.passengersData,
                }}
                isLoading={isLoading}
                data={
                  hotelBookingData?.data?.invoiceDataTab ||
                  experienceBookingData?.data?.invoiceDataTab ||
                  flightBookingData?.data?.invoiceDataTab ||
                  transferBookingData?.data?.invoiceDataTab ||
                  airportHotelTransferBookingData?.data?.invoiceDataTab
                }
              />
            ),
          },
          {
            key: "Messages",
            label: "Messages",
            children: <></>,
          },
        ]}
      />
    </div>
  );
};

export default Booking;
