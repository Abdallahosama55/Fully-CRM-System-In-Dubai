import { useContext } from "react";
import { Avatar, Col, Grid, Image, Row, Skeleton, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

import RegistrationFlow from "./RegistrationFlow";
import MeetingDetails from "./MeetingDetails";
import userContext from "context/userContext";
import LogoutSVG2 from "assets/jsx-svg/LogoutSVG2";
import { useParams } from "react-router-dom";
import useCheckEmailEventAccessAndEnroll from "services/Common/Queries/useCheckEmailEventAccessAndEnroll";
import Logo from "components/common/Logo";

const JoinMeetingNewUi = ({ eventData }) => {
  const { user, setUser } = useContext(userContext);
  const screens = Grid.useBreakpoint();
  const { xs } = screens;
  const { eventId } = useParams();

  const { data: checkEmailEventAccessAndEnroll, isPending: checkEmailEventAccessAndEnrollLoading } =
    useCheckEmailEventAccessAndEnroll(
      { eventId, email: user.email },
      {
        enabled: user && user.email,
        select: (data) => data.data.data,
      },
    );

  console.log(checkEmailEventAccessAndEnroll);
  if (!eventData) {
    return null;
  }

  return (
    <Row style={{ margin: xs && "24px" }}>
      <Col xs={24} lg={24}>
        <Row
          style={{
            marginInline: !xs && "40px",
            marginTop: !xs && "14px",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}>
          <Logo />
          {user && (
            <Row
              justify="end"
              style={{
                alignItems: "center",
              }}>
              {!user.profileImage ? (
                <Avatar size={40} icon={<UserOutlined />} />
              ) : (
                <Avatar size={40} src={user.profileImage} />
              )}
              <Typography.Text style={{ marginLeft: "8px", fontWeight: 600, fontSize: "14px" }}>
                {user.fullName}
              </Typography.Text>
              <LogoutSVG2
                style={{ marginLeft: "8px", cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("vindo-token");
                  localStorage.removeItem("DMC_TOKEN");
                  setUser(null);
                  axios.defaults.headers.authorization = null;
                }}
              />
            </Row>
          )}
        </Row>

        <Row justify={"center"}>
          <Typography.Text style={{ fontWeight: 600, fontSize: "24px" }}>
            {eventData?.company?.name}
          </Typography.Text>
        </Row>

        <Row
          justify={"center"}
          style={{ borderBottom: "1px solid #E5E5EA", padding: "10px 0px 30px 0px" }}>
          <Typography.Text style={{ fontWeight: 500, fontSize: "16px" }}>
            {eventData?.title}
          </Typography.Text>
        </Row>

        <Row justify="center">
          <Col lg={12} xs={20}>
            {checkEmailEventAccessAndEnrollLoading ? (
              <Skeleton />
            ) : checkEmailEventAccessAndEnroll.hasAccess ? (
              checkEmailEventAccessAndEnroll.enroll ? (
                "You have been enrolled already"
              ) : (
                <RegistrationFlow />
              )
            ) : (
              <Row justify="center" style={{ paddingBlock: "1rem" }}>
                <Typography.Title level={5}>You don't have access to this event</Typography.Title>
              </Row>
            )}

            <MeetingDetails isEvent={true} eventData={eventData} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default JoinMeetingNewUi;
