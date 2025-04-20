import Sider from "antd/es/layout/Sider";

import { LinkIconSVG } from "assets/jsx-svg";

import WaitingRoom from "./WaitingRoom";
import SiderContent from "./SiderContent";
import "./styles.css";

function getItem(label, icon, key, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function LiveLeftSide({
  collapsed,
  setCollapsed,
  activeBtn,
  setActiveBtn,
  changeSettings,
  waitingList,
  setDragedParticipant,
  hostId,
  liveData,
  setPermissionBlockedModal,
  setStreamCrdential,
  setDeviceSettings,
  goLive,
  setShowSpeakerProfile,
  userRole,
  eventMetadata,
  setEventMetadata,
  talkbackLestineChannel,
  setTalkbackLestineChannel,
  toggleBackstage,
}) {
  const menuItems = [getItem("Links", <LinkIconSVG />, "links")];

  return (
    <Sider
      theme="light"
      collapsedWidth="64px"
      width={activeBtn === "chat" || activeBtn === "waitingRoom" ? "300px" : "240px"}
      collapsed={collapsed}
      onCollapse={(value) => {
        setActiveBtn(null);
        setCollapsed(value);
      }}
      className="live-left-side sm-hide">
      {activeBtn === "waitingRoom" && (
        <div style={{ padding: "2rem 1rem" }}>
          <WaitingRoom
            setActiveBtn={setActiveBtn}
            waitingList={waitingList}
            changeSettings={changeSettings}
          />
        </div>
      )}

      {activeBtn !== "chat" && activeBtn !== "waitingRoom" && (
        <SiderContent
          setDeviceSettings={setDeviceSettings}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          menuItems={menuItems}
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          setDragedParticipant={setDragedParticipant}
          hostId={hostId}
          liveData={liveData}
          setPermissionBlockedModal={setPermissionBlockedModal}
          setStreamCrdential={setStreamCrdential}
          goLive={goLive}
          setShowSpeakerProfile={setShowSpeakerProfile}
          userRole={userRole}
          eventMetadata={eventMetadata}
          setEventMetadata={setEventMetadata}
          talkbackLestineChannel={talkbackLestineChannel}
          setTalkbackLestineChannel={setTalkbackLestineChannel}
          toggleBackstage={toggleBackstage}
        />
      )}
    </Sider>
  );
}
