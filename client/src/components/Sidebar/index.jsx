import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, Divider, Image, Menu, Row, Segmented, Typography } from "antd";
import Sider from "antd/es/layout/Sider";

import {
  BookingEngineSVG,
  BurgerMenuSVG,
  CloseSVG,
  HelpDesk2SVG,
  MainSVG,
  MeetingSVG,
  SwitchSVG,
} from "assets/jsx-svg";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import { useSidebar } from "layout/MainLayout_OLD/SidebarProvider";
import { useUserContext } from "context/userContext";

import COMPANY_APPS_NAMES from "constants/COMPANY_APPS_NAMES";
import ROUTER_URLS from "constants/ROUTER_URLS";
import "./styles.css";
import Logo from "components/common/Logo";
import { useDrawer } from "hooks/useDrawer";
import OFFICER_TYPES from "constants/OFFICER_TYPES";

export default function Sidebar({ setIsHelpDesk }) {
  const { user, setUser } = useUserContext();
  const [current, setCurrent] = useState("");

  const navigate = useNavigate();

  const DrawerAPI = useDrawer();
  const { isOpen: collapsed, setCollapsed } = useSidebar();
  const [segmentedvalue, setSegmentedValue] = useState("dashboard");
  const [showSwitchBtn, setShowSwitchBtn] = useState(false);
  const location = useLocation();

  const isOnlineBookingPage = useMemo(() => {
    return (
      ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING === location.pathname ||
      ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING_METTING === location.pathname ||
      (location.pathname.includes(ROUTER_URLS.TRAVEL.ACCOMMODATION.VIEW) &&
        !location.pathname.includes("edit") &&
        !location.pathname.includes("add")) ||
      ROUTER_URLS.TRAVEL.ACCOMMODATION.BOOK === location.pathname ||
      (location.pathname.includes(ROUTER_URLS.TRAVEL.EXPERIANCES.VIEW) &&
        !location.pathname.includes("edit") &&
        !location.pathname.includes("add")) ||
      ROUTER_URLS.TRAVEL.EXPERIANCES.BOOK === location.pathname
      ||
      location.pathname.includes(ROUTER_URLS.TRAVEL.TRANSFERS.BOOK)
    );
  }, [location]);

  const options = [
    {
      label: (
        <div
          style={{
            padding: 3,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}>
          <MainSVG />
          <div>Dashboard</div>
        </div>
      ),
      value: "dashboard",
    },
    {
      label: (
        <div
          style={{
            padding: 3,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}>
          <HelpDesk2SVG />
          <div>Help Desk</div>
        </div>
      ),
      value: "helpDesk",
    },
  ];

  useEffect(() => {
    if (
      location.pathname.includes("ticket-view") ||
      (location.pathname.includes("live-chat") && location?.search.match("chatId="))
    ) {
      setShowSwitchBtn(true);
    } else {
      setShowSwitchBtn(false);
    }
  }, [location.pathname, location?.search]);

  return (
    <Sider
      theme="light"
      collapsedWidth={isOnlineBookingPage ? "0px" : "72px"}
      width="280px"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="main-sider">
      {DrawerAPI.Render}
      <div className={`sider-layout ${Boolean(collapsed) ? "collapsed" : ""}`}>
        <div className="w-100">
          <Row
            gutter={[0, 0]}
            style={{ flexDirection: "column" }}
            justify="space-between"
            wrap={false}>
            <div style={{ marginBottom: "16px" }}>
              <Row
                align="middle"
                justify={collapsed ? "center" : "space-between"}
                className={!collapsed && "vindo-logo"}>
                {!collapsed && (
                  <>
                    <Col>
                      <Logo />
                    </Col>

                    <Col>
                      <CloseSVG className="clickable" onClick={() => setCollapsed(true)} />
                    </Col>
                  </>
                )}

                {!isOnlineBookingPage && collapsed && (
                  <BurgerMenuSVG className="clickable" onClick={() => setCollapsed(!collapsed)} />
                )}
              </Row>
            </div>
            <div>
              <div
                className={`schedule-meeting-side ${collapsed ? "center-items" : "delay"
                  } clickable`}
                style={{
                  background: user?.companyApps?.find(
                    (el) => el.name === COMPANY_APPS_NAMES.VINDO_TRAVEL,
                  )
                    ? "#29323C"
                    : "transparent linear-gradient(269deg, #3a5ee3 0%, #8fcaf3 100%) 0% 0% no-repeat padding-box",
                }}
                onClick={() => {
                  console.log("user :>> ", user);
                  if (
                    user?.companyApps?.find((el) => el.name === COMPANY_APPS_NAMES.VINDO_TRAVEL)
                  ) {
                    navigate(ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING);
                  } else {
                    DrawerAPI.open("40%");
                    DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd DrawerAPI={DrawerAPI} />);
                  }
                }}>
                {collapsed ? (
                  <MeetingSVG />
                ) : (
                  <Row
                    gutter={[32, 0]}
                    wrap={false}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "0 0 0 1.2rem",
                    }}>
                    {user?.officerType === OFFICER_TYPES.AGENT
                      ? (
                        <>
                          <BookingEngineSVG />
                          <Typography.Text className="wc booking_engine">
                            Booking Engine
                          </Typography.Text>
                        </>
                      ) : (
                        <>
                          <MeetingSVG />
                          <Typography.Text className="wc">Schedule Meeting</Typography.Text>
                        </>
                      )}
                  </Row>
                )}
              </div>
              <div className="menus_section">
                {user?.companyMenu?.map((itemsGtoup, index) => {
                  return itemsGtoup?.children && itemsGtoup?.children?.length > 0 ? (
                    <div className="menu_group_section" key={index}>
                      <Typography.Paragraph className="fz-12 fw-400 menu_group_title">
                        {itemsGtoup.group}
                      </Typography.Paragraph>
                      <Menu
                        selectedKeys={[current]}
                        onClick={(e) => setCurrent(e.key)}
                        className="menu_group"
                        defaultSelectedKeys={location.pathname ? location.pathname : ""}
                        mode="inline"
                        items={itemsGtoup?.children.map((item) => {
                          return {
                            key: item?.key || item.name,
                            label: item?.index ? (
                              <Link to={item?.index}>{item.name}</Link>
                            ) : (
                              <p>{item.name}</p>
                            ),
                            icon: <img src={item.icon} alt={item.name} />,
                            children:
                              item?.children && item.children.length > 0
                                ? item.children.map((el) => {
                                  return {
                                    key: el.key,
                                    label: <Link to={el?.index}>{el.name}</Link>,
                                  };
                                })
                                : undefined,
                          };
                        })}
                        inlineCollapsed={collapsed}
                        activeKey={location.pathname ? location.pathname : ""}
                      />
                    </div>
                  ) : <></>;
                })}
              </div>
            </div>
            {false && showSwitchBtn && (
              <div>
                <Divider style={{ marginTop: "0px" }} />
                <div style={{ paddingBottom: "18px" }}>
                  {collapsed ? (
                    <div onClick={() => setIsHelpDesk((prev) => !prev)} className="switch">
                      <SwitchSVG />
                    </div>
                  ) : (
                    <Segmented
                      options={options}
                      value={segmentedvalue}
                      onChange={(value) => {
                        setSegmentedValue(value);
                        if (value === "helpDesk") {
                          setIsHelpDesk(true);
                        } else {
                          setIsHelpDesk(false);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </Row>
        </div>
      </div>
    </Sider>
  );
}
