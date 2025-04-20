import { Avatar, Col, Row, Tooltip, Typography } from "antd";
import profileImg from "assets/images/avatar.png";
import { MuteVoiceSVG, NoVideoSVG, ScreenSVG, VideoSVG, VoiceSVG } from "assets/jsx-svg";

import { LoadingOutlined } from "@ant-design/icons";
import { useParticipants } from "@livekit/components-react";
import userContext from "context/userContext";
import { useContext, useMemo, useState } from "react";
import LivekitService from "services/livekit.service";
import { axiosCatch } from "utils/axiosUtils";
import { toggleAudio, toggleCam, toggleShareScreen } from "../DeviceControl";
import "./styles.css";

export default function ParticipantListItem({
  isHost,
  participant,
  meetingMetadata,
  selectedCam,
  selectedMic,
  meetingId,
  onCustomerSelected,
}) {
  const { user } = useContext(userContext);
  const [localParticipant] = useParticipants();

  const isSameUser = participant.identity === user.id + "web";

  const [toggleCameraLoading, setToggleCameraLoading] = useState(false);
  const [toggleAudioLoading, setToggleAudioLoading] = useState(false);
  const [toggleScreenLoading, setToggleScreenLoading] = useState(false);
  const [toggleMuteLoading, setToggleMuteLoading] = useState(false);

  const handleToggleCam = () => {
    if (isSameUser) {
      toggleCam({
        loading: toggleCameraLoading,
        setLoading: setToggleCameraLoading,
        localParticipant: participant,
        isHost,
        meetingMetadata,
        camId: selectedCam,
        setPermissionBlockedModal: () => {},
      });
    }
  };

  const handleToggleAudio = () => {
    if (isSameUser) {
      toggleAudio({
        loading: toggleAudioLoading,
        setLoading: setToggleAudioLoading,
        localParticipant: participant,
        isHost,
        meetingMetadata,
        micId: selectedMic,
        setPermissionBlockedModal: () => {},
      });
    }
  };

  const handleToggleShareScreen = () => {
    if (isSameUser) {
      toggleShareScreen({
        isHost,
        loading: toggleScreenLoading,
        setLoading: setToggleScreenLoading,
        localParticipant,
        meetingMetadata,
      });
    }
  };

  const participantData = useMemo(() => JSON.parse(participant?.metadata ?? "{}"), [participant]);

  const handleSelectCustomer = () => {
    if (isHost) {
      onCustomerSelected(participantData.id);
    }
  };

  const MuteButton = ({ participant }) => (
    <button
      className="audio-button"
      style={{
        color: "#fff",
        background: "#3A5EE3",
        pointerEvents: toggleMuteLoading && "none",
      }}
      onClick={async () => {
        setToggleMuteLoading(true);
        try {
          await LivekitService.updateParticipant(meetingId, participant.identity, {
            ...participant.permissions,
            canPublishSources: participant.permissions.canPublishSources.filter(
              (num) => +num !== 2,
            ),
            mute: true,
          });
        } catch (err) {
          console.log(err);
        } finally {
          setToggleMuteLoading(false);
        }
      }}>
      {toggleMuteLoading ? <LoadingOutlined className="wc" /> : "Mute"}
    </button>
  );

  const UnMuteButton = ({ participant }) => (
    <button
      className="audio-button"
      style={{
        color: "#000",
        background: "#E9E9ED",
        pointerEvents: toggleMuteLoading && "none",
      }}
      onClick={async () => {
        setToggleMuteLoading(true);

        try {
          await LivekitService.updateParticipant(meetingId, participant.identity, {
            ...participant.permissions,
            canPublishSources: [...participant.permissions.canPublishSources, 2],
          });
        } catch (err) {
          console.log(err);
        } finally {
          setToggleMuteLoading(false);
        }
      }}>
      {toggleMuteLoading ? <LoadingOutlined /> : "UnMute"}
    </button>
  );

  return (
    <Col xs={24}>
      <Row
        justify="space-between"
        align="middle"
        wrap={false}
        style={{
          padding: "8px 12px",
          background: participantData?.isHost && "#fff",
          borderRadius: "32px",
        }}>
        <Col flex={1}>
          <Row align="middle" wrap={false}>
            <Avatar
              style={{ objectFit: "cover" }}
              src={participantData?.profileImage || profileImg}
              size={35}
            />
            <Tooltip title={!participantData?.isHost && participant.name}>
              {isHost ? (
                <Typography.Link
                  ellipsis
                  onClick={handleSelectCustomer}
                  style={{
                    marginInlineStart: "0.5rem",
                  }}
                  className="fz-12">
                  {participant.name}
                </Typography.Link>
              ) : (
                <Typography.Text
                  ellipsis
                  style={{
                    marginInlineStart: "0.5rem",
                  }}
                  className="fz-12">
                  {participant.name}
                </Typography.Text>
              )}
            </Tooltip>
            {participantData?.isHost && (
              <span
                style={{
                  color: "#3A5EE3",
                  fontSize: "12px",
                  marginInlineEnd: "8px",
                  marginInlineStart: "8px",
                }}>
                Host
              </span>
            )}
          </Row>
        </Col>
        <Col>
          <Row align="middle" className="participant-status" wrap={false}>
            {isHost &&
              !participantData?.isHost &&
              participant.permissions?.canPublishSources.length && (
                <Row gutter={[8, 8]} align="middle" style={{ marginInlineEnd: "8px" }} wrap={false}>
                  <Col className={"control"}>
                    {participant.permissions?.canPublishSources?.includes(2) ? (
                      <MuteButton participant={participant} />
                    ) : (
                      <UnMuteButton participant={participant} />
                    )}
                  </Col>
                  <Col>
                    <button
                      className="audio-button"
                      style={{ color: "red" }}
                      size="small"
                      onClick={async () => {
                        try {
                          await LivekitService.removeRoomParticipant(
                            meetingId,
                            participant.identity,
                          );
                        } catch (err) {
                          axiosCatch(err);
                        }
                      }}>
                      Kick
                    </button>
                  </Col>
                </Row>
              )}

            <Col className="mr-1">
              <div
                className={isSameUser ? "clickable d-flex" : "d-flex"}
                onClick={handleToggleShareScreen}>
                <ScreenSVG
                  color={participant.isScreenShareEnabled ? "#3A5EE3" : "#bdbdbd"}
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </Col>

            {participant.isMicrophoneEnabled && (
              <VoiceSVG
                className={isSameUser ? "clickable" : undefined}
                onClick={handleToggleAudio}
                color={participant.isSpeaking ? "#3A5EE3" : "#A5A299"}
                style={{ width: "18px", height: "18px" }}
              />
            )}
            {!participant.isMicrophoneEnabled && (
              <MuteVoiceSVG
                className={isSameUser ? "clickable" : undefined}
                onClick={handleToggleAudio}
                color="#BDBDBD"
                style={{ width: "18px", height: "18px" }}
              />
            )}
            {participant.isCameraEnabled && (
              <VideoSVG
                className={isSameUser ? "clickable" : undefined}
                onClick={handleToggleCam}
                color="#3A5EE3"
                style={{ width: "18px", height: "18px" }}
              />
            )}
            {!participant.isCameraEnabled && (
              <NoVideoSVG
                className={isSameUser ? "clickable" : undefined}
                onClick={handleToggleCam}
                color="#BDBDBD"
                style={{ width: "18px", height: "18px" }}
              />
            )}
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
