import LoadingPage from "components/common/LoadingPage";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Lazy load the tabs
const BasicTab = lazy(() => import("./Tabs/BasicTab"));
const ItineraryTab = lazy(() => import("./Tabs/ItineraryTab"));
const EngagementTab = lazy(() => import("./Tabs/EngagementTab"));
const DescriptionTab = lazy(() => import("./Tabs/DescriptionTab"));
const PricingTab = lazy(() => import("./Tabs/PricingTab"));
const DepartureTab = lazy(() => import("./Tabs/DepartureTab"));
const PassengersTab = lazy(() => import("./Tabs/PassengersTab"));
const ReviewTab = lazy(() => import("./Tabs/ReviewTab"));

// style
import "./styles.css";
import { Tabs } from "antd";
import { PACKAGE_OFFERED_TYPES } from "constants/PACKAGE_TYPES";
import useSearchState from "hooks/useSearchState";

// keys for tabs
export const ADD_PACKAGES_TABS_KEYS = {
  BASIC: "BASIC",
  ITINERARY: "ITINERARY",
  ENGAGEMENT: "ENGAGEMENT",
  DESCRIPTION: "DESCRIPTION",
  PRICING: "PRICING",
  DEPARTURE: "DEPARTURE",
  PASSENGERS: "PASSENGERS",
  REVIEW: "REVIEW",
};
const AddPackage = () => {
  const { id: packageId } = useParams();
  const [activeTab, setActiveTab] = useSearchState("activeTab", ADD_PACKAGES_TABS_KEYS?.BASIC);
  const [id, setId] = useState();
  const [packageType, setPackageType] = useState();
  useEffect(() => {
    setId(packageId);
  }, [packageId]);

  return (
    <div className="package_add_page">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        destroyInactiveTabPane={true}
        items={[
          {
            key: ADD_PACKAGES_TABS_KEYS.BASIC,
            label: "Basic",
            children: (
              <Suspense fallback={<LoadingPage />}>
                <BasicTab
                  id={id}
                  packageType={packageType}
                  setPackageType={setPackageType}
                  setId={setId}
                  setActiveTab={setActiveTab}
                />
              </Suspense>
            ),
          },
          {
            key: ADD_PACKAGES_TABS_KEYS.ITINERARY,
            label: "Itinerary",
            disabled: !id,
            children: (
              <Suspense fallback={<LoadingPage />}>
                <ItineraryTab id={id} packageType={packageType} setActiveTab={setActiveTab} />
              </Suspense>
            ),
          },
          {
            key: ADD_PACKAGES_TABS_KEYS.ENGAGEMENT,
            label: "Engagement",
            disabled: !id,
            children: (
              <Suspense fallback={<LoadingPage />}>
                <EngagementTab id={id} packageType={packageType} setActiveTab={setActiveTab} />
              </Suspense>
            ),
          },
          {
            key: ADD_PACKAGES_TABS_KEYS.DESCRIPTION,
            label: "Description",
            disabled: !id,
            children: (
              <Suspense fallback={<LoadingPage />}>
                <DescriptionTab id={id} packageType={packageType} setActiveTab={setActiveTab} />
              </Suspense>
            ),
          },
          {
            key: ADD_PACKAGES_TABS_KEYS.PRICING,
            label: "Pricing",
            disabled: !id,
            children: (
              <Suspense fallback={<LoadingPage />}>
                <PricingTab id={id} packageType={packageType} setActiveTab={setActiveTab} />
              </Suspense>
            ),
          },
          packageType === PACKAGE_OFFERED_TYPES.RECURRING_TRIP && {
            key: ADD_PACKAGES_TABS_KEYS.DEPARTURE,
            label: "Departure",
            disabled: !id,
            children: (
              <Suspense fallback={<LoadingPage />}>
                <DepartureTab id={id} packageType={packageType} setActiveTab={setActiveTab} />
              </Suspense>
            ),
          },
          {
            key: ADD_PACKAGES_TABS_KEYS.PASSENGERS,
            label: "Passengers",
            disabled: !id,
            children: (
              <Suspense fallback={<LoadingPage />}>
                <PassengersTab id={id} packageType={packageType} setActiveTab={setActiveTab} />
              </Suspense>
            ),
          },
          {
            key: ADD_PACKAGES_TABS_KEYS.REVIEW,
            label: "Review",
            disabled: !id,
            children: (
              <Suspense fallback={<LoadingPage />}>
                <ReviewTab id={id} packageType={packageType} setActiveTab={setActiveTab} />
              </Suspense>
            ),
          },
        ].filter(Boolean)}
      />
    </div>
  );
};

export default AddPackage;
