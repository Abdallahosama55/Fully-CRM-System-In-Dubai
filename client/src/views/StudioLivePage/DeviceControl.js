import { message } from "antd";
import {
  createLocalAudioTrack,
  createLocalScreenTracks,
  createLocalVideoTrack,
} from "livekit-client";

const toggleCam = async ({ loading, setLoading, localParticipant, setPermissionBlockedModal }) => {
  if (loading) return;
  setLoading(true);

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
          console.log("err", err);
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
        const videoTrack = await createLocalVideoTrack({
          deviceId: localStorage.getItem("cameraInput") ?? "default",
        });
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
  setPermissionBlockedModal = null,
}) => {
  if (loading) return;
  setLoading(true);

  if (
    localParticipant.permissions.canPublishSources &&
    !localParticipant.permissions.canPublishSources.includes(2)
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
            setPermissionBlockedModal ? setPermissionBlockedModal("Audio") : null;
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
    audioTrack.forEach(async (track) => {
      await localParticipant.unpublishTrack(track.track);
    });
    setLoading(false);
  } else {
    try {
      if (audioTrack.length === 0) {
        const audioTrack = await createLocalAudioTrack({
          deviceId: localStorage.getItem("audioInput"),
        });
        await localParticipant.publishTrack(audioTrack);
      }
    } catch (ignored) {
      return;
    } finally {
      setLoading(false);
    }
  }
};

const toggleShareScreen = async ({ loading, setLoading, localParticipant }) => {
  console.log("loading", loading);
  if (loading) return;
  setLoading(true);

  let screenTrack = [];
  localParticipant.trackPublications.forEach((track) => {
    if (track && (track.source === "screen_share" || track.source === "screen_share_audio")) {
      screenTrack.push(track);
    }
  });
  if (screenTrack.length > 1) {
    screenTrack.forEach((track) => {
      if (track.trackName !== "liveVideoCanvas") {
        localParticipant.unpublishTrack(track.track);
      }
    });
    setLoading(false);
  } else {
    try {
      const screenTracks = await createLocalScreenTracks({
        audio: true,
      });

      if (screenTracks && screenTracks.length > 0) {
        // Publish both video and audio tracks
        for (const track of screenTracks) {
          const trackName = track.kind === "audio" ? "shareScreenAudio" : "shareScreen";
          await localParticipant.publishTrack(track, { name: trackName });
        }
      }
    } catch (err) {
      console.log("createLocalScreenTracks && publishTrack err", err);
      return;
    } finally {
      setLoading(false);
    }
  }
};

export { toggleCam, toggleAudio, toggleShareScreen };
