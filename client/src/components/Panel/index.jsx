import { DownOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Space, Typography } from "antd";
import { PlusSVG, SearchSVG } from "assets/jsx-svg";
import React, { useState } from "react";
const Panel = ({ title, children, filters, action }) => {
  const [set, setSearchQuery] = useState();
  return (
    <div className="panel-body-content ticketing-desk">
      <Row align="middle" justify="space-between" gutter={[12, 12]}>
        <Col>
          <Typography.Title level={5}>{title}</Typography.Title>
        </Col>
        <Col>
          <Row align="middle" gutter={[16, 16]}>
            {filters && React.cloneElement(filters)}
            {action && <Col>{action}</Col>}
          </Row>
        </Col>
      </Row>
      <section>{children && children}</section>
    </div>
  );
};
export default Panel;
