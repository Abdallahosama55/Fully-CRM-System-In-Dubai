import React from "react";
import SliderView from "views/Slider";
import MetaverseView from "./MetaverseView";
import Tabs from "components/common/Tabs";

const Metaverse = () => {
  return (
    <Tabs
      items={[
        {
          key: "1",
          label: "Metaverse",
          children: <MetaverseView />,
        },
        {
          key: "2",
          label: "Virtual Portal",
          children: <SliderView />,
        },
      ]}
    />
  );
};

export default Metaverse;
