import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useLocalParticipant, useRoomContext, RoomAudioRenderer } from "@livekit/components-react";

export default function HandelEvents({ setEventMetadata, isHost, talkbackLestineChannel }) {
  const room = useRoomContext();
  const localParticipant = useLocalParticipant();
  const navigate = useNavigate();
  useEffect(() => {
    if (room) {
      room
        .on("roomMetadataChanged", async (e) => {
          try {
            const data = JSON.parse(e);
            setEventMetadata(data);

            if (!data.permissions.screen && localParticipant.isScreenShareEnabled && !isHost) {
              let screenTrack = [];
              localParticipant.localParticipant.videoTrackPublications.forEach((track) => {
                if (track && track.source === "screen_share" && track.name !== "liveVideoCanvas") {
                  screenTrack.push(track);
                }
              });
              if (screenTrack.length) {
                screenTrack.forEach((track) => {
                  localParticipant.localParticipant.unpublishTrack(track.track);
                });
              }
            }

            if (!data.permissions.mic && localParticipant.isMicrophoneEnabled && !isHost) {
              localParticipant.localParticipant.unpublishTrack(
                localParticipant.localParticipant.audioTrackPublications.entries().next().value[1]
                  .track,
              );
            }
            if (!data.permissions.cam && localParticipant.isCameraEnabled && !isHost) {
              localParticipant.localParticipant.unpublishTrack(
                localParticipant.localParticipant.videoTrackPublications.entries().next().value[1]
                  .track,
              );
            }
          } catch (err) {
            console.log(err);
          }
        })
        .on("disconnected", () => {
          navigate("/");
          notification.info({ message: "You have been disconnected" });
        })
        .on("trackPublished", (track) => {
          console.log("trackPublished", track);
          if (track.trackName.includes("unityTrackSound")) {
            track.setSubscribed(false);
          }
        });
    }
  }, [
    localParticipant.isCameraEnabled,
    localParticipant.isMicrophoneEnabled,
    localParticipant.isScreenShareEnabled,
    localParticipant.localParticipant,
    navigate,
    room,
    setEventMetadata,
    isHost,
  ]);

  return <RoomAudioRenderer muted={!talkbackLestineChannel.includes("public")} />;
}
