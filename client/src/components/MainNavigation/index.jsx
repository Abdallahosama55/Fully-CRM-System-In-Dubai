import { useEffect, useMemo, useState } from "react";
import { Col, Dropdown, Flex, Row, Tabs, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  desksItems,
  employeeItems,
  metaverseItems,
  webBuilerItems,
  marketingItems,
  CRMItems,
  inventoryItems,
  collaborationItems,
  dataManagement,
  eventsItems,
} from "./PagesNavigationItems";
import { DownSvg } from "assets/jsx-svg";

import "./styles.css";
const initTopData = (feature) => {
  switch (feature) {
    case "employee":
      return employeeItems;

    case "desks":
      return desksItems;

    case "metaverse":
      return metaverseItems;
    case "data-management":
      return dataManagement;
    case "slider":
      return metaverseItems;

    // case "integrations":
    //   return(integrationsItems);
    //
    case "web-builder":
      return webBuilerItems;

    case "marketing":
      return marketingItems;

    case "CRM":
      return CRMItems;

    case "inventory":
      return inventoryItems;

    case "collaboration":
      return collaborationItems;

    case "events":
      return eventsItems;

    default:
      return [];
  }
};
export default function MainNavigation(props) {
  const { domainName } = props;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const navItems = useMemo(() => {
    return initTopData(domainName);
  }, [domainName]);

  useEffect(() => {
    navItems?.forEach((item) => {
      if (location.pathname.includes(item.active)) {
        setActiveTab(item.id);
      }
    });
  }, [location.pathname, navItems]);

  if (navItems.length === 0) {
    return;
  }

  console.log("navItems", navItems);
  return (
    <Tabs
      activeKey={activeTab}
      className="main-navigation"
      onChange={(key) => {
        const temp = navItems.find((el) => el?.id === key);
        setActiveTab(key);
        if (temp?.items?.length === 0) {
          navigate(temp?.active);
        }
      }}
      items={navItems?.map((item) => {
        return {
          key: item.id,
          children: <></>,
          label:
            item?.items?.length > 0 ? (
              <Dropdown overlayStyle={{ minWidth: "150px" }} menu={{ items: item.items }}>
                <Flex gap={8} wrap={false} align="center" style={{ padding: "6px 12px" }}>
                  <Col>
                    <Typography.Text className="fw-500" ellipsis>
                      {item.label}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <DownSvg color={activeTab === item.id ? "#FFF" : "#000"} />
                  </Col>
                </Flex>
              </Dropdown>
            ) : (
              <Typography.Text className="fw-500" ellipsis style={{ padding: "6px 12px" }}>
                {item.label}
              </Typography.Text>
            ),
        };
      })}
    />
  );
}

MainNavigation.propTypes = {
  domainName: PropTypes.oneOf([
    "desks",
    "employee",
    "metaverse",
    "slider",
    "events",
    "web-builder",
    "marketing",
    "CRM",
    "inventory",
    "data-management",
  ]),
};
