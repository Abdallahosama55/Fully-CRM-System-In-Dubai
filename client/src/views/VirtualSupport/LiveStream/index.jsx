import { useEffect } from "react";
import { Button, Col, Image, Row, Tooltip, Typography } from "antd";

import { WifiOutlined } from "@ant-design/icons";
import { ArrowRightSVG } from "assets/jsx-svg";

import "./styles.css";

export default function LiveStream({
  activeBtn,
  setActiveBtn,
  selectedCam,
  setSelectedCam,
  liveStreamCameras,
  liveStarted,
  setLiveStarted,
  iframeRef,
  deskIframeRef,
  fadeColor,
  setFadeColor,
  isFadeEnabled,
  setIsFadeEnabled,
}) {
  const onAirStart = () => {
    setLiveStarted((prev) => !prev);

    const liveObj = {
      name: selectedCam.name,
      fadeColor: fadeColor,
    };
    if (!isFadeEnabled) {
      delete liveObj.fadeColor;
    }
    console.log("StartCameraLiveStream", liveObj);
    if (deskIframeRef) {
      console.log("deskIframeRef entered");
      deskIframeRef?.contentWindow?.unityInstance.SendMessage(
        "BG_Scripts/JsBridge",
        "StartCameraLiveStream",
        JSON.stringify(liveObj),
      );
    } else {
      console.log("entered iframeRef");
      iframeRef?.contentWindow?.unityInstance.SendMessage(
        "BG_Scripts/JsBridge",
        "StartCameraLiveStream",
        JSON.stringify(liveObj),
      );
    }
  };

  const onAirStop = () => {
    setLiveStarted((prev) => !prev);
    if (deskIframeRef) {
      deskIframeRef?.contentWindow?.unityInstance.SendMessage(
        "BG_Scripts/JsBridge",
        "StopCameraLiveStream",
      );
    } else {
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
        name: selectedCam.name,
        fadeColor: fadeColor,
      };

      if (deskIframeRef) {
        deskIframeRef?.contentWindow?.unityInstance.SendMessage(
          "BG_Scripts/JsBridge",
          "StartCameraLiveStream",
          JSON.stringify(liveObj),
        );
      } else {
        iframeRef?.contentWindow?.unityInstance.SendMessage(
          "BG_Scripts/JsBridge",
          "StartCameraLiveStream",
          JSON.stringify(liveObj),
        );
      }
    }
  };

  useEffect(() => {
    if (iframeRef) {
      iframeRef.contentWindow?.unityInstance?.SendMessage(
        "BG_Scripts/JsBridge",
        "GetLiveCameras",
      );
    } else if (deskIframeRef) {
      deskIframeRef.deskIframeRef?.unityInstance?.SendMessage(
        "BG_Scripts/JsBridge",
        "GetLiveCameras",
      );
    }
  }, [activeBtn, deskIframeRef, iframeRef]);

  return (
    <section className="live-stream-section">
      <Row
        wrap={false}
        align="middle"
        gutter={[8, 0]}
        style={{ width: "fit-content" }}
        className="clickable"
        onClick={() => setActiveBtn("tools")}
      >
        <Col>
          <Row align="middle">
            <ArrowRightSVG color="#8E8E93" style={{ rotate: "180deg" }} />
          </Row>
        </Col>
        <Col>
          <Typography.Text className="gc">Back</Typography.Text>
        </Col>
      </Row>

      <Row gutter={[0, 10]} style={{ marginTop: "24px" }}>
        <Col xs={24}>
          <Typography.Text className="fz-22 fw-500">Livestream</Typography.Text>
        </Col>
        <Col xs={24}>
          <Typography.Text className="fz-20">
            set Livestream Keys
          </Typography.Text>
        </Col>
      </Row>

      <Row gutter={[16, 10]} className="mt-1">
        <Col xs={24}>
          <Typography.Text className="fz-20">Screens</Typography.Text>
        </Col>

        <Col
          xs={24}
          style={{
            maxHeight: "322px",
            overflowY: "auto",
          }}
        >
          <Row gutter={[16, 16]}>
            {liveStreamCameras?.map((cam) => (
              <Col key={cam.name} xs={24} md={12} lg={8}>
                <div
                  className="live-stream-cam clickable"
                  onClick={() => {
                    setSelectedCam(cam);
                    const liveObj = {
                      name: cam.name,
                      fadeColor: fadeColor,
                    };
                    if (!isFadeEnabled) {
                      delete liveObj.fadeColor;
                    }
                    if (liveStarted) {
                      console.log(
                        "StartCameraLiveStream on camera click",
                        liveObj,
                      );

                      iframeRef?.contentWindow?.unityInstance.SendMessage(
                        "BG_Scripts/JsBridge",
                        "StartCameraLiveStream",
                        JSON.stringify(liveObj),
                      );
                    }
                  }}
                >
                  <Image
                    src={`data:image/jpeg;base64, ${cam.preview}`}
                    alt={cam.name}
                    preview={false}
                    width="100%"
                    height="100%"
                  />
                </div>

                <Tooltip title={cam.name}>
                  <Typography.Text ellipsis>{cam.name}</Typography.Text>
                </Tooltip>
              </Col>
            ))}
          </Row>
        </Col>

        {selectedCam && (
          <>
            <Col xs={24}>
              <Typography.Text className="fz-22 fw-500">On Air</Typography.Text>
            </Col>
            <Col xs={24}>
              <div className="live-stream-cam">
                <Image
                  src={`data:image/jpeg;base64, ${selectedCam.preview}`}
                  alt={selectedCam.name}
                  preview={false}
                  width="100%"
                  height="100%"
                />
              </div>

              <Tooltip title={selectedCam.name}>
                <Typography.Text ellipsis>{selectedCam.name}</Typography.Text>
              </Tooltip>
            </Col>

            {isFadeEnabled && (
              <Col xs={24}>
                <Row>
                  <Col xs={24}>
                    <Typography.Text>Pick a Fade Color:</Typography.Text>
                  </Col>
                  <Col xs={24}>
                    <input
                      type="color"
                      defaultValue={fadeColor}
                      className="color-picker"
                      onBlur={(e) => {
                        setFadeColor(e.target.value);
                        const liveObj = {
                          name: selectedCam.name,
                          fadeColor: e.target.value,
                        };
                        if (liveStarted) {
                          console.log(
                            "StartCameraLiveStream with fade",
                            liveObj,
                          );

                          iframeRef?.contentWindow?.unityInstance.SendMessage(
                            "BG_Scripts/JsBridge",
                            "StartCameraLiveStream",
                            JSON.stringify(liveObj),
                          );
                        }
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            )}
            <Col xs={24}>
              <Row justify="space-between" gutter={[12, 12]}>
                <Col>
                  <Button
                    disabled={liveStarted}
                    onClick={onAirStart}
                    className="live-stream-btn"
                    style={{
                      background: "transparent",
                      border: "2px solid #000",
                      padding: "0px 14px",
                    }}
                  >
                    <Row align={"middle"} gutter={[12, 0]}>
                      <Col>
                        <div
                          className="live-stream-btn-dot"
                          style={{
                            background: "#f00",
                          }}
                        />
                      </Col>
                      <Col>
                        <Typography.Text className="fz-16">
                          Start
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Button>
                </Col>

                <Col>
                  <Button
                    className="w-100"
                    onClick={onAirFade}
                    style={{
                      background: "transparent",
                      border: `2px solid ${
                        isFadeEnabled && fadeColor ? fadeColor : "#000"
                      }`,
                      padding: "0px 14px",
                    }}
                  >
                    <Row align={"middle"} gutter={[12, 0]}>
                      <Col>
                        <WifiOutlined
                          style={{
                            color: `${
                              isFadeEnabled && fadeColor ? fadeColor : "#000"
                            }`,
                          }}
                        />
                      </Col>
                      <Col>
                        <Typography.Text
                          className="fz-16"
                          style={{
                            color: `${
                              isFadeEnabled && fadeColor ? fadeColor : "#000"
                            }`,
                          }}
                        >
                          {isFadeEnabled ? "Disable" : "Enable"} Fade
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Button>
                </Col>

                <Col>
                  <Button
                    disabled={!liveStarted}
                    onClick={onAirStop}
                    style={{
                      background: "transparent",
                      border: "2px solid #000",
                      padding: "0px 14px",
                    }}
                  >
                    <Row align={"middle"} gutter={[12, 0]}>
                      <Col>
                        <div className="live-stream-btn-dot" />
                      </Col>
                      <Col>
                        <Typography.Text className="fz-16">
                          Stop
                        </Typography.Text>
                      </Col>
                    </Row>
                  </Button>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </section>
  );
}
