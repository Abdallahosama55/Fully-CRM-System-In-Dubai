import { message } from "antd";
import { createLocalAudioTrack, createLocalVideoTrack } from "livekit-client";

const toggleCam = async ({
  loading,
  setLoading,
  localParticipant,
  isHost,
  meetingMetadata,
  camId,
  setPermissionBlockedModal,
}) => {
  if (loading) return;
  setLoading(true);

  if (!isHost && !meetingMetadata.permissions?.cam) {
    message.info("You Are Not Allowed To Open Camera");
    setLoading(false);
    return;
  }

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
            setPermissionBlockedModal("Video");
          }
          setLoading(false);
        });
      await checkCamera;
      if (!isCameraEnabled) return;
    } else {
      message.info("Your Device not support mediaDevices");
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
    setLoading(false);
  } else {
    try {
      if (videoTrack.length === 0) {
        const videoTrack = await createLocalVideoTrack(camId ? { deviceId: camId } : null);
        await localParticipant.publishTrack(videoTrack);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
};

const toggleAudio = async ({
  loading,
  setLoading,
  localParticipant,
  isHost,
  meetingMetadata,
  micId,
  setPermissionBlockedModal,
}) => {
  if (loading) return;
  setLoading(true);

  if (
    (!isHost && !meetingMetadata.permissions?.mic) ||
    (localParticipant.permissions.canPublishSources &&
      !localParticipant.permissions.canPublishSources.includes(2))
  ) {
    message.info("You Are Not Allowed To Open Mic");
    setLoading(false);
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
            setPermissionBlockedModal("Audio");
          }
          setLoading(false);
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
  if (audioTrack.length) {
    audioTrack.forEach((track) => {
      localParticipant.unpublishTrack(track.track);
    });
    setLoading(false);
  } else {
    try {
      if (audioTrack.length === 0) {
        const audioTrack = await createLocalAudioTrack(micId ? { deviceId: micId } : null);
        await localParticipant.publishTrack(audioTrack);
      }
    } catch (ignored) {
    } finally {
      setLoading(false);
    }
  }
};

const toggleShareScreen = async ({
  isHost,
  loading,
  setLoading,
  localParticipant,
  meetingMetadata,
}) => {
  if (loading) return;
  setLoading(true);

  if (!isHost && !meetingMetadata.permissions?.screen) {
    setLoading(false);
    message.info("You Are Not Allowed To Share Screen");
    return;
  }

  let screenTrack = [];
  localParticipant.trackPublications.forEach((track) => {
    if (track && (track.source === "screen_share" || track.source === "screen_share_audio")) {
      screenTrack.push(track);
    }
  });
  if (screenTrack.length) {
    screenTrack.forEach((track) => {
      localParticipant.unpublishTrack(track.track);
    });
    setLoading(false);
  } else {
    try {
      if (screenTrack.length === 0) {
        await localParticipant.setScreenShareEnabled(true);
      }
    } catch (ignored) {
    } finally {
      setLoading(false);
    }
  }
};

export { toggleCam, toggleAudio, toggleShareScreen };
