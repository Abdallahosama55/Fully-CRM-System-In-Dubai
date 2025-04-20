import { useState, useContext } from "react";
import { Button, Col, Image, Row, Typography } from "antd";
import { CelebrationSVG, CloseSVG, ColoredSmileSVG, MeetingSVG } from "assets/jsx-svg";

import userContext from "context/userContext";
import youtubeVideoImg from "assets/images/youtubeVideo.png";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";

import "./styles.css";
import { useDrawer } from "hooks/useDrawer";
export default function HomeView() {
  const { user } = useContext(userContext);
  const [hideWelcome, setHideWelcome] = useState(false);
  const DrawerAPI = useDrawer();
  if (hideWelcome) {
    return <></>;
  }

  return (
    <main className="home-view">
      {DrawerAPI.Render}
      <Row gutter={[24, 24]}>
        <Col>
          <CelebrationSVG />
        </Col>
        <Col flex={1}>
          <Row align="middle" gutter={[8, 8]}>
            <Col>
              <Typography.Title level={3} className="fz-20">
                Hello {user.fullName}, {user?.companyName}!
              </Typography.Title>
            </Col>
            <Col>
              <ColoredSmileSVG />
            </Col>
          </Row>

          <Typography.Text className="fz-16 fw-500">
            Excited to have you here! Let’s get started with {user?.companyName || "Vindo"}!
          </Typography.Text>

          <Row gutter={[10, 10]} style={{ marginTop: "24px" }}>
            <Col xs={24} lg={12}>
              <div className="welcome-card">
                <Typography.Title level={4} className="fz-18">
                  Get to know {user?.companyName || "Vindo"}
                </Typography.Title>
                <Row className="mt-1" style={{ height: "105px" }} gutter={[16, 16]} wrap={false}>
                  <Col flex={1}>
                    <Image
                      preview={false}
                      src={youtubeVideoImg}
                      style={{ borderRadius: "14px" }}
                      loading="lazy"
                    />
                  </Col>
                  <Col>
                    <Row
                      justify="space-between"
                      className="h-100"
                      style={{ flexDirection: "column" }}>
                      <Col>Start with the basics now!</Col>
                      <Col>
                        <Row justify="end">
                          <Button
                            style={{ borderRadius: "14px" }}
                            type="primary"
                            className="gradiant-btn">
                            Watch a video
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="welcome-card">
                <Typography.Title level={4} className="fz-18">
                  Meet our Experts{" "}
                </Typography.Title>

                <Row className="mt-1" style={{ height: "105px" }} gutter={[16, 16]} wrap={false}>
                  <Col flex={1}>Start with the basics</Col>
                  <Col>
                    <Row
                      justify="space-between"
                      className="h-100"
                      style={{ flexDirection: "column" }}>
                      <Col></Col>
                      <Col>
                        <Row justify="end">
                          <Button
                            onClick={() => {
                              DrawerAPI.open("40%");
                              DrawerAPI.setDrawerContent(
                                <CallsAndMeetingsAdd DrawerAPI={DrawerAPI} />,
                              );
                            }}
                            style={{ borderRadius: "14px" }}
                            type="primary"
                            className="gradiant-btn">
                            <Row align="middle" gutter={[8, 0]} wrap={false}>
                              <Col>
                                <Row align="middle">
                                  <MeetingSVG />
                                </Row>
                              </Col>
                              <Col>Book a Meeting</Col>
                            </Row>
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="home-view-close clickable" onClick={() => setHideWelcome(true)}>
        <CloseSVG />
      </div>
    </main>
  );
}
