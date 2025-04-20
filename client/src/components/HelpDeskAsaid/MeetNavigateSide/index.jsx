import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Col,
  Divider,
  Image,
  Row,
  Segmented,
  Tooltip,
  Typography,
} from "antd";
import Sider from "antd/es/layout/Sider";
import {
  BurgerMenuSVG,
  DownSvg,
  HelpDesk2SVG,
  MainSVG,
  SwitchSVG,
} from "assets/jsx-svg";

import userContext from "context/userContext";
import profileImg from "assets/images/avatar.png";

import Participants from "assets/images/Participants.png";
import Counter from "assets/images/Counter.png";
import Support from "assets/images/Support.png";

import "./styles.css";
import { useLocation } from "react-router-dom";
import Logo from "components/common/Logo";

export default function MeetLeftSide({
  activeBtn,
  setActiveBtn,
  setHideSide,
  forMobile = false,
  setDrawerOpen,
  setOpenMobileMenu,
  setIsHelpDesk,
}) {
  const location = useLocation();
  const [showSwitchBtn, setShowSwitchBtn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (forMobile) {
      setHideSide(true);
    }
  }, [forMobile, setActiveBtn, setHideSide]);

  function getItem(label, icon, key, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const menuItems = [
    getItem(
      "Participants",
      <img src={Participants} alt="participant" />,
      "participant",
    ),
    // getItem("Chat", <img src={Chat} alt="chat" />, "chat"),
    // getItem("Inventory", <img src={Inventory} alt="Inventory" />, "inventory"),
    // getItem(
    //   "Sharing Tools",
    //   <img src={SharingTools} alt="SharingTools" />,
    //   "tools",
    // ),
    getItem("Counter", <img src={Counter} alt="counter" />, "counter"),
    // getItem(
    //   "Data Shared By User",
    //   <img src={SharedData} alt="SharedData" />,
    //   "counterUserSharedData",
    // ),
    // getItem("CRM", <img src={relationship} alt="relationship" />, "crm"),
    // getItem(
    //   "Production Tools",
    //   <img src={ProductionTools} alt="ProductionTools" />,
    //   "productionTools",
    // ),
    // getItem(
    //   "Desks",
    //   <img src={customerService} alt="customerService" />,
    //   "desks",
    // ),
  ];

  const generalItems = [
    // getItem("Settings", <SettingsSVG />),
    getItem("Support", <img src={Support} alt="Support" />),
  ];

  useEffect(() => {
    if (
      location.pathname.includes("ticket-view") ||
      (location.pathname.includes("live-chat") &&
        location?.search.match("chatId="))
    ) {
      setShowSwitchBtn(true);
    } else {
      setShowSwitchBtn(false);
    }
  }, [location.pathname, location?.search]);

  if (forMobile) {
    return (
      <div className="meet-left-side mobile">
        <SiderContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          menuItems={menuItems}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          setHideSide={setHideSide}
          generalItems={generalItems}
          forMobile={forMobile}
          setDrawerOpen={setDrawerOpen}
          setOpenMobileMenu={setOpenMobileMenu}
          setIsHelpDesk={setIsHelpDesk}
          showSwitchBtn={showSwitchBtn}
        />
      </div>
    );
  }

  console.log('collapsed :>> ', collapsed);
  return (
    <Sider
      theme="light"
      collapsedWidth="75px"
      width="280px"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="meet-left-side sm-hide"
    >
      <SiderContent
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        menuItems={menuItems}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
        setHideSide={setHideSide}
        generalItems={generalItems}
        setIsHelpDesk={setIsHelpDesk}
        showSwitchBtn={showSwitchBtn}
      />
    </Sider>
  );
}

const SiderContent = ({
  collapsed,
  setCollapsed,
  menuItems,
  activeBtn,
  setActiveBtn,
  setHideSide,
  forMobile = false,
  setDrawerOpen,
  setOpenMobileMenu,
  setIsHelpDesk,
  showSwitchBtn,
}) => {
  const { user } = useContext(userContext);
  const [segmentedvalue, setSegmentedValue] = useState("helpDesk");

  return (
    <Row
      gutter={[0, 22]}
      justify="space-between"
      className="meet-left-side-layout"
    >
      <Col>
        <Row
          align="middle"
          justify={collapsed ? "center" : "space-between"}
          className={!collapsed && "vindo-logo"}
          style={{ paddingInline: "16px" }}
        >
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
        }}
      >
        <Row justify={collapsed ? "center" : "start"}>
          <Typography.Text
            className="fw-500 fz-12"
            style={{ color: "#8E8E93" }}
          >
            MENU
          </Typography.Text>
        </Row>

        <Row gutter={[0, 22]} style={{ marginTop: "20px" }}>
          {menuItems.map((item) => {
            return (
              <Col xs={24} key={item.key}>
                <Row
                  wrap={false}
                  justify={collapsed ? "center" : "start"}
                  align="middle"
                  className={`menu-item ${
                    activeBtn === item.key && "active"
                  } clickable`}
                  onClick={() => {
                    if (forMobile) {
                      setOpenMobileMenu(true);
                      setDrawerOpen((prev) => !prev);
                    } else {
                      setHideSide(false);
                    }
                    setActiveBtn(item.key);
                  }}
                >
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
        </Row>

        <div
          className="sider-divider"
          style={{ marginInline: collapsed && "auto" }}
        />
      </Col>

      <Col>
        <Row gutter={[0, 16]}>
          <Col xs={24}>
            {" "}
            <Row
              style={{ paddingInline: "16px", width: "calc(100% - 16px)" }}
              align="middle"
              gutter={[12, 0]}
              wrap={false}
            >
              <Col>
                <Avatar src={user.profileImage || profileImg} size={40} />
              </Col>
              {collapsed ? null : (
                <Col>
                  <Row gutter={[6, 0]} wrap={false}>
                    <Col>
                      <Typography.Text
                        style={{ maxWidth: "100px" }}
                        ellipsis
                        className="fw-500"
                      >
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
          <Col xs={24}>
            {showSwitchBtn && (
              <Col>
                <Divider style={{ marginBottom: "16px", marginTop: "0px" }} />
                {collapsed ? (
                  <div
                    onClick={() => setIsHelpDesk((prev) => !prev)}
                    className="switch center-items clickable"
                  >
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
              </Col>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
const options = [
  {
    label: (
      <div
        style={{
          padding: 3,
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
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
        }}
      >
        <HelpDesk2SVG />
        <div>Help Desk</div>
      </div>
    ),
    value: "helpDesk",
  },
];
