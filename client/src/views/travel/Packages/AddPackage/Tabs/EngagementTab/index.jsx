import React, { useCallback, useEffect, useRef, useState } from "react";

// style
import "./styles.css";
import Section from "components/common/Section";
import { Button, Space } from "antd";
import { PluseSVG } from "assets/jsx-svg";
import EngagementsSection from "./components/EngagementsSection";
import { useToggle } from "hooks/useToggle";
import AddNewTemplateModal from "./components/AddNewTemplateModal";
import useGetItineraryDays from "services/travel/packages/itinerary/Queries/useGetItineraryDays";
import { ADD_PACKAGES_TABS_KEYS } from "../..";
export const ADD_ITEM_FROM_LIBRARY_MOVING_EVENT = "ADD_ITEM_FROM_LIBRARY_MOVING_EVENT";

const EngagementTab = ({ id: tripId , setActiveTab }) => {
  const [days, setDays] = useState([]);
  const containerRef = useRef();
  const [height, setHeight] = useState("auto");
  const [isNewTemplateOpen, toggleNewTemplateOpen] = useToggle();
  const daysQuery = useGetItineraryDays(tripId);

  useEffect(() => {
    if (daysQuery?.data?.result) {
      setDays(
        daysQuery?.data?.result
          ?.sort((a, b) => a?.dayNumber - b?.dayNumber)
          .map((day) => {
            return {
              ...day,
              messages: day?.items?.map((item) => {
                return {
                  ...item,
                };
              }),
            };
          }),
      );
    }
  }, [daysQuery?.data?.result]);

  const updateHeight = useCallback(() => {
    if (containerRef.current) {
      const windowHeight = window.innerHeight;
      const topOffset = containerRef.current.getBoundingClientRect().top;
      setHeight(windowHeight - topOffset);
    }
  }, [containerRef]);

  useEffect(() => {
    if (containerRef.current) {
      updateHeight();
      window.addEventListener("resize", updateHeight);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="package_engagement_tab" ref={containerRef} style={{ minHeight: `${height}px` }}>
      <AddNewTemplateModal isOpen={isNewTemplateOpen} close={toggleNewTemplateOpen} />
      <Section
        title={"Engagements"}
        padding={"16px"}
        className="package_engagement_section"
        headerEnd={
          <Space>
            <Button
              icon={<PluseSVG color={"#006CE3"} />}
              style={{ color: "#006CE3" }}
              onClick={toggleNewTemplateOpen}>
              New template
            </Button>
            <Button type="primary" onClick={() => setActiveTab(ADD_PACKAGES_TABS_KEYS?.DESCRIPTION)}>Save & Next</Button>
          </Space>
        }>
        <EngagementsSection isLoading={false} setDays={setDays} days={days} tripId={tripId} />
      </Section>
    </div>
  );
};

export default EngagementTab;
