import { Col, Row, Switch, Typography } from "antd";
import { useState } from "react";
import LivekitService from "services/livekit.service";
import { axiosCatch } from "utils/axiosUtils";
const callConfigTypes = {
  cam: "allowVideo",
  mic: "allowVoice",
  screen: "allowShareScreen",
};
export default function ShringControl({ eventMetadata, setEventMetadata, liveData }) {
  const [changePermissionsLoading, setChangePermissionsLoading] = useState(false);

  // type should be one [mic,cam,screen]
  const changePermissions = async (type, value) => {
    try {
      setChangePermissionsLoading(type);
      const updatedPermissions = { ...eventMetadata.permissions };
      const updatedCallConfig = { ...eventMetadata.callConfig };
      updatedPermissions[type] = value;
      updatedCallConfig[callConfigTypes[type]] = value;
      await LivekitService.updateRoomMetadata("verse-live-" + liveData.customerDimensionId, {
        ...eventMetadata,
        permissions: updatedPermissions,
      });
      console;
      setEventMetadata({
        ...eventMetadata,
        permissions: updatedPermissions,
        callConfig: updatedCallConfig,
      });
    } catch (err) {
      console.log("err", err);
      axiosCatch(err);
    } finally {
      setChangePermissionsLoading(false);
    }
  };

  return (
    <Row gutter={[0, 8]}>
      <Col xs={24}>
        <Typography.Text className="fz-16 fw-600">Sharing</Typography.Text>
      </Col>
      <Col xs={24}>
        <Row>
          <Col xs={12}>
            <Typography.Text>Microphone</Typography.Text>
          </Col>
          <Col xs={12}>
            <Switch
              loading={changePermissionsLoading === "mic"}
              value={eventMetadata?.permissions?.mic}
              onChange={(active) => changePermissions("mic", active)}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <Row>
          <Col xs={12}>
            <Typography.Text>WebCam</Typography.Text>
          </Col>
          <Col xs={12}>
            <Switch
              loading={changePermissionsLoading === "cam"}
              value={eventMetadata?.permissions?.cam}
              onChange={(active) => changePermissions("cam", active)}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <Row>
          <Col xs={12}>
            <Typography.Text>ScreenShare</Typography.Text>
          </Col>
          <Col xs={12}>
            <Switch
              loading={changePermissionsLoading === "screen"}
              value={eventMetadata?.permissions?.screen}
              onChange={(active) => changePermissions("screen", active)}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
