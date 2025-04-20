import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Col, Drawer, Dropdown, Row, Typography, message } from "antd";
import dayjs from "dayjs";
import "./styles.css";

import {
  BurgerMenuSVG,
  DownSvg,
  PlaySVG,
  IconlyLightOutlineSettingSVG,
  IconlyLightOutlineNotificationSVG,
  LogoutSVG3,
} from "assets/jsx-svg";

import { useUserContext } from "context/userContext";
import AuthService from "services/auth.service";
import axios from "axios";
import IconlyLightOutlineCalendarSVG from "assets/jsx-svg/IconlyLightOutlineCalendarSVG";
// utils
import { useSidebar } from "layout/MainLayout_OLD/SidebarProvider";
import UserSolidSVG from "assets/jsx-svg/UserSolidSVG";
import { VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
import useRightSlide from "context/rightSlideContext";
import "./styles.css";
import ROUTER_URLS from "constants/ROUTER_URLS";
import MobileSideBar from "./MobileSideBar";
import { stringAvatar } from "utils/string";
import usePageTitle from "hooks/usePageTitle";
import Logo from "components/common/Logo";
import Clock from "./Clock";
export const logout = async (navigate, setUser) => {
  try {
    await AuthService.logout();
    localStorage.removeItem("vindo-token");
    localStorage.removeItem("DMC_TOKEN");
    localStorage.removeItem("user-id");
    localStorage.removeItem("time-zone");
    axios.defaults.headers.authorization = null;
    navigate("/login");
    setUser(null);
  } catch (error) {
    message.error("Something went wrong");
  }
};

export default function Navbar() {
  const { isOpen: collapsed, setCollapsed } = useSidebar();
  const { pageTitle } = usePageTitle("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { state, toggle, close: closeRightSide } = useRightSlide();

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
      ROUTER_URLS.TRAVEL.EXPERIANCES.BOOK === location.pathname ||
      location.pathname.includes(ROUTER_URLS.TRAVEL.TRANSFERS.BOOK)
    );
  }, [location]);

  useEffect(() => {
    if (isOnlineBookingPage) {
      closeRightSide();
      setCollapsed(true);
    }
  }, [closeRightSide, isOnlineBookingPage, setCollapsed]);

  const handleJoinDesk = async () => {
    navigate("/booked-meeting");
  };

  return (
    <header
      className="main-nav"
      style={
        isOnlineBookingPage
          ? { paddingInlineEnd: "", paddingInlineStart: "32px", marginBottom: "0px" }
          : { marginBottom: "1rem" }
      }>
      <Row justify="space-between" style={{ marginRight: 0 }} align="middle" gutter={[16, 16]}>
        <Col>
          <Row align="middle" gutter={[24, 24]}>
            <Col className="drawer-icon">
              <Row gutter={[24, 24]} align="middle">
                <Col>
                  <BurgerMenuSVG
                    className="clickable"
                    onClick={() => setDrawerOpen((prev) => !prev)}
                  />
                </Col>
                <Col>
                  <Logo />
                </Col>
              </Row>
            </Col>
            {isOnlineBookingPage &&
              (collapsed ? (
                <BurgerMenuSVG
                  className="clickable is_online_booking_page"
                  onClick={() => setCollapsed(false)}
                />
              ) : (
                <></>
              ))}

            {collapsed && (
              <Col className="hide-sm">
                <Logo height={40} />
              </Col>
            )}

            <Col>
              <Typography.Paragraph
                className="fz-18 fw-500 d-flex"
                style={{
                  marginBottom: 0,
                  textTransform: "capitalize",
                  ...(collapsed
                    ? {
                        paddingInlineStart: "1rem",
                        borderInlineStart: "1px solid #EAECF2",
                      }
                    : {
                        paddingInlineStart: "0",
                        borderInlineStart: "unset",
                      }),
                }}>
                {pageTitle}
              </Typography.Paragraph>
            </Col>
          </Row>
        </Col>
        <Col className="hide-info">
          <Row align="middle" gutter={[4, 16]}>
            <Col>
              <Clock />
            </Col>

            <Col>
              <Row className="navbar-icons" gutter={10} align="middle">
                <Col>
                  <div className="icon">
                    <IconlyLightOutlineNotificationSVG />
                  </div>
                </Col>
                <Col>
                  <Link
                    unstable_viewTransition={true}
                    relative="route"
                    className="icon"
                    to={"/collaboration/meeting"}>
                    <IconlyLightOutlineCalendarSVG />
                  </Link>
                </Col>
                <Col>
                  <Dropdown
                    trigger={["click", "contextMenu"]}
                    menu={{
                      selectable: true,
                      items: [
                        {
                          label: "Employee Desk",
                          key: "1",
                          onClick: () => {
                            navigate("/employee/desk");
                          },
                        },
                      ],
                    }}
                    placement="bottomLeft">
                    <div className="icon">
                      <IconlyLightOutlineSettingSVG />
                    </div>
                  </Dropdown>
                </Col>
                {!isOnlineBookingPage && (
                  <Col>
                    <Button
                      onClick={handleJoinDesk}
                      style={{
                        height: "40px",
                        padding: "0px 15px",
                        fontSize: "13px",
                        borderRadius: "8px",
                        background: "linear-gradient(261.95deg, #1131DA 13.26%, #8FCAF3 106.79%)",
                        color: "white",
                      }}>
                      {"Join Desk"}
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
            <Col>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 1,
                      label: (
                        <div
                          onClick={() => {
                            navigate(`/profile`);
                          }}
                          style={{ display: "flex", alignItems: "center", columnGap: 12 }}>
                          <UserSolidSVG width={16} height={16} /> Profile
                        </div>
                      ),
                    },
                    {
                      key: 2,
                      label: (
                        <div style={{ display: "flex", alignItems: "center", columnGap: 12 }}>
                          <LogoutSVG3 /> Logout
                        </div>
                      ),
                      onClick: () => logout(navigate, setUser),
                    },
                  ],
                }}
                trigger={["click"]}>
                <button className="clock-in-btn">
                  <Row align="middle" gutter={[12, 0]} wrap={false}>
                    <Col>
                      <Avatar
                        src={user.profileImage}
                        size={40}
                        {...(user.profileImage ? {} : { ...stringAvatar(user?.fullName) })}
                      />
                    </Col>
                    <Col>
                      <Row gutter={[6, 0]} wrap={false}>
                        <Col>
                          <Typography.Text
                            style={{ maxWidth: "100px" }}
                            ellipsis
                            className="fw-500">
                            {user.fullName}
                          </Typography.Text>
                        </Col>
                        <Col>
                          <DownSvg />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </button>
              </Dropdown>
            </Col>
            <Col>
              <Button onClick={toggle} type="text">
                {state ? (
                  <VerticalLeftOutlined style={{ color: "#585A72", fontSize: "18px" }} />
                ) : (
                  <VerticalRightOutlined style={{ color: "#585A72", fontSize: "18px" }} />
                )}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Drawer
        className="nav-mobile"
        placement="left"
        open={drawerOpen}
        styles={{
          header: {
            display: "none",
          },
        }}
        style={{ background: "#F7F7F8" }}
        onClose={() => setDrawerOpen((prev) => !prev)}>
        <MobileSideBar
          collapsed={collapsed}
          logout={logout}
          navigate={navigate}
          setDrawerOpen={setDrawerOpen}
        />
      </Drawer>
    </header>
  );
}
