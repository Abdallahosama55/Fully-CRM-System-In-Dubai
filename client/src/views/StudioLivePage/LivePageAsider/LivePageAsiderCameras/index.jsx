import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Flex, message, Row, Tooltip, Typography } from "antd";
import {
  useLocalParticipant,
  useParticipants,
  useTracks,
  VideoTrack,
} from "@livekit/components-react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Track } from "livekit-client";

import Cameras from "./Cameras";
import MediaFullscreen from "./MediaFullscreen";

import "./styles.css";

export default function LivePageAsiderCameras({
  camerasFromUnity,
  selectedCam,
  setSelectedCam,
  selectedColor,
  isFadeEnabled,
  liveStarted,
  iframeRef,
  dimLoaded,
  dragedParticipant,
  dragedMedia,
  fadeDuration,
}) {
  const videoTracks = useTracks([
    { source: Track.Source.Camera },
    { source: Track.Source.ScreenShare },
  ]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [firstFullScreenDrop, setFirstFullScreenDrop] = useState(null);
  const [secondeFullScreenDrop, setSecondeFullScreenDrop] = useState(null);
  const [tempTrack, setTempTrack] = useState(null);
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();

  useEffect(() => {
    if (iframeRef && dimLoaded) {
      iframeRef.contentWindow?.unityInstance?.SendMessage("BG_Scripts/JsBridge", "GetLiveCameras");
    }
  }, [iframeRef, dimLoaded, refreshCount]);

  const onDrop = (e, screenId) => {
    e.preventDefault();

    if (dragedMedia && dragedMedia.type === "audio") {
      message.info("Audio media not allowed in full screen");
      return;
    }
    if (dragedMedia) {
      if (dragedMedia.type === "video" && dragedMedia.file.split(".").pop() !== "mp4") {
        message.info("Video media must be .mp4");
        return;
      }
      dragedMedia.type = dragedMedia.type;
      dragedMedia.images = dragedMedia.images;
      dragedMedia.image = dragedMedia.image;
      dragedMedia.currentSlide = 1;
      dragedMedia.texture = dragedMedia.file;

      if (dragedMedia.type !== "powerpoint" && dragedMedia.type !== "pdf") {
        dragedMedia.images = null;
        dragedMedia.currentSlide = 1;
      }

      if (dragedMedia.type === "video" || dragedMedia.type === "audio") {
        dragedMedia.playing = true;
        dragedMedia.mute = false;
      }
      if (screenId === 1) {
        setFirstFullScreenDrop({ isMedia: true, ...dragedMedia });
      } else {
        setSecondeFullScreenDrop({ isMedia: true, ...dragedMedia });
      }

      if (
        selectedCam &&
        ((selectedCam.name === "fullScreenFromFront$$1" && screenId === 1) ||
          (selectedCam.name === "fullScreenFromFront$$2" && screenId === 2))
      ) {
        setFullSCreenCamera("media", { isMedia: true, ...dragedMedia });
      }
    }

    if (dragedParticipant) {
      const draggedParticipant = participants.find(
        (participant) => participant.name === dragedParticipant.name,
      );

      if (draggedParticipant) {
        const draggedTrackSid = videoTracks.find(
          (videoTrack) => videoTrack.publication.trackSid === dragedParticipant.trackId,
        );
        if (draggedTrackSid) {
          if (screenId === 1) {
            setFirstFullScreenDrop(draggedTrackSid);
          } else {
            setSecondeFullScreenDrop(draggedTrackSid);
          }
          if (
            selectedCam &&
            ((selectedCam.name === "fullScreenFromFront$$1" && screenId === 1) ||
              (selectedCam.name === "fullScreenFromFront$$2" && screenId === 2))
          ) {
            setFullSCreenCamera("livekit", draggedTrackSid);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (videoTracks) {
      if (
        firstFullScreenDrop &&
        !firstFullScreenDrop.isMedia &&
        !videoTracks.find(
          (videoTrack) =>
            videoTrack?.publication.trackSid === firstFullScreenDrop?.publication.trackSid,
        )
      ) {
        setFirstFullScreenDrop(null);
      }

      if (
        secondeFullScreenDrop &&
        !secondeFullScreenDrop.isMedia &&
        !videoTracks.find(
          (videoTrack) =>
            videoTrack?.publication.trackSid === secondeFullScreenDrop?.publication.trackSid,
        )
      ) {
        setSecondeFullScreenDrop(null);
      }
    }
  }, [firstFullScreenDrop, secondeFullScreenDrop, videoTracks]);

  const setFullSCreenCamera = (type = "media", fullScreenDrop, fromSlide = false) => {
    if (fromSlide && (!selectedCam || !selectedCam.name.includes("fullScreenFromFront"))) {
      return;
    }
    const liveObj = {
      name: "",
      url:
        type === "media"
          ? fullScreenDrop.type === "pdf"
            ? fullScreenDrop.images
              ? fullScreenDrop.images[fullScreenDrop.currentSlide - 1] + "?a=1"
              : fullScreenDrop.image + "?a=1"
            : fullScreenDrop.type === "image"
            ? fullScreenDrop.file + "?a=1"
            : fullScreenDrop.file
          : `livekit://${fullScreenDrop}`,
      fadeColor: selectedColor,
      fadeDuration,
      mediaVolume: 1,
    };

    if (!isFadeEnabled) {
      delete liveObj.fadeColor;
      delete liveObj.fadeDuration;
    }

    if (liveStarted) {
      iframeRef?.contentWindow?.unityInstance.SendMessage(
        "BG_Scripts/JsBridge",
        "StartCameraLiveStream",
        JSON.stringify(liveObj),
      );
    }
  };

  const replaceLocalScreenTracks = useCallback(async () => {
    // Capture new screen share with audio
    // setTempTrack(null)
    const shareScreen = localParticipant.localParticipant.getTrackPublicationByName("shareScreen");
    const liveVideoCanvas =
      localParticipant.localParticipant.getTrackPublicationByName("liveVideoCanvas");

    if (tempTrack) {
      if (liveVideoCanvas) {
        await liveVideoCanvas.track.replaceTrack(tempTrack);
        setTempTrack(null);
        return;
      }
    } else {
      try {
        setTempTrack(liveVideoCanvas.track.mediaStreamTrack);
        // Replace video track
        if (liveVideoCanvas) {
          await liveVideoCanvas.track.replaceTrack(shareScreen.track.mediaStreamTrack);
        }
      } catch (err) {
        console.log("Error replacing tracks:", err);
      }
    }
  }, [localParticipant.localParticipant, tempTrack]);

  const isSharescreenShared = useMemo(() => {
    const shareScreen = localParticipant.localParticipant.getTrackPublicationByName("shareScreen");
    const liveVideoCanvas =
      localParticipant.localParticipant.getTrackPublicationByName("liveVideoCanvas");
    if (liveVideoCanvas && shareScreen) {
      return true;
    } else {
      return false;
    }
  }, [localParticipant.localParticipant.videoTrackPublications.size]);

  return (
    <>
      <Row justify="space-between" style={{ marginTop: "22px" }}>
        <Col flex={1}>
          <Typography.Text className="fz-16 fw-600">Cameras</Typography.Text>
        </Col>
        <Col>
          <Flex align="center" gap={12}>
            <Tooltip title={isSharescreenShared ? "" : "You can switch only when share a screen"}>
              <Button
                style={{ borderRadius: "1rem" }}
                size="small"
                className="fz-12 center-items"
                type="primary"
                disabled={!isSharescreenShared}
                onClick={replaceLocalScreenTracks}>
                Switch Between Metaverse and Sharescreen
              </Button>
            </Tooltip>
            <Button
              style={{ width: "100px", borderRadius: "1rem" }}
              size="small"
              className="fz-12 center-items"
              type="primary"
              onClick={() => setRefreshCount((prev) => prev + 1)}>
              Refresh
            </Button>
          </Flex>
        </Col>
      </Row>
      <Row gutter={[12, 12]} className="mt-1">
        <Col xs={24} lg={14}>
          <Cameras
            camerasFromUnity={camerasFromUnity}
            selectedCam={selectedCam}
            setSelectedCam={setSelectedCam}
            selectedColor={selectedColor}
            isFadeEnabled={isFadeEnabled}
            liveStarted={liveStarted}
            iframeRef={iframeRef}
            fadeDuration={fadeDuration}
          />
        </Col>
        <Col xs={24} lg={10}>
          <Row gutter={[0, 24]}>
            <Col xs={24}>
              <Row>
                <Col xs={24} className="dimension-frame-frame-holder">
                  {firstFullScreenDrop ? (
                    firstFullScreenDrop.isMedia ? (
                      <div
                        style={{
                          borderRadius: "16px",
                          border:
                            selectedCam?.name === "fullScreenFromFront$$1" && "2px solid blue",
                        }}
                        onClick={() => {
                          if (!selectedCam || selectedCam.name !== "fullScreenFromFront$$1") {
                            setSelectedCam({
                              name: "fullScreenFromFront$$1",
                              screen: firstFullScreenDrop,
                            });
                            setFullSCreenCamera("media", firstFullScreenDrop);
                          }
                        }}>
                        <MediaFullscreen
                          isSelected={selectedCam && selectedCam.name === "fullScreenFromFront$$1"}
                          iframeRef={iframeRef}
                          isFirstFullScreen={true}
                          setMediaFullScreen={setFirstFullScreenDrop}
                          onDropFun={onDrop}
                          screen={firstFullScreenDrop}
                          setFullSCreenCamera={setFullSCreenCamera}
                        />
                      </div>
                    ) : (
                      <div
                        onDrop={(e) => onDrop(e, 1)}
                        onDragOver={(e) => e.preventDefault()}
                        className="drag-and-drop"
                        style={{
                          borderRadius: "16px",
                          border:
                            selectedCam?.name === "fullScreenFromFront$$1" && "2px solid blue",
                        }}
                        onClick={() => {
                          const trackId = firstFullScreenDrop?.publication?.trackSid;

                          if (
                            !selectedCam ||
                            (trackId &&
                              selectedCam &&
                              selectedCam.name !== "fullScreenFromFront$$1")
                          ) {
                            setSelectedCam({
                              name: "fullScreenFromFront$$1",
                              screen: firstFullScreenDrop,
                            });
                            setFullSCreenCamera("livekit", trackId);
                          }
                        }}>
                        <div
                          className="drag-and-drop-close"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFirstFullScreenDrop(null);
                          }}>
                          <CloseCircleOutlined style={{ color: "#fff" }} />
                        </div>
                        <div className="video-player">
                          <div className="livekit-video">
                            <VideoTrack trackRef={firstFullScreenDrop} />
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div
                      className="drag-and-drop"
                      onDrop={(e) => onDrop(e, 1)}
                      onDragOver={(e) => e.preventDefault()}>
                      {dragedParticipant ? "Drop Here" : "FullScreen Drop 1"}
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={24} className="dimension-frame-frame-holder">
              <Row>
                <Col xs={24}>
                  {secondeFullScreenDrop ? (
                    secondeFullScreenDrop.isMedia ? (
                      <div
                        style={{
                          borderRadius: "16px",
                          border:
                            selectedCam?.name === "fullScreenFromFront$$2" && "2px solid blue",
                        }}
                        onClick={() => {
                          if (!selectedCam || selectedCam.name !== "fullScreenFromFront$$2") {
                            setSelectedCam({
                              name: "fullScreenFromFront$$2",
                              screen: secondeFullScreenDrop,
                            });
                            setFullSCreenCamera("media", secondeFullScreenDrop);
                          }
                        }}>
                        <MediaFullscreen
                          isSelected={selectedCam && selectedCam.name === "fullScreenFromFront$$2"}
                          iframeRef={iframeRef}
                          setMediaFullScreen={setSecondeFullScreenDrop}
                          onDropFun={onDrop}
                          screen={secondeFullScreenDrop}
                          setFullSCreenCamera={setFullSCreenCamera}
                        />
                      </div>
                    ) : (
                      <div
                        onDrop={(e) => onDrop(e, 2)}
                        onDragOver={(e) => e.preventDefault()}
                        className="drag-and-drop"
                        style={{
                          borderRadius: "16px",
                          border:
                            selectedCam?.name === "fullScreenFromFront$$2" && "2px solid blue",
                        }}
                        onClick={() => {
                          const trackId = secondeFullScreenDrop?.publication?.trackSid;

                          if (
                            !selectedCam ||
                            (trackId &&
                              selectedCam &&
                              selectedCam.name !== "fullScreenFromFront$$2")
                          ) {
                            setSelectedCam({
                              name: "fullScreenFromFront$$2",
                              screen: secondeFullScreenDrop,
                            });
                            setFullSCreenCamera("livekit", trackId);
                          }
                        }}>
                        <div
                          className="drag-and-drop-close"
                          onClick={(e) => {
                            console.log("testsetset");
                            e.stopPropagation();
                            setSecondeFullScreenDrop(null);
                          }}>
                          <CloseCircleOutlined style={{ color: "#fff" }} />
                        </div>
                        <div className="video-player">
                          <div className="livekit-video">
                            <VideoTrack trackRef={secondeFullScreenDrop} />
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div
                      className="drag-and-drop"
                      onDrop={(e) => onDrop(e, 2)}
                      onDragOver={(e) => e.preventDefault()}>
                      {dragedParticipant ? "Drop Here" : "FullScreen Drop 2"}
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
