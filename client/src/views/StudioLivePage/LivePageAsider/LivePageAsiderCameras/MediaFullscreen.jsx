import { CloseCircleOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import videoImg from "assets/images/video.jpg";
import { NoSoundSVG, PauseButtonSVG, PlayButtonSVG, RightSlideSVG, SoundSVG } from "assets/jsx-svg";

export default function MediaFullscreen({
  isSelected,
  isFirstFullScreen = false,
  onDropFun,
  setMediaFullScreen,
  screen,
  iframeRef,
  setFullSCreenCamera,
}) {
  const slideControl = (addedSlide) => {
    if (addedSlide < 0 && screen.currentSlide === 1) {
      return;
    } else if (addedSlide > 0 && screen.images.length === screen.currentSlide) {
      return;
    } else {
      setMediaFullScreen((prev) => {
        prev.currentSlide = prev.currentSlide + addedSlide;
        setFullSCreenCamera("media", { ...prev }, true);
        return { ...prev };
      });
    }
  };

  const handleToggleMute = () => {
    setMediaFullScreen((prev) => {
      if (prev.mute) {
        setCameraLiveStreamData("unmute");
      } else {
        setCameraLiveStreamData("mute");
      }
      prev.mute = !prev.mute;
      return { ...prev };
    });
  };

  const handleTogglePlaying = () => {
    setMediaFullScreen((prev) => {
      if (prev.playing) {
        setCameraLiveStreamData("pause");
      } else {
        setCameraLiveStreamData("play");
      }
      prev.playing = !prev.playing;
      return { ...prev };
    });
  };

  // mediaAction types ==> play, pause, mute, unmute
  const setCameraLiveStreamData = (mediaAction) => {
    if (!isSelected) return;
    iframeRef?.contentWindow?.unityInstance?.SendMessage(
      "BG_Scripts/JsBridge",
      "SetCameraLiveStreamData",
      JSON.stringify({
        mediaAction,
      }),
    );
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropFun(e, isFirstFullScreen ? 1 : 2)}
      className="dimension-frame-frame media-full-screen"
      style={{
        background: `url(${
          !isTextureVideo(screen.images ? screen.images[screen.currentSlide - 1] : screen.texture)
            ? screen.images
              ? screen.images[screen.currentSlide - 1]
              : screen.type === "audio"
              ? screen.image || videoImg
              : screen.texture || videoImg
            : screen.image || videoImg
        })`,
      }}>
      {(screen.type === "powerpoint" || screen.type === "pdf") && screen.images && (
        <>
          <div className="slider-counter">
            {screen.currentSlide}/{screen.images.length}
          </div>

          <div className="slider-arrows-holder">
            <Row justify="space-between" align="middle">
              <Col>
                <div
                  className="clickable right-slide-SVG"
                  onClick={(e) => {
                    e.stopPropagation();
                    slideControl(-1);
                  }}>
                  <RightSlideSVG
                    style={{ rotate: "180deg", width: "25px" }}
                    color="#fff"
                    width={22}
                    height={22}
                  />
                </div>
              </Col>
              <Col>
                <div
                  className="clickable right-slide-SVG"
                  onClick={(e) => {
                    e.stopPropagation();
                    slideControl(1);
                  }}>
                  <RightSlideSVG color="#fff" width={22} height={22} />
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
      <div
        className="drag-and-drop-close"
        onClick={(e) => {
          e.stopPropagation();
          setMediaFullScreen(null);
        }}>
        <CloseCircleOutlined style={{ color: "#fff" }} />
      </div>

      {screen.type === "video" && (
        <>
          <div
            className="video-frame-audio"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMute();
            }}>
            {screen.mute ? (
              <NoSoundSVG color="#fff" style={{ width: "14px", height: "10px" }} />
            ) : (
              <SoundSVG color="#fff" style={{ width: "14px", height: "10px" }} />
            )}
          </div>
          <div
            className="video-frame-play"
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePlaying();
            }}>
            {screen.playing ? (
              <PauseButtonSVG fill="#fff" style={{ width: "14px", height: "10px" }} />
            ) : (
              <PlayButtonSVG fill="#fff" style={{ width: "14px", height: "10px" }} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

const isTextureVideo = (texture) => {
  if (!texture) return false;
  const arrayOfTexture = texture.split(".");
  if (
    arrayOfTexture.length &&
    ["mp4", "mov", "wmv", "webM", "avi", "flv", "mkv", "mts"].includes(
      arrayOfTexture[arrayOfTexture.length - 1],
    )
  ) {
    return true;
  } else {
    return false;
  }
};
