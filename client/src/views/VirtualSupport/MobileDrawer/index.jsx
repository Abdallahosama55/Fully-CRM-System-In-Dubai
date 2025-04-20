import { Drawer } from "antd";
import MeetLeftSide from "../MeetLeftSide";

import "./styles.css";
import { useEffect } from "react";

export default function MobileDrawer({
  drawerOpen,
  setDrawerOpen,
  isHost,
  collapsed,
  setCollapsed,
  activeBtn,
  setActiveBtn,
  setHideSide,
  SystemMessage,
  setOpenMobileMenu,
  meetingSettings,
  changeSettings,
  meeting,
  showCounterBtn,
  isMetaverseMeet,
}) {
  useEffect(() => {
    if (window.innerWidth < 1200) {
      setCollapsed(false);
    }
  }, [setCollapsed]);

  return (
    <Drawer
      rootClassName="mobile-meet-drawer"
      placement="left"
      open={drawerOpen}
      onClose={() => {
        setActiveBtn(null);
        setDrawerOpen((prev) => !prev);
      }}
      closable={false}
      title=""
      footer=""
    >
      <MeetLeftSide
        meetingSettings={meetingSettings}
        changeSettings={changeSettings}
        isHost={isHost}
        forMobile={true}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
        setHideSide={setHideSide}
        SystemMessage={SystemMessage}
        setDrawerOpen={setDrawerOpen}
        setOpenMobileMenu={setOpenMobileMenu}
        meeting={meeting}
        showCounterBtn={showCounterBtn}
        isMetaverseMeet={isMetaverseMeet}
      />
    </Drawer>
  );
}
