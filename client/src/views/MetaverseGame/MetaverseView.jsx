import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { notification } from "antd";

import UserContext from "context/userContext";
import CommonService from "services/common.service";
import { axiosCatch } from "utils/axiosUtils";

import "./styles.css";
import UnityModalPopup from "components/UnityModalPopup";

const toAbsoluteUrl = (origin, pathname) => origin + pathname;

const MetaverseView = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { dimId } = useParams();
  const id = null;
  const [dimensionId, setDimensionId] = useState(id || null);
  const [iframeRef, setIframeRef] = useState(null);
  const [dimensionData, setDimensionData] = useState({});
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [unityModalOpen, setUnityModalOpen] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const droppoint = queryParams.get("droppoint");
  const backupMode = queryParams.get("backupMode");
  const backupId = queryParams.get("backupId");
  console.log("user", user);
  const setUnityModalOpenFunc = (html, x, y, w, h) => {
    setUnityModalOpen({
      html,
      x,
      y,
      w,
      h,
    });
  };

  useImperativeHandle(ref, () => ({
    getIframeRef() {
      return iframeRef;
    },
  }));

  useEffect(() => {
    (async () => {
      if (Number(dimId) == dimId) {
        try {
          const res = await CommonService.getDimensionData(dimId, user.companyId);
          const data = res.data.data;
          setDimensionData(data);
          if (data) {
            window.history.replaceState(
              { id: dimId },
              null,
              `${window.location.origin}/metaverse/${data.name.split(" ").join("_")}?${
                searchParams.get("meetingId") ? `meetingId=${searchParams.get("meetingId")}` : ""
              }${searchParams.get("deskId") ? `&deskId=${searchParams.get("deskId")}` : ""}${
                backupMode ? `&backupMode=${backupMode}` : ""
              }${backupId ? `&backupId=${backupId}` : ""}`.replace(/\?&/g, "?"),
            );
            setDimensionData(data);
            setDimensionId(+res.data.data.id);
          } else {
            navigate("/");
            notification.error({
              message: "Dimension id incorrect",
            });
          }

          return;
        } catch (err) {
          navigate("/");
          axiosCatch(err);
          return;
        }
      }
      if (Number(dimId) != dimId) {
        try {
          const res = await CommonService.getDimensionData(
            dimId.split("_").join(" "),
            user.companyId,
          );
          if (res.data.data) {
            setDimensionData(res.data.data);
            setDimensionId(+res.data.data.id);
          } else {
            navigate("/");
            notification.error({
              message: "Dimension owner name or Dimension name incorrect",
            });
          }
        } catch (err) {
          navigate("/");
          axiosCatch(err);
        }
      } else {
        setDimensionId(id);
      }
    })();
  }, [dimId, user]);

  const mountNode = iframeRef?.contentWindow?.document?.body;

  useEffect(() => {
    console.log("useEffect");
    if (iframeRef && dimensionId && dimensionData && user.cGAccessToken) {
      console.log("useEffect", dimensionData);
      const configScript = iframeRef.contentWindow.document.createElement("script");

      const style = iframeRef.contentWindow.document.createElement("link");
      style.href = `${import.meta.env.VITE_WEBGL_URL}/style.css`;
      style.rel = "stylesheet";

      const div = iframeRef.contentWindow.document.createElement("div");
      div.innerHTML = `<div class='loading-holder'><video autoPlay muted loop class='video-loading'><source src='${
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
      }/metaverse?dimensionId={${dimensionId}}&dimensionType={0}";
      var linkBase = "${window.location.origin}/";
      var dimensionId = ${dimensionId};
      var dimensionType = 1;
      var accessToken = "${user.cGAccessToken}";
      var apiBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6/mobile-game/";
      var libraryApiBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6/mobile-game/";
      var dimensionTag = 'VINDO${
        searchParams.get("meetingId") ? `_${searchParams.get("meetingId")}` : ""
      }';
      var production = true;
      var defaultRoomName='${dimensionId ? "verse-live-" + dimensionId : "Public Space"}';
      var socketBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/";
      var storageBase = "https://chickchack.s3.eu-west-2.amazonaws.com"
      var isProduct = false;
      var isVirtualCall = ${dimensionData?.isHolomeet ? true : false};
      var isGuest = ${user.isGuest ? true : false};
      var isCompany = true
      var deskId = "${searchParams.get("deskId") ? searchParams.get("deskId") : ""}";
      var startPlace = "${droppoint}";
      var backupMode = ${backupMode === "true" ? true : false};
      var backupId = ${+backupId};
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

      var offlinePhoton = ${localStorage.getItem("isOfflineMetaverse") === "true" ? true : false};
      var offlineRequests = ${false};
      var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loading = document.querySelector("#loading");
      var platform = 2; //1 mobile, 2 windows, 4 mac, 8 linux
      loading.style.display = "";
      
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
        platform = 4;
      }

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
  }, [dimensionId, dimensionData, iframeRef, user.cGAccessToken, user.isGuest, searchParams]);

  if (!dimensionId) {
    return (
      <div
        style={{
          width: "100%",
          height: "100",
          position: "absolute",
          left: "0",
          background: "#000",
        }}
      />
    );
  }
  return (
    <section
      style={{
        width: "100%",
        height: props.autoFullHeight ? "100%" : "100svh",
        overflow: "hidden",
      }}>
      {unityModalOpen && (
        <UnityModalPopup setUnityModalOpen={setUnityModalOpen} unityModalOpen={unityModalOpen} />
      )}
      {dimensionId && (
        <iframe
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title="Explore Metaverse"
          ref={setIframeRef}>
          {mountNode &&
            createPortal(
              <>
                <div id="unity-container">
                  <div id="canvas-wrap">
                    <div id="avaturn-container" style={{ display: "none" }}>
                      <iframe
                        id="avaturn-iframe"
                        title="avaturn-iframe"
                        className="vto-frame"
                        allow="camera *; microphone *"></iframe>
                      <button id="vto-hide-button" onClick="window.hideIframe()">
                        Hide
                      </button>
                    </div>
                    <div id="rpm-container" style={{ display: "none" }}>
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
    </section>
  );
});

MetaverseView.displayName = "MetaverseView";

export default MetaverseView;
