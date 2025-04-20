import { useMemo, useState } from "react";
import { Col, message, Row, Typography } from "antd";

import DimensionFiles from "./DimensionFiles";
import DimensionFrame from "./DimensionFrame";
import { FullScreenImageSVG, RightSlideSVG } from "assets/jsx-svg";

export default function AdminContet({
  iframeRef,
  dragedMedia,
  setDragedMedia,
  dragedParticipant,
  frameFullScreen,
  setFrameFullScreen,
  liveData,
  setLiveData,
}) {
  const [activeTab, setActiveTab] = useState("media");
  const [framesToShow, setFramesToshow] = useState([]);

  const onDrop = async (e, screenId, frameName) => {
    e.preventDefault();

    if (dragedMedia && dragedMedia.type !== "audio" && activeTab === "audio") {
      message.info("Audio Frames Accept Audio Only!");
      return;
    }

    if (dragedMedia && dragedMedia.type === "audio" && activeTab === "media") {
      message.info("Media Frames Does Not Accept Audio!");
      return;
    }

    const newFrame = {
      name: frameName,
    };

    if (dragedMedia) {
      if (dragedMedia && activeTab === "audio") {
        newFrame.url = dragedMedia.file;
      } else {
        newFrame.texture = ["mp4", "mov", "wmv", "webM", "avi", "flv", "mkv", "mts"].includes(
          dragedMedia.file.split(".").pop(),
        )
          ? dragedMedia.file
          : dragedMedia.file + "?a=1";
      }
      setFramesToshow((prev) => {
        const foundIndex = prev.findIndex((frame) => frame.id === screenId);
        if (foundIndex > -1) {
          prev[foundIndex].type = dragedMedia.type;
          prev[foundIndex].images = dragedMedia.images;
          prev[foundIndex].image = dragedMedia.image;
          prev[foundIndex].currentSlide = 1;
          prev[foundIndex].texture = dragedMedia.file;

          if (dragedMedia.type !== "powerpoint" && dragedMedia.type !== "pdf") {
            prev[foundIndex].images = null;
            prev[foundIndex].currentSlide = 1;
          }

          if (dragedMedia.type === "video" || dragedMedia.type === "audio") {
            prev[foundIndex].playing = true;
            prev[foundIndex].mute = false;
          }

          return [...prev];
        }
      });
    }

    if (dragedMedia && dragedMedia.images) {
      newFrame.texture = dragedMedia.images[0] + "?a=1";
    }

    if (dragedParticipant && dragedParticipant.trackId) {
      newFrame.texture = "livekit://" + dragedParticipant.trackId;
      setFramesToshow((prev) => {
        const foundIndex = prev.findIndex((frame) => frame.id === screenId);
        if (foundIndex > -1) {
          prev[foundIndex].type = "shareScreen";

          prev[foundIndex].images = null;
          prev[foundIndex].currentSlide = 1;

          return [...prev];
        }
      });
    }

    if (iframeRef) {
      if (activeTab === "audio") {
        iframeRef?.contentWindow?.unityInstance?.SendMessage(
          "BG_Scripts/JsBridge",
          "SetAudioSourceUrl",
          JSON.stringify(newFrame),
        );
      } else {
        iframeRef?.contentWindow?.unityInstance?.SendMessage(
          "BG_Scripts/JsBridge",
          "SetFrameTexture",
          JSON.stringify(newFrame),
        );
      }
    }
    setDragedMedia(null);
  };

  const slideControl = (addedSlide) => {
    const frameFullScreenIndex = framesToShow?.findIndex((frame) => frame.id === frameFullScreen);
    if (frameFullScreenIndex > -1) {
      if (addedSlide < 0 && framesToShow[frameFullScreenIndex].currentSlide === 1) {
        return;
      } else if (
        addedSlide > 0 &&
        framesToShow[frameFullScreenIndex].images.length ===
          framesToShow[frameFullScreenIndex].currentSlide
      ) {
        return;
      } else {
        setFramesToshow((prev) => {
          prev[frameFullScreenIndex].currentSlide =
            prev[frameFullScreenIndex].currentSlide + addedSlide;

          iframeRef?.contentWindow?.unityInstance?.SendMessage(
            "BG_Scripts/JsBridge",
            "SetFrameTexture",
            JSON.stringify({
              name: prev[frameFullScreenIndex].name,
              texture:
                prev[frameFullScreenIndex].images[prev[frameFullScreenIndex].currentSlide - 1] +
                "?a=1",
            }),
          );
          return [...prev];
        });
      }
    }
  };

  const fullSCreenFrameIndex = useMemo(() => {
    return framesToShow?.findIndex((frame) => frame.id === frameFullScreen);
  }, [frameFullScreen, framesToShow]);

  return (
    <Row gutter={[8, 0]} className="h-100 live-page-media-tabs-children">
      {fullSCreenFrameIndex > -1 && (
        <div
          className="media-frame-full"
          style={{
            background: `url(${
              framesToShow[fullSCreenFrameIndex].images
                ? framesToShow[fullSCreenFrameIndex].images[
                    framesToShow[fullSCreenFrameIndex].currentSlide - 1
                  ]
                : framesToShow[fullSCreenFrameIndex].texture
            })`,
          }}>
          {(framesToShow[fullSCreenFrameIndex].type === "powerpoint" ||
            framesToShow[fullSCreenFrameIndex].type === "pdf") &&
            framesToShow[fullSCreenFrameIndex].images && (
              <>
                <div
                  className="toggle-full-screen"
                  onClick={() => setFrameFullScreen((prev) => (prev ? false : frameFullScreen))}>
                  <FullScreenImageSVG style={{ width: "14px", height: "14px" }} />
                </div>
                <div className="slider-counter">
                  {framesToShow[fullSCreenFrameIndex].currentSlide}/
                  {framesToShow[fullSCreenFrameIndex].images.length}
                </div>

                <div className="slider-arrows-holder">
                  <Row justify="space-between" align="middle">
                    <Col>
                      <div className="clickable right-slide-SVG" onClick={() => slideControl(-1)}>
                        <RightSlideSVG
                          style={{ rotate: "180deg", width: "25px" }}
                          color="#fff"
                          width={22}
                          height={22}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="clickable right-slide-SVG" onClick={() => slideControl(1)}>
                        <RightSlideSVG color="#fff" width={22} height={22} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            )}
        </div>
      )}
      <Col xs={24}>
        <Typography.Text className="fz-18 fw-700">Content</Typography.Text>
      </Col>
      <Col xs={24} style={{ height: "50%" }}>
        <DimensionFiles
          setDragedMedia={setDragedMedia}
          liveData={liveData}
          setLiveData={setLiveData}
        />
      </Col>
      <Col xs={24}>
        <Typography.Text className="fz-18 fw-700">Frames</Typography.Text>
      </Col>
      <Col xs={24} style={{ height: "50%" }}>
        <DimensionFrame
          framesToShow={framesToShow}
          onDropFun={onDrop}
          dragedMedia={dragedMedia}
          setFramesToshow={setFramesToshow}
          iframeRef={iframeRef}
          dragedParticipant={dragedParticipant}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setFrameFullScreen={setFrameFullScreen}
          liveData={liveData}
          setLiveData={setLiveData}
        />
      </Col>
    </Row>
  );
}
