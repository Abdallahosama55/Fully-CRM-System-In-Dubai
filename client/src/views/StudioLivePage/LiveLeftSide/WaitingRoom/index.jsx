import { Button, Col, Row, Typography } from "antd";
import { ArrowRightSVG } from "assets/jsx-svg";
import { useEffect, useState } from "react";

export default function WaitingRoom({
  setActiveBtn,
  waitingList,
  changeSettings,
}) {
  const [waitingRoomUsersLength, setWaitingRoomUsersLength] = useState(0);

  useEffect(() => {
    setWaitingRoomUsersLength(
      Object.entries(waitingList).filter(([_, value]) => !value.allowedToJoin)
        .length,
    );
  }, [waitingList]);

  const admitAll = () => {
    Object.entries(waitingList)
      .filter(([_, value]) => !value.allowedToJoin)
      .forEach(([key, _]) => {
        changeSettings(`/waitingList/${key}`, {
          allowedToJoin: true,
        });
      });
  };

  return (
    <section>
      <Row
        wrap={false}
        align="middle"
        gutter={[8, 0]}
        style={{ width: "fit-content" }}
        className="clickable"
        onClick={() => setActiveBtn(null)}
      >
        <Col>
          <Row align="middle">
            <ArrowRightSVG color="#8E8E93" style={{ rotate: "180deg" }} />
          </Row>
        </Col>
        <Col>
          <Typography.Text className="gc">Back</Typography.Text>
        </Col>
      </Row>

      {waitingRoomUsersLength === 0 ? (
        <Row style={{ marginTop: "1rem" }}>
          <Typography.Text className="fw-600">
            There Are No Waiting Users
          </Typography.Text>
        </Row>
      ) : (
        <>
          <Row
            align="middle"
            justify="space-between"
            gutter={[12, 12]}
            style={{
              marginBlock: "1rem",
            }}
          >
            <Col>
              <Typography.Title level={4}>Waiting Room</Typography.Title>
            </Col>
            <Col>
              <Button
                onClick={admitAll}
                type="ghost"
                size="small"
                style={{ color: "#3A5EE3" }}
                className="fw-500"
              >
                Admit All
              </Button>
            </Col>
          </Row>

          <Row style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {Object.entries(waitingList)
              .filter(([_, value]) => !value.allowedToJoin)
              .map(([key, value]) => (
                <Col key={key} xs={24}>
                  <Row
                    justify="space-between"
                    align="middle"
                    wrap={false}
                    style={{
                      paddingBlock: "8px",
                      overflowX: "hidden",
                    }}
                  >
                    <Col flex={1}>
                      <Row align="middle" wrap={false}>
                        <Typography.Text ellipsis className="fz-12 fw-500">
                          {value.name}
                        </Typography.Text>
                      </Row>
                    </Col>
                    <Col>
                      <Row align="middle" wrap={false} gutter={[8, 0]}>
                        <Col>
                          <Button
                            type="ghost"
                            size="small"
                            className="fz-12"
                            onClick={() =>
                              changeSettings(`/waitingList/${key}`, {})
                            }
                          >
                            Decline
                          </Button>
                        </Col>

                        <Col>
                          <Button
                            type="primary"
                            size="small"
                            className="fz-12"
                            onClick={() =>
                              changeSettings(`/waitingList/${key}`, {
                                allowedToJoin: true,
                              })
                            }
                          >
                            Admit
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
        </>
      )}
    </section>
  );
}
