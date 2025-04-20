import { useInsertionEffect, useRef, useState } from "react";
import { Col, Row } from "antd";
import MiddleDetails from "./MiddleDetails";
import Navigation from "components/crm-board/Content/Navigation/index";
// style
import "components/crm-board/Content/styles.css";
import PortalDetailsSVG from "assets/jsx-svg/PortalDetailsSVG";
import InvoicesSVG from "assets/jsx-svg/InvoicesSVG";
import PropertiesSVG from "assets/jsx-svg/PropertiesSVG";
import { HistoryOutlined } from "@ant-design/icons";

export const CRM_BOARD_DRAWER_TABS = {
  Portal_details: "Insights",
  // Properties: "Properties",
  Attachments: "Attachments",
  Invoices: "Invoices",
  CALLS: "CALLS",
  MEETINGS: "MEETINGS",
  WEB_ACTIVISTES: "WEB_ACTIVISTES",
  METAVERSE_ACTIVISTES: "METAVERSE_ACTIVISTES",
  CARTS: `CARTS`,
  PURCHASES: `PURCHASES`,
  ACTIVITY: "ACTIVITY",
};
const defaultNavItems = [
  { id: CRM_BOARD_DRAWER_TABS.Portal_details, icon: PortalDetailsSVG, lable: "Insights" },
  { id: CRM_BOARD_DRAWER_TABS.ACTIVITY, icon: HistoryOutlined, lable: "Activity" },
  // { id: CRM_BOARD_DRAWER_TABS.Properties, icon: PropertiesSVG, lable: "Properties" },
  { id: CRM_BOARD_DRAWER_TABS.Invoices, icon: InvoicesSVG, lable: "Invoices" },
  { id: CRM_BOARD_DRAWER_TABS.Attachments, icon: PropertiesSVG, lable: "Attachments" },

  // { id: CRM_BOARD_DRAWER_TABS.EMAILS, icon: EmailsSVG, lable: "Emails" },
];
// const defaultNavItems = [
//     {
//       id: 1,
//       title: "Portal details",
//       icon: <UserSolidSVG height="100%" />,
//       isSelected: true,
//     },
//     {
//       id: 2,
//       title: "Properties",
//       icon: <UserSolidSVG height="100%" />,
//       isSelected: false,
//     },
//     {
//       id: 3,
//       title: "Meetings",
//       icon: <UserSolidSVG height="100%" />,
//       isSelected: false,
//     },
//     {
//       id: 4,
//       title: "Contracts",
//       icon: <UserSolidSVG height="100%" />,
//       isSelected: false,
//     },
//   ];
const Content = ({ hasAttachement = false, id, CustomerData, handleBack, isSelectedLead }) => {
  const [activeTab, setActiveTab] = useState(CRM_BOARD_DRAWER_TABS.Portal_details);
  const navigationRef = useRef(null);
  const contentRef = useRef(null);
  const questionsRef = useRef(null);

  useInsertionEffect(() => {
    if (navigationRef.current) {
      const navigationBottom = navigationRef.current.getBoundingClientRect().bottom;
      // 24 is the padding bottom of the drawer
      contentRef.current.style.height = `100dvh`;
      // questionsRef.current.style.height = `calc(100dvh - ${navigationBottom + 24}px)`;
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
              navItemsIn={
                isSelectedLead ? [defaultNavItems[0], defaultNavItems[1]] : defaultNavItems
              }
            />
          </Col>
        </Row>
      </div>

      <Row style={{ height: "100%", marginTop: "11px" }} gutter={8}>
        <Col span={24}>
          <div style={{ paddingLeft: "2px" }} className="crm_board_content" ref={contentRef}>
            <MiddleDetails CustomerData={CustomerData} customerId={id} activeTab={activeTab} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Content;
