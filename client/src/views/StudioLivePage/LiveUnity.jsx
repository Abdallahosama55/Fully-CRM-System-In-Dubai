import { useEffect, useContext, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalParticipant, useRoomContext } from "@livekit/components-react";
import { LocalAudioTrack, LocalVideoTrack, Track } from "livekit-client";
import { Col, Row } from "antd";

import userContext from "context/userContext";
import { FullScreenImageSVG } from "assets/jsx-svg";
import UnityModalPopup from "components/UnityModalPopup";
import { QUERY_KEY } from "services/constants";

export default function LiveUnity({
  setIsFullScreen,
  isFullScreen,
  iframeRef,
  setIframeRef,
  setCamerasFromUnity,
  dimLoaded,
  setDimLoaded,
  setReadyToStream,
  hostId,
  liveData,
  activeContentTab,
  setHandRaisedUsers,
}) {
  const { user } = useContext(userContext);
  const { liveId } = useParams();
  const [unityCanvas, setUnityCanvas] = useState(null);
  const [unityModalOpen, setUnityModalOpen] = useState(null);
  const queryClient = useQueryClient();

  const { localParticipant } = useLocalParticipant();
  const room = useRoomContext();

  console.log("localParticipant", localParticipant);

  const mountNode = iframeRef?.contentWindow?.document?.body;

  const setUnityModalOpenFunc = (html, x, y, w, h) => {
    setUnityModalOpen({
      html,
      x,
      y,
      w,
      h,
    });
  };

  const setUnityHandRaisedUsers = (userId) => {
    setHandRaisedUsers((prev) => [...prev, userId]);
  };

  const setUnityDimensionSaved = () => {
    queryClient.refetchQueries({
      queryKey: [QUERY_KEY.LIST_DIEMNSION_FRAMES, "MEDIA" + liveData.data.customerDimensionId],
    });

    queryClient.refetchQueries({
      queryKey: [QUERY_KEY.LIST_DIEMNSION_FRAMES, "AUDIO" + liveData.data.customerDimensionId],
    });
  };

  const setUnityCamerasFrom = (cameras) => {
    setCamerasFromUnity(cameras);
  };

  const setUnityLoaded = () => {
    setDimLoaded(true);
  };

  useEffect(() => {
    const toggleUIUnity = (e) => {
      if (e.keyCode === 70 || e.keyCode === 72) {
        iframeRef?.contentWindow?.unityInstance?.SendMessage("BG_Scripts/JsBridge", "ToggleHudUI");
      }
    };
    document.addEventListener("keydown", toggleUIUnity, false);

    () => {
      document.removeEventListener("keydown", toggleUIUnity, false);
    };
  }, [iframeRef]);

  useEffect(() => {
    if (iframeRef && iframeRef.contentWindow && user.cGAccessToken) {
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
        scriptName.onload = () => {
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
          var dimensionLink = "${window.location.origin}/metaverse?dimensionId={${
        liveData.data.customerDimensionId
      }}&dimensionType={0}";
          var linkBase = "${window.location.origin}/";
          var dimensionId = ${liveData.data.customerDimensionId};
          var dimensionType = 1;
          var accessToken = "${user.cGAccessToken}";
          var apiBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6/mobile-game/";
          var libraryApiBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6/mobile-game/";
          var production = true;
          var socketBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/";
          var storageBase = "https://chickchack.s3.eu-west-2.amazonaws.com";
          var isProduct = false;
          var isGuest = ${user.isGuest ? true : false};
          var dimensionTag = "${
            liveData.data.accessLevel === "INVITED_MEMBERS" ? "VINDO_" + liveData.data.id : "VINDO"
          }";
          var defaultRoomName = 'verse-live-${liveData.data.customerDimensionId}'
          var deafen = true;
          var startPlace = "${liveData.data.speakerDimensionDropPoint}";
          
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
    
          if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            config.devicePixelRatio = 1;
            platform = 1;
          }
    
          if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
            platform = 4;
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

            const audioContext = unityInstance.Module.WEBAudio?.audioContext;
            if (!audioContext) {
              console.log("WEBAudio audioContext is null !!!");
            }

            iframeRef.contentWindow.updateLiveCameras = (cameras) => {
              setUnityCamerasFrom(cameras);
            };

            iframeRef.contentWindow.onDimensionLoad = () => {
              setUnityLoaded();
            };

            iframeRef.contentWindow.openHTMLPopup = (html, x, y, w, h) => {
              setUnityModalOpenFunc(html, x, y, w, h);
            };

            iframeRef.contentWindow.onDimensionSaved = () => {
              console.log("onDimensionSaved");
              setUnityDimensionSaved();
            };

            iframeRef.contentWindow.onHandRaised = (userId) => {
              setUnityHandRaisedUsers(userId);
            };

            // iframeRef.contentWindow.loading.style.display = "none";
            iframeRef.contentWindow.unityInstance = unityInstance;
            iframeRef.contentWindow.web3 = window.web3;
            iframeRef.contentWindow.ethereum = window.ethereum;
          })
          .catch((message) => {
            console.log("message", message);
            setDimLoaded(false);
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
  }, [iframeRef, liveId, user.cGAccessToken]);

  const createLocalScreenTracks = useCallback(
    async (canvas) => {
      const unitySound =
        iframeRef?.contentWindow?.unityInstance.Module.getMediaStreamDestination().stream;
      const stream = canvas.captureStream(30);
      const videoTracks = stream.getVideoTracks();
      const audioTracks = unitySound.getAudioTracks();

      let screenVideo = null;

      if (videoTracks) {
        screenVideo = new LocalVideoTrack(
          videoTracks[0],
          {
            frameRate: 30,
            width: 1280,
            height: 720,
          },
          true,
        );
        screenVideo.source = Track.Source.ScreenShare;
      }

      let unityTrackSound = null;
      if (unitySound) {
        unityTrackSound = new LocalAudioTrack(audioTracks[0]);
        console.log("unityTrackSound", unityTrackSound);
        unityTrackSound.source = Track.Source.ScreenShareAudio;
      }

      try {
        if (screenVideo) {
          await localParticipant.publishTrack(screenVideo, {
            name: "liveVideoCanvas",
          });
          setReadyToStream(true);
        }
        if (unityTrackSound) {
          await localParticipant.publishTrack(unityTrackSound, {
            name: "unityTrackSound",
          });
        }
      } catch (err) {
        console.log("///////////+++++++++++++++", err);
      }
    },
    [iframeRef, localParticipant, setReadyToStream],
  );

  useEffect(() => {
    if (!!unityCanvas && !!localParticipant && !!room && dimLoaded && hostId) {
      createLocalScreenTracks(unityCanvas);
    }
  }, [createLocalScreenTracks, dimLoaded, hostId, localParticipant, room, unityCanvas]);

  return (
    <div
      style={{
        background: "#eee",
        height:
          activeContentTab === "speaker" ? "calc(50vh - 16px)" : isFullScreen ? "100%" : "40vh",
        borderRadius: isFullScreen ? "0px" : "14px",
        position: isFullScreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        zIndex: 5,
        width: "100%",
      }}>
      {unityModalOpen && (
        <UnityModalPopup setUnityModalOpen={setUnityModalOpen} unityModalOpen={unityModalOpen} />
      )}
      {liveId && (
        <iframe
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "14px",
          }}
          title="Explore Metaverse"
          ref={setIframeRef}>
          {mountNode &&
            createPortal(
              <>
                <div id="unity-container">
                  <div id="canvas-wrap">
                    <div style={{ display: "none" }} id="avaturn-container">
                      <iframe
                        id="avaturn-iframe"
                        title="avaturn-iframe"
                        className="vto-frame"
                        allow="camera *; microphone *"></iframe>
                      <button id="vto-hide-button" onClick="window.hideIframe()">
                        Hide
                      </button>
                    </div>
                    <div style={{ display: "none" }} id="rpm-container">
                      <iframe
                        title="metaverse"
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
              mountNode,
            )}
        </iframe>
      )}
      <div className="live-page-fullscreen" onClick={() => setIsFullScreen((prev) => !prev)}>
        <Row gutter={[4, 0]} align="middle">
          <Col>
            <Row align="middle">
              <FullScreenImageSVG width="12px" height="12px" />
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
