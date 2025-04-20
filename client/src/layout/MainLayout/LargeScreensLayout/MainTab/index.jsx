import React, { useMemo } from "react";
// style
import "./styles.css";
import { Button, Typography } from "antd";
import SvgImage from "components/common/SvgImage";
import { useLocation, useNavigate } from "react-router-dom";
import { ONLINE_BOOKING_TAB_MENU_ITEM_KEY } from "..";
import CloseSubMenuSVG from "assets/jsx-svg/CloseSubMenuSVG";
import OpenSubMenuSVG from "assets/jsx-svg/OpenSubMenuSVG";
import HomeSVG2 from "assets/jsx-svg/HomeSVG2";
import HomeActiveSVG from "assets/jsx-svg/HomeActiveSVG";
import HomeSVG from "assets/jsx-svg/HomeSVG";
const MainTab = ({ menu, isOpen, setActiveSubMenuId, activeSubMenuId, toggleSubMenuOpen }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isToggleMenuDisabled = useMemo(
    () => activeSubMenuId === ONLINE_BOOKING_TAB_MENU_ITEM_KEY,
    [activeSubMenuId],
  );
  return (
    <div className="main_tab">
      <Button
        className={`main_tab_button ${isToggleMenuDisabled ? "disabled" : ""}`}
        size="small"
        type="text"
        icon={
          isOpen ? (
            <CloseSubMenuSVG color={isToggleMenuDisabled ? "#D0D5DD" : "currentColor"} />
          ) : (
            <OpenSubMenuSVG color={isToggleMenuDisabled ? "#D0D5DD" : "currentColor"} />
          )
        }
        onClick={!isToggleMenuDisabled ? toggleSubMenuOpen : () => {}}
      />
      <Button
        className={`main_tab_button ${pathname === "/" ? "active" : ""}`}
        size="small"
        type="text"
        icon={pathname === "/" ? <HomeActiveSVG /> : <HomeSVG />}
        onClick={() => {
          navigate("/");
          toggleSubMenuOpen(false);
        }}
      />
      {menu?.map((menuItem) => {
        return (
          <div key={menuItem?.id}>
            <Button
              className={`main_tab_button ${activeSubMenuId === menuItem?.id ? "active" : ""}`}
              size="small"
              type="text"
              icon={(() => {
                if (!menuItem?.icon && !menuItem?.activeIcon) {
                  return <HomeSVG2 />;
                }

                return (
                  <SvgImage
                    className="main_tab_button-icon"
                    svgContent={
                      menuItem?.id === activeSubMenuId
                        ? menuItem?.activeIcon || menuItem?.icon
                        : menuItem?.icon || menuItem?.activeIcon
                    }
                  />
                );
              })()}
              onClick={() => {
                if (menuItem?.index) {
                  navigate(menuItem?.index);
                  toggleSubMenuOpen(false);
                } else {
                  toggleSubMenuOpen(true);
                }
                setActiveSubMenuId(menuItem?.id);
              }}
            />
            <Typography.Paragraph
              ellipsis={{ tooltip: menuItem?.group }}
              className="side_menu_label">
              {menuItem?.group}
            </Typography.Paragraph>
          </div>
        );
      })}
    </div>
  );
};

export default MainTab;
