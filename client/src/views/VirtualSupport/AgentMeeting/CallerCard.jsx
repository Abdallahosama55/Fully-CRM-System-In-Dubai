import { VideoTrack, useTracks } from "@livekit/components-react";
import { Avatar } from "antd";
import avatar from "assets/images/avatar.png";
import userContext from "context/userContext";
import useMultibandTrackVolume from "hooks/useMultibandTrackVolume";
import { Track } from "livekit-client";
import { useContext, useMemo, useState } from "react";
import AudioTrackRenderer from "./AudioTrackRenderer";
import { MeetingCallControls } from "./MeetingCallControls";
import "./styles.css";

export default function CallerCard({ isDefean, setIsDefean }) {
  const tracks = useTracks();
  const [isRenderingVideoTrack, setIsRenderingVideoTrack] = useState(false);
  const videoTrack = tracks?.find((t) => t.source === "camera");
  const { user } = useContext(userContext);

  const localAudioTrack = tracks.find(
    (trackRef) => trackRef.publication.kind === Track.Kind.Audio && !trackRef.participant.isAgent,
  );

  const defaultVolumes = useMemo(
    () => Array.from({ length: 10 }).map(() => Array.from({ length: 50 }).map(() => 0)),
    [],
  );

  const subscribedVolumes = useMultibandTrackVolume(localAudioTrack?.publication.track, 10);

  return (
    <div className="h-100 w-100 caller-audio-renderer d-flex align-center justify-center">
      <span className="name">{user?.fullName} (Me)</span>
      {videoTrack && isRenderingVideoTrack ? (
        <VideoTrack trackRef={videoTrack} width={"100%"} height={"100%"} />
      ) : (
        <Avatar size={100} src={user?.profileImage || avatar} />
      )}
      <span className="caller-audio-track">
        <AudioTrackRenderer
          state="speaking"
          barWidth={2}
          minBarHeight={2}
          maxBarHeight={30}
          accentColor={"white"}
          frequencies={subscribedVolumes?.length > 0 ? subscribedVolumes : defaultVolumes}
          borderRadius={6}
          gap={2}
        />
      </span>
      <span className="caller-track-controls">
        <MeetingCallControls
          videoTrack={videoTrack}
          onToggleCamera={setIsRenderingVideoTrack}
          isDefean={isDefean}
          setIsDefean={setIsDefean}
        />
      </span>
    </div>
  );
}
