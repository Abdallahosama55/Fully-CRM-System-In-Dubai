import { useEffect, useMemo, useState } from "react";
// style
import "./styles.css";
import BookingTabs from "../components/Tabs";
import HotlesTab from "./HotlesTab";
import ExperiencesTab from "./ExperiencesTab";
import {
  AskGenieSVG,
  BedSVG3,
  ExperiencesSVG,
  PackagesSVG,
  PlaneSVG,
  TransferSVG,
} from "assets/jsx-svg";
import RentalTab from "./RentalTab";
import { useLocation, useNavigate } from "react-router-dom";
import FlightsTab from "./FlightsTab";
import PackagesTab from "./PackagesTab";
import TransfersTab from "./TransfersTab";
import useListAgentSuppliers from "services/pricingModule/Queries/useListAgentSuppliers";
import { Button, Empty, Flex } from "antd";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";
import ROUTER_URLS from "constants/ROUTER_URLS";
import useSessionStorage from "hooks/useSessionStorage";
import { MEETING_PARTICIPANTS_STORAGE_KEY } from "constants/MEETING_PARTICIPANTS_STORAGE_KEY";
import isValidJson from "utils/isValidJson";
import TurboLoadingPage from "components/common/TurboLoadingPage";
import AskGenieTab from "./AskGenieTab";
import CharterTab from "./CharterTab";
const INVENTORY_TYPES = {
  HOTELS: "HOTELS",
  EXPERIENCES: "EXPERIENCES",
  AIRPORT_HOTEL_TRANSFERS: "AIRPORT_HOTEL_TRANSFERS",
  TRANSFERS: "TRANSFERS",
  FLIGHTS: "FLIGHTS",
  CHARTER: "CHARTER",
  PACKAGES: "PACKAGES",
};
const OnlineBooking = () => {
  const agentSubbliers = useListAgentSuppliers();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const isDMC = useMemo(() => {
    return user?.officerType === OFFICER_TYPES.DMC;
  }, [user]);

  const [tab, setTab] = useState(user?.displayLocalVoucher ? "ASK_GENIE" : INVENTORY_TYPES.FLIGHTS);

  const [tabContent, setTabContent] = useState(<></>);
  const location = useLocation();

  // Use URLSearchParams to parse the query string
  const queryParams = new URLSearchParams(location.search);
  const isLocalBook =
    Boolean(queryParams.get("isLocalBook")) && queryParams.get("isLocalBook") === "true";

  const [participants, setParticipants] = useSessionStorage(MEETING_PARTICIPANTS_STORAGE_KEY, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const participantsString = queryParams.get("participants");

    if (isValidJson(participantsString)) {
      setParticipants(JSON.parse(decodeURIComponent(participantsString)));
    }
  }, [location]);

  const handleSetTab = (data) => {
    setTabContent(null);
    setTab(data);
  };

  const tabsItems = useMemo(() => {
    let temp = [
      {
        label: `Flights`,
        key: INVENTORY_TYPES.FLIGHTS,
        children: (
          <FlightsTab
            isLocalBook={isLocalBook}
            setTabContent={setTabContent}
            participants={participants}
          />
        ),
        icon: <PlaneSVG fill={"#FFF"} />,
      },
      {
        label: `Charter`,
        key: INVENTORY_TYPES.CHARTER,
        children: <CharterTab setTabContent={setTabContent} participants={participants} />,
        icon: <PlaneSVG fill={"#FFF"} />,
      },
      {
        label: `Hotels`,
        key: INVENTORY_TYPES.HOTELS,
        children: (
          <HotlesTab
            isLocalBook={isLocalBook}
            setTabContent={setTabContent}
            participants={participants}
          />
        ),
        icon: <BedSVG3 fill={"#FFF"} />,
      },
      {
        label: `Rental`,
        key: INVENTORY_TYPES.TRANSFERS,
        children: (
          <RentalTab
            isLocalBook={isLocalBook}
            setTabContent={setTabContent}
            participants={participants}
          />
        ),
        icon: <TransferSVG fill={"#FFF"} />,
      },
      {
        label: `Experiences`,
        key: INVENTORY_TYPES.EXPERIENCES,
        children: (
          <ExperiencesTab
            isLocalBook={isLocalBook}
            setTabContent={setTabContent}
            participants={participants}
          />
        ),
        icon: <ExperiencesSVG fill={"#FFF"} />,
      },
      {
        label: `Packages`,
        key: INVENTORY_TYPES.PACKAGES,
        children: (
          <PackagesTab
            isLocalBook={isLocalBook}
            setTabContent={setTabContent}
            participants={participants}
          />
        ),
        icon: <PackagesSVG color={"#FFF"} />,
      },
      {
        label: `Transfer`,
        key: INVENTORY_TYPES.AIRPORT_HOTEL_TRANSFERS,
        children: (
          <TransfersTab
            isLocalBook={isLocalBook}
            setTabContent={setTabContent}
            participants={participants}
          />
        ),
        icon: <TransferSVG fill={"#FFF"} />,
      },
    ];

    // Filter out tabs based on agent suppliers
    temp = temp.filter((el) =>
      agentSubbliers?.data?.find((temp) => temp?.inventoryType === el?.key),
    );

    if (user?.displayLocalVoucher) {
      temp.unshift({
        label: `Ask Genie`,
        key: "ASK_GENIE",
        children: <AskGenieTab setTabContent={setTabContent} participants={participants} />,
        icon: <AskGenieSVG />,
      });
    }

    setTab(
      agentSubbliers?.data?.[0]?.inventoryType ? agentSubbliers?.data?.[0]?.inventoryType : tab,
    );
    return temp;
  }, [agentSubbliers?.data]);

  if (agentSubbliers?.isLoading) {
    return <TurboLoadingPage height="calc(100dvh - 60px)" />;
  }

  return (
    <div className="layout_no_padding">
      {agentSubbliers?.data?.length === 0 ? (
        <>
          <Flex style={{ height: "calc(100dvh - 78px)" }} align="center" justify="center">
            <Empty
              image={empty_booking_screen}
              description={
                <div>
                  <p>You don't have any active supplier</p>
                  {isDMC && (
                    <p>
                      Add suppliers into your pricing model
                      <Button
                        onClick={() => navigate(ROUTER_URLS.FINANCE.ACCOUNTING.PRICING_MODULE)}
                        type="text"
                        size="small"
                        style={{ color: "var(--font-link)" }}>
                        by clicking here
                      </Button>
                    </p>
                  )}
                </div>
              }
            />
          </Flex>
        </>
      ) : (
        <>
          <BookingTabs onChange={handleSetTab} items={tabsItems} tab={tab} />
          <div className="results">{tabContent}</div>
        </>
      )}
    </div>
  );
};

export default OnlineBooking;
