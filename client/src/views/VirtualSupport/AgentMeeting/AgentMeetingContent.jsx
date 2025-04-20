import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import AgentAudioRenderer from "./AgentAudioRenderer";
import CallerCard from "./CallerCard";
import "./styles.css";
import { useLocalParticipant, useTrackTranscription } from "@livekit/components-react";
import { Track } from "livekit-client";
import { segmentToChatMessage } from "../utils";

export default function AgentMeetingContent({
  isDefean,
  setIsDefean,
  agentAudioTrack,
  chatMessages,
  setAgentRoomMessages,
}) {
  const [fullScreenCaller, setFullScreenCaller] = useState("");
  const handleToggleFullScreen = (caller) => {
    setFullScreenCaller(fullScreenCaller === caller ? "" : caller);
  };

  const agentMessages = useTrackTranscription(agentAudioTrack);
  const localParticipant = useLocalParticipant();
  const localMessages = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });
  const [transcripts, setTranscripts] = useState(new Map());

  // store transcripts
  useEffect(() => {
    if (agentAudioTrack) {
      agentMessages.segments.forEach((s) =>
        transcripts.set(
          s.id,
          segmentToChatMessage(s, transcripts.get(s.id), agentAudioTrack.participant),
        ),
      );

      localMessages.segments.forEach((s) =>
        transcripts.set(
          s.id,
          segmentToChatMessage(s, transcripts.get(s.id), localParticipant.localParticipant),
        ),
      );

      const allMessages = Array.from(transcripts.values());

      for (const msg of chatMessages) {
        const isAgent = msg.from?.identity === agentAudioTrack.participant?.identity;
        const isSelf = msg.from?.identity === localParticipant.localParticipant.identity;
        let name = "";

        if (isAgent) {
          name = "Luna";
        } else if (isSelf) {
          name = "You";
        } else {
          name = "Unknown";
        }

        allMessages.push({
          name,
          message: msg.message,
          timestamp: msg.timestamp,
          isSelf: isSelf,
        });
      }
      allMessages.sort((a, b) => a.timestamp - b.timestamp);
      setAgentRoomMessages(allMessages);
    }
  }, [
    agentAudioTrack,
    agentMessages,
    chatMessages,
    localMessages,
    localParticipant.localParticipant,
    setAgentRoomMessages,
    transcripts,
  ]);

  return (
    <Row className="h-100 agent-meeting-content" style={{ gap: 16 }}>
      {(fullScreenCaller === "agent" || !fullScreenCaller) && (
        <Col xs={24} style={{ height: fullScreenCaller === "agent" ? "100%" : "calc(50% - 8px)" }}>
          <AgentAudioRenderer onToggleFullScreen={() => handleToggleFullScreen("agent")} />
        </Col>
      )}
      {(fullScreenCaller === "caller" || !fullScreenCaller) && (
        <Col xs={24} style={{ height: fullScreenCaller === "agent" ? "100%" : "calc(50% - 8px)" }}>
          <CallerCard isDefean={isDefean} setIsDefean={setIsDefean} />
        </Col>
      )}
    </Row>
  );
}
