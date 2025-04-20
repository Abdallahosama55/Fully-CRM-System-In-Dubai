import { useState } from "react";
import { Button, Col, Row, Typography, Grid, Space } from "antd";

import SuccessIcon from "./SuccessIcon";
import EnrollToEvent from "./EnrollToEvent";

import "./styles.css";

export const REGISTRATION = "registration";
export const LOGIN = "login";
export const SIGN_UP = "sign_up";
export const ENROLL = "enroll";
export const VERIFICATION_CREATE_ACCOUNT = "verificationCreateAccount";
export const ADD_TO_CALENDER = "addToCalender";
export const JOIN_TO_MEETING = "JoinToMeeting";

const RegistrationFlow = () => {
  const [navigateStatus, setNavigateStatus] = useState(REGISTRATION);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const { xs } = screens;

  return (
    <Row
      justify="center"
      style={{ padding: "40px 0px 20px 0px", marginBottom: "10px" }}
      gutter={[0, 18]}>
      {showSuccessIcon ? (
        <SuccessIcon />
      ) : navigateStatus === ENROLL ? (
        <EnrollToEvent
          setNavigateStatus={setNavigateStatus}
          setShowSuccessIcon={setShowSuccessIcon}
        />
      ) : (
        <>
          <Col lg={12} xs={24}>
            <div className="flex-column">
              <Typography.Text className="text-title">Enroll</Typography.Text>
              <Typography.Text className="text-description">Enroll in this event</Typography.Text>
            </div>
          </Col>
          <Col lg={12} xs={24} className="flex-row-reverse">
            <Space
              style={{ width: xs && "100%" }}
              size={8}
              direction={xs ? "vertical" : "horizontal"}>
              <Button
                id="btn-guest"
                type="primary"
                style={{ width: xs && "100%" }}
                onClick={() => setNavigateStatus(ENROLL)}>
                Enroll
              </Button>
            </Space>
          </Col>
        </>
      )}
    </Row>
  );
};

export default RegistrationFlow;
