import { Col, Row, Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import NotificationSound from "assets/notification-sound.mp3";
import { debounce } from "lodash-es";
import { getNotificationSound } from "./utils";
export default function SystemNotifiactions({
  meetingSettings,
  setHideSide,
  setActiveBtn,
  isHost,
  setOpenMobileMenu,
}) {
  const [_, setNumberWatingState] = useState(0);
  const [showWaitingRoomNotification, setShowWaitingRoomNotification] = useState(false);
  const [showDataSharedNotification, setShowDataSharedNotification] = useState(false);
  const prevCounterUserData = useRef(null);
  const audioPlayer = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
  }
  useEffect(() => {
    if (meetingSettings && meetingSettings.waitingList) {
      if (
        Object.entries(meetingSettings?.waitingList).filter(([_, value]) => !value.allowedToJoin)
          .length > 0
      ) {
        setShowWaitingRoomNotification(true);
      } else {
        setShowWaitingRoomNotification(false);
      }
    }

    if (meetingSettings && meetingSettings.counterUsersData) {
      if (
        meetingSettings.counterUsersData !== prevCounterUserData.current &&
        prevCounterUserData.current
      ) {
        setShowDataSharedNotification(true);
      } else {
        setShowDataSharedNotification(false);
      }

      prevCounterUserData.current = meetingSettings.counterUsersData;
    }
  }, [meetingSettings]);
  const debouncedNotification = debounce((message) => {
    playAudio();
    // notification.info({
    //   message,
    //   key: "notification",
    // });
  }, 800);
  const numberWating = useMemo(() => {
    try {
      if (!meetingSettings?.waitingList) {
        return 0;
      }
      return (
        Object.entries(meetingSettings?.waitingList).filter(([_, value]) => !value.allowedToJoin)
          ?.length ?? 0
      );
    } catch (e) {
      return 0;
    }
  }, [meetingSettings]);
  const mountRef = useRef(false);
  useEffect(() => {
    if (isHost) {
      if (mountRef.current) {
        setNumberWatingState((prev) => {
          if (prev < numberWating) {
            if (getNotificationSound())
              debouncedNotification("New users have joined the Waiting Room");

            return numberWating;
          }
          if (prev === numberWating) {
            // notification.destroy("notification");
            return prev;
          }
          if (prev > numberWating) {
            // notification.destroy("notification");
            return numberWating;
          }
        });
      }
      mountRef.current = true;
    }
  }, [numberWating, isHost]);
  return (
    <>
      <div className="users-shared-data-notification">
        {showDataSharedNotification && isHost && (
          <div className="waiting-room-wait">
            <Row justify="space-between" align={"middle"} gutter={[12, 12]}>
              <Col>
                <Typography.Text className="wc fz-12">Users Shared Data With You</Typography.Text>
              </Col>
              <Col>
                <Row gutter={[8, 0]}>
                  <Col>
                    <Typography.Text
                      className="wc fw-600 clickable"
                      onClick={() => {
                        setShowDataSharedNotification(false);
                      }}>
                      Hide
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text
                      className="wc fw-600 clickable"
                      onClick={() => {
                        setHideSide(false);
                        setActiveBtn("counterUserSharedData");
                        setShowDataSharedNotification(false);
                      }}>
                      View
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <div className="waiting-users-notification">
        {showWaitingRoomNotification && isHost && (
          <div className="waiting-room-wait">
            <Row justify="space-between" align={"middle"} gutter={[12, 12]}>
              <Col>
                <Typography.Text className="wc fz-12">
                  There Are{" "}
                  {
                    Object.entries(meetingSettings?.waitingList).filter(
                      ([_, value]) => !value.allowedToJoin,
                    ).length
                  }{" "}
                  User
                  {Object.entries(meetingSettings?.waitingList).filter(
                    ([_, value]) => !value.allowedToJoin,
                  ).length > 2
                    ? "s"
                    : ""}{" "}
                  In The Waiting Room
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text
                  className="wc fw-600 clickable"
                  onClick={() => {
                    if (window.innerWidth < 1200) {
                      setOpenMobileMenu(true);
                    }
                    setHideSide(false);
                    setActiveBtn("waitingRoom");
                    setShowWaitingRoomNotification(false);
                  }}>
                  View All
                </Typography.Text>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <audio ref={audioPlayer} src={NotificationSound} />
    </>
  );
}
