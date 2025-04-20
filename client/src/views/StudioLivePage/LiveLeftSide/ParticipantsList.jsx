import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useParticipants } from "@livekit/components-react";
import { Col, Dropdown, Row, Tooltip, Typography } from "antd";
import {
  MetaverseActivistesSVG,
  MuteVoiceSVG,
  NoVideoSVG,
  RemoveParticipantSVG,
  ScreenSVG,
  VideoSVG,
  VoiceSVG,
} from "assets/jsx-svg";
import LivekitService from "services/livekit.service";
import { axiosCatch } from "utils/axiosUtils";
import userContext from "context/userContext";

export default function ParticipantsList({
  collapsed,
  setDragedParticipant,
  hostId,
  customerDimensionId,
}) {
  const { user } = useContext(userContext);
  const participants = useParticipants();
  const { liveId } = useParams();
  const [toggleMuteLoading, setToggleMuteLoading] = useState(false);

  const MuteButton = ({ participant }) => (
    <button
      className="mute-button"
      style={{
        color: "#fff",
        background: "#3A5EE3",
        pointerEvents: toggleMuteLoading && "none",
      }}
      onClick={async () => {
        setToggleMuteLoading(true);
        try {
          await LivekitService.updateParticipant("verse-live-" + liveId, participant.identity, {
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
      className="mute-button"
      style={{
        color: "#000",
        background: "#E9E9ED",
        pointerEvents: toggleMuteLoading && "none",
      }}
      onClick={async () => {
        setToggleMuteLoading(true);

        try {
          await LivekitService.updateParticipant("verse-live-" + liveId, participant.identity, {
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
    <Row gutter={[0, 12]} className="participants-show">
      {participants
        ?.filter((participant) => participant.identity.includes("web"))
        ?.map((participant) => {
          try {
            participant.data = JSON.parse(participant.metadata);
          } catch (Ignored) {
            participant.data = {};
          }

          let isMetaverseShared = false;
          const liveVideoCanvas = participant.getTrackPublicationByName("liveVideoCanvas");
          if (liveVideoCanvas) {
            isMetaverseShared = true;
          } else {
            isMetaverseShared = false;
          }

          let isSharescreenShared = false;
          const shareScreen = participant.getTrackPublicationByName("shareScreen");
          if (shareScreen) {
            isSharescreenShared = true;
          } else {
            isSharescreenShared = false;
          }

          return (
            <Col key={participant.sid} xs={24}>
              <Row
                gutter={[collapsed ? 0 : 12, 0]}
                align="middle"
                wrap={false}
                justify={collapsed ? "center" : "space-between"}>
                <Col>
                  <Row wrap={false} align="middle">
                    <Tooltip title={participant.name}>
                      <Typography.Text
                        style={{ maxWidth: "82px" }}
                        ellipsis
                        className="fz-12 fw-500">
                        {participant.name}
                      </Typography.Text>
                    </Tooltip>
                  </Row>
                </Col>
                {!collapsed && (
                  <Col>
                    <Row align="middle" gutter={[8, 0]} wrap={false}>
                      {isMetaverseShared && (
                        <Tooltip title="Metaverse Share screen">
                          <Col>
                            <Row align="middle">
                              {participant.isScreenShareEnabled && (
                                <div
                                  draggable
                                  style={{ cursor: "grab" }}
                                  onDragStart={() => {
                                    let participantShareScreenId = null;

                                    participant.videoTrackPublications.forEach((track) => {
                                      if (
                                        track.source === "screen_share" &&
                                        track.trackName === "liveVideoCanvas"
                                      ) {
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
                                  <MetaverseActivistesSVG
                                    color="#3A5EE3"
                                    style={{ width: "14px", height: "14px", cursor: "grab" }}
                                    className={
                                      participant.identity === user.id + "web" && "clickable"
                                    }
                                  />
                                </div>
                              )}
                            </Row>
                          </Col>
                        </Tooltip>
                      )}
                      <Col>
                        <Row align="middle">
                          {participant.isScreenShareEnabled && isSharescreenShared && (
                            <div
                              draggable
                              style={{ cursor: "grab" }}
                              onDragStart={() => {
                                let participantShareScreenId = null;

                                participant.videoTrackPublications.forEach((track) => {
                                  if (
                                    track.source === "screen_share" &&
                                    track.trackName !== "liveVideoCanvas"
                                  ) {
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
                              <ScreenSVG
                                color="#3A5EE3"
                                style={{ width: "14px", height: "14px", cursor: "grab" }}
                              />
                            </div>
                          )}
                          {!isSharescreenShared && (
                            <div>
                              <ScreenSVG
                                color="#BDBDBD"
                                style={{ width: "14px", height: "14px" }}
                              />
                            </div>
                          )}
                        </Row>
                      </Col>
                      <Col>
                        <Row align="middle">
                          {participant.isCameraEnabled && (
                            <div
                              draggable
                              style={{ cursor: "grab" }}
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
                              <VideoSVG color="#3A5EE3" style={{ width: "14px", height: "14px" }} />
                            </div>
                          )}
                          {!participant.isCameraEnabled && (
                            <div>
                              <NoVideoSVG
                                color="#BDBDBD"
                                style={{ width: "14px", height: "14px" }}
                              />
                            </div>
                          )}
                        </Row>
                      </Col>
                      <Col>
                        <Dropdown
                          disabled={!hostId || participant.identity === hostId + "web"}
                          dropdownRender={() => (
                            <div
                              style={{
                                padding: "0.5rem 1rem",
                                background: "#eee",
                                borderRadius: "8px",
                              }}>
                              {participant.permissions?.canPublishSources?.includes(2) ? (
                                <MuteButton participant={participant} />
                              ) : (
                                <UnMuteButton participant={participant} />
                              )}
                            </div>
                          )}
                          placement="top">
                          <Row align="middle">
                            {participant.isMicrophoneEnabled && (
                              <div draggable style={{ cursor: "grab" }}>
                                <VoiceSVG
                                  color={participant.isSpeaking ? "#3A5EE3" : "#A5A299"}
                                  style={{ width: "14px", height: "14px" }}
                                />
                              </div>
                            )}
                            {!participant.isMicrophoneEnabled && (
                              <div>
                                <MuteVoiceSVG
                                  color="#BDBDBD"
                                  style={{ width: "14px", height: "14px" }}
                                />
                              </div>
                            )}
                          </Row>
                        </Dropdown>
                      </Col>
                      {hostId && participant.identity !== hostId + "web" && (
                        <Col>
                          <Tooltip title="Kick">
                            <Row align="middle">
                              <RemoveParticipantSVG
                                width="14px"
                                height="14px"
                                className="clickable"
                                onClick={async () => {
                                  try {
                                    await LivekitService.removeRoomParticipant(
                                      "verse-live-" + customerDimensionId,
                                      participant.identity,
                                    );
                                  } catch (err) {
                                    axiosCatch(err);
                                  }
                                }}
                              />
                            </Row>
                          </Tooltip>
                        </Col>
                      )}
                    </Row>
                  </Col>
                )}
              </Row>
            </Col>
          );
        })}
    </Row>
  );
}
