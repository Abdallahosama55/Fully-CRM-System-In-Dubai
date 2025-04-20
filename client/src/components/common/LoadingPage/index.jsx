import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Col,  Row } from "antd";


import Logo from "../Logo";
const LoadingPage = () => {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#fff" }} className="center-items">
      <Row gutter={[0, 30]}>
        <Col xs={24}>
          <Row justify={"center"}>
            <Logo />
          </Row>
        </Col>
        <Col xs={24}>
          <Row justify={"center"}>
            <LoadingOutlined />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LoadingPage;
