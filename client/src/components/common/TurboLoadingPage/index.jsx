import { Flex } from "antd";
import Lottie from "lottie-react";
import React from "react";
import turboLoadingAnimation from "assets/animations/turboLoading.json";
const TurboLoadingPage = ({ height = "calc(100dvh - 60px)", ...props }) => {
  return (
    <Flex align="center" justify="center" style={{ height, width: "100%" }} {...props}>
      <Lottie animationData={turboLoadingAnimation} loop={true} />
    </Flex>
  );
};

export default TurboLoadingPage;
