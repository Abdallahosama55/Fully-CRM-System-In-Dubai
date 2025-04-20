import { HistoryOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import PortalDetailsSVG from "assets/jsx-svg/PortalDetailsSVG";
import Navigation from "components/crm-board/Content/Navigation";
import "components/crm-board/Content/styles.css";
import { useInsertionEffect, useRef, useState } from "react";
import MiddleDetails from "./MiddleDetails";

export const LEAD_BOARD_DRAWER_TABS = {
  PORTAL_DETAILS: "Portal Details",
  ACTIVITY: "ACTIVITY",
};

const defaultNavItems = [
  { id: LEAD_BOARD_DRAWER_TABS.PORTAL_DETAILS, icon: PortalDetailsSVG, lable: "Portal Details" },
  { id: LEAD_BOARD_DRAWER_TABS.ACTIVITY, icon: HistoryOutlined, lable: "Activity" },
];

const LeadContent = ({ id, CustomerData, leadId }) => {
  const [activeTab, setActiveTab] = useState(LEAD_BOARD_DRAWER_TABS.PORTAL_DETAILS);
  const navigationRef = useRef(null);
  const contentRef = useRef(null);

  useInsertionEffect(() => {
    if (navigationRef.current) {
      // 24 is the padding bottom of the drawer
      contentRef.current.style.height = `100dvh`;
    }
  }, [navigationRef]);
  return (
    <div className="crm_board_container">
      <div className="navigation_row" ref={navigationRef}>
        <Row>
          <Col span={24}>
            <Navigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              navItemsIn={defaultNavItems}
            />
          </Col>
        </Row>
      </div>
      <Row style={{ height: "100%", marginTop: "11px" }} gutter={8}>
        <Col span={24}>
          <div style={{ paddingLeft: "2px" }} className="crm_board_content" ref={contentRef}>
            <MiddleDetails
              CustomerData={CustomerData}
              customerId={id}
              activeTab={activeTab}
              leadId={leadId}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LeadContent;
