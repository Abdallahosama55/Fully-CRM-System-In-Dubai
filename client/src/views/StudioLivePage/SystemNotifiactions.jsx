import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";

export default function SystemNotifiactions({ waitingList, setCollapsed, setActiveBtn, hostId }) {
  const [showWaitingRoomNotification, setShowWaitingRoomNotification] = useState(false);

  useEffect(() => {
    if (Object.keys(waitingList).length !== 0) {
      if (Object?.entries(waitingList)?.filter(([_, value]) => !value.allowedToJoin).length > 0) {
        setShowWaitingRoomNotification(true);
      } else {
        setShowWaitingRoomNotification(false);
      }
    }
  }, [waitingList]);

  return (
    <>
      <div className="waiting-users-notification">
        {showWaitingRoomNotification && hostId && (
          <div className="waiting-room-wait">
            <Row justify="space-between" align={"middle"} gutter={[12, 12]}>
              <Col>
                <Typography.Text className="wc fz-12">
                  There Are{" "}
                  {Object.entries(waitingList).filter(([_, value]) => !value.allowedToJoin).length}{" "}
                  User
                  {Object?.entries(waitingList)?.filter(([_, value]) => !value.allowedToJoin)
                    .length > 2
                    ? "s"
                    : ""}{" "}
                  In The Waiting Room
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text
                  className="wc fw-600 clickable"
                  onClick={() => {
                    setCollapsed(false);
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
    </>
  );
}
