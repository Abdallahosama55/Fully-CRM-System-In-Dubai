import { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Track } from "livekit-client";

import SoloScreen from "./SoloScreen";
import userContext from "context/userContext";

import { useParticipants, useTracks } from "@livekit/components-react";

import "./styles.css";

export default function AllMeetingScreens({
  changeSettings,
  meetingSettings,
  isHost,
  setDimensionFrames,
  setLiveStreamCameras,
  iframeRef,
  setIframeRef,
  toggleFullScreen,
  fastboard,
  fullScreen,
  setFullscreen,
  isMetaverseMeet,
  setCounterSharedData,
  setMetaverseParticipants,
  deskId,
  isVirtual,
  setAudioFrames,
  activePanel,
}) {
  return (
    <Row gutter={[8, 8]} className="all-meeting-screens h-100 w-100">
      <Screens
        changeSettings={changeSettings}
        meetingSettings={meetingSettings}
        iframeRef={iframeRef}
        setIframeRef={setIframeRef}
        setDimensionFrames={setDimensionFrames}
        setCounterSharedData={setCounterSharedData}
        setLiveStreamCameras={setLiveStreamCameras}
        isHost={isHost}
        toggleFullScreen={toggleFullScreen}
        fullScreen={fullScreen}
        setFullscreen={setFullscreen}
        fastboard={fastboard}
        isMetaverseMeet={isMetaverseMeet}
        setMetaverseParticipants={setMetaverseParticipants}
        deskId={deskId}
        isVirtual={isVirtual}
        setAudioFrames={setAudioFrames}
        activePanel={activePanel}
      />
    </Row>
  );
}

