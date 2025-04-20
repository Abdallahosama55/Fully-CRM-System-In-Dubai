import React, { useMemo, useState } from "react";
import { useToggle } from "hooks/useToggle";
// style
import "./styles.css";
import { ArrowDownSVG, BurgerMenuSVG, PlusSVG, VedioCallFilledSVG } from "assets/jsx-svg";
import Logo from "components/common/Logo";
import { Button, Divider, Dropdown, Menu, Typography } from "antd";
import isValidSVG from "utils/isValidSVG";
import SvgImage from "components/common/SvgImage";
import default_image from "assets/images/default_image.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "context/userContext";
import OFFICER_TYPES from "constants/OFFICER_TYPES";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import { useDrawer } from "hooks/useDrawer";
const TRAVEL_DROPDOWN_MENU_ACTIONS = {
  ITINERARY_QUOTATION: "ITINERARY_QUOTATION",
  GROUP_ITINERARY: "GROUP_ITINERARY",
  START_LIVE_ITINERARY: "START_LIVE_ITINERARY",
  BOOK_FROM_TBO: "BOOK_FROM_TBO",
};

function flattenChildren(menu) {
  return menu?.children?.map((section) => section?.children).flat() || [];
}

const MobileLayout = ({ children, menu, isMobile }) => {
  const [isMenuOpen, toggleMenuOpen] = useToggle();
  const [openKeys, setOpenKeys] = useState(Array.isArray(menu) ? [menu[0]?.id] : []);
  const navigate = useNavigate();
  const { user } = useUserContext();
  const DrawerAPI = useDrawer();
  const [isActionDropDownOpen, setIsActionDropDownOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(
    TRAVEL_DROPDOWN_MENU_ACTIONS.ITINERARY_QUOTATION,
  );

  const isTravel = useMemo(
    () => Boolean(user?.companyApps?.find((el) => el?.name === "Vindo-Travel")),
    [user.companyApps],
  );

  return (
    <div className={`main_layout_small_screen ${isMobile ? "is_mobile" : "not_mobile"}`}>
      {DrawerAPI.Render}
      {isMobile && (
        <>
          <div
            className={`main_layout_small_screen_menu ${
              isMenuOpen ? "small_screen_menu_open" : ""
            }`}>
            <Logo />
            <Divider />
            {isTravel ? (
              <Dropdown
                trigger={[]}
                open={isActionDropDownOpen}
                onOpenChange={(value) => setIsActionDropDownOpen(value)}
                menu={{
                  items: [
                    {
                      key: TRAVEL_DROPDOWN_MENU_ACTIONS.ITINERARY_QUOTATION,
                      label: <p>Itinerary quotation</p>,
                      onClick: () =>
                        setActiveAction(TRAVEL_DROPDOWN_MENU_ACTIONS.ITINERARY_QUOTATION),
                    },
                    {
                      key: TRAVEL_DROPDOWN_MENU_ACTIONS.GROUP_ITINERARY,
                      label: <p>Group itinerary</p>,
                      onClick: () => setActiveAction(TRAVEL_DROPDOWN_MENU_ACTIONS.GROUP_ITINERARY),
                    },
                    {
                      key: TRAVEL_DROPDOWN_MENU_ACTIONS.START_LIVE_ITINERARY,
                      label: <p>Start live itinerary</p>,
                      onClick: () =>
                        setActiveAction(TRAVEL_DROPDOWN_MENU_ACTIONS.START_LIVE_ITINERARY),
                    },
                    {
                      key: TRAVEL_DROPDOWN_MENU_ACTIONS.BOOK_FROM_TBO,
                      label: <p>Book from tbo</p>,
                      onClick: () => {
                        navigate("/?isTbo=true");
                      },
                    },
                  ],
                }}>
                <>
                  <div
                    style={{
                      borderRadius: "8px",
                      display: "flex",
                      background: "var(--vbooking-b900)",
                    }}>
                    <Button
                      type="text"
                      style={{
                        height: "40px",
                        borderInlineEnd: "1px solid rgba(255, 255, 255, 0.20)",
                        width: "calc(100% - 35px)",
                      }}
                      onClick={() => {
                        // TODO: Add functionality
                      }}
                      icon={<PlusSVG />}>
                      <Typography.Text
                        className="sm_text_medium"
                        ellipsis={{ tooltip: "Created itinerary" }}
                        style={{ color: "#fff" }}>
                        {activeAction === TRAVEL_DROPDOWN_MENU_ACTIONS.GROUP_ITINERARY
                          ? "Itinerary quotation"
                          : activeAction === TRAVEL_DROPDOWN_MENU_ACTIONS.ITINERARY_QUOTATION
                          ? "Group itinerary"
                          : "Live itinerary"}
                      </Typography.Text>
                    </Button>

                    <Button
                      onClick={() => setIsActionDropDownOpen((prev) => !prev)}
                      type="text"
                      style={{ color: "#fff", height: "40px", width: "35px" }}
                      icon={<ArrowDownSVG color="#fff" />}
                    />
                  </div>
                </>
              </Dropdown>
            ) : (
              <Button
                block
                icon={<VedioCallFilledSVG />}
                onClick={() => {
                  DrawerAPI.open("100%");
                  toggleMenuOpen();
                  DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd DrawerAPI={DrawerAPI} />);
                }}
                type="primary"
                style={{
                  background: "var(--vbooking-b900)",
                  height: "40px",
                  borderRadius: "8px",
                }}>
                Schedule Meeting
              </Button>
            )}
            <Menu
              style={{
                width: "100%",
              }}
              mode="inline"
              openKeys={openKeys}
              onOpenChange={(temp) => setOpenKeys(temp)}>
              {menu?.map((el) =>
                el.index ? (
                  <Menu.Item
                    icon={isValidSVG(el.icon) ? <SvgImage svgContent={el.icon} /> : <></>}
                    key={el.id}
                    onClick={() => {
                      navigate(el.index);
                      toggleMenuOpen();
                    }}>
                    {el.group}
                  </Menu.Item>
                ) : (
                  <Menu.SubMenu
                    key={el.id}
                    icon={isValidSVG(el.icon) ? <SvgImage svgContent={el.icon} /> : <></>}
                    title={el.group}>
                    {flattenChildren(el).map((child) => (
                      <Menu.Item
                        key={child.id}
                        onClick={() => {
                          navigate(child.index);
                          toggleMenuOpen();
                        }}>
                        {isValidSVG(child.icon) ? (
                          <SvgImage svgContent={child.icon} />
                        ) : (
                          <img src={child.icon} alt={child.name} width={24} height={24} />
                        )}
                        {child.name}
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ),
              )}
            </Menu>
          </div>
          <div
            className={`small_screen_menu_closer ${
              isMenuOpen ? "small_screen_menu_closer_open" : ""
            }`}
            onClick={toggleMenuOpen}></div>
        </>
      )}
      <div>
        {isMobile && (
          <div className="main_layout_small_screen_header">
            <Button type="text" onClick={toggleMenuOpen}>
              <BurgerMenuSVG />
            </Button>
            <Logo />
          </div>
        )}
        <div style={{ marginTop: isMobile ? "0.5rem" : "" }}>{children}</div>
      </div>
    </div>
  );
};

export default MobileLayout;
