import {
  useState,
  useEffect,
  useContext,
  //  useContext
} from "react";
import { createPortal } from "react-dom";
import { Col, Form, Input, message, Row } from "antd";

// import UserContext from 'context/UserContext';
import ModelService from "services/model.service";
import AddProductButton from "components/common/AddProductButton";
import UnityModalPopup from "components/UnityModalPopup";
import userContext from "context/userContext";

const toAbsoluteUrl = (origin, pathname) => origin + pathname;

export default function Add3dModel({ toggleModal }) {
  const [loading, setLoading] = useState(false);
  const [iframeRef, setIframeRef] = useState(null);
  const [modelData, setModelData] = useState(null);
  // const { user } = useContext(UserContext);
  const [form] = Form.useForm();
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

  const mountNode = iframeRef?.contentWindow?.document?.body;

  const onFinish = async () => {
    setLoading(true);
    try {
      const formData = await form.validateFields();
      const data = {
        ...modelData,
        name: formData.name,
      };
      await ModelService.addModel(data);

      toggleModal();
      message.success("Success");
    } catch (error) {
      message.error("generalError");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (strData) => {
    const jsonData = JSON.parse(strData);
    const data = {
      model: jsonData.data,
      isSpecial: true,
      image: jsonData.image,
    };
    form.setFieldValue("modelData", "true");
    setModelData(data);
  };

  window.saveModel = onSave;
  const { user } = useContext(userContext);
  useEffect(() => {
    if (iframeRef) {
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
      var dimensionLink = "https://dashboard.vbooking.co/?dimensionId={0}&dimensionType={0}";
      var linkBase = "https://dashboard.vbooking.co/";
      var dimensionId = 0;
      var dimensionType = -1;
      var accessToken = "${user.cGAccessToken}";
      var apiBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6/mobile-game/";
      var production = true;
      var socketBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/";
      var libraryApiBase = "${import.meta.env.VITE_BASE_ENDPOINT_DOMAIN}/api/v6/mobile-game/";
      var storageBase = "https://chickchack.s3.eu-west-2.amazonaws.com"
      var isProduct = true;

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

      window.saveModel = (...args) => window.top.saveModel(...args);

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

            iframeRef.contentWindow.loading.style.display = "none";
            iframeRef.contentWindow.unityInstance = unityInstance;
            iframeRef.contentWindow.web3 = window.web3;
            iframeRef.contentWindow.ethereum = window.ethereum;
          })
          .catch((message) => {
            alert(message);
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
  }, [iframeRef, user.cGAccessToken]);

  return (
    <Form
      name="3d-model-form"
      className="cc-w-100"
      onFinish={onFinish}
      layout="vertical"
      form={form}>
      <Row gutter={[0, 20]}>
        <Col span={24}>
          {unityModalOpen && (
            <UnityModalPopup
              setUnityModalOpen={setUnityModalOpen}
              unityModalOpen={unityModalOpen}
            />
          )}
          <iframe
            style={{
              width: "100%",
              height: "600px",
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
                  <canvas
                    id="myCanvas"
                    height="450"
                    width="450"
                    style={{ display: "none" }}></canvas>
                </>,
                mountNode,
              )}
          </iframe>
          <Form.Item name="modelData" rules={[{ required: true, message: "upload model" }]}>
            <Input style={{ display: "none" }} type="text" placeholder="Enter model name" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            className="cc-mb-5"
            name="name"
            label="Model Name"
            rules={[{ required: true }]}>
            <Input type="text" placeholder="Enter model name" />
          </Form.Item>

          <Form.Item noStyle>
            <AddProductButton
              addName="Next"
              htmlType="submit"
              loading={loading}
              cancel={toggleModal}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
