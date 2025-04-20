import { Col, Image, Row, Tooltip, Typography } from "antd";

import house from "assets/images/house.png";

export default function Cameras({
  camerasFromUnity,
  selectedCam,
  setSelectedCam,
  selectedColor,
  isFadeEnabled,
  liveStarted,
  iframeRef,
  fadeDuration,
}) {
  return (
    <div className="live-page-asider-cams">
      <Row gutter={[8, 8]}>
        {camerasFromUnity?.map((cam) => (
          <Col key={cam.name} xs={24} md={12} lg={8}>
            <Row>
              <Col xs={24}>
                <div
                  style={{
                    border: selectedCam?.name === cam.name && "2px solid blue",
                  }}
                  onClick={() => {
                    setSelectedCam(cam);
                    const liveObj = {
                      name: cam.name,
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
                  }}
                  className="live-page-asider-cam">
                  <Image
                    preview={false}
                    style={{
                      aspectRatio: "1.55",
                    }}
                    src={cam.preview ? `data:image/jpeg;base64, ${cam.preview}` : house}
                  />
                </div>
              </Col>
              <Col xs={24}>
                <Row justify="center">
                  <Tooltip title={cam.name}>
                    <Typography.Text ellipsis className="fz-12">
                      {cam.name}
                    </Typography.Text>
                  </Tooltip>
                </Row>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
}
