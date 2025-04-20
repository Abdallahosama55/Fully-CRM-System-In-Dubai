import { useState } from "react";
import { Col, Row, Tooltip, Typography } from "antd";
import { useLocalParticipant } from "@livekit/components-react";

import { MuteVoiceSVG, NoVideoSVG, ScreenSVG, VideoSVG, VoiceSVG } from "assets/jsx-svg";
import { toggleAudio, toggleCam, toggleShareScreen } from "views/StudioLivePage/DeviceControl";

export default function SpeakerShareControl({ eventMetadata, setPermissionBlockedModal }) {
  const localParticipant = useLocalParticipant();
  const [toggleCameraLoading, setToggleCameraLoading] = useState(false);
  const [toggleAudioLoading, setToggleAudioLoading] = useState(false);
  const [toggleScreenLoading, setToggleScreenLoading] = useState(false);

  return (
    <Row gutter={[12, 0]} align="middle" wrap={false} justify={"space-between"}>
      <Col>
        <Row wrap={false} align="middle">
          <Tooltip title={localParticipant.localParticipant.name}>
            <Typography.Text style={{ maxWidth: "110px" }} ellipsis className="fz-14 fw-600">
              {localParticipant.localParticipant.name}
            </Typography.Text>
          </Tooltip>
        </Row>
      </Col>
      <Col>
        <Row align="middle" gutter={[8, 0]} wrap={false}>
          {eventMetadata?.permissions.screen && (
            <Col>
              <Tooltip
                title={localParticipant.isScreenShareEnabled ? "Stop Share" : "Share Screen"}>
                <Row
                  align="middle"
                  className="clickable"
                  onClick={() => {
                    toggleShareScreen({
                      loading: toggleScreenLoading,
                      setLoading: setToggleScreenLoading,
                      localParticipant: localParticipant.localParticipant,
                    });
                  }}>
                  {localParticipant.isScreenShareEnabled && (
                    <div>
                      <ScreenSVG color="#3A5EE3" style={{ width: "14px", height: "14px" }} />
                    </div>
                  )}
                  {!localParticipant.isScreenShareEnabled && (
                    <div>
                      <ScreenSVG color="#BDBDBD" style={{ width: "14px", height: "14px" }} />
                    </div>
                  )}
                </Row>
              </Tooltip>
            </Col>
          )}

          {eventMetadata?.permissions.cam && (
            <Col>
              <Row
                align="middle"
                className="clickable"
                onClick={() => {
                  toggleCam({
                    loading: toggleCameraLoading,
                    setLoading: setToggleCameraLoading,
                    localParticipant: localParticipant.localParticipant,
                    setPermissionBlockedModal,
                  });
                }}>
                {localParticipant.isCameraEnabled && (
                  <div>
                    <VideoSVG color="#3A5EE3" style={{ width: "14px", height: "14px" }} />
                  </div>
                )}
                {!localParticipant.isCameraEnabled && (
                  <div>
                    <NoVideoSVG color="#BDBDBD" style={{ width: "14px", height: "14px" }} />
                  </div>
                )}
              </Row>
            </Col>
          )}
          {eventMetadata?.permissions.mic && (
            <Col>
              <Row
                align="middle"
                className="clickable"
                onClick={() => {
                  toggleAudio({
                    loading: toggleAudioLoading,
                    setLoading: setToggleAudioLoading,
                    localParticipant: localParticipant.localParticipant,
                    setPermissionBlockedModal,
                  });
                }}>
                {localParticipant.isMicrophoneEnabled && (
                  <div draggable>
                    <VoiceSVG
                      color={localParticipant.localParticipant.isSpeaking ? "#3A5EE3" : "#A5A299"}
                      style={{ width: "14px", height: "14px" }}
                    />
                  </div>
                )}
                {!localParticipant.isMicrophoneEnabled && (
                  <div>
                    <MuteVoiceSVG color="#BDBDBD" style={{ width: "14px", height: "14px" }} />
                  </div>
                )}
              </Row>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
}
