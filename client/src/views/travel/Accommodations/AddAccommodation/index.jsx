import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Flex, Tabs } from "antd";
// steps
import GeneralInfo from "./Steps/GeneralInfo";
import Media from "./Steps/Media";
import FacilitiesAndServices from "./Steps/FacilitiesAndServices";
import Rate from "./Steps/Rate";
import Availability from "./Steps/Availability";
import Rooms from "./Steps/Rooms";
// style
import "./styles.css";
// hooks
import usePageTitle from "hooks/usePageTitle";
import useSearchState from "hooks/useSearchState";
import ROUTER_URLS from "constants/ROUTER_URLS";

const ADD_ACCOMMODATION_TABS_KEY = {
  GENERAL_INFO: 0,
  MEDIA: 1,
  FACILITIES_AND_SERVICES: 2,
  ROOMS: 3,
  RATE: 4,
  AVAILABILITY: 5,
};

const AddAccommodation = () => {
  const { id: idFromPath } = useParams();
  const { state: autoCompleateData } = useLocation();
  // set the new page title
  usePageTitle(!idFromPath ? "Add Accommodation" : "Edit Accommodation", idFromPath);
  const navigate = useNavigate();
  const [id, setId] = useState(idFromPath);
  const [activeTab, setActiveTab] = useState(0);

  const handlePrev = () => {
    setActiveTab((prev) => {
      if (prev - 1 === -1) {
        // TODO: NAVIGATE BACK FROM WHERE YOU COME
        navigate(-1);
      }

      return prev - 1 >= 0 ? prev - 1 : prev;
    });
  };

  const tabItems = [
    {
      key: ADD_ACCOMMODATION_TABS_KEY.GENERAL_INFO.toString(),
      label: "General Info",
      children: (
        <GeneralInfo
          id={id}
          autoCompleateData={autoCompleateData}
          next={() => setActiveTab(ADD_ACCOMMODATION_TABS_KEY.MEDIA)}
          setId={setId}
        />
      ),
    },
    {
      key: ADD_ACCOMMODATION_TABS_KEY.MEDIA.toString(),
      label: "Media",
      disabled: !id,
      children: (
        <Media
          id={id}
          autoCompleateData={autoCompleateData}
          next={() => setActiveTab(ADD_ACCOMMODATION_TABS_KEY.FACILITIES_AND_SERVICES)}
        />
      ),
    },
    {
      key: ADD_ACCOMMODATION_TABS_KEY.FACILITIES_AND_SERVICES.toString(),
      label: "Facilities and Services",
      disabled: !id,
      children: (
        <FacilitiesAndServices
          id={id}
          next={() => setActiveTab(ADD_ACCOMMODATION_TABS_KEY.ROOMS)}
        />
      ),
    },
    {
      key: ADD_ACCOMMODATION_TABS_KEY.ROOMS.toString(),
      label: "Rooms info",
      disabled: !id,
      children: <Rooms id={id} next={() => setActiveTab(ADD_ACCOMMODATION_TABS_KEY.RATE)} />,
    },
    {
      key: ADD_ACCOMMODATION_TABS_KEY.RATE.toString(),
      label: "Rate",
      disabled: !id,
      children: <Rate id={id} next={() => setActiveTab(ADD_ACCOMMODATION_TABS_KEY.AVAILABILITY)} />,
    },
    {
      key: ADD_ACCOMMODATION_TABS_KEY.AVAILABILITY.toString(),
      label: "Availability",
      disabled: !id,
      children: (
        <Availability id={id} next={() => setActiveTab(ADD_ACCOMMODATION_TABS_KEY.AVAILABILITY)} />
      ),
    },
  ];

  return (
    <div className="add_accommodation_page">
      <Tabs
        className="add_accommodation_tabs"
        activeKey={activeTab.toString()}
        destroyInactiveTabPane={true}
        onChange={(key) => setActiveTab(Number(key))}
        items={tabItems}
      />
      <Flex align="center" justify="space-between" className="add_accommodation_move_btns">
        <Col flex={1}>
          <Button type={"default"} onClick={handlePrev}>
            Previous
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            form="form_inside_tab"
            htmlType="submit"
            onClick={() => {
              if (activeTab === ADD_ACCOMMODATION_TABS_KEY.AVAILABILITY) {
                navigate(ROUTER_URLS.TRAVEL.ACCOMMODATION.HOME);
              }
            }}>
            {activeTab === ADD_ACCOMMODATION_TABS_KEY.AVAILABILITY
              ? "Save & Finish"
              : "Save & Next"}
          </Button>
        </Col>
      </Flex>
    </div>
  );
};

export default AddAccommodation;
