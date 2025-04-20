import React, { Suspense, useEffect, useState } from "react";
import Header from "./Header";
// style
import "./styles.css";
import MainTab from "./MainTab";
import TabSubMenu from "./TabSubMenu";
import LoadingPage from "components/common/LoadingPage";
import { useToggle } from "hooks/useToggle";
import { useLocation } from "react-router-dom";
export const ONLINE_BOOKING_TAB_MENU_ITEM_KEY = "ONLINE_BOOKING_TAB_MENU_ITEM_KEY";
const LargeScreensLayout = ({ menu, children, isMobile }) => {
  const [activeSubMenuId, setActiveSubMenuId] = useState(undefined);
  const [isSubMenuOpen, toggleSubMenuOpen] = useToggle();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/") {
      toggleSubMenuOpen(true);
      let temp = undefined;
      menu.forEach((el) => {
        if (Array.isArray(el?.children)) {
          el?.children?.forEach((section) => {
            if (Array.isArray(section?.children)) {
              section?.children?.forEach((item) => {
                if (item?.index === pathname) {
                  temp = el?.id;
                }
              });
            }
          });
        }
      });
      setActiveSubMenuId(temp);
    }
  }, [menu]);
  
  return (
    <div className={`main_layout_large_screen ${!isMobile ? "not_mobile" : "is_mobile"}`}>
      {!isMobile && (
        <div className={`main_layout_large_screen_menu`}>
          <MainTab
            isOpen={isSubMenuOpen}
            toggleSubMenuOpen={toggleSubMenuOpen}
            setActiveSubMenuId={setActiveSubMenuId}
            menu={menu}
            activeSubMenuId={activeSubMenuId}
          />
        </div>
      )}
      {!isMobile && (
        <div
          className={`main_layout_large_screen_sub_menu ${isSubMenuOpen ? "sub_menu_open" : ""}`}>
          <TabSubMenu
            isSubMenuOpen={isSubMenuOpen}
            setActiveSubMenuId={setActiveSubMenuId}
            closeSubMenu={() => toggleSubMenuOpen(false)}
            subMenu={Array.isArray(menu) ? menu?.find((el) => el.id === activeSubMenuId) : []}
          />
        </div>
      )}
      <div
        className={`main_layout_large_screen_page_content ${isSubMenuOpen ? "sub_menu_open" : ""}`}>
        {!isMobile && <Header />}
        <div
          className="main_layout_large_screen_page_content_body"
          style={{ padding: !isMobile ? "0.5rem" : "" }}>
          <Suspense fallback={<LoadingPage />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default LargeScreensLayout;
