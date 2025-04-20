import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalParticipant } from "@livekit/components-react";
import { Col, ColorPicker, InputNumber, message, Row, Tooltip, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { axiosCatch } from "utils/axiosUtils";
import LiveStreamService from "services/liveStream.service";
import { Live2SVG, PauseButtonSVG, PlayButtonSVG } from "assets/jsx-svg";

export default function LivePageAsiderActions({
  selectedCam,
  liveStarted,
  setLiveStarted,
  selectedColor,
  setSelectedColor,
  fadeDuration,
  setFadeDuration,
  isFadeEnabled,
  setIsFadeEnabled,
  iframeRef,
  readyToStream,
  goLive,
  streamCrdential,
  setGoLive,
  customerDimensionId,
  hostId,
  setSelectedCam,
}) {
  const { localParticipant } = useLocalParticipant();
  const [goLiveLoading, setGoLiveLoading] = useState(false);
  const { liveId } = useParams();

  const onAirStart = () => {
    if (selectedCam) {
      setLiveStarted((prev) => !prev);
      const liveObj = {
        name: selectedCam.name.includes("fullScreenFromFront$$") ? "" : selectedCam.name,
        mediaVolume: 1,
        fadeDuration,
        fadeColor: selectedColor,
      };
      if (selectedCam.screen) {
        if (selectedCam.screen.id) {
          if (selectedCam.screen.type === "video") {
            liveObj.url = selectedCam.screen.file;
          } else {
            liveObj.url =
              selectedCam.screen.type === "pdf"
                ? selectedCam.screen.images
                  ? selectedCam.screen.images[selectedCam.screen.currentSlide - 1] + "?a=1"
                  : selectedCam.screen.image + "?a=1"
                : selectedCam.screen.file + "?a=1";
          }
        } else {
          const trackSid = selectedCam.screen?.publication?.trackSid;
          liveObj.url = `livekit://${trackSid}`;
        }
      }
      if (selectedCam && selectedCam.name.includes("fullScreenFromFront$$")) {
        liveObj.trackSid = selectedCam.trackSid;
      }
      if (!isFadeEnabled) {
        delete liveObj.fadeColor;
        delete liveObj.fadeDuration;
      }
      if (iframeRef) {
        iframeRef?.contentWindow?.unityInstance.SendMessage(
          "BG_Scripts/JsBridge",
          "StartCameraLiveStream",
          JSON.stringify(liveObj),
        );
      }
    } else {
      message.info("Select cam first");
    }
  };

  const onAirStop = () => {
    setLiveStarted((prev) => !prev);
    setSelectedCam(null);
    if (iframeRef) {
      iframeRef?.contentWindow?.unityInstance.SendMessage(
        "BG_Scripts/JsBridge",
        "StopCameraLiveStream",
      );
    }
  };

  const onAirFade = () => {
    setIsFadeEnabled((prev) => !prev);
    if (liveStarted && !isFadeEnabled) {
      const liveObj = {
        name: selectedCam.name.includes("fullScreenFromFront$$") ? "fullScreen" : selectedCam.name,
        fadeColor: selectedColor,
      };
      if (selectedCam && selectedCam.name.includes("fullScreenFromFront$$")) {
        liveObj.trackSid = selectedCam.trackSid;
      }

      if (iframeRef) {
        iframeRef?.contentWindow?.unityInstance.SendMessage(
          "BG_Scripts/JsBridge",
          "StartCameraLiveStream",
          JSON.stringify(liveObj),
        );
      }
    }
  };

  const startLive = async () => {
    if (!streamCrdential) {
      message.info("You have to add Live Keys first!");
      return;
    }
    try {
      setGoLiveLoading(true);
      const liveVideoCanvas = localParticipant.getTrackPublicationByName("liveVideoCanvas");

      if (liveVideoCanvas) {
        await LiveStreamService.goLive(liveId, {
          customerDimensionId,
          room: "verse-live-" + customerDimensionId,
          otherLinks: [streamCrdential] || [],
        });
        if (iframeRef) {
          iframeRef?.contentWindow?.unityInstance.SendMessage("BG_Scripts/JsBridge", "ToggleHudUI");
        }
        setGoLive((prev) => !prev);
      } else {
        message.error("The share screen for the unity not found, refresh and try again");
        console.log("liveVideoCanvas", liveVideoCanvas);
      }
    } catch (err) {
      axiosCatch(err);
      console.log(err);
    } finally {
      setGoLiveLoading(false);
    }
  };

  const endLive = async () => {
    try {
      setGoLiveLoading(true);

      await LiveStreamService.endLive(liveId, {
        customerDimensionId,
      });

      if (iframeRef) {
        iframeRef?.contentWindow?.unityInstance.SendMessage("BG_Scripts/JsBridge", "ToggleHudUI");
      }
      setGoLive((prev) => !prev);
    } catch (err) {
      axiosCatch(err);
      console.log(err);
    } finally {
      setGoLiveLoading(false);
    }
  };

  return (
    <Row gutter={[32, 12]}>
      <Col xs={24} lg={12}>
        <Typography.Text className="fz-16 fw-600">Transition</Typography.Text>
        <Row justify="space-between" align="middle" className="live-actions w-100">
          <Col>
            <ColorPicker onChange={(e) => setSelectedColor(e.toHexString())}>
              <div className="live-actions-btns">
                <div className="live-actions-color-btn" style={{ background: selectedColor }} />
                <Typography.Text className="fz-12 fw-500">Color</Typography.Text>
              </div>
            </ColorPicker>
          </Col>
          <Col>
            <div className="live-actions-btns">
              <div className="live-actions-transition-duration">
                <InputNumber
                  defaultValue={0.2}
                  onChange={(e) => setFadeDuration(e)}
                  value={fadeDuration}
                  size="small"
                  style={{
                    height: "20px",
                    width: "40px",
                    lineHeight: "20px",
                    padding: 0,
                    background: "transparent",
                    border: "none",
                    fontSize: "12px",
                  }}
                  max={5}
                  min={0}
                  step={0.1}
                  controls={false}
                />
              </div>
              <Typography.Text className="fz-12 fw-500">Duration</Typography.Text>
            </div>
          </Col>
          <Col>
            <div className="live-actions-btns">
              <div
                className="live-actions-transition-active"
                style={{
                  color: isFadeEnabled ? "#fff" : "",
                  background: isFadeEnabled ? "#2b66cd" : "",
                }}
                onClick={onAirFade}>
                {isFadeEnabled ? "On" : "Off"}
              </div>
              <Typography.Text className="fz-12 fw-500">Fade</Typography.Text>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={12}>
        <Typography.Text className="fz-16 fw-600">Live Stream</Typography.Text>
        <div className="live-actions">
          <Row justify="space-between" align="middle" className="w-100">
            <Col>
              <Row gutter={[32, 0]} align="middle" wrap={false}>
                <Col>
                  <div
                    className="live-actions-btns clickable"
                    style={{ pointerEvents: liveStarted && "none" }}
                    onClick={() => {
                      if (liveStarted) return;
                      onAirStart();
                    }}>
                    <PlayButtonSVG fill={liveStarted ? "#aeaeb2" : null} />
                    <Typography.Text className="fz-12 fw-500">Play</Typography.Text>
                  </div>
                </Col>
                <Col>
                  <div
                    className="live-actions-btns clickable"
                    style={{ pointerEvents: !liveStarted && "none" }}
                    onClick={() => {
                      if (!liveStarted) return;
                      onAirStop();
                    }}>
                    <PauseButtonSVG fill={liveStarted && "#3a5ee3"} />
                    <Typography.Text className="fz-12 fw-500">Pause</Typography.Text>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row gutter={[12, 12]} align="middle" justify="space-between">
                <Col>
                  {goLive && (
                    <div className="live-page-live">
                      <Row gutter={[8, 0]} align="middle" wrap={false}>
                        <Col>
                          <div className="live-page-live-dot"></div>
                        </Col>
                        <Col>Live</Col>
                      </Row>
                    </div>
                  )}
                </Col>
                <Col>
                  {hostId && (
                    <Tooltip
                      title={
                        goLive
                          ? "End Live"
                          : readyToStream
                          ? "Go Live!"
                          : "There must be at least one speaker, active your mic"
                      }>
                      <div
                        className="live-page-live-status"
                        onClick={() => {
                          if (!readyToStream) {
                            message.info("There must be at least one speaker, active your mic");
                            return;
                          }
                          if (goLiveLoading) return;
                          if (goLive) {
                            endLive();
                          } else {
                            startLive();
                          }
                        }}
                        style={{
                          background: readyToStream ? goLive && "#AEAEB2" : "#ccc",
                          cursor: readyToStream ? "pointer" : "not-allowed",
                          pointerEvents: goLiveLoading && "none",
                        }}>
                        {goLiveLoading ? (
                          <LoadingOutlined />
                        ) : (
                          <Row align="middle" gutter={[8, 0]}>
                            <Col>
                              <Row align="middle">
                                <Live2SVG fill="#fff" />
                              </Row>
                            </Col>
                            <Col>{goLive ? "Ends" : "Go" + " Live"} </Col>
                          </Row>
                        )}
                      </div>
                    </Tooltip>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
}
