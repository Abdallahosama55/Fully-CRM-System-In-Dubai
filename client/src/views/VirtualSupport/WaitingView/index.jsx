import { useContext } from "react";
import { Button, Col, Image, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import { ref, update } from "firebase/database";

import userContext from "context/userContext";
import { LeaveSVG, WaitingCallSVG } from "assets/jsx-svg";
import joinBg from "assets/images/startMeetBgV2.jpg";

import "./styles.css";
import { CloseOutlined } from "@ant-design/icons";
import Logo from "components/common/Logo";

export default function WaitingView({ db }) {
  const { user } = useContext(userContext);
  const { meetingId } = useParams();

  const endCall = () => {
    const meetSettingsRef = ref(db, `Company/${user.companyId}/meeting/${meetingId}/settings`);

    let updates = {};

    updates[`/waitingList/${user.id}`] = {};

    update(meetSettingsRef, updates);
  };

  return (
    <main
      className="join-meet"
      style={{
        background: `url(${joinBg})`,
      }}>
      <div className="meet-blur">
        <div className="join-meet-main">
          <Row gutter={[0, 8]}>
            <Row
              style={{
                width: "100%",
                borderBottom: "1px solid #E8E8F0",
                padding: "0px 0px 20px 0px",
                marginBottom: "8px",
              }}>
              <Col xs={12} lg={12}>
                <Logo />
              </Col>
              <Col xs={12} lg={12} style={{ display: "flex", justifyContent: "end" }}>
                <CloseOutlined style={{ cursor: "pointer" }} />
              </Col>
            </Row>
            <Row justify="center" style={{ width: "100%" }}>
              <WaitingCallSVG />
            </Row>
            <Row justify="center" style={{ width: "100%" }}>
              <Typography.Title className="fw-500 fz-14" style={{ color: "#030713" }}>
                Please Wait
              </Typography.Title>
            </Row>

            <Row justify="center" style={{ width: "100%" }}>
              <Typography.Text className="fw-400 fz-12" style={{ color: "#464A55" }}>
                The Meeting Host Will Let You In Soon
              </Typography.Text>
            </Row>
            <Row justify="center" style={{ width: "100%" }}>
              <Button
                onClick={() => endCall()}
                id="leave-meeting-btn"
                className="center-items"
                icon={<LeaveSVG />}>
                Leave
              </Button>
            </Row>
          </Row>
        </div>
      </div>
    </main>
  );
}
