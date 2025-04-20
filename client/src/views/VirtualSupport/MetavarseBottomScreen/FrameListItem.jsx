import { Tooltip, Typography, Row, Col } from "antd";
import {
  DocumentSVG,
  NoSoundSVG,
  PauseButtonSVG,
  PlayButtonSVG,
  RightSlideSVG,
  SoundSVG,
  SoundWavesSVG,
} from "assets/jsx-svg";
import { useMemo } from "react";
import "./styles.css";
import { isVideoFile } from "utils/filesUtils";
import { useMetavarseBottomScreenContext } from "./context/metavarseBottomScreenContext";

export default function FrameListItem({ frame, onDrop }) {
  const { framesState, iframeRef, setFramesState, selectedMediaType } =
    useMetavarseBottomScreenContext();
  const currentFrameState = useMemo(() => framesState[frame.name] || frame, [framesState, frame]);

  const isVideo = isVideoFile(
    currentFrameState.images
      ? currentFrameState.images[currentFrameState.currentSlide - 1]
      : currentFrameState.texture,
  );

  const slideControl = (addedSlide) => {
    const currentFrameState = framesState[frame.name];
    const isFirstSlide = currentFrameState.currentSlide === 1;
    const isLastSlide = currentFrameState.images.length === currentFrameState.currentSlide;

    if (addedSlide < 0 && isFirstSlide) {
      return;
    } else if (addedSlide > 0 && isLastSlide) {
      return;
    } else {
      setFramesState((prevFramesState) => {
        const frameState = { ...(prevFramesState[frame.name] ?? {}) };
        frameState.currentSlide = (frameState.currentSlide ?? 0) + addedSlide;

        iframeRef?.contentWindow?.unityInstance?.SendMessage(
          "BG_Scripts/JsBridge",
          "SetFrameTexture",
          JSON.stringify({
            name: frame.name,
            texture: frameState.images[frameState.currentSlide - 1] + "?a=1",
          }),
        );

        return { ...prevFramesState, [frame.name]: frameState };
      });
    }
  };

  const setAudioFrameAction = (action) => {
    iframeRef?.contentWindow?.unityInstance?.SendMessage(
      "BG_Scripts/JsBridge",
      "SetAudioSourceAction",
      JSON.stringify({
        name: frame.name,
        action,
      }),
    );
  };

  const setFrameAction = (action) => {
    iframeRef?.contentWindow?.unityInstance?.SendMessage(
      "BG_Scripts/JsBridge",
      "SetFrameAction",
      JSON.stringify({
        name: frame.name,
        action,
      }),
    );
  };

  const handleToggleMute = () => {
    setFramesState((prev) => {
      const frameState = { ...(prev[frame.name] ?? {}) };
      if (frameState.mute) {
        if (frameState.type === "audio") {
          setAudioFrameAction("unmute");
        } else {
          setFrameAction("unmute");
        }
      } else {
        if (frameState.type === "audio") {
          setAudioFrameAction("mute");
        } else {
          setFrameAction("mute");
        }
      }
      frameState.mute = !frameState.mute;
      return { ...prev, [frame.name]: frameState };
    });
  };

  const handleTogglePlaying = () => {
    setFramesState((prev) => {
      const frameState = { ...(prev[frame.name] ?? {}) };
      if (frameState.playing) {
        if (frameState.type === "audio") {
          setAudioFrameAction("pause");
        } else {
          setFrameAction("pause");
        }
      } else {
        if (frameState.type === "audio") {
          setAudioFrameAction("play");
        } else {
          setFrameAction("play");
        }
      }
      frameState.playing = !frameState.playing;

      return { ...prev, [frame.name]: frameState };
    });
  };

  const backgroundImageUrl = currentFrameState.images
    ? currentFrameState.images[currentFrameState.currentSlide - 1]
    : currentFrameState.image || currentFrameState.texture;

  const backgroundImage = !isVideo && backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined;
  const isAudio = selectedMediaType === "AUDIO";
  const isNone = !isVideo && !isAudio && !backgroundImage;
  const isSharing = currentFrameState.texture?.includes("livekit:");

  return (
    <div className="frame-list-item">
      <div
        className="frame"
        style={
          isAudio
            ? {
                border: "1px solid #A4ADDE",
                background: "#DEE2F6",
              }
            : isNone
            ? {
                border: "1px solid #D59C9C",
                background: "#ECD0D0",
              }
            : undefined
        }
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, frame.name)}>
        {(currentFrameState.type === "powerpoint" || currentFrameState.type === "pdf") &&
          currentFrameState.images && (
            <>
              <div className="slider-counter" onDrop={(e) => onDrop(e, frame.name)}>
                {currentFrameState.currentSlide}/{currentFrameState.images.length}
              </div>

              <div className="slider-arrows-holder" onDrop={(e) => onDrop(e, frame.name)}>
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
        {(currentFrameState.type === "video" ||
          currentFrameState.type === "audio" ||
          selectedMediaType === "AUDIO") && (
          <>
            <div className="video-frame-audio" onClick={handleToggleMute}>
              {!!currentFrameState.mute ? (
                <NoSoundSVG color="#fff" style={{ width: "14px", height: "10px" }} />
              ) : (
                <SoundSVG color="#fff" style={{ width: "14px", height: "10px" }} />
              )}
            </div>
            <div className="video-frame-play" onClick={handleTogglePlaying}>
              {!!currentFrameState.playing ? (
                <PauseButtonSVG fill="#fff" style={{ width: "14px", height: "10px" }} />
              ) : (
                <PlayButtonSVG fill="#fff" style={{ width: "14px", height: "10px" }} />
              )}
            </div>
          </>
        )}
        <div
          className="image"
          style={{
            backgroundImage,
          }}>
          {isVideo && (
            <video width="100%" height="100%" autoPlay muted>
              <source src={currentFrameState.texture} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {isAudio && !backgroundImage && <SoundWavesSVG width={35} height={35} />}
          {isNone && <DocumentSVG width={35} height={35} />}
          {isSharing && <>Sharing Data</>}
        </div>
      </div>
      <Tooltip title={frame.name}>
        <Typography.Text strong ellipsis style={{ maxWidth: "70%" }}>
          {frame.name}
        </Typography.Text>
      </Tooltip>
    </div>
  );
}
