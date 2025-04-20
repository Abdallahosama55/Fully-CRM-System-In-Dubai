import TranscriptionTile from "./TranscriptionTile";

export default function AgentMeetChat({
  noMarign = false,
  isHost,
  meetingMetadata,
  agentRoomMessages,
}) {
  return (
    <TranscriptionTile
      noMarign={noMarign}
      isHost={isHost}
      meetingMetadata={meetingMetadata}
      agentRoomMessages={agentRoomMessages}
    />
  );
}
