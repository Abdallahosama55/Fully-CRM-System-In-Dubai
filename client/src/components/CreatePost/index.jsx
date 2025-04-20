import { useState } from "react";
import { Col, Row, Tabs, Typography } from "antd";

import { DimensionsSVG, FeedsSVG, GallerySVG } from "assets/jsx-svg";

import CreateTextPost from "./CreateTextPost";
import CreateDimensionPost from "./CreateDimensionPost";
import CreatePhotoVideoPost from "./CreatePhotoVideoPost";

import "./styles.css";

const CreatePost = ({ setPostsList }) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      key: 1,
      label: "Post",
      icon: <FeedsSVG fill={activeTab !== 1 ? "#aeaeb2" : "#3A5EE3"} />,
      children: <CreateTextPost setPostsList={setPostsList} />,
    },
    {
      key: 2,
      label: " Photos & Videos",
      icon: <GallerySVG width={16} height={16} fill={activeTab !== 2 ? "#aeaeb2" : "#3A5EE3"} />,
      children: <CreatePhotoVideoPost setPostsList={setPostsList} />,
    },
    {
      key: 3,
      label: "Dimension",
      icon: (
        <DimensionsSVG width={16} height={16} color={activeTab !== 3 ? "#aeaeb2" : "#3A5EE3"} />
      ),
      children: <CreateDimensionPost setPostsList={setPostsList} />,
    },
  ];

  return (
    <section className="mb-1 create-post">
      <Row align="middle" className="pl-1 pr-1">
        <Tabs
          defaultActiveKey={1}
          className="w-100"
          activeKey={activeTab}
          onChange={(e) => {
            setActiveTab(e);
          }}
          items={tabs.map((tab) => ({
            key: tab.key,
            label: (
              <Row gutter={[8, 0]} align="middle" wrap={false} style={{ padding: "0 4px" }}>
                <Col>
                  <Row align="middle">{tab.icon}</Row>
                </Col>
                <Col>
                  <Typography.Text className="fz-12 fw-500">{tab.label}</Typography.Text>
                </Col>
              </Row>
            ),
            children: tab.children,
          }))}
        />
      </Row>
    </section>
  );
};

export default CreatePost;
