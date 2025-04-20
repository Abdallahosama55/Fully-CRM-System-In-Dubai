import { Avatar, Button, Col, Input, Row, Typography, message } from "antd";
import profileImg from "assets/images/avatar.png";
import { LinkSVG, SearchSiderSVG } from "assets/jsx-svg";

import { useParticipants } from "@livekit/components-react";
import userContext from "context/userContext";
import { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ViewCustomer from "views/Customers/ViewCustomer/ViewCustomer";
import ParticipantListItem from "./ParticipantListItem";
import "./styles.css";

export default function MeetingCallParticipants({
  meetingSettings,
  changeSettings,
  isHost,
  onSearch,
  setActiveBtn,
  metaverseParticipants,
  setOpenMobileMenu,
  meetingMetadata,
  selectedCam,
  selectedMic,
}) {
  const { user } = useContext(userContext);
  const [participantsToShow, setParticipantsToShow] = useState(10);
  const [selectedCustomerId, setSelectedCustomerId] = useState();

  const participants = useParticipants();
  const filteredParticipants = useMemo(
    () => participants?.filter((participant) => participant.identity.includes("web")),
    [participants, meetingMetadata],
  );
  const { meetingId } = useParams();

  const handleCustomerSelected = (id) => {
    setSelectedCustomerId(id);
  };

  const handleCustomerUpdateSuccess = () => {
    // TODO: we should find a way to update participants data after updating customers from the drawer
  };

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Typography.Text className="fw-500 fz-18">
            Participants{" "}
            <span className="fz-14 ">
              ({filteredParticipants?.length + +(meetingSettings?.numberOfUsersJoined || 0)})
            </span>
          </Typography.Text>
        </Col>

        <Col className="d-flex">
          <Row
            className="clickable"
            gutter={[8]}
            align="middle"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              message.success("Link Copied Successfully ✅");
            }}>
            <Col className="d-flex">
              <LinkSVG style={{ width: "14px", height: "14px" }} color="#3A5EE3" />
            </Col>
            <Col>
              <Typography.Text style={{ color: "#3A5EE3" }}>Copy Invitation link</Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        gutter={[0, 14]}
        style={{ marginTop: "24px", maxHeight: "calc(100% - 114px)" }}
        className="h-100">
        <Col xs={24}>
          <Input
            onChange={onSearch}
            prefix={<SearchSiderSVG color="#AEAEB2" />}
            placeholder="Search"
          />
        </Col>
        <Row style={{ flexDirection: "column" }} justify="space-between" className="h-100 w-100">
          <Col flex={1}>
            <Row className="support-participants" gutter={[0, 12]}>
              {filteredParticipants?.slice(0, participantsToShow).map((participant) => (
                <ParticipantListItem
                  key={participant.identity}
                  participant={participant}
                  isHost={isHost}
                  meetingMetadata={meetingMetadata}
                  selectedCam={selectedCam}
                  selectedMic={selectedMic}
                  meetingId={meetingId}
                  onCustomerSelected={handleCustomerSelected}
                />
              ))}

              {metaverseParticipants
                .filter((participant) => participant.id !== user.id)
                ?.map((participant) => (
                  <Col key={participant.id} xs={24}>
                    <Row
                      justify="space-between"
                      align="middle"
                      wrap={false}
                      style={{
                        padding: "8px 12px",
                      }}>
                      <Col flex={1}>
                        <Row align="middle" wrap={false}>
                          <Avatar
                            style={{ objectFit: "cover" }}
                            src={participant.image || profileImg}
                            size={35}
                          />

                          <Typography.Text
                            ellipsis
                            style={{
                              marginInlineStart: "0.5rem",
                              color: "#888888",
                            }}
                            className="fz-12">
                            {participant.name}
                          </Typography.Text>

                          <span
                            style={{
                              color: "#74B715",
                              fontSize: "12px",
                              marginInlineEnd: "8px",
                              marginInlineStart: "8px",
                            }}>
                            Metaverse
                          </span>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                ))}

              {filteredParticipants?.length > participantsToShow && (
                <Col xs={24}>
                  <Row justify="center">
                    <Button onClick={() => setParticipantsToShow((prev) => prev + 10)}>
                      Show More
                    </Button>
                  </Row>
                </Col>
              )}
            </Row>
          </Col>
          <Col>
            <>
              {isHost &&
                meetingSettings?.waitingList &&
                Object.entries(meetingSettings?.waitingList).filter(
                  ([_, value]) => !value.allowedToJoin,
                ).length > 0 && (
                  <Col xs={24}>
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
                            People In The Waiting Room
                          </Typography.Text>
                        </Col>
                        <Col>
                          <Typography.Text
                            className="wc fw-600 clickable"
                            onClick={() => {
                              if (window.innerWidth < 1200) {
                                setOpenMobileMenu(true);
                              }
                              setActiveBtn("waitingRoom");
                            }}>
                            View All
                          </Typography.Text>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                )}
            </>
          </Col>
        </Row>
      </Row>
      <ViewCustomer
        id={selectedCustomerId}
        onClose={() => setSelectedCustomerId()}
        onUpdateSuccess={handleCustomerUpdateSuccess}
      />
    </>
  );
}
