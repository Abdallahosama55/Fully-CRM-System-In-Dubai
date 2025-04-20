import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { Avatar, Col, Row, Tooltip, Typography } from "antd";
import {
  CameraDisabledSVG,
  DragSVG,
  MicDisabledSVG,
  ScreenSVG,
  SharingScreenSVG,
  VideoSVG,
  VoiceSVG,
} from "assets/jsx-svg";
import Box from "components/Box";
import userContext from "context/userContext";
import { useContext, useState } from "react";
import { stringAvatar } from "utils/string";
import { toggleAudio, toggleCam, toggleShareScreen } from "../../DeviceControl";
import { useParticipants } from "@livekit/components-react";

const ParticipantItem = ({ participant, setDragedParticipant, camId, micId, meetingMetadata }) => {
  const { user } = useContext(userContext);
  const [localParticipant] = useParticipants();

  const [isOpen, setIsOpen] = useState(false);
  const [toggleCameraLoading, setToggleCameraLoading] = useState(false);
  const [toggleAudioLoading, setToggleAudioLoading] = useState(false);
  const [toggleScreenLoading, setToggleScreenLoading] = useState(false);

  // TODO: show camera permissions modal if not having parmission
  const [permissionBlockedModal, setPermissionBlockedModal] = useState();

  const metaData = JSON.parse(participant?.metadata);

  const isSameUser = participant.identity === user.id + "web";

  return (
    <Row style={{ width: "100%" }} key={participant.sid}>
      <Col style={{ width: "100%" }} sx={24}>
        <Row gutter={[12, 0]} align="middle" wrap={false} justify={"space-between"}>
          <Col sx={24} style={{ width: "100%" }}>
            <Row gutter={[8, 0]} wrap={false} align="middle">
              <Col>
                <Tooltip title={participant.name} placement="right">
                  <Avatar
                    src={participant.data?.profileImage}
                    {...stringAvatar(participant?.name)}
                    size={32}
                  />
                </Tooltip>
              </Col>
              <Col flex={1}>
                <Tooltip title={participant.name}>
                  <Typography.Text style={{ maxWidth: "280px" }} ellipsis className="fz-12 fw-500">
                    {participant.name}{" "}
                    {metaData?.isHost && (
                      <span style={{ color: "#b0b0b0", fontSize: "11px" }}>Host</span>
                    )}
                  </Typography.Text>
                </Tooltip>
              </Col>
              {
                <Col
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}>
                  <Col>
                    <div
                      className={isSameUser ? "clickable d-flex" : "d-flex"}
                      onClick={() => {
                        if (isSameUser) {
                          toggleShareScreen({
                            isHost: metaData.isHost,
                            loading: toggleScreenLoading,
                            setLoading: setToggleScreenLoading,
                            localParticipant,
                            meetingMetadata,
                          });
                        }
                      }}>
                      <ScreenSVG
                        color={participant.isScreenShareEnabled ? "#3A5EE3" : "#bdbdbd"}
                        style={{ width: 16, height: 16 }}
                      />
                    </div>
                  </Col>
                  <Row
                    align="middle"
                    onClick={() => {
                      if (isSameUser) {
                        toggleAudio({
                          loading: toggleAudioLoading,
                          setLoading: setToggleAudioLoading,
                          localParticipant,
                          isHost: metaData.isHost,
                          meetingMetadata,
                          micId,
                          setPermissionBlockedModal,
                        });
                      }
                    }}>
                    {!participant.isMicrophoneEnabled ? (
                      <MicDisabledSVG
                        style={{ width: 14, height: 14 }}
                        className={isSameUser && "clickable"}
                      />
                    ) : (
                      <VoiceSVG
                        style={{ width: 14, height: 14 }}
                        color="#3A5EE3"
                        className={isSameUser && "clickable"}
                      />
                    )}
                  </Row>
                  <Row
                    align="middle"
                    onClick={() => {
                      if (isSameUser) {
                        toggleCam({
                          loading: toggleCameraLoading,
                          setLoading: setToggleCameraLoading,
                          localParticipant,
                          isHost: metaData.isHost,
                          meetingMetadata,
                          camId,
                          setPermissionBlockedModal,
                        });
                      }
                    }}>
                    {participant.isCameraEnabled && (
                      <VideoSVG
                        color="#3A5EE3"
                        style={{ width: "14px", height: "14px" }}
                        className={isSameUser && "clickable"}
                      />
                    )}
                    {!participant.isCameraEnabled && (
                      <CameraDisabledSVG
                        style={{ width: "14px", height: "14px" }}
                        className={isSameUser && "clickable"}
                      />
                    )}
                  </Row>
                  <Box onClick={() => setIsOpen((prev) => !prev)}>
                    {isOpen ? (
                      <CaretUpFilled className="clickable" />
                    ) : (
                      <CaretDownFilled className="clickable" />
                    )}
                  </Box>
                </Col>
              }
            </Row>
          </Col>
        </Row>
        {isOpen && participant.videoTrackPublications.size > 0 && (
          <Row gutter={[0, 6]} className="participants-shared-tracks">
            {participant.isScreenShareEnabled && (
              <Col xs={24}>
                <Row
                  align="middle"
                  gutter={[8, 0]}
                  className="clickable"
                  draggable
                  onDragStart={() => {
                    let participantShareScreenId = null;

                    participant.videoTrackPublications.forEach((track) => {
                      if (track.source === "screen_share") {
                        participantShareScreenId = track.trackSid;
                      }
                    });

                    if (participantShareScreenId) {
                      setDragedParticipant({
                        type: "shareScreen",
                        name: participant.name,
                        id: JSON.parse(participant.metadata).id,
                        trackId: participantShareScreenId,
                      });
                    }
                  }}
                  onDragEnd={() => setDragedParticipant(null)}>
                  <Col>
                    <Row align="middle">
                      <SharingScreenSVG />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text className="fz-12 fw-500">Shared His Screen</Typography.Text>
                  </Col>
                  <Col flex={1}>
                    <Row justify="end">
                      <DragSVG />
                    </Row>
                  </Col>
                </Row>
              </Col>
            )}

            {participant.isCameraEnabled && (
              <Col xs={24}>
                <Row
                  align="middle"
                  gutter={[8, 0]}
                  className="clickable"
                  draggable
                  onDragStart={() => {
                    let participantCameraId = null;

                    participant.videoTrackPublications.forEach((track) => {
                      if (track.source === "camera") {
                        participantCameraId = track.trackSid;
                      }
                    });

                    if (participantCameraId) {
                      setDragedParticipant({
                        type: "camera",
                        name: participant.name,
                        id: JSON.parse(participant.metadata).id,
                        trackId: participantCameraId,
                      });
                    }
                  }}
                  onDragEnd={() => setDragedParticipant(null)}>
                  <Col>
                    <Row align="middle">
                      <VideoSVG color="#3A5EE3" style={{ width: "14px", height: "14px" }} />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text className="fz-12 fw-500">Camera is on</Typography.Text>
                  </Col>
                  <Col flex={1}>
                    <Row justify="end">
                      <DragSVG />
                    </Row>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        )}
      </Col>
    </Row>
  );
};
export default ParticipantItem;
