import { FullscreenOutlined, LoadingOutlined } from "@ant-design/icons";
import { useTracks } from "@livekit/components-react";
import { Typography } from "antd";
import { MicOutlinedSVG } from "assets/jsx-svg";
import useMultibandTrackVolume from "hooks/useMultibandTrackVolume";
import { Track } from "livekit-client";
import AudioTrackRenderer from "./AudioTrackRenderer";
import "./styles.css";

export default function AgentAudioRenderer({ onToggleFullScreen }) {
  const tracks = useTracks();
  const agentAudioTrack = tracks.find(
    (trackRef) => trackRef.publication.kind === Track.Kind.Audio && trackRef.participant.isAgent,
  );
  const subscribedVolumes = useMultibandTrackVolume(agentAudioTrack?.publication.track, 5);

  return (
    <div className="h-100 w-100 agent-audio-renderer center-items">
      <span className="name">
        <MicOutlinedSVG />
        AI Vindo Assistant
      </span>
      {agentAudioTrack ? (
        <AudioTrackRenderer
          state="speaking"
          barWidth={20}
          minBarHeight={30}
          maxBarHeight={150}
          accentColor={"#00B1FF"}
          frequencies={subscribedVolumes}
          borderRadius={12}
          gap={16}
        />
      ) : (
        <Typography.Text style={{ color: "white", textAlign: "center" }}>
          <LoadingOutlined style={{ marginBottom: "12px" }} />
          <br />
          AI is connecting...
        </Typography.Text>
      )}
      <span className="agent-full-screen" onClick={onToggleFullScreen}>
        <FullscreenOutlined />
      </span>
    </div>
  );
}
