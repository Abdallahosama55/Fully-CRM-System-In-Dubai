import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { Avatar, Col, Row, Typography } from "antd";

import userContext from "context/userContext";
import { CloseSVG, FullScreenImageSVG, MuteVoiceSVG, VoiceSVG } from "assets/jsx-svg";
import avatar from "assets/images/avatar.png";
import DragContext from "../DragContext";
import FileViewer from "react-file-viewer";
import { TrackToggle, VideoTrack, useLocalParticipant } from "@livekit/components-react";
import { LocalVideoTrack, Track } from "livekit-client";
import { createUI } from "@netless/fastboard";
import UnityModalPopup from "components/UnityModalPopup";

const toAbsoluteUrl = (origin, pathname) => origin + pathname;

export default function SoloScreen({
  changeSettings,
  meetingSettings,
  screen,
  iframeRef,
  setIframeRef,
  setDimensionFrames,
  setAudioFrames,
  setCounterSharedData,
  setLiveStreamCameras,
  publishDim,
  type,
  isHost,
  toggleFullScreen,
  setFullscreen,
  sharingDimId,
  isMetaverseMeet,
  setMetaverseParticipants,
  deskId,
  isVirtual,
}) {
  const { user } = useContext(userContext);
  const [unityCanvas, setUnityCanvas] = useState();
  const [soloScreenFull, setSoloScreenFull] = useState(false);
  const { dragData, setDragData } = useContext(DragContext);
  const { meetingId } = useParams();
  const { localParticipant } = useLocalParticipant();
  const [whiteboardContainer, setWhiteboardContainer] = useState(undefined);
  const [unityModalOpen, setUnityModalOpen] = useState(null);

  const setUnityModalOpenFunc = (html, x, y, w, h) => {
    setUnityModalOpen({
      html,
      x,
      y,
      w,
      h,
    });
  };

  useEffect(() => {
    if (isMetaverseMeet) {
      setSoloScreenFull(false);
    }
  }, [isMetaverseMeet]);

  const unPublishDimScreen = useCallback(() => {
    const shareDimScreenTrack = localParticipant.getTrackPublicationByName("mainDimScreen");
    if (shareDimScreenTrack && shareDimScreenTrack.track) {
      localParticipant.unpublishTrack(shareDimScreenTrack.track);
    }
  }, [localParticipant]);

  const setFrames = (frames) => {
    setDimensionFrames(frames);
  };

  const setUnityAudioFrames = (audioFrames) => {
    setAudioFrames?.(audioFrames);
  };

  const setCounterFromUnity = (counter) => {
    setCounterSharedData(counter);
  };

  const setParticipants = (participants) => {
    setMetaverseParticipants(participants);
  };

  const setCamerasFromUnity = (cameras) => {
    setLiveStreamCameras(cameras);
  };

  const createLocalScreenTracks = useCallback(
    async (canvas) => {
      const stream = canvas.captureStream(30);
      const tracks = stream.getVideoTracks();

      const screenVideo = new LocalVideoTrack(tracks[0], undefined, false);
      screenVideo.source = Track.Source.ScreenShare;
      const localTracks = screenVideo;
      await localParticipant.publishTrack(localTracks, {
        name: "mainDimScreen",
      });
    },
    [localParticipant],
  );

  useEffect(() => {
    if (type === "metaverse" && sharingDimId && unityCanvas && isHost && localParticipant) {
      createLocalScreenTracks(unityCanvas);
    }
  }, [
    unityCanvas,
    publishDim,
    sharingDimId,
    type,
    isHost,
    localParticipant,
    createLocalScreenTracks,
  ]);

  useEffect(() => {
    if (
      type === "metaverse" &&
      iframeRef &&
      iframeRef.contentWindow &&
      sharingDimId !== "null" &&
      user.cGAccessToken
    ) {
      const configScript = iframeRef.contentWindow.document.createElement("script");

      const style = iframeRef.contentWindow.document.createElement("link");
      style.href = `${import.meta.env.VITE_WEBGL_URL}/style.css`;
      style.rel = "stylesheet";

      const div = iframeRef.contentWindow.document.createElement("div");
      div.innerHTML = `<div style='width: 100%; height: 100%' class='loading-holder'><video autoPlay muted loop style='width: 100%; height: 100%; object-fit: contain;' class='video-loading'><source src='${
        import.meta.env.VITE_WEBGL_URL
      }/dimension.mp4' type='video/mp4'/></video></div>`;
      div.id = "loading";
      div.className = "loading";

      const listScript = [
        "hls.min.js",
        "ReadyPlayerMeFrame.js",
        "Build/visit-dimension.loader.js",
        "AvaturnMeFrame.js",
      ];
      iframeRef.contentWindow.loadCounter = 0;
      listScript.forEach((ele) => {
        const scriptName = iframeRef.contentWindow.document.createElement("script");
        scriptName.src = `${import.meta.env.VITE_WEBGL_URL}/${ele}`;
        iframeRef.contentWindow.document.head.append(scriptName);
        scriptName.onload = (e) => {
          iframeRef.contentWindow.loadCounter++;
          if (iframeRef.contentWindow.loadCounter === listScript.length)
            setTimeout(iframeRef.contentWindow.loadUnity, 500);
        };
      });

      configScript.innerHTML = `
      var disableVoiceControls = true;
      var mainCanvas = document.getElementById("myCanvas");
      var mainContext = mainCanvas.getContext('2d');
      var inMemCanvas = document.getElementById("inMem_Canvas");
      var inMemContext = inMemCanvas.getContext('2d');
      var canvasWidth = mainCanvas.width;
      var canvasHeight = mainCanvas.height;
      var angle = 0;
      var isRent = false;
      var dimensionLink = "${
        window.location.origin
      }/metaverse?dimensionId={${sharingDimId}}&dimensionType={0}";
      var linkBase = "${window.location.origin}/";
      var dimensionId = ${sharingDimId};
      var dimensionType = 1;
      var accessToken = "${user.cGAccessToken}";
      var apiBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6/mobile-game/";
      var dimensionTag = 'VINDO_${meetingId}';
      var production = true;
      var socketBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/";
      var libraryApiBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6/mobile-game/";
      var storageBase = "https://chickchack.s3.eu-west-2.amazonaws.com"
      var isProduct = false;
      var isDeskHost = ${isHost ? true : false};
      var deskId = "${deskId}";
      var meetingId = ${+meetingId};
      var isVirtualCall = ${isVirtual};
      var defaultRoomName = ${+meetingId};
      var deafen = true;
      var buildUrl = '${import.meta.env.VITE_WEBGL_URL}/Build';
      var loaderUrl = buildUrl + '/visit-dimension.loader.js';
      var config = {
        dataUrl: buildUrl + '/visit-dimension.data.br',
        frameworkUrl: buildUrl + '/visit-dimension.framework.js.br',
        codeUrl: buildUrl + '/visit-dimension.wasm.br',
        streamingAssetsUrl: buildUrl + '/StreamingAssets',
        companyName: 'PiPhi Technology',
        productName: 'Visit Dimension',
        productVersion: '1.0',
      };

      var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loading = document.querySelector("#loading");
      var platform = 2; //1 mobile, 2 windows, 4 mac, 8 linux
      loading.style.display = "";

      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
        platform = 4;
      }
        
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        config.devicePixelRatio = 1;
        platform = 1;
      }

      window.onmessage = function(e) {
        try {
          if (e.data === "SetFullscreen") {
            window.unityInstance.SetFullscreen(true);
          }
        } catch(ignored) {}
      };
      `;

      const createUnityInstance = () => {
        iframeRef.contentWindow
          .createUnityInstance(
            iframeRef.contentWindow.canvas,
            iframeRef.contentWindow.config,
            (progress) => {
              console.log("progress", progress);
            },
          )
          .then((unityInstance) => {
            unityInstance.SendMessage(
              "BG_Scripts/Constatnts",
              "SetPlatform",
              iframeRef.contentWindow.platform,
            );

            iframeRef.contentWindow.openHTMLPopup = (html, x, y, w, h) => {
              setUnityModalOpenFunc(html, x, y, w, h);
            };

            iframeRef.contentWindow.onResponseInputRecived = (counter) => {
              setCounterFromUnity(counter);
            };

            iframeRef.contentWindow.onMetaverseUsersUpdate = (participants) => {
              setParticipants(participants);
            };

            iframeRef.contentWindow.updateLiveCameras = (cameras) => {
              setCamerasFromUnity(cameras);
            };

            iframeRef.contentWindow.updateDimensionFrames = (frames) => {
              setFrames(frames);
            };

            iframeRef.contentWindow.updateAudioSources = (frames) => {
              setUnityAudioFrames(frames);
            };

            // iframeRef.contentWindow.loading.style.display = "none";
            iframeRef.contentWindow.unityInstance = unityInstance;
            iframeRef.contentWindow.web3 = window.web3;
            iframeRef.contentWindow.ethereum = window.ethereum;
          })
          .catch((message) => {
            console.log("message", message);
          });
      };

      iframeRef.contentWindow.loadUnity = () => {
        iframeRef.contentWindow.lat = 25.0418278;
        iframeRef.contentWindow.lon = 55.2513757;

        createUnityInstance();
      };

      iframeRef.contentWindow.document.body.append(div);
      iframeRef.contentWindow.document.body.append(configScript);
      iframeRef.contentWindow.document.body.append(style);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeRef, sharingDimId, user.cGAccessToken]);

  const onDrop = useCallback(
    (e) => {
      e && e.preventDefault();
      const dimId = dragData.dimId;
      const file = dragData.file;

      if (dimId) {
        changeSettings("sharingDim", {
          dimId: "",
          sharing: false,
          usersJoinedDim: "[]",
        });
        unPublishDimScreen();
        // unPublishDim();
        setIframeRef(null);

        setTimeout(() => {
          changeSettings("sharingDim", {
            dimId,
            sharing: true,
            usersJoinedDim: JSON.stringify(user.id),
          });
        }, 200);
      } else if (file) {
        changeSettings("previewFile", JSON.stringify(file));
      }

      setDragData({
        dragging: false,
        dropText: "",
        dimId: null,
        file: null,
      });
    },
    [
      changeSettings,
      dragData.dimId,
      dragData.file,
      setDragData,
      setIframeRef,
      unPublishDimScreen,
      user.id,
    ],
  );
  useEffect(() => {
    if (dragData.isClick && dragData.dimId && window.innerWidth < 1180) {
      onDrop();
    }
  }, [dragData.dimId, dragData.isClick, onDrop]);

  useEffect(() => {
    if (
      screen &&
      whiteboardContainer &&
      meetingSettings.sharingWhiteboard !== "null" &&
      type === "whiteboard"
    ) {
      createUI(screen, whiteboardContainer);
    }
  }, [whiteboardContainer, meetingSettings.sharingWhiteboard, type, screen]);

  if (sharingDimId) {
    return (
      <div className={`solo-meeting-screen ${soloScreenFull && "solo-meeting-screen-full"}`}>
        {dragData.dragging && (
          <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="dragover-overlay">
            {dragData.dropText}
          </div>
        )}

        {unityModalOpen && (
          <UnityModalPopup setUnityModalOpen={setUnityModalOpen} unityModalOpen={unityModalOpen} />
        )}
        <iframe
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title="Explore Metaverse"
          ref={setIframeRef}>
          {iframeRef?.contentWindow?.document?.body &&
            createPortal(
              <>
                <div id="unity-container">
                  <div id="canvas-wrap">
                    <div id="avaturn-container" style={{ display: "none" }}>
                      <iframe
                        id="avaturn-iframe"
                        title="avaturn-iframe"
                        class="vto-frame"
                        allow="camera *; microphone *"></iframe>
                      <button id="vto-hide-button" onclick="window.hideIframe()">
                        Hide
                      </button>
                    </div>
                    <div id="rpm-container" style={{ display: "none" }}>
                      <iframe
                        title="rpm-frame"
                        id="rpm-frame"
                        className="rpm-frame"
                        allow="camera *; microphone *"></iframe>
                      <button id="rpm-hide-button" onClick="hideRpm()">
                        Hide
                      </button>
                    </div>
                    <canvas
                      ref={setUnityCanvas}
                      id="unity-canvas"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}></canvas>
                  </div>
                </div>
                <canvas
                  id="inMem_Canvas"
                  height="450"
                  width="450"
                  style={{ display: "none" }}></canvas>
                <canvas id="myCanvas" height="450" width="450" style={{ display: "none" }}></canvas>
              </>,
              iframeRef?.contentWindow?.document?.body,
            )}
        </iframe>

        {meetingSettings.sharingDim.usersJoinedDim.split(",").includes(user.id + "") &&
          !isMetaverseMeet && (
            <div
              className="screen-interaction-btn close clickable"
              onClick={() => {
                if (isHost) {
                  unPublishDimScreen();
                  // unPublishDim();
                  setIframeRef(null);
                  changeSettings("sharingDim", {
                    dimId: "",
                    sharing: false,
                    usersJoinedDim: "[]",
                  });
                } else {
                  // remove my self
                  setIframeRef(null);
                  const filterdData = meetingSettings.sharingDim.usersJoinedDim
                    .split(",")
                    .filter((id) => id !== user.id + "");
                  changeSettings("sharingDim/usersJoinedDim", filterdData.join(","));
                }
              }}>
              <CloseSVG color="#fff" style={{ width: "12px", height: "12px" }} />
            </div>
          )}
        <div
          className="screen-interaction-btn full-screen clickable"
          onClick={() => {
            toggleFullScreen();
            setSoloScreenFull((prev) => !prev);
          }}>
          <FullScreenImageSVG color="#fff" style={{ width: "12px", height: "12px" }} />
        </div>
      </div>
    );
  }

  if (type === "file") {
    const sharingFile = JSON.parse(meetingSettings.previewFile);

    if (!sharingFile) {
      return;
    }

    return (
      <div className={`solo-meeting-screen ${soloScreenFull && "solo-meeting-screen-full"}`}>
        {dragData.dragging && (
          <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="dragover-overlay">
            {dragData.dropText}
          </div>
        )}

        <div className="file-canvas">
          {sharingFile.isGoogleDrive ? (
            <iframe
              title="Google Drive Embed"
              style={{ width: "100%", height: "100%" }}
              src={sharingFile.embedUrl}
            />
          ) : (
            <FileViewer
              key={sharingFile.id}
              fileType={getFileTypeFromMimeType(sharingFile.type)}
              filePath={sharingFile.url}
              errorComponent={<h1>Error previewing the file</h1>}
              onError={(err) => console.log("FileViewer error:", err)}
            />
          )}
        </div>

        {isHost && (
          <div
            className="screen-interaction-btn close clickable"
            onClick={() => changeSettings("previewFile", "null")}>
            <CloseSVG color="#fff" style={{ width: "12px", height: "12px" }} />
          </div>
        )}
        <div
          className="screen-interaction-btn full-screen clickable"
          onClick={() => {
            toggleFullScreen();
            setSoloScreenFull((prev) => !prev);
          }}>
          <FullScreenImageSVG color="#fff" style={{ width: "12px", height: "12px" }} />
        </div>
      </div>
    );
  }

  if (type === "whiteboard") {
    return (
      <div className={`solo-meeting-screen ${soloScreenFull && "solo-meeting-screen-full"}`}>
        {dragData.dragging && (
          <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="dragover-overlay">
            {dragData.dropText}
          </div>
        )}

        <div id="whiteboard" ref={setWhiteboardContainer} className="whiteboard-canvas"></div>

        {isHost && (
          <div
            className="screen-interaction-btn close clickable"
            onClick={async () => {
              try {
                setWhiteboardContainer(null);
                changeSettings("sharingWhiteboard", "null");
              } catch (error) {
                console.log(error);
              }
            }}>
            <CloseSVG color="#fff" style={{ width: "12px", height: "12px" }} />
          </div>
        )}
        <div
          className="screen-interaction-btn full-screen clickable"
          onClick={() => {
            toggleFullScreen();
            setSoloScreenFull((prev) => !prev);
          }}>
          <FullScreenImageSVG color="#fff" style={{ width: "12px", height: "12px" }} />
        </div>
      </div>
    );
  }

  if (screen) {
    try {
      screen.data = JSON.parse(screen.metadata);
    } catch (Ignored) {
      screen.data = {};
    }
    return (
      <div className={`solo-meeting-screen ${soloScreenFull && "solo-meeting-screen-full"}`}>
        <div
          className={`meeting-screen-username ${
            screen.source === "screen_share" || screen.source === "camera" ? "bottom" : ""
          }`}>
          <Row gutter={[8, 0]} wrap={false} align="middle">
            <Col>
              <Typography.Text className="meeting-screen-username-text" ellipsis>
                {screen.name || screen.participant?.name}
              </Typography.Text>
            </Col>
            <Col>
              <Row align="middle">
                {screen.isMicrophoneEnabled || screen.participant?.isMicrophoneEnabled ? (
                  <VoiceSVG
                    color={screen.isSpeaking || screen.participant?.isSpeaking ? "#3A5EE3" : "#fff"}
                    style={{ width: "10px", height: "12px" }}
                  />
                ) : (
                  <MuteVoiceSVG color="#fff" style={{ width: "10px", height: "12px" }} />
                )}
              </Row>
            </Col>
          </Row>
        </div>

        {screen && screen.source && (
          <div className="video-player">
            <div className="livekit-video">
              <VideoTrack trackRef={screen} />
            </div>
          </div>
        )}

        {dragData.dragging && (
          <div onDragOver={(e) => e.preventDefault()} onDrop={onDrop} className="dragover-overlay">
            {dragData.dropText}
          </div>
        )}

        {!screen.source && (
          <Row gutter={[0, 16]}>
            <Col xs={24}>
              <Row justify="center">
                <Avatar
                  size={62}
                  src={
                    [null, undefined, "null", "undefined", ""].includes(screen.data.profileImage)
                      ? avatar
                      : screen.data.profileImage || avatar
                  }
                />
              </Row>
            </Col>
            <Col xs={24}>
              <Row justify="center">{screen.name || screen.participant?.name}</Row>
            </Col>
          </Row>
        )}

        {screen?.participant?.id === user.id && screen.source === "screen_share" && (
          <TrackToggle
            source={Track.Source.ScreenShare}
            showIcon={false}
            style={{
              background: "transparent",
              border: "none",
            }}>
            <div className="screen-interaction-btn close clickable">
              <CloseSVG color="#fff" style={{ width: "12px", height: "12px" }} />
            </div>
          </TrackToggle>
        )}

        {(screen.source === "screen_share" || screen.source === "camera") && (
          <div
            className="screen-interaction-btn full-screen clickable"
            onClick={() => {
              if (type === "shareScreen") {
                setFullscreen((prev) => !prev);
                toggleFullScreen();
              } else {
                toggleFullScreen();
                setSoloScreenFull((prev) => !prev);
              }
            }}>
            <FullScreenImageSVG color="#fff" style={{ width: "12px", height: "12px" }} />
          </div>
        )}
      </div>
    );
  }
}

const getFileTypeFromMimeType = (mime) => {
  if (mime.includes("pdf")) {
    return "pdf";
  } else if (mime.includes("jpg") || mime.includes("jpeg")) {
    return "jpeg";
  } else if (mime.includes("png")) {
    return "png";
  } else if (mime.includes("gif")) {
    return "gif";
  } else if (mime.includes("officedocument.wordprocessingml.document")) {
    return "docx";
  } else if (mime.includes("officedocument.spreadsheetml.sheet")) {
    return "xlsx";
  } else if (mime.includes("csv")) {
    return "csv";
  } else if (mime.includes("mp4")) {
    return "mp4";
  } else if (mime.includes("webm")) {
    return "webm";
  } else if (mime.includes("audio") && mime.includes("mpeg")) {
    return "mp3";
  } else {
    return mime;
  }
};
