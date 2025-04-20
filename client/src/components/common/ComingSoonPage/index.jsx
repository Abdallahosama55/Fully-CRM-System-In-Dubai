import { Flex } from "antd";
import Lottie from "lottie-react";
import React from "react";
import comingSoonAnimation from "assets/animations/coming_soon.json";

const ComingSoonPage = ({ height = "calc(100dvh - 60px)", animationSize = 300, ...props }) => {
  return (
    <Flex align="center" justify="center" style={{ height, width: "100%" }} {...props}>
      <Lottie
        animationData={comingSoonAnimation}
        loop={true}
        style={{ width: animationSize, height: animationSize }}
      />
    </Flex>
  );
};

export default ComingSoonPage;