const Screens = ({
  changeSettings,
  meetingSettings,
  iframeRef,
  setIframeRef,
  setDimensionFrames,
  setCounterSharedData,
  setLiveStreamCameras,
  isHost,
  toggleFullScreen,
  setFullscreen,
  fastboard,
  isMetaverseMeet,
  setMetaverseParticipants,
  deskId,
  isVirtual,
  setAudioFrames,
  activePanel,
}) => {
  const { user } = useContext(userContext);
  const soloScreenProps = {
    changeSettings,
    meetingSettings,
    iframeRef,
    setIframeRef,
    setDimensionFrames,
    setCounterSharedData,
    setLiveStreamCameras,
    isHost,
    toggleFullScreen,
    setFullscreen,
    isMetaverseMeet,
    setMetaverseParticipants,
    deskId,
    isVirtual,
    setAudioFrames,
  };

  const videoTracks = useTracks([
    { source: Track.Source.Camera },
    { source: Track.Source.ScreenShare },
  ]);

  const [filterdVideoTracks, setFilterdVideoTracks] = useState([]);

  useEffect(() => {
    if (videoTracks.length && isHost) {
      setFilterdVideoTracks(
        videoTracks.filter((track) => track.publication.trackName !== "mainDimScreen"),
      );
    } else {
      setFilterdVideoTracks(videoTracks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHost, videoTracks.length]);

  const allParticipants = useParticipants();

  if (
    meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "") ||
    meetingSettings.sharingWhiteboard !== "null" ||
    meetingSettings.previewFile !== "null"
  ) {
    // sharing whiteboard or dim or file
    return (
      <>
        {/* dim */}
        {meetingSettings.sharingDim.sharing &&
          meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "") && (
            <Col
              xs={24}
              style={{
                height:
                  activePanel === "productionTools" ||
                  (filterdVideoTracks.length === 0 &&
                    meetingSettings.previewFile === "null" &&
                    meetingSettings.sharingWhiteboard === "null")
                    ? "100%"
                    : "50%",
              }}>
              <SoloScreen
                {...soloScreenProps}
                sharingDimId={meetingSettings.sharingDim.dimId}
                type="metaverse"
              />
            </Col>
          )}
        {/* whiteboard */}
        {meetingSettings.sharingWhiteboard !== "null" && activePanel !== "productionTools" && (
          <Col
            xs={
              meetingSettings.previewFile !== "null" &&
              meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "")
                ? 12
                : 24
            }
            style={{
              height:
                filterdVideoTracks.length === 0 &&
                meetingSettings.previewFile === "null" &&
                !meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "")
                  ? "100%"
                  : "50%",
            }}>
            <SoloScreen {...soloScreenProps} type="whiteboard" screen={fastboard} />
          </Col>
        )}
        {/* file */}
        {meetingSettings.previewFile !== "null" && activePanel !== "productionTools" && (
          <Col
            xs={
              meetingSettings.sharingWhiteboard !== "null" &&
              meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "")
                ? 12
                : 24
            }
            style={{
              height:
                filterdVideoTracks.length === 0 &&
                meetingSettings.sharingWhiteboard === "null" &&
                !meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "")
                  ? "100%"
                  : "50%",
            }}>
            <SoloScreen {...soloScreenProps} type="file" />
          </Col>
        )}
        {/* dim or file or whiteboard with other videoScreens */}
        {allParticipants.length > 0 &&
          activePanel !== "productionTools" &&
          [
            meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + ""),
            JSON.parse(meetingSettings.previewFile),
            JSON.parse(meetingSettings.sharingWhiteboard),
          ].filter(Boolean).length === 1 && (
            <>
              {filterdVideoTracks.length > 0 &&
                filterdVideoTracks.map((screen) => (
                  <Col
                    key={screen.track?.sid}
                    xs={24}
                    lg={
                      filterdVideoTracks.length === 1
                        ? 24
                        : filterdVideoTracks.length === 2
                        ? 12
                        : filterdVideoTracks.length === 3
                        ? 8
                        : 12
                    }
                    style={{
                      height: filterdVideoTracks.length > 3 ? "24%" : "50%",
                    }}>
                    <SoloScreen {...soloScreenProps} screen={screen} />
                  </Col>
                ))}
            </>
          )}
      </>
    );
  }

  if (
    allParticipants.length > 0 &&
    filterdVideoTracks.length === 0 &&
    !meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "") &&
    meetingSettings.previewFile === "null" &&
    meetingSettings.sharingWhiteboard === "null"
  ) {
    return allParticipants.slice(0, 4).map((screen) => (
      <Col key={screen.id} xs={24} lg={allParticipants.length > 1 ? 12 : 24}>
        <SoloScreen {...soloScreenProps} screen={screen} />
      </Col>
    ));
  } else if (
    filterdVideoTracks.length > 0 &&
    !meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "") &&
    meetingSettings.previewFile === "null" &&
    meetingSettings.sharingWhiteboard === "null"
  ) {
    let hostMainShareScreen = filterdVideoTracks.find(
      (track) =>
        track.participant.id === meetingSettings.meetHost && track.source === "screen_share",
    );

    if (!hostMainShareScreen) {
      hostMainShareScreen = filterdVideoTracks.find((track) => track.source === "screen_share");
    }

    const otherScreens = filterdVideoTracks.filter(
      (track) => track?.publication.trackSid !== hostMainShareScreen?.publication.trackSid,
    );

    return (
      <>
        {hostMainShareScreen && (
          <Col xs={24}>
            <SoloScreen {...soloScreenProps} screen={hostMainShareScreen} />
          </Col>
        )}

        {otherScreens.length > 0 &&
          otherScreens.slice(0, 3).map((screen) => (
            <Col
              key={screen.track?.sid}
              xs={24}
              lg={otherScreens.length === 1 ? 24 : otherScreens.length === 2 ? 12 : 8}>
              <SoloScreen {...soloScreenProps} screen={screen} />
            </Col>
          ))}
      </>
    );
  } else if (
    allParticipants.length > 0 &&
    [
      meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + ""),
      JSON.parse(meetingSettings.previewFile),
      JSON.parse(meetingSettings.sharingWhiteboard),
    ].filter(Boolean).length === 1
  ) {
    return (
      <>
        {filterdVideoTracks.length < 4 &&
          filterdVideoTracks.map((screen) => (
            <Col
              key={screen.track?.sid}
              xs={24}
              lg={filterdVideoTracks.length === 1 ? 24 : filterdVideoTracks.length === 2 ? 12 : 8}>
              <SoloScreen {...soloScreenProps} screen={screen} />
            </Col>
          ))}
      </>
    );
  }
};
