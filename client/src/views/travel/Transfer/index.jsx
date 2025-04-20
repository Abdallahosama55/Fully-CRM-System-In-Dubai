import React from "react";
import { Tabs } from "antd";
import VehicleTab from "./Tabs/VehicleTab";
import TransferersLocationsTab from "./Tabs/TransferersLocationsTab";

import usePageTitle from "hooks/usePageTitle";
import useSearchState from "hooks/useSearchState";

const Transfer = () => {
  usePageTitle("Transfer");
  const [activeTab, setActiveTab] = useSearchState("activeTab", "Tour");
  const items = [
    {
      label: "Transferer Locations",
      key: "TransferersLocations",
      children: <TransferersLocationsTab />,
    },
    {
      label: "Vehicle",
      key: "Vehicle",
      children: <VehicleTab />,
    },
  ];
  return <Tabs defaultActiveKey={activeTab} items={items} onChange={setActiveTab} />;
};

export default Transfer;
