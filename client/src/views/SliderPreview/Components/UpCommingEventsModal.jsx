import React from "react";
import { Button, Col, Dropdown, Menu, Modal, Row, message } from "antd";
import {
  LiveEventTitleSVG,
  LiveEventTimerSVG,
  LiveEventWorkshopSVG,
  LiveEventFreeSVG,
  LiveEventSVG,
  LiveEventTwoDotsSVG,
  SliderFacebookShareSVG,
  SliderLinkedinShareSVG,
  SliderTwitterShareSVG,
  SliderGetLinkShareSVG,
} from "assets/jsx-svg";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import dayjs from "dayjs";
import { LoadingOutlined } from "@ant-design/icons";

export default function UpCommingEventsModal({
  sliderId,
  handleCancel,
  isModalOpen,
  dataList,
  width = 500,
  loading = false,
}) {
  return (
    <Modal
      destroyOnClose={true}
      centered={true}
      width={width}
      title={null}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <>
          <h3 style={{ color: "#030713", fontWeight: 500, fontSize: 14 }}>Upcoming Events</h3>
          <hr style={{ borderColor: "#AEAEB23D", marginTop: 7 }} />
          {dataList?.length > 0 ? (
            <Row gutter={[0, 10]} style={{ marginTop: 20 }}>
              {dataList.map((item) => (
                <Col
                  key={item.id}
                  span={24}
                  style={{
                    backgroundColor: "#FAFAFB",
                    borderRadius: 8,
                    padding: "16px 16px 16px 0px",
                    border: "1px solid #E8E8F0",
                  }}>
                  <Row style={{ alignItems: "center" }}>
                    <Col span={4}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}>
                        {item?.isLive ? (
                          <LiveEventSVG />
                        ) : (
                          <>
                            <div style={{ fontSize: 12, fontWeight: 400 }}>
                              {dayjs(item.date).format("ddd")}
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 500 }}>
                              {dayjs(item.date).format("DD")}
                            </div>
                          </>
                        )}
                      </div>
                    </Col>
                    <Col span={16} style={{ borderLeft: "1px solid #E8E8F0", paddingLeft: 15 }}>
                      <Row gutter={[0, 18]}>
                        <Col span={12}>
                          <div style={{ display: "flex", columnGap: 5 }}>
                            <LiveEventTitleSVG />
                            <h5 style={{ fontSize: 11, fontWeight: 400 }}>{item.title} </h5>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div style={{ display: "flex", columnGap: 5 }}>
                            <LiveEventFreeSVG />
                            <h5 style={{ fontSize: 11, fontWeight: 400 }}>Free </h5>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div style={{ display: "flex", columnGap: 5 }}>
                            <LiveEventTimerSVG />
                            <h5 style={{ fontSize: 11, fontWeight: 400 }}>
                              {dayjs(item.date).format("HH:MM A")}-
                              {dayjs(item.date)
                                .add(item.durationInMinutes, "minute")
                                .format("HH:MM A")}
                            </h5>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div style={{ display: "flex", columnGap: 5 }}>
                            <LiveEventWorkshopSVG />
                            <h5 style={{ fontSize: 11, fontWeight: 400 }}>
                              {item?.tags ? item?.tags.join(" , ") : "-"}
                            </h5>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={4}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}>
                        <div style={{ position: "relative", bottom: 10 }}>
                          <Dropdown
                            dropdownRender={() => <DimMenu joinLink={item.customerLink} />}
                            trigger={["hover"]}
                            placement="bottomCenter"
                            arrow>
                            <div style={{ cursor: "pointer" }}>
                              <LiveEventTwoDotsSVG />
                            </div>
                          </Dropdown>
                        </div>
                        <div>
                          {item?.isLive ? (
                            <Button
                              onClick={() =>
                                window.open(
                                  "/event/live/" +
                                    item.id +
                                    "?source=FROM_SLIDER&sourceRef=" +
                                    sliderId +
                                    `${
                                      item.audienceDimensionDropPoint
                                        ? "&droppoint=" + item.audienceDimensionDropPoint
                                        : ""
                                    }`,
                                  "_blank",
                                )
                              }
                              size="small"
                              style={{
                                borderRadius: 8,
                                backgroundColor: "#699D48",
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: 700,
                                paddingInline: 16,
                              }}>
                              Join
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                window.open(
                                  "/event/live/" +
                                    item.id +
                                    "?source=FROM_SLIDER&sourceRef=" +
                                    sliderId +
                                    `${
                                      item.audienceDimensionDropPoint
                                        ? "&droppoint=" + item.audienceDimensionDropPoint
                                        : ""
                                    }`,
                                  "_blank",
                                )
                              }
                              size="small"
                              style={{
                                borderRadius: 8,
                                backgroundColor: "#3A5EE3",
                                color: "#fff",
                                fontSize: 12,
                                fontWeight: 700,
                                paddingInline: 16,
                              }}>
                              Enroll
                            </Button>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          ) : (
            <div
              style={{
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <div>No Upcoming Events to show</div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

const DimMenu = ({ joinLink }) => {
  return (
    <Menu
      className="profile-menu"
      style={{ width: "190px" }}
      items={[
        {
          label: (
            <FacebookShareButton url={joinLink} hashtag={"#hashtag"} description={"aiueo"}>
              <Row align="middle" gutter={[14, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <SliderFacebookShareSVG />
                  </Row>
                </Col>
                <Col>Facebook</Col>
              </Row>
            </FacebookShareButton>
          ),
          key: "0",
        },
        {
          label: (
            <LinkedinShareButton title={"test"} url={joinLink} hashtags={["hashtag1", "hashtag2"]}>
              <Row align="middle" gutter={[14, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <SliderLinkedinShareSVG />
                  </Row>
                </Col>
                <Col>Linkedin</Col>
              </Row>
            </LinkedinShareButton>
          ),
          key: "1",
        },

        {
          label: (
            <TwitterShareButton title={"test"} url={joinLink} hashtags={["hashtag1", "hashtag2"]}>
              <Row align="middle" gutter={[14, 0]} wrap={false}>
                <Col>
                  <Row align="middle">
                    <SliderTwitterShareSVG />
                  </Row>
                </Col>
                <Col>Twitter</Col>
              </Row>
            </TwitterShareButton>
          ),
          key: "3",
        },
        {
          label: (
            <Row
              onClick={() => {
                navigator.clipboard.writeText(joinLink);
                message.success("Link Copied Successfully");
              }}
              align="middle"
              gutter={[14, 0]}
              wrap={false}>
              <Col>
                <Row align="middle">
                  <SliderGetLinkShareSVG />
                </Row>
              </Col>
              <Col>Get Link</Col>
            </Row>
          ),
          key: "4",
        },
      ]}
    />
  );
};
