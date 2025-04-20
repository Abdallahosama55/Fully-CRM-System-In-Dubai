import { useEffect } from "react";
import { RoomAudioRenderer, useLocalParticipant, useRoomContext } from "@livekit/components-react";

export default function BackStageRoom({ talkbackLestineChannel, setBackstageLocalParticipant }) {
  const room = useRoomContext();
  const localParticipant = useLocalParticipant();

  useEffect(() => {
    if (room) {
      room.on("connected", () => {
        setBackstageLocalParticipant(localParticipant);
      });
    }
  }, [localParticipant, room, setBackstageLocalParticipant]);

  return <RoomAudioRenderer muted={!talkbackLestineChannel.includes("backstage")} />;
}
