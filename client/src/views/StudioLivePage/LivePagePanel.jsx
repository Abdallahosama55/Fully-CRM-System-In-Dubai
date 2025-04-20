import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Col, Row, Modal } from "antd";

import LiveLeftSide from "./LiveLeftSide";
import LivePageAsider from "./LivePageAsider";
import SystemNotifiactions from "./SystemNotifiactions";
import LivePageContent from "./LivePageContent";
import OverlayModal from "./OverlayModal";
import HandelEvents from "./HandelEvents";
import SpeakerProfile from "./SpeakerProfile";

export default function LivePagePanel({
  waitingList,
  changeSettings,
  hostId,
  liveData,
  setLiveData,
  setPermissionBlockedModal,
  setDeviceSettings,
  goLive,
  setGoLive,
  eventMetadata,
  setEventMetadata,
  isHost,
  talkbackLestineChannel,
  setTalkbackLestineChannel,
  toggleBackstage,
}) {
  let [searchParams] = useSearchParams();
  const [iframeRef, setIframeRef] = useState(null);
  const [dragedParticipant, setDragedParticipant] = useState(null);
  const [overLayModalOpen, setOverLayModalOpen] = useState(false);
  const [dragedMedia, setDragedMedia] = useState(null);
  const [streamCrdential, setStreamCrdential] = useState(null);
  const [frameFullScreen, setFrameFullScreen] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeBtn, setActiveBtn] = useState(null);
  const [showSpeakerProfile, setShowSpeakerProfile] = useState(false);
  const [userRole, setUserRole] = useState(() => searchParams.get("role") || "admin");
  const [activeContentTab, setActiveContentTab] = useState(() =>
    userRole === "admin" ? "admin" : "moderate",
  );
  const [handRaisedUsers, setHandRaisedUsers] = useState([]);

  // useMemo for static components
  const liveLeftSide = useMemo(
    () => (
      <LiveLeftSide
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
        waitingList={waitingList}
        changeSettings={changeSettings}
        setDragedParticipant={setDragedParticipant}
        hostId={hostId}
        setPermissionBlockedModal={setPermissionBlockedModal}
        setStreamCrdential={setStreamCrdential}
        setDeviceSettings={setDeviceSettings}
        liveData={liveData?.data}
        goLive={goLive}
        setShowSpeakerProfile={setShowSpeakerProfile}
        userRole={userRole}
        eventMetadata={eventMetadata}
        setEventMetadata={setEventMetadata}
        talkbackLestineChannel={talkbackLestineChannel}
        setTalkbackLestineChannel={setTalkbackLestineChannel}
        toggleBackstage={toggleBackstage}
      />
    ),
    [
      collapsed,
      activeBtn,
      waitingList,
      changeSettings,
      hostId,
      setPermissionBlockedModal,
      setDeviceSettings,
      liveData?.data,
      goLive,
      userRole,
      eventMetadata,
      setEventMetadata,
      talkbackLestineChannel,
      setTalkbackLestineChannel,
      toggleBackstage,
    ],
  );

  const livePageContent = useMemo(
    () => (
      <LivePageContent
        iframeRef={iframeRef}
        dragedMedia={dragedMedia}
        setDragedMedia={setDragedMedia}
        dragedParticipant={dragedParticipant}
        frameFullScreen={frameFullScreen}
        setFrameFullScreen={setFrameFullScreen}
        liveData={liveData}
        setLiveData={setLiveData}
        userRole={userRole}
        setActiveContentTab={setActiveContentTab}
        eventMetadata={eventMetadata}
        setEventMetadata={setEventMetadata}
        handRaisedUsers={handRaisedUsers}
      />
    ),
    [
      iframeRef,
      dragedMedia,
      dragedParticipant,
      frameFullScreen,
      liveData,
      setLiveData,
      userRole,
      eventMetadata,
      setEventMetadata,
      handRaisedUsers,
    ],
  );

  const livePageAsider = useMemo(
    () => (
      <LivePageAsider
        iframeRef={iframeRef}
        setOverLayModalOpen={setOverLayModalOpen}
        setGoLive={setGoLive}
        goLive={goLive}
        hostId={hostId}
        streamCrdential={streamCrdential}
        customerDimensionId={liveData?.data?.customerDimensionId}
        setIframeRef={setIframeRef}
        liveData={liveData}
        activeContentTab={activeContentTab}
        dragedParticipant={dragedParticipant}
        dragedMedia={dragedMedia}
        setHandRaisedUsers={setHandRaisedUsers}
      />
    ),
    [
      iframeRef,
      setGoLive,
      goLive,
      hostId,
      streamCrdential,
      liveData,
      activeContentTab,
      dragedParticipant,
      dragedMedia,
    ],
  );

  return (
    <Row className="live-page" gutter={[16, 0]} wrap={false}>
      <Col>{liveLeftSide}</Col>
      <Col flex={1} style={{ position: "relative" }}>
        {showSpeakerProfile && (
          <div className="live-speaker-profile">
            <SpeakerProfile setShowSpeakerProfile={setShowSpeakerProfile} />
          </div>
        )}
        <Row className="h-100">
          <Col xs={24} lg={13}>
            <main className="live-page-main">{livePageContent}</main>
          </Col>
          <Col xs={24} lg={11} className="h-100">
            {livePageAsider}
          </Col>
        </Row>
      </Col>
      <HandelEvents
        setEventMetadata={setEventMetadata}
        isHost={isHost}
        talkbackLestineChannel={talkbackLestineChannel}
      />
      <SystemNotifiactions
        waitingList={waitingList}
        setCollapsed={setCollapsed}
        setActiveBtn={setActiveBtn}
        hostId={hostId}
      />
      <Modal
        width={550}
        footer={false}
        closeIcon={false}
        destroyOnClose
        open={overLayModalOpen}
        onCancel={() => setOverLayModalOpen(false)}
        centered>
        <OverlayModal
          setOverLayModalOpen={setOverLayModalOpen}
          overLayModalOpen={overLayModalOpen}
        />
      </Modal>
    </Row>
  );
}
