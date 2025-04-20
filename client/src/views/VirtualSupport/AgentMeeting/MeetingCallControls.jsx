import { Track } from "livekit-client";
import * as React from "react";
import {
  CameraDisabledIcon,
  CameraIcon,
  MicDisabledIcon,
  MicIcon,
  useLocalParticipant,
  useLocalParticipantPermissions,
  usePersistentUserChoices,
  useTrackToggle,
} from "@livekit/components-react";
import { NoSoundSVG, SoundSVG } from "assets/jsx-svg";

export function MeetingCallControls({
  videoTrack,
  onToggleCamera,
  controls,
  setIsDefean,
  isDefean,
  saveUserChoices = true,
}) {
  const visibleControls = { ...controls };
  const { localParticipant } = useLocalParticipant();
  const localPermissions = useLocalParticipantPermissions();

  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
  } else {
    visibleControls.camera ??= localPermissions.canPublish;
    visibleControls.microphone ??= localPermissions.canPublish;
    visibleControls.screenShare ??= localPermissions.canPublish;
    visibleControls.chat ??= localPermissions.canPublishData && controls?.chat;
  }

  const { saveAudioInputEnabled, saveVideoInputEnabled } = usePersistentUserChoices({
    preventSave: !saveUserChoices,
  });

  const microphoneOnChange = React.useCallback(
    (enabled, isUserInitiated) => (isUserInitiated ? saveAudioInputEnabled(enabled) : null),
    [saveAudioInputEnabled],
  );

  const cameraOnChange = React.useCallback(
    (enabled, isUserInitiated) => {
      onToggleCamera(enabled);
      return isUserInitiated ? saveVideoInputEnabled(enabled) : null;
    },
    [saveVideoInputEnabled, videoTrack, localParticipant],
  );

  const { buttonProps: audioButtonProps, enabled: isAudioEnabled } = useTrackToggle({
    source: Track.Source.Microphone,
    onChange: microphoneOnChange,
  });

  const { buttonProps: cameraButtonProps, enabled: isCameraEnabled } = useTrackToggle({
    source: Track.Source.Camera,
    onChange: cameraOnChange,
  });

  const toggleSoundMute = () => {
    setIsDefean((prev) => !prev);
  };

  return (
    <>
      <div className="clickable" onClick={toggleSoundMute}>
        {isDefean ? (
          <NoSoundSVG color="#fff" style={{ width: "18px", height: "18px" }} />
        ) : (
          <SoundSVG color="#fff" style={{ width: "18px", height: "18px" }} />
        )}
      </div>
      {visibleControls.microphone && (
        <div {...audioButtonProps} className={"clickable " + audioButtonProps?.className}>
          {isAudioEnabled ? <MicIcon /> : <MicDisabledIcon />}
        </div>
      )}
      {visibleControls.camera && (
        <div {...cameraButtonProps} className={"clickable " + cameraButtonProps?.className}>
          {isCameraEnabled ? <CameraIcon /> : <CameraDisabledIcon />}
        </div>
      )}
    </>
  );
}
