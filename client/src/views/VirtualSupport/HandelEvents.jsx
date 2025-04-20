import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useLocalParticipant, useRoomContext, RoomAudioRenderer } from "@livekit/components-react";

export default function HandelEvents({ setMeetingMetadata, isDefean, isHost, fastboard }) {
  const room = useRoomContext();
  const localParticipant = useLocalParticipant();
  const navigate = useNavigate();
  useEffect(() => {
    if (room) {
      room
        .on("roomMetadataChanged", async (e) => {
          try {
            const data = JSON.parse(e);
            setMeetingMetadata(data);

            if (!data.permissions.screen && localParticipant.isScreenShareEnabled && !isHost) {
              let screenTrack = [];
              localParticipant.localParticipant.videoTrackPublications.forEach((track) => {
                if (track && track.source === "screen_share") {
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
            if (fastboard) {
              if (!isHost && !data.permissions.whiteBoard) {
                await fastboard.room.setWritable(false);
              } else {
                await fastboard.room.setWritable(true);
              }
            }
          } catch (err) {
            console.log(err);
          }
        })
        .on("disconnected", (item) => {
          navigate("/");
          notification.info({ message: "You have been disconnected" });
        });
    }
  }, [
    isDefean,
    localParticipant.isCameraEnabled,
    localParticipant.isMicrophoneEnabled,
    localParticipant.isScreenShareEnabled,
    localParticipant.localParticipant,
    navigate,
    room,
    setMeetingMetadata,
    isHost,
    fastboard,
  ]);

  return <>{!isDefean && <RoomAudioRenderer />}</>;
}
