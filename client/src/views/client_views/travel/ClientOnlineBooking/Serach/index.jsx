import { message } from "antd";
import { useEffect, useMemo, useState } from "react";
// style
import "./styles.css";
import dayjs from "dayjs";
import BookingTabs from "../components/Tabs";
import FlightsFilters from "./FlightsFilters";
import { fetchFlights } from "services/travel/charters/Queries/useGetSearchCharter";
import FlightList from "../components/FlightList";
import LoadingPage from "components/common/LoadingPage";
import HotlesTab from "./HotlesTab";
import ExperiencesTab from "./ExperiencesTab";
import { BedSVG3, ExperiencesSVG, PlaneSVG, TransferSVG } from "assets/jsx-svg";
import usePageTitle from "hooks/usePageTitle";
import TransfersTab from "./TransfersTab";
import { useLocation } from "react-router-dom";
export const ONLINE_BOOKING_TABS_KEYS = {
  FLIGHTS: "FLIGHTS",
  HOTELS: "HOTELS",
  EXPERIENCES: "EXPERIENCES",
  TRANSFER: "TRANSFER",
};

const ClientOnlineBooking = () => {
  usePageTitle("Booking Engine");
  const location = useLocation();
  const dataFromBookingWidget = location.state?.data; // Retrieve the data from the state
  const [tab, setTab] = useState(
    dataFromBookingWidget?.activeTab || ONLINE_BOOKING_TABS_KEYS.HOTELS,
  );
  const [isLoading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [tabContent, setTabContent] = useState(<></>);

  const isInIframe = useMemo(() => window.self !== window.top, []);

  const handleSearchFlights = async (data) => {
    setLoading(true);
    await fetchFlights({
      type: data.type,
      fromAirportId: data.fromAirportId,
      toAirportId: data.toAirportId,
      fromDate: dayjs(data.rangeDate[0]).format("YYYY-MM-DD"),
      toDate: dayjs(data.rangeDate[1]).format("YYYY-MM-DD"),
    })
      .then((data) => {
        if ((data.data.data || []).length === 0) {
          message.error("No results much your search");
        }
        setFlights(data.data.data);
      })
      .catch((error) => {
        message.error("There are error " + error);
      })
      .finally(() => setLoading(false));
  };

  const handleSetTab = (data) => {
    setFlights([]);
    setTabContent(null);
    setTab(data);
  };

  console.log({ isInIframe });
  return (
    <div>
      <BookingTabs
        onChange={handleSetTab}
        items={[
          // {
          //   label: `Flights`,
          //   key: ONLINE_BOOKING_TABS_KEYS.FLIGHTS,
          //   children: <FlightsFilters onSubmitSearchFlight={handleSearchFlights} />,
          //   icon: <PlaneSVG fill={"#FFF"} />
          // },
          {
            label: `Hotels`,
            key: ONLINE_BOOKING_TABS_KEYS.HOTELS,
            children: (
              <HotlesTab
                isInIframe={isInIframe}
                dataFromBookingWidget={dataFromBookingWidget}
                setTabContent={setTabContent}
              />
            ),
            icon: <BedSVG3 fill={"#FFF"} />,
          },
          {
            label: `Transfer`,
            key: ONLINE_BOOKING_TABS_KEYS.TRANSFER,
            children: (
              <TransfersTab
                setTabContent={setTabContent}
                isInIframe={isInIframe}
                dataFromBookingWidget={dataFromBookingWidget}
              />
            ),
            icon: <TransferSVG fill={"#FFF"} />,
          },
          {
            label: `Experiences`,
            key: ONLINE_BOOKING_TABS_KEYS.EXPERIENCES,
            children: (
              <ExperiencesTab
                setTabContent={setTabContent}
                isInIframe={isInIframe}
                dataFromBookingWidget={dataFromBookingWidget}
              />
            ),
            icon: <ExperiencesSVG fill={"#FFF"} />,
          },
        ]}
        tab={tab}
      />
      {!isInIframe && (
        <>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <div className="results">
              {tab === ONLINE_BOOKING_TABS_KEYS.FLIGHTS && <FlightList data={flights} />}
              {tabContent}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientOnlineBooking;
