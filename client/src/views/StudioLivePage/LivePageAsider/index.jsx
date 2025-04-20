import { useMemo, useState } from "react";
import { Skeleton, Typography } from "antd";

import LiveUnity from "../LiveUnity";
import LivePageAsiderCameras from "./LivePageAsiderCameras";
import LivePageAsiderActions from "./LivePageAsiderActions";

import "./styles.css";

export default function LivePageAsider({
  iframeRef,
  setOverLayModalOpen,
  setGoLive,
  goLive,
  hostId,
  streamCrdential,
  customerDimensionId,
  setIframeRef,
  liveData,
  activeContentTab,
  dragedParticipant,
  dragedMedia,
  setHandRaisedUsers,
}) {
  const [selectedColor, setSelectedColor] = useState("#000");
  const [fadeDuration, setFadeDuration] = useState(0.2);
  const [liveStarted, setLiveStarted] = useState(false);
  const [selectedCam, setSelectedCam] = useState(null);
  const [isFadeEnabled, setIsFadeEnabled] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [camerasFromUnity, setCamerasFromUnity] = useState([]);
  const [dimLoaded, setDimLoaded] = useState(false);
  const [readyToStream, setReadyToStream] = useState(false);

  const liveUnity = useMemo(
    () => (
      <LiveUnity
        setIsFullScreen={setIsFullScreen}
        isFullScreen={isFullScreen}
        iframeRef={iframeRef}
        setIframeRef={setIframeRef}
        setCamerasFromUnity={setCamerasFromUnity}
        dimLoaded={dimLoaded}
        setDimLoaded={setDimLoaded}
        setReadyToStream={setReadyToStream}
        hostId={hostId}
        liveData={liveData}
        activeContentTab={activeContentTab}
        setHandRaisedUsers={setHandRaisedUsers}
      />
    ),
    [
      isFullScreen,
      iframeRef,
      setIframeRef,
      dimLoaded,
      hostId,
      liveData,
      activeContentTab,
      setHandRaisedUsers,
    ],
  );

  if (!liveData) {
    return <Skeleton />;
  }

  return (
    <section className="live-page-asider">
      {liveUnity}

      {activeContentTab === "speaker" ? (
        <div style={{ marginTop: "8px" }}>
          <Typography.Text className="fw-600">Content Shared</Typography.Text>
          <div
            style={{
              height: "43vh",
              border: "1px solid #ccc",
              borderRadius: "1rem",
              marginTop: "8px",
            }}></div>
        </div>
      ) : (
        <>
          <LivePageAsiderActions
            selectedCam={selectedCam}
            liveStarted={liveStarted}
            setLiveStarted={setLiveStarted}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            isFadeEnabled={isFadeEnabled}
            setIsFadeEnabled={setIsFadeEnabled}
            iframeRef={iframeRef}
            readyToStream={readyToStream}
            goLive={goLive}
            streamCrdential={streamCrdential}
            setGoLive={setGoLive}
            customerDimensionId={customerDimensionId}
            hostId={hostId}
            fadeDuration={fadeDuration}
            setFadeDuration={setFadeDuration}
            setSelectedCam={setSelectedCam}
          />

          <LivePageAsiderCameras
            camerasFromUnity={camerasFromUnity}
            selectedCam={selectedCam}
            setSelectedCam={setSelectedCam}
            selectedColor={selectedColor}
            fadeDuration={fadeDuration}
            isFadeEnabled={isFadeEnabled}
            liveStarted={liveStarted}
            iframeRef={iframeRef}
            setOverLayModalOpen={setOverLayModalOpen}
            dimLoaded={dimLoaded}
            dragedParticipant={dragedParticipant}
            dragedMedia={dragedMedia}
          />
        </>
      )}
    </section>
  );
}
