import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Col, Image, Modal, Row, Typography, notification } from "antd";
import { LiveKitRoom } from "@livekit/components-react";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "utils/firebase.utils";
import userContext from "context/userContext";
import WaitingView from "./WaitingView";
import LivePagePanel from "./LivePagePanel";
import LiveStreamService from "services/liveStream.service";
import LivekitService from "services/livekit.service";
import { axiosCatch } from "utils/axiosUtils";
import LoadingPage from "components/common/LoadingPage";
import BackStageRoom from "./BackStageRoom";
import { toggleAudio } from "./DeviceControl";

import "./styles.css";

export default function StudioLivePage() {
  const navigate = useNavigate();
  const { liveId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useContext(userContext);
  const [waitingList, setWaitingList] = useState({});
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hostId, setHostId] = useState(false);
  const [permissionBlockedModal, setPermissionBlockedModal] = useState(false);
  const [publicToken, setPublicToken] = useState(null);
  const [backstageToken, setBackstageToken] = useState(null);
  const [deviceSettings, setDeviceSettings] = useState(undefined);
  const [goLive, setGoLive] = useState(false);
  const [backstageLocalParticipant, setBackstageLocalParticipant] = useState(null);
  const [eventMetadata, setEventMetadata] = useState({
    permissions: {
      mic: false,
      cam: false,
      screen: false,
    },
    callConfig: {
      allowVoice: false,
      allowVideo: false,
      allowShareScreen: false,
      allowedVoiceUsers: [],
      allowedVideoUsers: [],
      allowedShareScreenUsers: [],
    },
  });
  const [talkbackLestineChannel, setTalkbackLestineChannel] = useState(["public", "backstage"]);

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  const db = getDatabase();

  const setUserInWait = useCallback(async () => {
    setWaitingList((prev) => {
      prev[user.id] = {
        name: user.fullName,
        allowedToJoin: false,
      };
      return { ...prev };
    });
    const waitingListRef = ref(db, `vverse/live-admin/${liveId}/waitingList`);

    let updates = {};

    updates[`/${user.id}`] = {
      name: user.fullName,
      allowedToJoin: false,
    };

    await update(waitingListRef, updates);
  }, [db, liveId, user.fullName, user.id]);

  const isHost = useMemo(() => user.id === 79, [user.id]);

  const fetchRoomData = useCallback(
    async (roomName) => {
      try {
        const roomRes = await LivekitService.getRoom(roomName);
        let data = roomRes.data?.data;

        const defaultMetaData = {
          permissions: {
            mic: false,
            cam: false,
            screen: false,
          },
          callConfig: {
            allowVoice: false,
            allowVideo: false,
            allowShareScreen: false,
            allowedVoiceUsers: [],
            allowedVideoUsers: [],
            allowedShareScreenUsers: [],
          },
        };

        if (!data.metadata && isHost) {
          try {
            await LivekitService.updateRoomMetadata(roomName, defaultMetaData);

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

        setEventMetadata(data.metadata);
      } catch (err) {
        axiosCatch(err);
      }
    },
    [isHost],
  );

  useEffect(() => {
    (async () => {
      if (!backstageToken && !liveData) {
        try {
          setLoading(true);
          const res = await LiveStreamService.getById(liveId);
          setLiveData(res.data);
          if (res.data.data.companyId === user.companyId) {
            setHostId(user.id);

            if (user.id) {
              const fetchHostData = async () => {
                try {
                  setLoading(true);
                  const res = await LiveStreamService.getByIdHost(
                    liveId,
                    searchParams.get("token"),
                  );
                  if (!res.data.data) {
                    notification.error({ message: "Invalid Token" });
                    navigate("/");
                    return;
                  }
                  setGoLive(res.data.data.isLive);
                  return res.data.data; // Provide host data to subsequent logic if needed
                } catch (err) {
                  localStorage.removeItem("cameraInput");
                  localStorage.removeItem("audioInput");
                  axiosCatch(err);
                  navigate("/");
                } finally {
                  setLoading(false);
                }
              };
              fetchHostData();
            }
          } else {
            setHostId(false);
            setUserInWait();
          }
          const liveData = res.data;
          if (liveData) {
            const generatePublicChannelTokenRes = await LivekitService.generateToken({
              participant: user.id + "web",
              room: "verse-live-" + liveData.data.customerDimensionId,
              metadata: JSON.stringify({
                id: user.id,
                profileImage: user.profileImage,
                isHost: res.data.data.companyId === user.companyId,
              }),
              name: user.fullName,
            });

            setPublicToken(generatePublicChannelTokenRes.data.data.jwtAccessToken);

            const generateBackstageChannelTokenRes = await LivekitService.generateToken({
              participant: user.id + "Backstage",
              room: "verse-live-backstage-" + liveData.data.customerDimensionId,
              metadata: JSON.stringify({
                id: user.id,
                profileImage: user.profileImage,
                isHost: res.data.data.companyId === user.companyId,
              }),
              name: user.fullName,
            });

            fetchRoomData("verse-live-" + liveData.data.customerDimensionId);

            setBackstageToken(generateBackstageChannelTokenRes.data.data.jwtAccessToken);
          }
        } catch (err) {
          console.log(err);
          notification.info({ message: "Live not found, create live first" });
          axiosCatch(err);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [
    backstageToken,
    fetchRoomData,
    liveData,
    liveId,
    navigate,
    publicToken,
    searchParams,
    setUserInWait,
    user.companyId,
    user.fullName,
    user.id,
    user.profileImage,
  ]);

  useEffect(() => {
    const waitingListRef = ref(db, `vverse/live-admin/${liveId}/waitingList`);

    onValue(waitingListRef, (data) => {
      const value = data.val();
      if (value) {
        setWaitingList(value);
      } else {
        setWaitingList({});
      }
    });
  }, [db, liveId, user.id]);

  const changeSettings = useCallback(
    (setting, data) => {
      const meetSettingsRef = ref(db, `vverse/live-admin/${liveId}`);

      let updates = {};

      updates[`/${setting}`] = data;

      if (setting) update(meetSettingsRef, updates);
    },
    [db, liveId],
  );

  const DevicesModal = useCallback(
    () => (
      <Modal
        centered
        footer={null}
        open={permissionBlockedModal}
        onCancel={() => setPermissionBlockedModal(false)}
        className="meet-block-modal">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} lg={12}>
            <Image
              src="https://www.gstatic.com/meet/permissions_flow_meet_blocked_ltr_539def11c8a9438d31db58dbc655730b.svg"
              preview={false}
            />
          </Col>
          <Col xs={24} lg={12}>
            <Row gutter={[0, 24]}>
              <Col xs={24}>
                <Typography.Title level={3}>
                  Meet has been blocked from using your{" "}
                  {permissionBlockedModal === "Audio" ? "audio" : "camera"}
                </Typography.Title>
              </Col>
              <Col xs={24}>
                <Row gutter={[0, 12]}>
                  <Col xs={24}>
                    <Typography.Text>
                      1. Click in lock icon in your browser's adderss bar
                    </Typography.Text>
                  </Col>
                  <Col xs={24}>
                    <Typography.Text>
                      2. Turn on {permissionBlockedModal === "Audio" ? "audio" : "camera"}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    ),
    [permissionBlockedModal, setPermissionBlockedModal],
  );

  const toggleBackstage = useCallback(
    (toggleBackstageAudioLoading, setToggleBackstageAudioLoading) => {
      console.log("backstageLocalParticipant", backstageLocalParticipant);
      if (backstageLocalParticipant && backstageLocalParticipant.localParticipant) {
        toggleAudio({
          loading: toggleBackstageAudioLoading,
          setLoading: setToggleBackstageAudioLoading,
          localParticipant: backstageLocalParticipant.localParticipant,
          setPermissionBlockedModal,
        });
      }
    },
    [backstageLocalParticipant],
  );

  const livePagePanel = useMemo(
    () => (
      <LivePagePanel
        waitingList={waitingList}
        changeSettings={changeSettings}
        goLive={goLive}
        setGoLive={setGoLive}
        hostId={hostId}
        liveData={liveData}
        setLiveData={setLiveData}
        setPermissionBlockedModal={setPermissionBlockedModal}
        setDeviceSettings={setDeviceSettings}
        eventMetadata={eventMetadata}
        setEventMetadata={setEventMetadata}
        isHost={isHost}
        talkbackLestineChannel={talkbackLestineChannel}
        setTalkbackLestineChannel={setTalkbackLestineChannel}
        toggleBackstage={toggleBackstage}
      />
    ),
    [
      waitingList,
      changeSettings,
      goLive,
      hostId,
      liveData,
      eventMetadata,
      isHost,
      talkbackLestineChannel,
      toggleBackstage,
    ],
  );

  if (loading || !backstageToken) {
    return <LoadingPage />;
  }

  if (user && backstageToken && !loading && !waitingList[user.id] && !hostId) {
    notification.info({ message: "Host didn't accept your request" });
    navigate("/");
  } else {
    if (!waitingList[user.id]?.allowedToJoin && !hostId && !loading) {
      return <WaitingView db={db} />;
    } else if (liveData.data && backstageToken && !loading) {
      return (
        <>
          <DevicesModal />
          <LiveKitRoom
            style={{ width: "100%" }}
            serverUrl="wss://livekit.vverse.co"
            token={publicToken}
            options={
              deviceSettings?.soundOutput
                ? {
                    audioOutput: {
                      deviceId: deviceSettings?.soundOutput,
                    },
                  }
                : null
            }>
            {livePagePanel}
          </LiveKitRoom>

          <LiveKitRoom
            serverUrl="wss://livekit.vverse.co"
            token={backstageToken}
            style={{ position: "absolute", width: "1px", height: "1px", opacity: "0" }}>
            <BackStageRoom
              talkbackLestineChannel={talkbackLestineChannel}
              setBackstageLocalParticipant={setBackstageLocalParticipant}
            />
          </LiveKitRoom>
        </>
      );
    }
  }
}
