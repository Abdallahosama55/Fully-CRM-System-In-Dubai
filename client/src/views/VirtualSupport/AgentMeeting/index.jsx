import { useRemoteParticipants, useTracks } from "@livekit/components-react";
import { RoomEvent, Track } from "livekit-client";

import AgentMeetingContent from "./AgentMeetingContent";
import { Row, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function AgentMeeting({
  isDefean,
  setIsDefean,
  chatMessages,
  setAgentRoomMessages,
}) {
  let agentAudioTrack;
  const tracks = useTracks();
  const participants = useRemoteParticipants({
    updateOnlyOn: [RoomEvent.ParticipantMetadataChanged],
  });
  const agentParticipant = participants.find((p) => p.isAgent);
  const aat = tracks.find(
    (trackRef) => trackRef.publication.kind === Track.Kind.Audio && trackRef.participant.isAgent,
  );
  if (aat) {
    agentAudioTrack = aat;
  } else if (agentParticipant) {
    agentAudioTrack = {
      participant: agentParticipant,
      source: Track.Source.Microphone,
    };
  }

  if (!agentAudioTrack) {
    return (
      <Row className="h-100 agent-meeting-content" style={{ gap: 16 }}>
        <div className="h-100 w-100 agent-audio-renderer center-items">
          <Typography.Text style={{ color: "white", textAlign: "center" }}>
            <LoadingOutlined style={{ marginBottom: "12px" }} />
            <br />
            AI is connecting...
          </Typography.Text>
        </div>
      </Row>
    );
  }

  return (
    <AgentMeetingContent
      isDefean={isDefean}
      setIsDefean={setIsDefean}
      agentAudioTrack={agentAudioTrack}
      chatMessages={chatMessages}
      setAgentRoomMessages={setAgentRoomMessages}
    />
  );
}
