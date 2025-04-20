import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { LiveKitRoom } from "@livekit/components-react";

import userContext from "context/userContext";
import loadingVideo from "assets/loading.mp4";

import LivekitService from "services/livekit.service";
import { axiosCatch } from "utils/axiosUtils";

import "./styles.css";

import { LoadingOutlined } from "@ant-design/icons";
import { useConnection } from "hooks/useConnection";
import VirtualSupportContent from "./VirtualSupportContent";

export default function VirtualSupportView({
  micId,
  camId,
  playbackDeviceId,
  startMicActive,
  startCamActive,
  meetingData,
  db,
  isMetaverseMeet,
  isHost,
  initialMeetingMetadata,
  setMicActive,
  setCamActive,
  setPermissionBlockedModal,
}) {
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [meetingMetadata, setMeetingMetadata] = useState(initialMeetingMetadata);

  const { wsUrl, token, connect } = useConnection();
  const { meetingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const roomRes = await LivekitService.getRoom(meetingId);
        let data = roomRes.data?.data;

        const defaultMetaData = {
          sharingDim: {
            dimId: "",
            sharing: false,
          },
          sharingWhiteboard: "null",
          previewFile: "null",
          permissions: {
            mic: true,
            chat: true,
            cam: true,
            screen: false,
            whiteBoard: true,
            canDownload: true,
          },
        };

        if (!data.metadata && isHost) {
          try {
            await LivekitService.updateRoomMetadata(meetingId, defaultMetaData);

            data.metadata = defaultMetaData;
          } catch (err) {
            axiosCatch(err);
          }
        }
        try {
          if (typeof data.metadata === "string") {
            data.metadata = JSON.parse(data.metadata);
          }
        } catch (Ignored) {
          data.metadata = defaultMetaData;
        }

        setMeetingMetadata(data.metadata);

        if (!data.metadata.permissions.mic && !isHost) {
          setMicActive(false);
        }
        if (!data.metadata.permissions.cam && !isHost) {
          setCamActive(false);
        }

        await connect(meetingId, isHost, meetingData?.desk?.aiAgent, meetingData?.desk?.id);
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    connect,
    isHost,
    meetingData?.desk?.aiAgent,
    meetingData?.desk?.id,
    meetingId,
    setCamActive,
    setMicActive,
    user,
  ]);

  const livekitRoom = useMemo(() => {
    if (!wsUrl) {
      return <LoadingOutlined />;
    }
    return (
      <LiveKitRoom
        style={{ width: "100%" }}
        serverUrl={wsUrl}
        audio={
          startMicActive
            ? {
                deviceId: micId,
              }
            : false
        }
        token={token}
        video={
          startCamActive
            ? {
                deviceId: camId,
              }
            : false
        }
        options={
          playbackDeviceId
            ? {
                audioOutput: {
                  deviceId: playbackDeviceId,
                },
              }
            : null
        }>
        <VirtualSupportContent
          micId={micId}
          camId={camId}
          meetingData={meetingData}
          db={db}
          isMetaverseMeet={isMetaverseMeet}
          isHost={isHost}
          initialMeetingMetadataContent={meetingMetadata}
          setPermissionBlockedModal={setPermissionBlockedModal}
        />
      </LiveKitRoom>
    );
  }, [
    camId,
    db,
    isHost,
    isMetaverseMeet,
    meetingData,
    meetingMetadata,
    micId,
    playbackDeviceId,
    setPermissionBlockedModal,
    startCamActive,
    startMicActive,
    token,
    wsUrl,
  ]);

  if (!meetingId) {
    notification.error({ message: "Invalid meet link" });
    navigate("/new-meet", { replace: true });
    return null;
  }

  if (loading) {
    return (
      <div className="loading-holder">
        <video autoPlay muted loop className="video-loading">
          <source src={loadingVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return livekitRoom;
}
