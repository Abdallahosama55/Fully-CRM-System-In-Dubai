import { Button, Flex } from "antd";
import { PlusSVG } from "assets/jsx-svg";
import React from "react";
import { useSliderStore } from "../sliderStore";
const HeaderPage = () => {
  const { addItem, addGroup } = useSliderStore();
  return (
    <Flex gap={4}>
      <Button
        onClick={addGroup}
        size="small"
        style={{
          background: "#3a5ee3",
        }}
        icon={<PlusSVG height={10} width={10}></PlusSVG>}
        type="primary">
        Create group
      </Button>
      <Button
        onClick={addItem}
        size="small"
        icon={<PlusSVG fill="black" height={10} width={10}></PlusSVG>}>
        Create Item
      </Button>
    </Flex>
  );
};
export default HeaderPage;
