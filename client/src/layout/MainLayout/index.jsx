import React, { memo, useMemo } from "react";
import { FloatButton, Grid, Tooltip } from "antd";
import MobileLayout from "./MobileLayout";
import LargeScreensLayout from "./LargeScreensLayout";
import { useUserContext } from "context/userContext";
import ScrollToTop from "components/ScrollToTop";
import RightDrawer from "components/RightDrawer";
import { UserSwitchOutlined } from "@ant-design/icons";

const MainLayout = ({ children }) => {
  const screen = Grid.useBreakpoint();
  const { user } = useUserContext();
  const menu = useMemo(() => user?.companyMenu || [], [user?.companyMenu]);
  const isInIframe = useMemo(() => window.self !== window.top, []);

  if (isInIframe) {
    return (
      <div style={{ marginInlineEnd: 0 }} className="main-layout">
        <ScrollToTop />
        <RightDrawer />
        {children}
      </div>
    );
  }

  // SCREEN LAYOUT
  return (
    <>
      <ScrollToTop />
      <RightDrawer />
      {localStorage.getItem("DMC_TOKEN") && (
        <Tooltip title={"Back To DMC Account"}>
          <FloatButton
            type="primary"
            icon={<UserSwitchOutlined />}
            onClick={() => {
              localStorage.setItem("vindo-token", localStorage.getItem("DMC_TOKEN"));
              localStorage.removeItem("DMC_TOKEN");
              window.location.reload();
            }}
          />
        </Tooltip>
      )}
      <LargeScreensLayout menu={menu} isMobile={!screen.lg && !screen.xl && !screen.xxl}>
        <MobileLayout menu={menu} isMobile={!screen.lg && !screen.xl && !screen.xxl}>
          {children}
        </MobileLayout>
      </LargeScreensLayout>
    </>
  );
};

export default memo(MainLayout);
