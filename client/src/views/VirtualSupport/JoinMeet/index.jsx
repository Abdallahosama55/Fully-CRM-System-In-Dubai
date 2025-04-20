import { useState, useCallback, useContext, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  ConfigProvider,
  Form,
  Image,
  Input,
  Row,
  Select,
  Tooltip,
  Typography,
  message,
  notification,
} from "antd";
import axios from "axios";
import { increment, ref, update } from "firebase/database";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MinusSVG, MuteVoiceSVG, NoVideoSVG, PlusSVG2, VideoSVG, VoiceSVG } from "assets/jsx-svg";
import Webcam from "react-webcam";

import joinBg from "assets/images/startMeetBgV2.jpg";
import userContext from "context/userContext";
import AuthService from "services/auth.service";
import joinAvatar from "assets/images/JoinMeetingAvatar.png";

import "./styles.css";
import Logo from "components/common/Logo";

export default function JoinMeet({
  setMicActive,
  setCamActive,
  micActive,
  camActive,
  meetingData,
  isHost,
  meetingMetadata,
  setPermissionBlockedModal,

  setInteracted,
  setWaitingList,
  db,
  setAudioInputDeviceSelected,
  setVideoInputDeviceSelected,
  setAudioOutputDeviceSelected,
  eventData,
}) {
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);

  const [form] = Form.useForm();
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const [settingsActive, setSettingsActive] = useState(false);
  const location = useLocation();
  const isEvent = location.pathname.includes("/event");

  const onSignAsGuestFinish = useCallback(
    async (values) => {
      try {
        setInteracted(true);

        const {
          data: { data: user },
        } = await AuthService.loginAsGuest({
          username: values.userEmail,
        });
        localStorage.setItem("vverse-token", user.customerPortalAccessToken);
        setUser({ ...user, isGuest: true });
        axios.defaults.headers.authorization = user.customerPortalAccessToken;

        setWaitingList((prev) => {
          prev[user.id] = {
            name: user.fullName,
            allowedToJoin: meetingData?.desk?.aiAgent ?? false, // if agent, no need to wait for joining
          };
          return { ...prev };
        });

        const waitingListRef = ref(
          db,
          `Company/${
            user?.companyId || meetingData?.isValiedToken?.companyId
          }/meeting/${meetingId}/settings/waitingList`,
        );

        const addedToCartRef = ref(
          db,
          `Company/${
            user?.companyId || meetingData?.isValiedToken?.companyId
          }/meeting/${meetingId}/settings/addedToCart`,
        );

        let updates = {};

        updates[`/${user.id}`] = {
          name: user.fullName,
          allowedToJoin: meetingData?.desk?.aiAgent ?? false, // if agent, no need to wait for joining
        };

        update(waitingListRef, updates);

        let addedToCartUpdates = {};
        addedToCartUpdates[`/${user.id}`] = increment(1);

        update(addedToCartRef, addedToCartUpdates);
      } catch (err) {
        setUser(null);
        if (err.response?.status === 409) {
          notification.info({
            message: "User already exist, login to enter the meet",
          });
          navigate(`/login?redirectUrl=${window.location.pathname}${window.location.search}`);
        }
      }
      setAudioInputDeviceSelected(values.audioInput);
      setVideoInputDeviceSelected(values.cameraInput);
      setAudioOutputDeviceSelected(values.soundOutput);
    },
    [
      setAudioInputDeviceSelected,
      setVideoInputDeviceSelected,
      setAudioOutputDeviceSelected,
      setInteracted,
      setUser,
      setWaitingList,
      db,
      meetingData?.isValiedToken?.companyId,
      meetingData?.desk?.aiAgent,
      meetingId,
      navigate,
    ],
  );
  useEffect(() => {
    (async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });
        });
        await navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            const audioInputDevices = [];
            const audioOutputDevices = [];
            devices.forEach((device) => {
              if (device.kind === "audioinput") {
                audioInputDevices.push(device);
              } else if (device.kind === "audiooutput") {
                audioOutputDevices.push(device);
              }
            });
            setAudioInputDevices(audioInputDevices);
            setAudioOutputDevices(audioOutputDevices);
            form.setFieldsValue({
              audioInput: audioInputDevices[0]?.deviceId,
              soundOutput: audioOutputDevices[0]?.deviceId,
            });
          })
          .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
          });
        await navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then((stream) => {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });
        });
        await navigator.mediaDevices
          .enumerateDevices()
          .then((devices) => {
            const videoInputDevices = [];
            devices.forEach((device) => {
              if (device.kind === "videoinput") {
                videoInputDevices.push(device);
              }
            });
            console.log("videoInputDevices", videoInputDevices);
            setVideoInputDevices(videoInputDevices);
            form.setFieldsValue({
              cameraInput: videoInputDevices[0]?.deviceId,
            });
          })
          .catch((err) => {
            console.error(`${err.name}: ${err.message}`);
          });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [form]);

  const onFinish = useCallback(
    async (values) => {
      setAudioInputDeviceSelected(values.audioInput);
      setVideoInputDeviceSelected(values.cameraInput);
      setAudioOutputDeviceSelected(values.soundOutput);
      setInteracted(true);
    },
    [
      setAudioInputDeviceSelected,
      setAudioOutputDeviceSelected,
      setInteracted,
      setVideoInputDeviceSelected,
    ],
  );

  return (
    <main
      className="join-meet"
      style={{
        background: `url(${
          isEvent
            ? eventData?.customerDimension?.image
            : meetingData?.customerDimension
            ? meetingData.customerDimension?.image || joinBg
            : joinBg
        })`,
      }}>
      <div className="meet-blur">
        <div className="join-meet-main">
          <Row gutter={[0, 16]}>
            <Row
              style={{
                width: "100%",
                borderBottom: "1px solid #E8E8F0",
                padding: "0px 0px 20px 0px",
                marginBottom: "8px",
              }}>
              <Col xs={12} lg={12}>
                <Logo />
              </Col>
              <Col xs={12} lg={12} style={{ display: "flex", justifyContent: "end" }}>
                <CloseOutlined style={{ cursor: "pointer" }} />
              </Col>
            </Row>
            <Col xs={24}>
              <Row justify="center">
                {camActive ? (
                  <Webcam className="join-meet-img" mirrored={true} />
                ) : (
                  <Avatar src={user?.profileImage || joinAvatar} className="join-meet-img" />
                )}
                <Col xs={24} style={{ position: "absolute", bottom: "20px" }}>
                  <Row align="middle" justify="center" gutter={[16, 16]}>
                    <Col>
                      <Tooltip title={micActive ? "Mute" : "Unmute"}>
                        <div
                          className="icon-wrapper"
                          onClick={() => {
                            if (!isHost && !meetingMetadata?.permissions.mic) {
                              message.info("You Are Not Allow To Active Mic");
                              return;
                            }
                            if (audioInputDevices.length) {
                              setMicActive((prev) => !prev);
                            } else {
                              setPermissionBlockedModal("Audio");
                              message.info("You Should Enable Mic");
                            }
                          }}>
                          {!micActive || !audioInputDevices.length ? (
                            <MuteVoiceSVG
                              color="#030713"
                              style={{ width: "20px", height: "20px" }}
                            />
                          ) : (
                            <VoiceSVG color="#030713" style={{ width: "20px", height: "20px" }} />
                          )}
                        </div>
                      </Tooltip>
                    </Col>
                    <Col>
                      <Tooltip title={!camActive ? "Enable Camera" : "Disable Camera"}>
                        <div
                          className="icon-wrapper"
                          onClick={() => {
                            if (!isHost && !meetingMetadata?.permissions.cam) {
                              message.info("You Are Not Allow To Active Cam");
                              return;
                            }
                            if (videoInputDevices.length) {
                              setCamActive((prev) => !prev);
                            } else {
                              setPermissionBlockedModal("Camera");
                              message.info("You Should Enable Cam");
                            }
                          }}>
                          {!camActive || !videoInputDevices.length ? (
                            <NoVideoSVG color="#030713" style={{ width: "20px", height: "20px" }} />
                          ) : (
                            <VideoSVG color="#030713" style={{ width: "20px", height: "20px" }} />
                          )}
                        </div>
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            {user && (
              <Col xs={24}>
                <Row justify="center">
                  <Typography.Text className="fw-500" style={{ color: "#030713" }}>
                    {user.fullName}
                  </Typography.Text>
                </Row>
              </Col>
            )}

            <Col xs={24}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#fff",
                    colorPrimaryText: "#fff",
                    borderRadius: "14px",
                    colorBorder: "#fff",
                    colorText: "#fff",
                    colorTextPlaceholder: "#fff",
                  },
                  components: {
                    Select: {
                      colorBgBase: "black",
                      colorBgContainer: "transparent",
                      borderRadius: "14px",
                      controlHeight: "50px",
                      colorBgElevated: "#fff",
                      lineHeight: "50px",
                      colorTextQuaternary: "#fff",
                      colorText: "#000",
                      colorInfoActive: "#fff",
                      paddingXXS: "6px",
                    },
                  },
                }}>
                <Form
                  form={form}
                  onFinish={user ? onFinish : onSignAsGuestFinish}
                  layout="vertical"
                  requiredMark={false}
                  className="join-meet-form">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: settingsActive ? "flex-start" : "center",
                      columnGap: "6px",
                      flexDirection: "column",
                    }}>
                    {!user && (
                      <Form.Item
                        name="userEmail"
                        label="Enter Your Username"
                        className="w-100"
                        style={{ padding: "0 1rem" }}
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Your Username",
                          },
                        ]}>
                        <Input
                          style={{
                            background: "white",
                            border: "1px solid #E8E8F0",
                            color: "black",
                          }}
                          placeholder="Enter Here"
                          type="text"
                          className="enter-name"
                        />
                      </Form.Item>
                    )}

                    <div
                      className="device-settings clickable space-between"
                      style={{
                        marginBottom: settingsActive ? "0.3rem" : "0",
                        marginTop: user ? "0px" : "16px",
                      }}
                      onClick={() => {
                        if (settingsActive) {
                          const settingsEl = document.getElementById("settingsSelect");

                          settingsEl.classList.add("settings-close");
                          setTimeout(() => {
                            settingsEl.classList.remove("settings-close");
                            setSettingsActive((prev) => !prev);
                          }, 300);
                        } else {
                          setSettingsActive((prev) => !prev);
                        }
                      }}>
                      <Typography.Text className="fw-500" style={{ color: "#030713" }}>
                        Device Settings
                      </Typography.Text>

                      {settingsActive ? <MinusSVG /> : <PlusSVG2 />}
                    </div>
                  </div>
                  <div id="settingsSelect">
                    <div
                      style={{ display: settingsActive ? "" : "none" }}
                      className="settings-select">
                      <Form.Item label="Audio Input" name="audioInput">
                        <Select
                          options={audioInputDevices.map((mic) => ({
                            value: mic.deviceId,
                            label: mic.label,
                          }))}
                          placeholder="Select audio input"
                        />
                      </Form.Item>

                      <Form.Item label="Camera Input" name="cameraInput">
                        <Select
                          options={videoInputDevices.map((cam) => ({
                            value: cam.deviceId,
                            label: cam.label,
                          }))}
                          placeholder="Select camera input"
                        />
                      </Form.Item>

                      <Form.Item label="Sound Output" name="soundOutput">
                        <Select
                          options={audioOutputDevices.map((device) => ({
                            value: device.deviceId,
                            label: device.label,
                          }))}
                          placeholder="Select sound input"
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <Form.Item>
                    <Row
                      style={{ paddingInline: "1rem" }}
                      justify="space-between"
                      gutter={[16, 16]}>
                      <Col flex={1}>
                        <Button
                          htmlType="submit"
                          type="primary"
                          style={{
                            paddingInline: "1.5rem",
                            background: "#3A5EE3",
                            borderRadius: "8px",
                          }}
                          className="w-100">
                          Standard Call
                        </Button>
                      </Col>

                      {/* {meetingData.companyDimensionId && (
                            <Col flex={1}>
                              <Link
                                to={`/metaverse/${
                                  meetingData.companyDimensionId
                                }?token=${searchParams.get("token")}&deskId=${
                                  meetingData.companyDimensionId
                                }`}
                              >
                                <Button
                                  htmlType="button"
                                  type="primary"
                                  style={{
                                    paddingInline: "1.5rem",
                                    background: "",
                                  }}
                                  className="join-meet-btn w-100"
                                >
                                  Metaverse Call
                                </Button>
                              </Link>
                            </Col>
                          )} */}
                    </Row>
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  );
}
