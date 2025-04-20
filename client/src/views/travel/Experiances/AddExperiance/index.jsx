import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Tabs } from "antd";
import usePageTitle from "hooks/usePageTitle";
import ROUTER_URLS from "constants/ROUTER_URLS";
// TABS
import GeneralInfoTab from "./tabs/GeneralInfoTab";
import AvailabilityTab from "./tabs/AvailabilityTab";
import PricingTab from "./tabs/PricingTab";
import PickUpTab from "./tabs/PickUpTab";
// API
import useUpdateDoneSteps from "services/travel/experiance/ExperianceTab/Mutations/useUpdateDoneSteps";
import useGetDoneSteps from "services/travel/experiance/ExperianceTab/Querys/useGetDoneSteps";
// style
import "./styles.css";

const ADD_EXPERIANCE_TABS_KEY = {
  GENERAL_INFO: "GENERAL_INFO",
  AVAILABILITY: "AVAILABILITY",
  PRICING_AND_POLICIES: "PRICING_AND_POLICIES",
  MEET_AND_PICK_UP: "MEET_AND_PICK_UP",
};

export const STEPS_KEYS = {
  GENERAL: "GENERAL",
  ITINERARY: "ITINERARY",
  MEDIA: "MEDIA",
  INCLUDES_EXCLUDES: "INCLUDES_EXCLUDES",
  INFO: "INFO",
  TYPE: "TYPE",
  AVAILABILITY_TYPE: "AVAILABILITY_TYPE",
  TIME_AND_DATE_RANGE: "TIME_AND_DATE_RANGE",
  CAPACITY: "CAPACITY",
  MINIMUM_NOTICE: "MINIMUM_NOTICE",
  PRICING_RATES: "PRICING_RATES",
  CANCELLATIONS_POLICIES: "CANCELLATIONS_POLICIES",
  CONTACT_INFO: "CONTACT_INFO",
  PICK_UP_TYPE: "PICK_UP_TYPE",
  MEETING_POINTS: "MEETING_POINTS",
  PICK_UP_SERVICE: "PICK_UP_SERVICE",
  PICK_UP_TIMING: "PICK_UP_TIMING",
  DROP_OFF_SERVICE: "DROP_OFF_SERVICE",
};

const AddExperiance = () => {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  usePageTitle(!editId ? "Add Experiance" : "Edit Experiance", editId);
  // The main tabs (top tabs )
  const [activeTabIndex, setActiveTabIndex] = useState(ADD_EXPERIANCE_TABS_KEY.GENERAL_INFO);
  const [doneSteps, setDoneSteps] = useState([]);
  const [id, setId] = useState(editId);
  useGetDoneSteps(id, {
    enabled: !!id,
    onSuccess: (data) => {
      if (Array.isArray(data)) {
        setDoneSteps(data);
      }
    },
    onError: (error) => console.log(error?.message),
  });

  const doneStepsMutation = useUpdateDoneSteps(id, {
    onError: (error) => console.log(error?.message),
  });

  const updateDoneSteps = (stepKey) => {
    setDoneSteps((prev) => [...new Set([...prev, stepKey])]);
    doneStepsMutation.mutate([...new Set([...doneSteps, stepKey])]);
  };

  const tabItems = [
    {
      key: ADD_EXPERIANCE_TABS_KEY.GENERAL_INFO,
      label: "General Info",
      children: (
        <div className="experiance_tabs">
          <GeneralInfoTab
            id={id}
            doneSteps={doneSteps}
            updateDoneSteps={updateDoneSteps}
            onNextTab={() => setActiveTabIndex(ADD_EXPERIANCE_TABS_KEY.AVAILABILITY)}
            onPrevTab={() => navigate(ROUTER_URLS.TRAVEL.EXPERIANCES)}
            setId={setId}
          />
        </div>
      ),
    },
    {
      key: ADD_EXPERIANCE_TABS_KEY.AVAILABILITY,
      label: "Availability",
      disabled: !id,
      children: (
        <div className="experiance_tabs">
          <AvailabilityTab
            doneSteps={doneSteps}
            updateDoneSteps={updateDoneSteps}
            id={id}
            onNextTab={() => setActiveTabIndex(ADD_EXPERIANCE_TABS_KEY.PRICING_AND_POLICIES)}
            onPrevTab={() => setActiveTabIndex(ADD_EXPERIANCE_TABS_KEY.GENERAL_INFO)}
          />
        </div>
      ),
    },
    {
      key: ADD_EXPERIANCE_TABS_KEY.PRICING_AND_POLICIES,
      label: "Pricing & Policies",
      disabled: !id,
      children: (
        <div className="experiance_tabs">
          <PricingTab
            doneSteps={doneSteps}
            updateDoneSteps={updateDoneSteps}
            id={id}
            onNextTab={() => setActiveTabIndex(ADD_EXPERIANCE_TABS_KEY.MEET_AND_PICK_UP)}
            onPrevTab={() => setActiveTabIndex(ADD_EXPERIANCE_TABS_KEY.AVAILABILITY)}
          />
        </div>
      ),
    },
    {
      key: ADD_EXPERIANCE_TABS_KEY.MEET_AND_PICK_UP,
      label: "Meet & Pick Up",
      disabled: !id,
      children: (
        <div className="experiance_tabs">
          <PickUpTab
            id={id}
            doneSteps={doneSteps}
            updateDoneSteps={updateDoneSteps}
            onNextTab={() => navigate(ROUTER_URLS.TRAVEL.EXPERIANCES)}
            onPrevTab={() => setActiveTabIndex(ADD_EXPERIANCE_TABS_KEY.PRICING_AND_POLICIES)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="new_experiance">
      <Flex vertical className="h-100 new_experiance_page">
        <Tabs
          destroyInactiveTabPane={true}
          className="add_experiance_tabs experiance_tabs"
          items={tabItems}
          activeKey={activeTabIndex}
          onChange={(key) => setActiveTabIndex(key)}
        />
        <Flex align="center" gap={8} justify="space-between" className="move_btns">
          <Button htmlType="input" form="form_previous">
            Previous
          </Button>
          <Button type={"primary"} htmlType="input" form="form_inside_tab">
            Save & Next
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default AddExperiance;
