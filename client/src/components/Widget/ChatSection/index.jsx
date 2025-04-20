import { Col, Row, Tooltip, Typography } from "antd";

import { BackArrow, ChatCloseSVG } from "assets/jsx-svg";
import LoginToChat from "./LoginToChat";

import Chat from "./Chat";

export default function ChatSection({
  setSelectedService,
  setWidgetOpen,
  userData,
  setUserData,
}) {
  return (
    <section className="widget-service-section">
      <div className="service-section-header">
        {userData.email && (
          <Row justify="space-between" align="middle">
            <Col>
              <Row align="middle" gutter={[12, 0]}>
                <Col>
                  <Row align="middle">
                    <BackArrow
                      className="clickable"
                      onClick={() => setSelectedService(null)}
                    />
                  </Row>
                </Col>
                <Col>
                  <Row gutter={[0, 0]}>
                    {userData.name && (
                      <Col xs={24} style={{ lineHeight: "12px" }}>
                        <Typography.Text ellipsis className="wc fz-12 fw-500">
                          {userData.name}
                        </Typography.Text>
                      </Col>
                    )}
                    <Col xs={24} style={{ lineHeight: "10px" }}>
                      <Typography.Text
                        ellipsis
                        className="fz-10"
                        style={{ color: "#D1D1D6" }}
                      >
                        {userData.email}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row align="middle">
                <Tooltip title="End Chat">
                  <ChatCloseSVG
                    className="clickable"
                    onClick={() => setWidgetOpen(false)}
                  />
                </Tooltip>
              </Row>
            </Col>
          </Row>
        )}
      </div>
      <div className="service-section-main">
        {userData.email ? (
          <Chat />
        ) : (
          <LoginToChat
            setSelectedService={setSelectedService}
            setUserData={setUserData}
          />
        )}
      </div>
    </section>
  );
}
