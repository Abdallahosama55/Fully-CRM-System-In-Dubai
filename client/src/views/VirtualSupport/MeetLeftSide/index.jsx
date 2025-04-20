import { useContext, useEffect } from "react";
import { Avatar, Button, Col, Dropdown, Image, Row, Tooltip, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import {
  BurgerMenuSVG,
  CallEndSVG,
  DownSvg,
  Inventory2SVG,
  MeetCounter,
  MeetParticipants,
  MeetProductTools,
  MeetSharingTools,
  MeetChat,
  Metaverse2SVG,
  SahredFile,
  MeetCart,
  DeskQueuesSVG,
  ScheduleMeetingSVG,
} from "assets/jsx-svg";

import userContext from "context/userContext";
import profileImg from "assets/images/avatar.png";

import "./styles.css";

import { getDatabase, ref, remove, update } from "firebase/database";
import Box from "components/Box";
import Logo from "components/common/Logo";
function getItem(label, icon, key, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function MeetLeftSide({
  meetingSettings,
  isHost,
  isDesk,
  setIsMinMeetingScreen,
  isMinMeetingScreen,
  collapsed,
  setCollapsed,
  omitItems = [],
  activeBtn,
  setActiveBtn,
  setHideSide,
  forMobile = false,
  setDrawerOpen,
  setOpenMobileMenu,
  meeting,
  showCounterBtn,
  isMetaverseMeet,
}) {
  const menuItems = [
    // getItem("Desk Queue", <DeskQueuesSVG />, "queue"),
    getItem("Schedule Meeting", <ScheduleMeetingSVG />, "meeting"),
    getItem("Participants", <MeetParticipants />, "participant"),
    getItem("Chat", <MeetChat />, "chat"),
    getItem("Sharing Tools", <MeetSharingTools />, "tools"),
    getItem("Counter", <MeetCounter />, "counter"),
    getItem("Inventory", <Inventory2SVG id={forMobile ? 18 : 11} />, "inventory"),
    getItem("Data Shared By User", <SahredFile />, "counterUserSharedData"),
    // getItem("CRM", <CRMSVG2 />, "crm"),
    getItem("Production Tools", <MeetProductTools />, "productionTools"),
    // getItem("Desks", <HelpDesk3SVG />, "desks"),
    // getItem("HoloMeet", "9", <CustomerServiceFilled />),
  ];
  useEffect(() => {
    if (forMobile) {
      setHideSide(true);
    }
  }, [forMobile, setActiveBtn, setHideSide]);

  const generalItems = [
    // getItem("Settings", <SettingsSVG />),
    // getItem("Support", <MeetHelp />, "2"),
  ];

  if (forMobile) {
    return (
      <div className="meet-left-side mobile h-100">
        <SiderContent
          setIsMinMeetingScreen={setIsMinMeetingScreen}
          isMinMeetingScreen={isMinMeetingScreen}
          meetingSettings={meetingSettings}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          menuItems={menuItems}
          isHost={isHost}
          omitItems={omitItems}
          isDesk={isDesk}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          setHideSide={setHideSide}
          generalItems={generalItems}
          forMobile={forMobile}
          setDrawerOpen={setDrawerOpen}
          setOpenMobileMenu={setOpenMobileMenu}
          meeting={meeting}
          showCounterBtn={showCounterBtn}
          isMetaverseMeet={isMetaverseMeet}
        />
      </div>
    );
  }

  return (
    <Box
      sx={{
        "& .ant-layout-sider-children": { height: "100%" },
      }}>
      <Sider
        theme="light"
        collapsedWidth="75px"
        width="280px"
        style={{ height: "100%" }}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="meet-left-side sm-hide h-100">
        <SiderContent
          isMinMeetingScreen={isMinMeetingScreen}
          omitItems={omitItems}
          isDesk={isDesk}
          meetingSettings={meetingSettings}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          menuItems={menuItems}
          isHost={isHost}
          activeBtn={activeBtn}
          setIsMinMeetingScreen={setIsMinMeetingScreen}
          setActiveBtn={setActiveBtn}
          setHideSide={setHideSide}
          generalItems={generalItems}
          meeting={meeting}
          showCounterBtn={showCounterBtn}
          isMetaverseMeet={isMetaverseMeet}
        />
      </Sider>
    </Box>
  );
}

const SiderContent = ({
  meetingSettings,
  setIsMinMeetingScreen,
  collapsed,
  isDesk,
  setCollapsed,
  menuItems,
  isHost,
  activeBtn,
  setActiveBtn,
  setHideSide,
  generalItems,
  SystemMessage,
  omitItems = [],
  forMobile = false,
  setDrawerOpen,
  setOpenMobileMenu,
  meeting,
  showCounterBtn,
  isMetaverseMeet,
  isMinMeetingScreen,
}) => {
  // const [open, setOpen] = useState(false);

  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const { meetingId } = useParams();

  const endCall = () => {
    const db = getDatabase();
    const CallData = ref(db, `Company/${user.companyId}/Calls/call/${meeting?.firebaseId}/data`);

    update(CallData, {
      status: "finished",
    });
  };

  const endMettingforAll = async () => {
    const db = getDatabase();
    endCall();
    const waitingListRef = ref(
      db,
      `Company/${user.companyId}/meeting/${meetingId}/settings/waitingList`,
    );

    await remove(waitingListRef);
    setTimeout(() => {
      navigate("/booked-meeting");
    }, 200);
  };
  const handleOpenCalender = () => {
    // setOpen(true);
  };
  const handleLeavePage = () => {
    navigate("/");
  };
  return (
    <div className="meet-left-side-layout h-100">
      <div className="w-100 h-100">
        <Row
          className="h-100"
          gutter={[0, 22]}
          style={{ flexDirection: "column" }}
          justify="space-between">
          <Col>
            <Row
              align="middle"
              justify={collapsed ? "center" : "space-between"}
              className={!collapsed && "vindo-logo"}
              style={{ paddingInline: "16px" }}>
              {!collapsed && (
                <>
                  <Col>
                    <Logo />
                  </Col>

                  <Col>
                    <Row align="middle">
                      <BurgerMenuSVG
                        color="#000"
                        style={{ width: "18px", height: "18px" }}
                        className="clickable"
                        onClick={() => {
                          if (forMobile) {
                            setDrawerOpen((prev) => !prev);
                          } else {
                            setCollapsed(true);
                          }
                        }}
                      />
                    </Row>
                  </Col>
                </>
              )}

              {collapsed && (
                <BurgerMenuSVG
                  color="#000"
                  style={{ width: "18px", height: "18px" }}
                  className="clickable"
                  onClick={() => setCollapsed((prev) => !prev)}
                />
              )}
            </Row>
          </Col>
          <Col
            flex={1}
            style={{
              maxHeight: "calc(100vh - 180px)",
              overflow: "auto",
              paddingInlineStart: !collapsed && "16px",
              paddingRight: !collapsed && "16px",
            }}>
            <Row justify={collapsed ? "center" : "start"}>
              <Typography.Text className="fw-500 fz-12" style={{ color: "#8E8E93" }}>
                MENU
              </Typography.Text>
            </Row>

            <Row gutter={[0, 8]} style={{ marginTop: "20px" }}>
              {menuItems.map((item, index) => {
                if (!isHost && index > 2) {
                  return null;
                }
                if (!isHost && ["queue", "meeting"].includes(item.key)) {
                  return null;
                }
                if (omitItems.includes(item.key)) {
                  return null;
                }
                return (
                  <Col xs={24} key={item.key}>
                    {index === 2 && isHost && (
                      <div
                        className="sider-divider"
                        style={{
                          marginInline: collapsed && "auto",
                          marginTop: "4px",
                          marginBottom: "4px",
                        }}
                      />
                    )}
                    <Row
                      wrap={false}
                      justify={collapsed ? "center" : "start"}
                      align="middle"
                      style={{
                        cursor: isDesk && !["queue", "meeting"].includes(item.key) && "unset",
                        color: isDesk && !["queue", "meeting"].includes(item.key) && "#b3b3b3",
                      }}
                      className={`menu-item ${
                        activeBtn === item.key && "active"
                      } clickable menu-item-call-desk `}
                      onClick={() => {
                        if (isDesk && !["queue", "meeting"].includes(item.key)) {
                          return;
                        }

                        if (forMobile) {
                          setOpenMobileMenu && setOpenMobileMenu(true);
                          setDrawerOpen && setDrawerOpen((prev) => !prev);
                        } else {
                          if (item.key === "meeting") {
                            setIsMinMeetingScreen && setIsMinMeetingScreen(true);
                            setHideSide && setHideSide(true);
                          } else {
                            if (item.key === "queue" && isMinMeetingScreen) {
                              setHideSide && setHideSide(true);
                            } else {
                              setHideSide && setHideSide(false);
                              setIsMinMeetingScreen && setIsMinMeetingScreen(false);
                            }
                          }
                        }
                        setActiveBtn && setActiveBtn(item.key);
                      }}>
                      <Col style={{ marginInlineEnd: !collapsed && "16px" }}>
                        <Tooltip title={collapsed && item.label} placement="right">
                          <Row align="middle">{item.icon}</Row>
                        </Tooltip>
                      </Col>
                      {!collapsed && <Col>{item.label}</Col>}
                    </Row>
                  </Col>
                );
              })}

              {!isDesk && !isHost && (
                <Col xs={24}>
                  <Row
                    wrap={false}
                    justify={collapsed ? "center" : "start"}
                    align="middle"
                    className={`menu-item ${
                      activeBtn === "myCart" && "active"
                    } clickable menu-item-call-desk`}
                    onClick={() => {
                      if (forMobile) {
                        setOpenMobileMenu(true);
                        setDrawerOpen((prev) => !prev);
                      } else {
                        setHideSide(false);
                      }
                      setActiveBtn("myCart");
                    }}>
                    <Col style={{ marginInlineEnd: !collapsed && "16px" }}>
                      <Tooltip title={collapsed && "My Cart"} placement="right">
                        <Row align="middle">
                          <MeetCart id={forMobile ? 797 : 9569} />
                        </Row>
                      </Tooltip>
                    </Col>
                    {!collapsed && <Col>My Cart</Col>}
                  </Row>
                </Col>
              )}

              {!isDesk && !isHost && (
                <Col xs={24}>
                  <Row
                    wrap={false}
                    justify={collapsed ? "center" : "start"}
                    align="middle"
                    className={`menu-item ${
                      activeBtn === "userInventory" && "active"
                    } clickable menu-item-call-desk`}
                    onClick={() => {
                      if (forMobile) {
                        setOpenMobileMenu(true);
                        setDrawerOpen((prev) => !prev);
                      } else {
                        setHideSide(false);
                      }
                      setActiveBtn("userInventory");
                    }}>
                    <Col style={{ marginInlineEnd: !collapsed && "16px" }}>
                      <Tooltip title={collapsed && "Inventory"} placement="right">
                        <Row align="middle">
                          <Inventory2SVG id={forMobile ? 531 : 135} />
                        </Row>
                      </Tooltip>
                    </Col>
                    {!collapsed && <Col>Inventory</Col>}
                  </Row>
                </Col>
              )}

              {!isDesk && showCounterBtn && !isHost && !isMetaverseMeet && (
                <Col xs={24}>
                  <Row
                    wrap={false}
                    justify={collapsed ? "center" : "start"}
                    align="middle"
                    className={`menu-item ${
                      activeBtn === "userCounter" && "active"
                    } clickable menu-item-call-desk`}
                    onClick={() => {
                      if (forMobile) {
                        setOpenMobileMenu(true);
                        setDrawerOpen((prev) => !prev);
                      } else {
                        setHideSide(false);
                      }
                      setActiveBtn("userCounter");
                    }}>
                    <Col style={{ marginInlineEnd: !collapsed && "16px" }}>
                      <Tooltip title={collapsed && "Counter"} placement="right">
                        <Row align="middle">
                          <MeetCounter />
                        </Row>
                      </Tooltip>
                    </Col>
                    {!collapsed && <Col>Counter</Col>}
                  </Row>
                </Col>
              )}

              {!isDesk && meetingSettings?.sharingDim?.sharing && !isMetaverseMeet && (
                <Col xs={24}>
                  <Row
                    wrap={false}
                    justify={collapsed ? "center" : "start"}
                    align="middle"
                    className={`menu-item ${
                      activeBtn === "sharingDim" && "active"
                    } clickable menu-item-call-desk`}
                    onClick={() => {
                      if (forMobile) {
                        setOpenMobileMenu(true);
                        setDrawerOpen((prev) => !prev);
                      } else {
                        setHideSide(false);
                      }
                      setActiveBtn("sharingDim");
                    }}>
                    <Col style={{ marginInlineEnd: !collapsed && "16px" }}>
                      <Tooltip title={collapsed && "Join Dimension"} placement="right">
                        <Row align="middle">
                          <Metaverse2SVG />
                        </Row>
                      </Tooltip>
                    </Col>
                    {!collapsed && <Col>Join Dimension</Col>}
                  </Row>
                </Col>
              )}

              {!isDesk &&
                meetingSettings?.hostFiles &&
                meetingSettings?.hostFiles !== "[]" &&
                !isHost && (
                  <Col xs={24}>
                    <Row
                      wrap={false}
                      justify={collapsed ? "center" : "start"}
                      align="middle"
                      className={`menu-item ${
                        activeBtn === "sharedFiles" && "active"
                      } clickable menu-item-call-desk`}
                      onClick={() => {
                        if (forMobile) {
                          setOpenMobileMenu(true);
                          setDrawerOpen((prev) => !prev);
                        } else {
                          setHideSide(false);
                        }
                        setActiveBtn("sharedFiles");
                      }}>
                      <Col style={{ marginInlineEnd: !collapsed && "16px" }}>
                        <Tooltip title={collapsed && "Shared Files"} placement="right">
                          <Row align="middle">
                            <SahredFile />
                          </Row>
                        </Tooltip>
                      </Col>
                      {!collapsed && <Col>Shared Files</Col>}
                    </Row>
                  </Col>
                )}
            </Row>
            <div className="sider-divider" style={{ marginInline: collapsed && "auto" }} />

            {/* <Row justify={collapsed ? "center" : "start"}>
              <Typography.Text className="fw-500 fz-12" style={{ color: "#8E8E93" }}>
                GENERAL
              </Typography.Text>
            </Row> */}

            <Row gutter={[0, 22]} style={{ marginTop: "20px" }}>
              {isHost &&
                generalItems.map((item) => (
                  <Col xs={24} key={item.key}>
                    <Row
                      wrap={false}
                      justify={collapsed ? "center" : "start"}
                      align="middle"
                      className="menu-item">
                      <Col style={{ marginInlineEnd: !collapsed && "16px" }}>
                        <Row align="middle">{item.icon}</Row>
                      </Col>
                      {!collapsed && <Col>{item.label}</Col>}
                    </Row>
                  </Col>
                ))}
              {!isDesk && (
                <Col xs={24}>
                  <Dropdown
                    placement="topRight"
                    trigger={["click"]}
                    overlayStyle={{ zIndex: "100000" }}
                    dropdownRender={() => (
                      <Row gutter={[0, 12]} justify="center" className="leave-meeting-options">
                        <Col
                          xs={24}
                          onClick={() => {
                            endCall();
                            navigate("/");
                            // window.location.reload();
                          }}>
                          <Button type="ghost" className="w-100 fw-500 leave-meet-btn">
                            Leave Meeting
                          </Button>
                        </Col>
                        {isHost && (
                          <Col xs={24} onClick={endMettingforAll}>
                            <Button type="ghost" className="w-100 fw-500 end-meet-btn">
                              End Meeting for All
                            </Button>
                          </Col>
                        )}
                      </Row>
                    )}>
                    <Row
                      wrap={false}
                      justify={collapsed ? "center" : "start"}
                      align="middle"
                      className="clickable">
                      <Col
                        style={{
                          marginInlineEnd: !collapsed && "16px",
                        }}>
                        <Row align="middle">
                          <CallEndSVG color="#E81224" />
                        </Row>
                      </Col>
                      {!collapsed && (
                        <Col
                          style={{
                            color: "#E81224",
                          }}>
                          Leave Meeting{" "}
                        </Col>
                      )}
                    </Row>
                  </Dropdown>
                </Col>
              )}
              {isDesk && (
                <Col xs={24}>
                  <Row
                    onClick={handleLeavePage}
                    wrap={false}
                    justify={collapsed ? "center" : "start"}
                    align="middle"
                    className="clickable">
                    <Col
                      style={{
                        marginInlineEnd: !collapsed && "16px",
                      }}>
                      <Row align="middle">
                        <CallEndSVG color="#E81224" />
                      </Row>
                    </Col>
                    {!collapsed && (
                      <Col
                        style={{
                          color: "#E81224",
                        }}>
                        Leave{" "}
                      </Col>
                    )}
                  </Row>
                </Col>
              )}
            </Row>
          </Col>

          <Col>
            <Row
              style={{ paddingInline: "16px", width: collapsed ? "100%" : "calc(100% - 16px)" }}
              align="middle"
              gutter={[12, 0]}
              justify={collapsed ? "center" : "start"}
              wrap={false}>
              <Col>
                <Avatar
                  src={
                    [null, undefined, "null", "undefined", ""].includes(user?.profileImage)
                      ? profileImg
                      : user?.profileImage || profileImg
                  }
                  size={40}
                />
              </Col>
              {collapsed ? null : (
                <Col>
                  <Row gutter={[6, 0]} wrap={false}>
                    <Col>
                      <Typography.Text style={{ maxWidth: "100px" }} ellipsis className="fw-500">
                        {user.fullName}
                      </Typography.Text>
                    </Col>
                    <Col>
                      <DownSvg />
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </div>
      {/* {open && <ScheduleMeeting open={open} setOpen={setOpen}></ScheduleMeeting>} */}
    </div>
  );
};
