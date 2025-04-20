import React, { useState, useEffect, useRef } from "react";
import { Form, Select, Modal, Typography, Row, Col } from "antd";
import { SettingsSVG } from "assets/jsx-svg";
import { createLocalAudioTrack, createLocalVideoTrack } from "livekit-client";
import { useParticipants } from "@livekit/components-react";
import { message } from "antd";

const DeviceSettings = ({
  onDeviceSettings,
  collapsed,
  isLocalStorage = true,
  customButton,
  defaultValues,
}) => {
  const [open, setOpen] = useState(false);
  const [localParticipant] = useParticipants();
  const [isLoading, setIsLoading] = useState(false);
  const isChangeDevices = useRef(true);
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [form] = Form.useForm();
  const callDetails = async (isDefaultValue = true) => {
    try {
      const localAudioInput = isLocalStorage ? localStorage.getItem("audioInput") : false;
      const localCameraInput = isLocalStorage ? localStorage.getItem("cameraInput") : false;
      await navigator.mediaDevices
        .getUserMedia({
          audio: localAudioInput ? { deviceId: localAudioInput } : true,
          video: localCameraInput ? { deviceId: localCameraInput } : false,
        })
        .then((stream) => {
          stream.getTracks().forEach(function (track) {
            track.stop();
          });
        });
      await navigator.mediaDevices
        .enumerateDevices()
        .then(async (devices) => {
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
          if (isDefaultValue) {
            form.setFieldsValue({
              audioInput: isLocalStorage
                ? localAudioInput ?? audioInputDevices[0]?.deviceId
                : defaultValues?.micId ?? audioInputDevices[0]?.deviceId,
              soundOutput: audioOutputDevices[0]?.deviceId,
            });
          }
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });

      await navigator.mediaDevices
        .getUserMedia({
          audio: localAudioInput ? { deviceId: localAudioInput } : false,
          video: localCameraInput ? { deviceId: localCameraInput } : true,
        })
        .then((stream) => {
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
          setVideoInputDevices(videoInputDevices);
          console.log(defaultValues?.camId);
          if (isDefaultValue)
            form.setFieldsValue({
              cameraInput: isLocalStorage
                ? localCameraInput ?? videoInputDevices[0]?.deviceId
                : defaultValues?.camId ?? videoInputDevices[0]?.deviceId,
            });
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
    } catch (error) {}
  };

  const ref = useRef(true);
  useEffect(() => {
    callDetails(ref.current);
    ref.current = false;
  }, []);

  const handleChangeCamera = async (newDeviceCameraId) => {
    setIsLoading(true);

    if (!localParticipant.isCameraEnabled) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let isCameraEnabled = false;
        const checkCamera = navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            isCameraEnabled = true;
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          })
          .catch((err) => {
            if (err.message === "Permission denied") {
              message.info("You Are Not Allowed To Open Camera");
            }
            setIsLoading(false);
          });
        await checkCamera;
        if (!isCameraEnabled) return;
      } else {
        return;
      }
    }

    let videoTrack = [];
    localParticipant.videoTrackPublications.forEach((track) => {
      if (track && track.source === "camera") {
        videoTrack.push(track);
      }
    });

    if (videoTrack.length) {
      videoTrack.forEach((track) => {
        localParticipant.unpublishTrack(track.track);
      });
      const videoTrackLocal = await createLocalVideoTrack({
        deviceId: newDeviceCameraId,
      });
      await localParticipant.publishTrack(videoTrackLocal);

      setIsLoading(false);
    } else {
      try {
        if (videoTrack.length === 0) {
          const videoTrackLocal = await createLocalVideoTrack({
            deviceId: newDeviceCameraId,
          });

          await localParticipant.publishTrack(videoTrackLocal);

          localParticipant.videoTrackPublications.forEach((track) => {
            if (track && track.source === "camera") {
              videoTrack.push(track);
            }
          });
          videoTrack.forEach((track) => {
            localParticipant.unpublishTrack(track.track);
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleChangeAudioInput = async (newDeviceId) => {
    if (
      localParticipant.permissions.canPublishSources &&
      !localParticipant.permissions.canPublishSources.includes(2)
    ) {
      message.info("You Are Not Allowed To Open Mic");
      setIsLoading(false);
      return;
    }

    if (!localParticipant.isMicrophoneEnabled) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let isAudioEnabled = false;
        await navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
            isAudioEnabled = true;
          })
          .catch((err) => {
            if (err.message === "Permission denied") {
              message.error("Permission denied");
              // setPermissionBlockedModal("Audio");
            }
            // setLoading(false);
            return;
          });
        if (!isAudioEnabled) return;
      }
    }

    let audioTrack = [];
    localParticipant.audioTrackPublications.forEach((track) => {
      if (track && track.source === "microphone") {
        audioTrack.push(track);
      }
    });

    try {
      if (audioTrack.length) {
        audioTrack.forEach((track) => {
          localParticipant.unpublishTrack(track.track);
        });
        const audioTrackLocal = await createLocalAudioTrack({
          deviceId: newDeviceId,
        });

        await localParticipant.publishTrack(audioTrackLocal);
      }
      if (audioTrack.length === 0) {
        const audioTrackLocal = await createLocalAudioTrack({
          deviceId: newDeviceId,
        });

        await localParticipant.publishTrack(audioTrackLocal);

        localParticipant.audioTrackPublications.forEach((track) => {
          if (track && track.source === "microphone") {
            audioTrack.push(track);
          }
        });
        audioTrack.forEach((track) => {
          localParticipant.unpublishTrack(track.track);
        });
      }
    } catch (ignored) {
      console.log(ignored);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = async (data) => {
    try {
      const newAudioDeviceId = data?.audioInput;
      const newDeviceCameraId = data?.cameraInput;
      setIsLoading(true);
      const localAudioInput = isLocalStorage && localStorage.getItem("audioInput");
      const localCameraInput = isLocalStorage && localStorage.getItem("cameraInput");
      if (!isChangeDevices.current) {
        if (newAudioDeviceId !== localAudioInput || !localAudioInput)
          await handleChangeAudioInput(newAudioDeviceId);

        if (newDeviceCameraId !== localCameraInput || !localCameraInput)
          await handleChangeCamera(newDeviceCameraId);
      }
      if (isChangeDevices.current) {
        await handleChangeAudioInput(newAudioDeviceId);
        await handleChangeCamera(newDeviceCameraId);
        isChangeDevices.current = false;
      }
      if (isLocalStorage) {
        localStorage.setItem("cameraInput", newDeviceCameraId);
        localStorage.setItem("audioInput", newAudioDeviceId);
      }
    } catch (e) {
      message.error(e);
      setIsLoading(false);
    }
    setIsLoading(false);
    if (typeof onDeviceSettings === "function") onDeviceSettings(data);
    setOpen(false);
  };
  return (
    <>
      {/* <button onClick={() => setOpen(true)}> */}
      {customButton ? (
        React.cloneElement(customButton, {
          onClick: () => setOpen(true),
        })
      ) : (
        <Row
          className="clickable"
          onClick={() => setOpen(true)}
          justify={!collapsed ? "space-between" : "center"}
          gutter={[16, 0]}
          wrap={false}>
          <Col>
            <SettingsSVG />
          </Col>

          {!collapsed && (
            <Col flex={1}>
              <Typography.Text className="fw-500">Device settings</Typography.Text>
            </Col>
          )}
        </Row>
      )}

      {/* </button> */}

      <Modal
        onOk={() => form.submit()}
        okButtonProps={{
          loading: isLoading,
        }}
        open={open}
        onCancel={() => setOpen(false)}>
        <Typography.Title level={4}>Device settings</Typography.Title>
        <div style={{ padding: "14px" }}>
          <Form layout="vertical" onFinish={onFinish} requiredMark={false} form={form}>
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
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default DeviceSettings;
