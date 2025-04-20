import { useMemo, useState } from "react";
import { Col, Row, Typography } from "antd";
import { useParticipants } from "@livekit/components-react";
import { LoadingOutlined } from "@ant-design/icons";
import Chat from "views/StudioLivePage/LiveLeftSide/Chat";

import LivekitService from "services/livekit.service";
import { axiosCatch } from "utils/axiosUtils";

import "./styles.css";

export default function ModerateContent({
  liveData,
  eventMetadata,
  setEventMetadata,
  handRaisedUsers,
  iframeRef,
}) {
  const allParticipants = useParticipants();
  const [updateMetadataLoading, setUpdateMetadataLoading] = useState(false);
  const [draggedParticipant, setDraggedParticipant] = useState(null);

  const unityParticipants = useMemo(
    () => allParticipants.filter((participnt) => !participnt.identity.includes("web")),
    [allParticipants],
  );

  const changeRoomAudienceConfig = async (newCallConfig) => {
    try {
      setUpdateMetadataLoading(true);
      await LivekitService.updateRoomMetadata("verse-live-" + liveData.data.customerDimensionId, {
        ...eventMetadata,
        callConfig: newCallConfig,
      });
      setEventMetadata((prev) => {
        return {
          ...prev,
          callConfig: newCallConfig,
        };
      });
    } catch (err) {
      axiosCatch(err);
    } finally {
      setUpdateMetadataLoading(false);
    }
  };

  const onDropParticipant = (e, type, dragedParticipant) => {
    e.preventDefault();

    let newCallConfig = { ...eventMetadata.callConfig };
    if (type === "blocked") {
      iframeRef?.contentWindow?.unityInstance.SendMessage(
        "BG_Scripts/JsBridge",
        "KickUser",
        +dragedParticipant.identity,
      );
      return;
    } else if (type === "open") {
      if (dragedParticipant.from === "openFull") {
        newCallConfig.allowedVideoUsers = newCallConfig.allowedVideoUsers.filter(
          (user) => user !== dragedParticipant.identity,
        );
        newCallConfig.allowedShareScreenUsers = newCallConfig.allowedShareScreenUsers.filter(
          (user) => user !== dragedParticipant.identity,
        );
      }
      newCallConfig.allowedVoiceUsers = [
        ...new Set([...newCallConfig.allowedVoiceUsers, dragedParticipant.identity]),
      ];
    } else if (type === "openFull") {
      newCallConfig.allowedVoiceUsers = [
        ...new Set([...newCallConfig.allowedVoiceUsers, dragedParticipant.identity]),
      ];
      newCallConfig.allowedVideoUsers = [
        ...new Set([...newCallConfig.allowedVideoUsers, dragedParticipant.identity]),
      ];
      newCallConfig.allowedShareScreenUsers = [
        ...new Set([...newCallConfig.allowedShareScreenUsers, dragedParticipant.identity]),
      ];
    } else if (type === "close") {
      newCallConfig.allowedVoiceUsers = newCallConfig.allowedVoiceUsers.filter(
        (user) => user !== dragedParticipant.identity,
      );
      if (dragedParticipant.from === "openFull") {
        newCallConfig.allowedVideoUsers = newCallConfig.allowedVideoUsers.filter(
          (user) => user !== dragedParticipant.identity,
        );
        newCallConfig.allowedShareScreenUsers = newCallConfig.allowedShareScreenUsers.filter(
          (user) => user !== dragedParticipant.identity,
        );
      }
    }

    if (newCallConfig) {
      iframeRef?.contentWindow?.unityInstance.SendMessage(
        "BG_Scripts/JsBridge",
        "UpdateCallConfig",
        JSON.stringify({
          callConfig: newCallConfig,
        }),
      );

      changeRoomAudienceConfig(newCallConfig);
    }
  };

  return (
    <Row gutter={[16, 0]} className="moderate-content">
      <Col xs={10}>
        <Chat fromContent />
      </Col>
      <Col xs={14}>
        {updateMetadataLoading ? (
          <div className="w-100 h-100 center-items update-audience-loading">
            <LoadingOutlined />
          </div>
        ) : null}
        <Typography.Text className="fz-18 fw-600">Audience</Typography.Text>
        <Row gutter={[16, 16]} className="mt-1">
          <Col xs={24} lg={12}>
            <div className="moderate-panels-title">Open Mics</div>
            {draggedParticipant && draggedParticipant.from !== "open" && (
              <div
                className="drop-here"
                onDrop={(e) => onDropParticipant(e, "open", draggedParticipant)}
                onDragOver={(e) => e.preventDefault()}>
                Drop here to open user mic
              </div>
            )}
            <Row className="moderate-panels" gutter={[12, 12]}>
              <OpenMic
                eventMetadata={eventMetadata}
                unityParticipants={unityParticipants}
                handRaisedUsers={handRaisedUsers}
                setDraggedParticipant={setDraggedParticipant}
              />
            </Row>
          </Col>
          <Col xs={24} lg={12}>
            <div className="moderate-panels-title">Open Full</div>
            {draggedParticipant && draggedParticipant.from !== "openFull" && (
              <div
                className="drop-here"
                onDrop={(e) => onDropParticipant(e, "openFull", draggedParticipant)}
                onDragOver={(e) => e.preventDefault()}>
                Drop here to open user mic, cam and sharescreen
              </div>
            )}
            <Row className="moderate-panels" gutter={[12, 12]}>
              {unityParticipants
                .filter((participnt) =>
                  eventMetadata.callConfig.allowedShareScreenUsers.includes(participnt.identity),
                )
                .map((participnt) => {
                  const isRaisedHand = handRaisedUsers.includes(participnt.identity);
                  return (
                    <Col xs={24} lg={12} key={participnt.identity}>
                      <Typography.Text
                        draggable={true}
                        onDragEnd={() => setDraggedParticipant(null)}
                        onDragStart={() => {
                          setDraggedParticipant({
                            from: "openFull",
                            name: participnt.name,
                            identity: participnt.identity,
                          });
                        }}
                        style={{
                          color: isRaisedHand ? "blue" : "",
                          cursor: isRaisedHand ? "grab" : "",
                        }}
                        ellipsis>
                        {participnt.name}
                      </Typography.Text>
                    </Col>
                  );
                })}
            </Row>
          </Col>
          <Col xs={24}>
            <div className="moderate-panels-title">Closed Mics</div>
            {draggedParticipant && draggedParticipant.from !== "close" && (
              <div
                className="drop-here"
                onDrop={(e) => onDropParticipant(e, "close", draggedParticipant)}
                onDragOver={(e) => e.preventDefault()}>
                Drop here to close user mic
              </div>
            )}
            <Row className="moderate-panels" gutter={[12, 12]}>
              <ClosedMic
                eventMetadata={eventMetadata}
                unityParticipants={unityParticipants}
                handRaisedUsers={handRaisedUsers}
                setDraggedParticipant={setDraggedParticipant}
              />
            </Row>
          </Col>
          <Col xs={24}>
            <div className="moderate-panels-title">Blocked</div>
            {draggedParticipant && draggedParticipant.from !== "blocked" && (
              <div
                className="drop-here"
                onDrop={(e) => onDropParticipant(e, "blocked", draggedParticipant)}
                onDragOver={(e) => e.preventDefault()}>
                Drop here to block user
              </div>
            )}
            <Row className="moderate-panels" gutter={[12, 12]}></Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

const OpenMic = ({ eventMetadata, unityParticipants, handRaisedUsers, setDraggedParticipant }) => {
  const uniqueFromAllowedVoiceUsers = eventMetadata.callConfig.allowedVoiceUsers.filter(
    (item) => !eventMetadata.callConfig.allowedShareScreenUsers.includes(item),
  );

  return unityParticipants
    .filter((participnt) => uniqueFromAllowedVoiceUsers.includes(participnt.identity))
    .map((participnt) => {
      const isRaisedHand = handRaisedUsers.includes(participnt.identity);
      return (
        <Col xs={24} lg={12} key={participnt.identity}>
          <Typography.Text
            draggable={true}
            onDragEnd={() => setDraggedParticipant(null)}
            onDragStart={() =>
              setDraggedParticipant({
                from: "open",
                name: participnt.name,
                identity: participnt.identity,
              })
            }
            style={{
              color: isRaisedHand ? "blue" : "",
              cursor: isRaisedHand ? "grab" : "",
            }}
            ellipsis>
            {participnt.name}
          </Typography.Text>
        </Col>
      );
    });
};

const ClosedMic = ({
  eventMetadata,
  unityParticipants,
  handRaisedUsers,
  setDraggedParticipant,
}) => {
  const participantsControled = new Set([
    ...eventMetadata.callConfig.allowedVoiceUsers,
    ...eventMetadata.callConfig.allowedShareScreenUsers,
  ]);

  return unityParticipants
    .filter((participnt) => {
      return !participantsControled.has(participnt.identity);
    })
    .map((participnt) => {
      const isRaisedHand = handRaisedUsers.includes(participnt.identity);
      return (
        <Col xs={24} lg={6} key={participnt.identity}>
          <Typography.Text
            draggable={true}
            onDragEnd={() => setDraggedParticipant(null)}
            onDragStart={() =>
              setDraggedParticipant({
                from: "close",
                name: participnt.name,
                identity: participnt.identity,
              })
            }
            style={{
              color: isRaisedHand ? "blue" : "",
              cursor: isRaisedHand ? "grab" : "",
            }}
            ellipsis>
            {participnt.name}
          </Typography.Text>
        </Col>
      );
    });
};
