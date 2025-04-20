import { useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import MiddleDetails from "./middle-details";
import AttachmentsAndQuestions from "./AttachmentsAndQuestions";
import Navigation from "./Navigation";
// style
import "./styles.css";

export const CRM_BOARD_DRAWER_TABS = {
  TASKS: "TASKS",
  NOTES: "NOTES",
  EMAILS: "EMAILS",
  CALLS: "CALLS",
  MEETINGS: "MEETINGS",
  PROPERTIES: "Properties",
  WEB_ACTIVISTES: "WEB_ACTIVISTES",
  METAVERSE_ACTIVISTES: "METAVERSE_ACTIVISTES",
  CARTS: `CARTS`,
  PURCHASES: `PURCHASES`,
};

const Content = () => {
  const [activeTab, setActiveTab] = useState(CRM_BOARD_DRAWER_TABS.TASKS);
  const navigationRef = useRef(null);
  const contentRef = useRef(null);
  const questionsRef = useRef(null);

  useEffect(() => {
    const navigationBottom = navigationRef.current.getBoundingClientRect().bottom;
    // 24 is the padding bottom of the drawer
    contentRef.current.style.height = `calc(100dvh - ${navigationBottom + 24}px)`;
    questionsRef.current.style.height = `calc(100dvh - ${navigationBottom + 24}px)`;
  }, []);
  return (
    <div className="crm_board_container">
      <div className="navigation_row" ref={navigationRef}>
        <Row>
          <Col span={24}>
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>
        </Row>
      </div>
      <Row style={{ height: "100%" }} gutter={8}>
        <Col span={15}>
          <div className="crm_board_content" ref={contentRef}>
            <MiddleDetails activeTab={activeTab} />
          </div>
        </Col>
        <Col span={9}>
          <div className="crm_board_content" ref={questionsRef}>
            <AttachmentsAndQuestions />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Content;
