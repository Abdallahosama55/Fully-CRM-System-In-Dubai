import { useMemo, useState } from "react";
import { Button, Col, Collapse, Flex, Row, Statistic, Tooltip, Typography } from "antd";
import { useLocalParticipant, useParticipants } from "@livekit/components-react";
import { CaretRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import MenuSide from "./MenuSide";
import ParticipantsList from "../ParticipantsList";
import DeviceSettings from "components/DeviceSettings";
import { FullNameSVG, ProjectManagerSVG, SpeakerSVG, ViewersSVG } from "assets/jsx-svg";
import ShringControl from "./ShringControl";
import LiveKeys from "./LiveKeys";
import { toggleAudio, toggleCam, toggleShareScreen } from "views/StudioLivePage/DeviceControl";

const durationUnits = {
  MIN: "minute",
  HOUR: "hour",
  DAY: "day",
};

export default function SiderContent({
  collapsed,
  menuItems,
  activeBtn,
  setActiveBtn,
  setDragedParticipant,
  hostId,
  liveData,
  setPermissionBlockedModal,
  setStreamCrdential,
  setDeviceSettings,
  goLive,
  setShowSpeakerProfile,
  userRole,
  eventMetadata,
  setEventMetadata,
  talkbackLestineChannel,
  setTalkbackLestineChannel,
  toggleBackstage,
}) {
  const [talkbackChannel, setTalkbackChannel] = useState([]);
  const [sideDropDownOpend, setSideDropDownOpend] = useState(false);
  const [countDownFinish, setCountDownFinish] = useState(false);
  const [toggleAudioLoading, setToggleAudioLoading] = useState(false);
  const [toggleBackstageAudioLoading, setToggleBackstageAudioLoading] = useState(false);
  const [toggleScreenLoading, setToggleScreenLoading] = useState(false);
  const [toggleCameraLoading, setToggleCameraLoading] = useState(false);
  const localParticipant = useLocalParticipant();
  const allParticipants = useParticipants();

  const liveStatus = useMemo(() => {
    const eventStart = dayjs(liveData?.startDate)
      .set("hour", parseInt(liveData?.startTime.split(":")[0]))
      .set("minute", parseInt(liveData?.startTime.split(":")[1]))
      .set("second", parseInt(liveData?.startTime.split(":")[2]));

    const endEventTime = eventStart.add(
      liveData.duration || 0,
      durationUnits[liveData.durationUnit] || "minute",
    );

    const now = dayjs();

    if (now.isBefore(eventStart)) {
      return eventStart;
    } else if (now.isAfter(endEventTime)) {
      return "Event has ended";
    } else {
      return "Live";
    }
    if (countDownFinish) {
      return "Event has ended";
    }
  }, [
    countDownFinish,
    liveData.duration,
    liveData.durationUnit,
    liveData?.startDate,
    liveData?.startTime,
  ]);

  const isSharescreenEnabled = useMemo(() => {
    const shareScreen = localParticipant.localParticipant.getTrackPublicationByName("shareScreen");
    const liveVideoCanvas =
      localParticipant.localParticipant.getTrackPublicationByName("liveVideoCanvas");
    if (liveVideoCanvas && shareScreen) {
      return true;
    } else {
      return false;
    }
  }, [localParticipant.localParticipant.videoTrackPublications.size]);

  return (
    <div className="live-left-side-layout h-100" style={{ padding: collapsed && "20px 0px" }}>
      <div style={{ flex: 1 }}>
        <Row gutter={[0, 22]} style={{ flexDirection: "column", overflowX: "hidden" }} wrap={false}>
          <Col xs={24}>
            <Typography.Text className="fz-16 fw-600">{liveData?.title}</Typography.Text>
          </Col>
          <Row>
            <Col xs={24}>
              <Row justify="space-between">
                <Col>
                  <Typography.Text className="fw-500">Time to Start</Typography.Text>
                </Col>
                <Col>
                  {dayjs(liveStatus).isValid() ? (
                    <Statistic.Countdown
                      value={liveStatus}
                      onFinish={() => setCountDownFinish(true)}
                    />
                  ) : (
                    <Typography.Text className=" fz-12">{liveStatus}</Typography.Text>
                  )}
                </Col>
              </Row>
            </Col>
            {!dayjs(liveStatus).isValid() && liveStatus === "Live" && (
              <Col xs={24}>
                <Row justify="space-between">
                  <Col>
                    <Typography.Text className="fw-500">Time to End</Typography.Text>
                  </Col>
                  <Col>
                    <Statistic.Countdown
                      value={dayjs(liveData?.startDate)
                        .set("hour", parseInt(liveData?.startTime.split(":")[0]))
                        .set("minute", parseInt(liveData?.startTime.split(":")[1]))
                        .set("second", parseInt(liveData?.startTime.split(":")[2]))
                        .add(
                          liveData?.duration || 0,
                          durationUnits[liveData?.durationUnit] || "minute",
                        )}
                      onFinish={() => setCountDownFinish(true)}
                    />
                  </Col>
                </Row>
              </Col>
            )}
          </Row>

          {!collapsed && <Typography.Text className="fz-16 fw-600">Participants</Typography.Text>}
          <Collapse
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 180} />}
            ghost
            rootClassName={`participants-collapse ${
              collapsed ? "participants-collapse-collapsed" : ""
            }`}
            accordion
            items={[
              {
                key: 1,
                label: collapsed ? (
                  <Tooltip title="Admins" placement="right">
                    <ProjectManagerSVG />
                  </Tooltip>
                ) : (
                  <Row justify="space-between" gutter={[16, 0]} wrap={false}>
                    <Col>
                      <ProjectManagerSVG />
                    </Col>
                    <Col flex={1}>
                      <Typography.Text className="fw-500">Admins</Typography.Text>
                    </Col>
                    <Col>
                      <div className="participants-number">
                        {
                          allParticipants?.filter((participant) =>
                            participant.identity.includes("web"),
                          )?.length
                        }
                      </div>
                    </Col>
                  </Row>
                ),
                children: (
                  <ParticipantsList
                    collapsed={collapsed}
                    setDragedParticipant={setDragedParticipant}
                    hostId={hostId}
                    customerDimensionId={liveData?.customerDimensionId}
                  />
                ),
              },
              {
                key: 2,
                label: collapsed ? (
                  <Tooltip title="Speakers" placement="right">
                    <SpeakerSVG />
                  </Tooltip>
                ) : (
                  <Row justify="space-between" gutter={[16, 0]} wrap={false}>
                    <Col>
                      <SpeakerSVG />
                    </Col>
                    <Col flex={1}>
                      <Typography.Text className="fw-500">Speakers</Typography.Text>
                    </Col>
                    <Col>
                      <div className="participants-number">
                        {
                          allParticipants?.filter((participant) =>
                            participant.identity.includes("web"),
                          )?.length
                        }
                      </div>
                    </Col>
                  </Row>
                ),
                children: (
                  <ParticipantsList
                    collapsed={collapsed}
                    setDragedParticipant={setDragedParticipant}
                    hostId={hostId}
                    customerDimensionId={liveData?.customerDimensionId}
                  />
                ),
              },
              {
                key: 3,
                label: collapsed ? (
                  <Tooltip title="Spectators" placement="right">
                    <ViewersSVG />
                  </Tooltip>
                ) : (
                  <Row justify="space-between" gutter={[16, 0]} wrap={false}>
                    <Col>
                      <ViewersSVG />
                    </Col>
                    <Col flex={1}>
                      <Typography.Text className="fw-500">Moderators</Typography.Text>
                    </Col>
                    <Col>
                      <div className="participants-number">
                        {
                          allParticipants?.filter((participant) =>
                            participant.identity.includes("web"),
                          )?.length
                        }
                      </div>
                    </Col>
                  </Row>
                ),
                children: (
                  <ParticipantsList
                    collapsed={collapsed}
                    setDragedParticipant={setDragedParticipant}
                    hostId={hostId}
                    customerDimensionId={liveData?.customerDimensionId}
                  />
                ),
              },
            ]}
          />

          {userRole === "admin" && (
            <ShringControl
              eventMetadata={eventMetadata}
              setEventMetadata={setEventMetadata}
              liveData={liveData}
            />
          )}

          <Row gutter={[0, 12]}>
            <Col xs={24}>
              <Typography.Text
                className="fw-500 center-items"
                style={{
                  marginBottom: "4px",
                }}>
                Speak to
              </Typography.Text>
              <Row>
                <Tooltip
                  title={localParticipant.isMicrophoneEnabled ? "Mute public" : "UnMute public"}>
                  <Button
                    type={localParticipant.isMicrophoneEnabled ? "primary" : "default"}
                    onClick={() => {
                      if (toggleAudioLoading) return;
                      setTalkbackChannel((prev) => {
                        if (prev.includes("public")) {
                          return prev.filter((type) => type !== "public");
                        } else {
                          return [...prev, "public"];
                        }
                      });
                      toggleAudio({
                        loading: toggleAudioLoading,
                        setLoading: setToggleAudioLoading,
                        localParticipant: localParticipant.localParticipant,
                        setPermissionBlockedModal,
                      });
                    }}
                    style={{
                      width: "100px",
                      borderRight: "1px solid #eee",
                      borderTopLeftRadius: "24px",
                      borderBottomLeftRadius: "24px",
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}>
                    Public
                  </Button>
                </Tooltip>
                <Tooltip
                  title={
                    talkbackChannel.includes("backstage") ? "Mute backstage" : "UnMute backstage"
                  }>
                  <Button
                    type={talkbackChannel.includes("backstage") ? "primary" : "default"}
                    onClick={() => {
                      if (toggleBackstageAudioLoading) return;
                      toggleBackstage(toggleBackstageAudioLoading, setToggleBackstageAudioLoading);
                      setTalkbackChannel((prev) => {
                        if (prev.includes("backstage")) {
                          return prev.filter((type) => type !== "backstage");
                        } else {
                          return [...prev, "backstage"];
                        }
                      });
                    }}
                    style={{
                      width: "100px",
                      borderTopRightRadius: "24px",
                      borderBottomRightRadius: "24px",
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                    }}>
                    Backstage
                  </Button>
                </Tooltip>
              </Row>
            </Col>

            <Col xs={24}>
              <Typography.Text
                className="fw-500 center-items"
                style={{
                  marginBottom: "4px",
                }}>
                Listen to
              </Typography.Text>
              <Row>
                <Tooltip
                  title={
                    talkbackLestineChannel.includes("public") ? "Mute public" : "UnMute public"
                  }>
                  <Button
                    type={talkbackLestineChannel.includes("public") ? "primary" : "default"}
                    onClick={() => {
                      setTalkbackLestineChannel((prev) => {
                        if (prev.includes("public")) {
                          return prev.filter((type) => type !== "public");
                        } else {
                          return [...prev, "public"];
                        }
                      });
                    }}
                    style={{
                      width: "100px",
                      borderRight: "1px solid #eee",
                      borderTopLeftRadius: "24px",
                      borderBottomLeftRadius: "24px",
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}>
                    Public
                  </Button>
                </Tooltip>
                <Tooltip
                  title={
                    talkbackLestineChannel.includes("backstage")
                      ? "Mute backstage"
                      : "UnMute backstage"
                  }>
                  <Button
                    type={talkbackLestineChannel.includes("backstage") ? "primary" : "default"}
                    onClick={() => {
                      setTalkbackLestineChannel((prev) => {
                        if (prev.includes("backstage")) {
                          return prev.filter((type) => type !== "backstage");
                        } else {
                          return [...prev, "backstage"];
                        }
                      });
                    }}
                    style={{
                      width: "100px",
                      borderTopRightRadius: "24px",
                      borderBottomRightRadius: "24px",
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                    }}>
                    Backstage
                  </Button>
                </Tooltip>
              </Row>
            </Col>
            <Flex className="w-100" justify="space-between" align="center" gap={12}>
              Camera
              <Button
                onClick={() => {
                  if (toggleCameraLoading) return;
                  toggleCam({
                    loading: toggleCameraLoading,
                    setLoading: setToggleCameraLoading,
                    localParticipant: localParticipant.localParticipant,
                    setPermissionBlockedModal,
                  });
                }}
                size="small"
                type={localParticipant.isCameraEnabled ? "primary" : "default"}>
                {localParticipant.isCameraEnabled ? "Close" : "Open"}
              </Button>
            </Flex>

            <Flex className="w-100" justify="space-between" align="center" gap={12}>
              Screen Share
              <Button
                onClick={() => {
                  if (toggleScreenLoading) return;
                  toggleShareScreen({
                    loading: toggleScreenLoading,
                    setLoading: setToggleScreenLoading,
                    localParticipant: localParticipant.localParticipant,
                  });
                }}
                size="small"
                type={
                  localParticipant.isScreenShareEnabled && isSharescreenEnabled
                    ? "primary"
                    : "default"
                }>
                {localParticipant.isScreenShareEnabled && isSharescreenEnabled ? "Close" : "Open"}
              </Button>
            </Flex>
          </Row>
        </Row>
      </div>
      <Flex vertical gap={20}>
        <MenuSide
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          collapsed={collapsed}
          liveData={liveData}
          menuItems={menuItems}
          setStreamCrdential={setStreamCrdential}
          sideDropDownOpend={sideDropDownOpend}
          setSideDropDownOpend={setSideDropDownOpend}
          goLive={goLive}
          userRole={userRole}
        />

        {userRole === "speaker" && (
          <Row
            gutter={[16, 16]}
            align="middle"
            className="clickable"
            onClick={() => setShowSpeakerProfile((prev) => !prev)}>
            <Col>
              <Row align="middle">
                <FullNameSVG color="#C6C6CB" width={18} height={18} />
              </Row>
            </Col>
            <Col flex={1}>
              <Typography.Text className="fw-500">My Profile</Typography.Text>
            </Col>
          </Row>
        )}

        {userRole !== "speaker" && <LiveKeys setStreamCrdential={setStreamCrdential} />}

        <div style={{ textAlign: collapsed ? "center" : "left" }}>
          <DeviceSettings
            isLocalStorage
            collapsed={collapsed}
            onDeviceSettings={setDeviceSettings}
          />
        </div>
      </Flex>
    </div>
  );
}
