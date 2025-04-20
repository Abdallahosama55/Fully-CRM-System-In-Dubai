import { useEffect, useLayoutEffect, useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Col, Divider, Dropdown, Image, Row, Typography } from "antd";
import { useParticipants } from "@livekit/components-react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  MuteVoiceSVG,
  NoSoundSVG,
  NoVideoSVG,
  ScreenSVG,
  SettingFillSVG,
  SoundSVG,
  VideoSVG,
  VoiceSVG,
} from "assets/jsx-svg";

import { axiosCatch } from "utils/axiosUtils";
import LivekitService from "services/livekit.service";

import avatar from "assets/images/avatar.png";
import { toggleAudio, toggleCam, toggleShareScreen } from "../DeviceControl";

import "./styles.css";
import DeviceSettings from "components/DeviceSettings";
import { disableNotificationSound, enableNotificationSound, getNotificationSound } from "../utils";
import Box from "components/Box";

export default function BottomParticipants({
  meetingSideRef,
  collapsed,
  hideSide,
  isHost,
  setActiveBtn,
  activeBtn,
  setOpenMobileMenu,
  meetingMetadata,
  setMeetingMetadata,
  setIsDefean,
  isDefean,
  setPermissionBlockedModal,
  camId,
  micId,
  isMetaverseMeet,
  handleOpenParticipant,
}) {
  const { meetingId } = useParams();
  const [localParticipant] = useParticipants();
  const allParticipants = useParticipants();
  const [notificationSound, setNotficationSound] = useState(getNotificationSound());
  const [participantsToShow, setParticipantsToShow] = useState(1);
  const [width, setWidth] = useState(0);
  const [toggleCameraLoading, setToggleCameraLoading] = useState(false);
  const [toggleAudioLoading, setToggleAudioLoading] = useState(false);
  const [toggleScreenLoading, setToggleScreenLoading] = useState(false);
  const [changePermissionsLoading, setChangePermissionsLoading] = useState(false);

  useLayoutEffect(() => {
    if (!isMetaverseMeet) {
      setWidth(meetingSideRef?.current?.clientWidth);
    }
  }, [collapsed, hideSide, meetingSideRef, isMetaverseMeet]);

  const handleWindowResize = useCallback(() => {
    setWidth(meetingSideRef?.current?.clientWidth);
  }, [meetingSideRef]);

  useEffect(() => {
    if (!isMetaverseMeet) {
      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, [collapsed, hideSide, isMetaverseMeet, handleWindowResize]);

  useMemo(() => {
    if (!isMetaverseMeet) {
      if (width < 1200) {
        // setActiveBtn(null);
      }
      if (width > 1650) {
        setParticipantsToShow(6);
      } else if (width > 1450) {
        setParticipantsToShow(5);
      } else if (width > 1000) {
        setParticipantsToShow(4);
      } else if (width > 741) {
        setParticipantsToShow(3);
      } else if (width < 500) {
        setParticipantsToShow(1);
      } else if (width < 740) {
        setParticipantsToShow(2);
      }
    }
  }, [isMetaverseMeet, width]);

  const toggleSoundMute = useCallback(async () => {
    setIsDefean((prev) => !prev);
  }, [setIsDefean]);

  // type should be one [mic,chat,cam,screen,whiteBoard,canDownload]
  const changePermissions = async (type, value) => {
    try {
      setChangePermissionsLoading(type);
      const updatedData = meetingMetadata;
      updatedData.permissions[type] = value;
      await LivekitService.updateRoomMetadata(meetingId, {
        metadata: updatedData,
      });
      setMeetingMetadata(updatedData);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setChangePermissionsLoading(false);
    }
  };

  const settingsMenu = useMemo(() => {
    if (meetingMetadata.permissions) {
      return (
        <Row justify="center" align="bottom" className="settings-options">
          <Col xs={24} style={{ marginBottom: "0.5rem" }}>
            <Row align="middle">
              <Col xs={24}>
                <Typography.Text className="fw-600 wc">Allow Participants to :</Typography.Text>
              </Col>
            </Row>
          </Col>
          {settings.map((setting) => (
            <Col
              key={setting.id}
              xs={24}
              onClick={() => {
                if (changePermissionsLoading === setting.value) {
                  return;
                } else {
                  changePermissions(setting.value, !meetingMetadata.permissions[setting.value]);
                }
              }}
              className="clickable">
              <Row align="middle">
                <Col xs={2}>
                  {changePermissionsLoading === setting.value ? (
                    <LoadingOutlined />
                  ) : meetingMetadata.permissions[setting.value] ? (
                    "✔"
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs={22}>{setting.label}</Col>
              </Row>
            </Col>
          ))}
          <Divider style={{ margin: "8px" }} />
          <Col xs={24} style={{ marginBottom: "0.5rem" }}>
            <Row align="middle">
              <Col xs={24}>
                <Typography.Text className="fw-600 wc">My settings :</Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col
            xs={24}
            onClick={() => {
              if (getNotificationSound()) {
                setNotficationSound(false);
                disableNotificationSound();
              } else {
                setNotficationSound(true);
                enableNotificationSound();
              }
            }}
            className="clickable">
            <Row align="middle">
              <Col xs={2}>{notificationSound ? "✔" : ""}</Col>
              <Col xs={22}>{"Notification sound"}</Col>
            </Row>
          </Col>
          <DeviceSettings
            defaultValues={{
              camId,
              micId,
            }}
            customButton={
              <Col className="clickable mt-4" xs={24}>
                <Row align="middle">
                  <Col xs={2}> </Col>
                  <Col xs={22}>
                    <Typography.Text className="fw-600 wc">Device settings</Typography.Text>
                  </Col>
                </Row>
              </Col>
            }
            isIcon={false}
            isLocalStorage={false}></DeviceSettings>
        </Row>
      );
    } else {
      return (
        <div style={{ width: "100px" }}>
          <LoadingOutlined />
        </div>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changePermissionsLoading, meetingMetadata.data, notificationSound]);

  if (localParticipant) {
    return (
      <Row align="middle" wrap={false} gutter={[8, 0]}>
        {activeBtn !== "productionTools" && (
          <>
            <Col flex={1}>
              <Row gutter={[8, 0]} wrap={false}>
                {allParticipants.map((participant, index) => {
                  if (index + 1 > participantsToShow) {
                    return <></>;
                  }
                  if (participant.metadata) {
                    const metaData = JSON.parse(participant.metadata);
                    participant.id = metaData.id;
                    participant.profileImage = metaData.profileImage;
                  }

                  return (
                    <Col flex={1} key={participant.sid}>
                      <div className="bottom-participant">
                        <Row wrap={false} justify="space-between" align="middle" gutter={[16, 0]}>
                          <Col>
                            <Row wrap={false} gutter={[8, 0]} align="middle">
                              <Col>
                                <Image
                                  preview={false}
                                  src={
                                    [null, undefined, "null", "undefined", ""].includes(
                                      participant?.profileImage,
                                    )
                                      ? avatar
                                      : participant?.profileImage || avatar
                                  }
                                  height={38}
                                  width={38}
                                  style={{ borderRadius: "12px", border: "1px solid #F2F2F7" }}
                                />
                              </Col>
                              <Col>
                                <Typography.Text ellipsis style={{ maxHeight: "100px" }}>
                                  {participant.name}
                                </Typography.Text>
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Row wrap={false} gutter={[12, 0]} align="middle">
                              <Col>
                                <Row align="middle">
                                  {participant.isMicrophoneEnabled && (
                                    <VoiceSVG
                                      color={participant.isSpeaking ? "#3A5EE3" : "#6787ff"}
                                      style={{ width: "18px", height: "18px" }}
                                    />
                                  )}
                                  {!participant.isMicrophoneEnabled && (
                                    <MuteVoiceSVG
                                      color="#BDBDBD"
                                      style={{ width: "18px", height: "18px" }}
                                    />
                                  )}
                                </Row>
                              </Col>
                              <Col>
                                <Row align="middle">
                                  {participant.isCameraEnabled && (
                                    <VideoSVG
                                      color="#3A5EE3"
                                      style={{ width: "18px", height: "18px" }}
                                    />
                                  )}
                                  {!participant.isCameraEnabled && (
                                    <NoVideoSVG
                                      color="#BDBDBD"
                                      style={{ width: "18px", height: "18px" }}
                                    />
                                  )}
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
            {allParticipants.length > participantsToShow && (
              <Col>
                <div
                  onClick={() => {
                    if (window.innerWidth < 1200) {
                      setOpenMobileMenu(true);
                    }

                    setActiveBtn("participant");
                    handleOpenParticipant();
                  }}
                  className="show-more-participants clickable"
                  style={{ background: `url(${avatar})` }}>
                  +{allParticipants.length - participantsToShow}
                </div>
              </Col>
            )}
          </>
        )}
        {activeBtn === "productionTools" ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #e8e8f0",
              borderRadius: "8px",
              padding: "4px 12px",
              alignItems: "center",
              marginInline: "4px",
            }}>
            {isHost ? (
              <Dropdown trigger={["click"]} dropdownRender={() => settingsMenu}>
                <div
                  className="meeting-settings"
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    position: "unset",
                  }}>
                  <SettingFillSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                </div>
              </Dropdown>
            ) : (
              <div></div>
            )}
            <div
              className="meeting-controls"
              style={{
                position: "unset",
                height: "fit-content",
                transform: "unset",
                left: "unset",
              }}>
              <Row gutter={[8, 0]} align="middle">
                <Col>
                  <div className="meeting-controls-btn" onClick={toggleSoundMute}>
                    {isDefean ? (
                      <NoSoundSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <SoundSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                    )}
                  </div>
                </Col>

                {meetingMetadata.permissions?.screen ? (
                  <Col>
                    <div
                      className="meeting-controls-btn clickable"
                      onClick={() =>
                        toggleShareScreen({
                          isHost,
                          loading: toggleScreenLoading,
                          setLoading: setToggleScreenLoading,
                          localParticipant,
                          meetingMetadata,
                        })
                      }>
                      <ScreenSVG style={{ width: "20px", height: "20px" }} className="clickable" />
                    </div>
                  </Col>
                ) : null}

                <Col>
                  <div
                    style={{ pointerEvents: toggleAudioLoading && "none" }}
                    className="meeting-controls-btn"
                    onClick={() =>
                      toggleAudio({
                        loading: toggleAudioLoading,
                        setLoading: setToggleAudioLoading,
                        localParticipant,
                        isHost,
                        meetingMetadata,
                        micId,
                        setPermissionBlockedModal,
                      })
                    }>
                    {!localParticipant.isMicrophoneEnabled ? (
                      <MuteVoiceSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <VoiceSVG color={"#fff"} style={{ width: "20px", height: "20px" }} />
                    )}
                  </div>
                </Col>
                <Col>
                  <div
                    style={{ pointerEvents: toggleCameraLoading && "none" }}
                    className="meeting-controls-btn"
                    onClick={() =>
                      toggleCam({
                        loading: toggleCameraLoading,
                        setLoading: setToggleCameraLoading,
                        localParticipant,
                        isHost,
                        meetingMetadata,
                        camId,
                        setPermissionBlockedModal,
                      })
                    }>
                    {!localParticipant.isCameraEnabled ? (
                      <NoVideoSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <VideoSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Box>
        ) : (
          <>
            <div
              className="meeting-controls"
              style={{
                bottom: activeBtn === "productionTools" && "0px",
              }}>
              <Row gutter={[8, 0]} align="middle">
                <Col>
                  <div className="meeting-controls-btn" onClick={toggleSoundMute}>
                    {isDefean ? (
                      <NoSoundSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <SoundSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                    )}
                  </div>
                </Col>

                {!isHost && meetingMetadata.permissions?.screen ? (
                  <Col>
                    <div
                      className="meeting-controls-btn clickable"
                      onClick={() =>
                        toggleShareScreen({
                          isHost,
                          loading: toggleScreenLoading,
                          setLoading: setToggleScreenLoading,
                          localParticipant,
                          meetingMetadata,
                        })
                      }>
                      <ScreenSVG style={{ width: "20px", height: "20px" }} className="clickable" />
                    </div>
                  </Col>
                ) : null}

                <Col>
                  <div
                    style={{ pointerEvents: toggleAudioLoading && "none" }}
                    className="meeting-controls-btn"
                    onClick={() =>
                      toggleAudio({
                        loading: toggleAudioLoading,
                        setLoading: setToggleAudioLoading,
                        localParticipant,
                        isHost,
                        meetingMetadata,
                        micId,
                        setPermissionBlockedModal,
                      })
                    }>
                    {!localParticipant.isMicrophoneEnabled ? (
                      <MuteVoiceSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                    ) : (
                      <VoiceSVG color={"#fff"} style={{ width: "20px", height: "20px" }} />
                    )}
                  </div>
                </Col>
                {!isMetaverseMeet && (
                  <Col>
                    <div
                      style={{ pointerEvents: toggleCameraLoading && "none" }}
                      className="meeting-controls-btn"
                      onClick={() =>
                        toggleCam({
                          loading: toggleCameraLoading,
                          setLoading: setToggleCameraLoading,
                          localParticipant,
                          isHost,
                          meetingMetadata,
                          camId,
                          setPermissionBlockedModal,
                        })
                      }>
                      {!localParticipant.isCameraEnabled ? (
                        <NoVideoSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                      ) : (
                        <VideoSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                      )}
                    </div>
                  </Col>
                )}
              </Row>
            </div>

            {isHost && (
              <Dropdown trigger={["click"]} dropdownRender={() => settingsMenu}>
                <div
                  className="meeting-settings"
                  style={{
                    width: "fit-content",
                    bottom: isMetaverseMeet && "80px",
                    right: isMetaverseMeet && "28px",
                    zIndex: isMetaverseMeet && "998",
                  }}>
                  <SettingFillSVG color="#fff" style={{ width: "20px", height: "20px" }} />
                </div>
              </Dropdown>
            )}
          </>
        )}
      </Row>
    );
  } else {
    return <LoadingOutlined />;
  }
}

const settings = [
  { id: 1, value: "screen", label: "Share Screen" },
  { id: 2, value: "chat", label: "Chat" },
  { id: 3, value: "mic", label: "Unmute Themselves" },
  { id: 4, value: "cam", label: "Start Video" },
  { id: 5, value: "whiteBoard", label: "Use Whiteboard" },
  { id: 6, value: "canDownload", label: "Allow Download" },
];
