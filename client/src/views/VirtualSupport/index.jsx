import { useCallback, useContext, useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Col, Image, Modal, Row, Typography, notification } from "antd";
import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";

import userContext from "context/userContext";
import VirtualSupportView from "./VirtualSupportView";
import DragContext from "./DragContext";

import CommonService from "services/common.service";
import { axiosCatch } from "utils/axiosUtils";
import { firebaseConfig } from "utils/firebase.utils";
import WaitingView from "./WaitingView";
import LivekitService from "services/livekit.service";
import JoinMeet from "./JoinMeet";

import { initNotificationSound } from "./utils";
import LoadingPage from "components/common/LoadingPage";
import { ConnectionProvider } from "hooks/useConnection";

import "./styles.css";

export default function UserInteractionHOC() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [interacted, setInteracted] = useState(false);
  const [waitingList, setWaitingList] = useState({});
  const [audioInputDeviceSelected, setAudioInputDeviceSelected] = useState(undefined);
  const [audioOutputDeviceSelected, setAudioOutputDeviceSelected] = useState(undefined);
  const [videoInputDeviceSelected, setVideoInputDeviceSelected] = useState(undefined);
  const [permissionBlockedModal, setPermissionBlockedModal] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [camActive, setCamActive] = useState(false);
  const [isMetaverseMeet, setIsMetaverseMeet] = useState(false);
  const [dragData, setDragData] = useState({
    dragging: false,
    dropText: "",
    dimId: null,
    file: null,
  });
  const { meetingId, eventId } = useParams();
  const [meetingData, setMeetingData] = useState({});
  const [eventData, setEventData] = useState({});
  const [fetchLoading, setFetchLoading] = useState(false);
  const [meetingMetadata, setMeetingMetadata] = useState(() => ({
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
  }));
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const db = getDatabase();

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    const waitingListRef = ref(
      db,
      `Company/${
        user?.companyId || meetingData?.isValiedToken?.companyId
      }/meeting/${meetingId}/settings/waitingList`,
    );

    onValue(waitingListRef, (data) => {
      const value = data.val();
      if (value) {
        setWaitingList(value);
      } else {
        setWaitingList({});
      }
    });
  }, [db, meetingData?.isValiedToken?.companyId, meetingId, user]);

  useEffect(() => {
    (async () => {
      if (eventId) {
        try {
          setFetchLoading(true);
          const { data } = await CommonService.getEventInfo(eventId);
          setEventData(data);
        } catch (err) {
          axiosCatch(err);
        } finally {
          setFetchLoading(false);
        }
      } else {
        try {
          const token = searchParams.get("token");
          if (!token && !user) {
            navigate("/");
            notification.info({
              message: "You don't have permission for this meet",
            });
          }
          setFetchLoading(true);
          const res = await CommonService.getMeetingInfo(
            meetingId,
            location.pathname.split("/")[1] === "direct-call" ? "CALL" : "BOOKED",
            token,
          );
          const livekitRes = await LivekitService.getRoom(meetingId);

          if (JSON.stringify(livekitRes.data.data) !== "[]") {
            livekitRes.data.data.metadata &&
              setMeetingMetadata(JSON.parse(livekitRes.data.data.metadata));
          }

          const data = res.data.data;
          setMeetingData(data);
          if (res.data.isValiedToken) {
            if (data) {
              if (data.customerDimensionId) {
                setIsMetaverseMeet(true);
              }
            } else {
              navigate("/");
              notification.info({ message: "There's no meeting with this id" });
            }
          } else {
            if (token) {
              navigate("/");
              notification.info({
                message: "Token Invaild",
              });
            }
          }
        } catch (err) {
          axiosCatch(err);
        } finally {
          setFetchLoading(false);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, meetingId, navigate, eventId]);

  const isHost = useMemo(
    () =>
      user?.type === "EMPLOYEE" &&
      (meetingData?.employee?.account?.companyId === user?.companyId ||
        (meetingData.desk && meetingData?.desk?.companyId === user?.companyId)) &&
      !user?.isGuest,
    [meetingData, user],
  );

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current)
      if (isHost) {
        didMount.current = true;
        initNotificationSound();
      }
  }, [isHost]);

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

  if (fetchLoading) {
    return <LoadingPage />;
  } else if (!interacted && !user) {
    return (
      <>
        <DevicesModal />
        <JoinMeet
          setMicActive={setMicActive}
          setCamActive={setCamActive}
          micActive={micActive}
          camActive={camActive}
          meetingData={meetingData}
          eventData={eventData}
          isHost={isHost}
          meetingMetadata={meetingMetadata}
          setPermissionBlockedModal={setPermissionBlockedModal}
          setInteracted={setInteracted}
          setWaitingList={setWaitingList}
          setAudioInputDeviceSelected={setAudioInputDeviceSelected}
          setVideoInputDeviceSelected={setVideoInputDeviceSelected}
          setAudioOutputDeviceSelected={setAudioOutputDeviceSelected}
          db={db}
        />
      </>
    );
  } else if (!interacted && user) {
    return (
      <>
        <DevicesModal />
        <JoinMeet
          setMicActive={setMicActive}
          setCamActive={setCamActive}
          micActive={micActive}
          camActive={camActive}
          meetingData={meetingData}
          eventData={eventData}
          isHost={isHost}
          meetingMetadata={meetingMetadata}
          setPermissionBlockedModal={setPermissionBlockedModal}
          setInteracted={setInteracted}
          setWaitingList={setWaitingList}
          setAudioInputDeviceSelected={setAudioInputDeviceSelected}
          setVideoInputDeviceSelected={setVideoInputDeviceSelected}
          setAudioOutputDeviceSelected={setAudioOutputDeviceSelected}
          db={db}
        />
      </>
    );
  } else if (user) {
    if (user?.isGuest && !waitingList[user?.id]) {
      notification.info({ message: "Host didn't accept your request" });
      navigate("/");
      window.location.reload();
    } else {
      if (!waitingList[user.id]?.allowedToJoin && user.isGuest) {
        return <WaitingView db={db} />;
      }
      if (waitingList[user.id]?.allowedToJoin || !user.isGuest)
        return (
          <DragContext.Provider value={{ dragData, setDragData }}>
            <DevicesModal />
            <ConnectionProvider>
              <VirtualSupportView
                micId={audioInputDeviceSelected}
                setMicActive={setMicActive}
                camId={videoInputDeviceSelected}
                setCamActive={setCamActive}
                playbackDeviceId={audioOutputDeviceSelected}
                startMicActive={micActive}
                startCamActive={camActive}
                meetingData={meetingData}
                isHost={isHost}
                db={db}
                isMetaverseMeet={isMetaverseMeet}
                initialMeetingMetadata={meetingMetadata}
                permissionBlockedModal={permissionBlockedModal}
                setPermissionBlockedModal={setPermissionBlockedModal}
              />
            </ConnectionProvider>
          </DragContext.Provider>
        );
    }
  }
}
