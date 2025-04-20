import { useEffect, useState } from "react";
import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import dayjs from "dayjs";

import {
  CallSVG,
  DateSVG,
  DurationSVG,
  LinkSVG,
  ParticipantsSVG,
  TimeSVG,
  VideoSVG,
} from "assets/jsx-svg";
import BookedMeetingService from "services/bookedMeeting.service";
import { axiosCatch } from "utils/axiosUtils";

export default function CallsAndMeetingsDetailsBody({ callDetails, setCallDetails, id }) {
  const [callInfo, setCallInfo] = useState([]);
  const [participantDeleting, setParticipantDeleting] = useState("");

  useEffect(() => {
    setCallInfo([
      {
        id: 1,
        header: <Typography.Text className="gc">Topic</Typography.Text>,
        details: <Typography.Text>{callDetails.title}</Typography.Text>,
      },
      {
        id: 2,
        header: <Typography.Text style={{ color: "#8E8E93" }}>Reason</Typography.Text>,
        details: <Typography.Text>{callDetails.reason ?? "-"}</Typography.Text>,
      },
      {
        id: 24,
        header: (
          <Typography.Text className="gc" style={{ color: "#8E8E93" }}>
            Meeting type
          </Typography.Text>
        ),
        details: (
          <Typography.Text>
            {MeetingType[callDetails?.meetingType ?? "VINDO_MEETING_CALL"]}
          </Typography.Text>
        ),
      },
      {
        id: 24,
        header: (
          <Typography.Text className="gc" style={{ color: "#8E8E93" }}>
            Status
          </Typography.Text>
        ),
        details: <Typography.Text>{callDetails?.actionStatus?.name ?? "-"}</Typography.Text>,
      },
      {
        id: 3,
        header: (
          <Row gutter={[12, 12]} justify="space-between" align="middle">
            <Col>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Row align="middle">
                    <ParticipantsSVG style={{ height: "12px" }} />
                  </Row>
                </Col>
                <Col>
                  <Typography.Text style={{ color: "#8E8E93" }}>Participants</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row align="middle" gutter={[16, 0]}>
                <Col>
                  <Row
                    align="middle"
                    className="clickable"
                    onClick={() => {
                      navigator.clipboard.writeText(callDetails.meetingLink);
                      message.success("Link Copied Successfully ✅");
                    }}
                    gutter={[6, 0]}>
                    <Col>
                      <Button
                        size="small"
                        type="primary"
                        href={callDetails.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{ background: "#699d48", marginRight: "20px" }}>
                        Join
                      </Button>
                    </Col>
                    <Col>
                      <Row align="middle">
                        <LinkSVG style={{ width: "14px", height: "14px" }} color="#3A5EE3" />
                      </Row>
                    </Col>
                    <Col>
                      <Typography.Text style={{ color: "#3A5EE3" }}>
                        Copy Invitation link
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
                {/* <Col>
                  {" "}
                  <Dropdown
                    onOpenChange={(e) => {
                      serDropdownOpened(e);
                      form.resetFields();
                    }}
                    trigger={["click"]}
                    destroyPopupOnHide
                    dropdownRender={() => (
                      <AddParticipants
                        callDetails={callDetails}
                        setCallDetails={setCallDetails}
                        id={id}
                        form={form}
                        dropdownOpened={dropdownOpened}
                      />
                    )}>
                    <div className="pluse-svg center-items clickable">
                      <PluseSVG color="#3A5EE3" />
                    </div>
                  </Dropdown>
                </Col> */}
              </Row>
            </Col>
          </Row>
        ),
        details: (
          <Row gutter={[0, 12]}>
            {callDetails?.participantBookedMeetings
              .filter((item) => !!item?.customer)
              ?.map((participant) => (
                <Col xs={24} key={participant}>
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{
                      opacity: participant === participantDeleting && "0.5",
                    }}>
                    <Col>
                      <Tooltip title={participant?.customer?.account?.email}>
                        <Typography.Text>
                          {participant?.customer?.account?.fullName}
                        </Typography.Text>
                      </Tooltip>
                    </Col>
                    {/* <Col>
                      <Popconfirm
                        title="Delete participant"
                        description="Are you sure to delete this participant?"
                        onConfirm={() => deleteParticipant(participant?.customer?.id)}
                        okText="Yes"
                        cancelText="No">
                        <DeleteSVG color="#AEAEB2" className="clickable" />
                      </Popconfirm>
                    </Col> */}
                  </Row>
                </Col>
              ))}
          </Row>
        ),
      },
      {
        id: 23,
        header: (
          <Row gutter={[12, 12]} justify="space-between" align="middle">
            <Col>
              <Row gutter={[8, 0]} wrap={false} align="middle">
                <Col>
                  <Row align="middle">
                    <ParticipantsSVG style={{ height: "12px" }} />
                  </Row>
                </Col>
                <Col>
                  <Typography.Text style={{ color: "#8E8E93" }}>Employee</Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        ),
        details: (
          <Row gutter={[0, 12]}>
            {callDetails?.participantBookedMeetings
              .filter((item) => !!item?.employee)
              ?.map((participant) => (
                <Col xs={24} key={participant.employee.id}>
                  {console.log("participant", participant)}
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{
                      opacity: participant === participantDeleting && "0.5",
                    }}>
                    <Col>
                      <Tooltip title={participant?.employee?.account?.email}>
                        <Typography.Text>
                          {participant?.employee?.account?.fullName}{" "}
                          {participant?.isHost ? "(Host)" : ""}
                        </Typography.Text>
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
        ),
      },
      {
        id: 4,
        header: <Typography.Text style={{ color: "#8E8E93" }}>Timezone</Typography.Text>,
        details: <Typography.Text>{callDetails.timeZone}</Typography.Text>,
      },
      {
        id: 6,
        header: <Typography.Text style={{ color: "#8E8E93" }}>My Timezone</Typography.Text>,
        details: (
          <Typography.Text>
            {localStorage.getItem("time-zone") ?? Intl.DateTimeFormat().resolvedOptions().timeZone}
          </Typography.Text>
        ),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callDetails]);

  const deleteParticipant = async (participantEmail) => {
    try {
      setParticipantDeleting(participantEmail);
      const res = await BookedMeetingService.editMeeting(
        {
          ...callDetails,
          invites: callDetails.invites.filter((participant) => participant !== participantEmail),
        },
        id,
      );
      message.success("Participant Deleted Successfully ✅");
      setCallDetails(res.data.data[0]);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setParticipantDeleting("");
    }
  };

  return (
    <div className="meeting-details-info">
      <Row
        style={{
          padding: "1rem",
        }}
        gutter={[0, 16]}>
        <Col xs={24}>
          <Row gutter={[12, 8]} align="middle">
            <Col>
              <div className="video-icon">
                {callDetails.dimensionId || callDetails?.deskId ? (
                  <VideoSVG style={{ width: "20px" }} color="#fff" />
                ) : (
                  <CallSVG style={{ width: "20px" }} color="#fff" />
                )}
              </div>
            </Col>
            <Col>
              <Typography.Text style={{ color: "#AEAEB2" }}>
                {callDetails?.deskId
                  ? "Desk Meeting"
                  : callDetails.dimensionId
                  ? "Metaverse Meeting"
                  : "Standard call"}{" "}
                created by: {console.log(callDetails)}
                <span className="fw-500 bc">
                  {callDetails.employee?.account?.fullName ?? callDetails?.createdBy}
                </span>
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row gutter={[8, 8]}>
            <Col xs={24} md={8}>
              <div className="time-holder">
                <Row align="middle" gutter={[8, 0]} wrap={false}>
                  <Col>
                    <Row align="middle">
                      <DateSVG color="#8E8E93" />
                    </Row>
                  </Col>
                  <Col>
                    <Tooltip
                      trigger={["hover"]}
                      title={
                        <div>
                          The date in the selected time zone{" "}
                          {dayjs(callDetails.date).tz(callDetails.timeZone).format("MM DD, YYYY")} (
                          {callDetails.timeZone})
                        </div>
                      }>
                      <Typography.Text
                        title={dayjs(callDetails.date).format("MM DD, YYYY")}
                        className="fw-500">
                        {dayjs(callDetails.date)
                          .tz(
                            localStorage.getItem("time-zone") ??
                              Intl.DateTimeFormat().resolvedOptions().timeZone,
                          )
                          .format("MMM DD, YYYY")}
                      </Typography.Text>
                    </Tooltip>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="time-holder">
                <Row align="middle" gutter={[8, 0]} wrap={false}>
                  <Col>
                    <Row align="middle">
                      <TimeSVG color="#8E8E93" />
                    </Row>
                  </Col>
                  <Col>
                    <Tooltip
                      trigger={["hover"]}
                      title={
                        <div>
                          The time in the selected time zone{" "}
                          {dayjs(callDetails.date).tz(callDetails.timeZone).format("HH:mm A")}{" "}
                        </div>
                      }>
                      <Typography.Text className="fw-500">
                        {dayjs(callDetails.date)
                          .tz(
                            localStorage.getItem("time-zone") ??
                              Intl.DateTimeFormat().resolvedOptions().timeZone,
                          )
                          .format("HH:mm A")}
                      </Typography.Text>
                    </Tooltip>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="time-holder">
                <Row align="middle" gutter={[8, 0]} wrap={false}>
                  <Col>
                    <Row align="middle">
                      <DurationSVG color="#8E8E93" />
                    </Row>
                  </Col>
                  <Col>
                    <Typography.Text className="fw-500">
                      {callDetails.durationInMinutes} min
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {callInfo?.map((info) => (
        <Row key={info.id}>
          <Col xs={24}>
            <Row style={{ background: "#FBFBFD", padding: "8px 16px" }}>
              <Col xs={24}>{info.header}</Col>
            </Row>
          </Col>
          <Col xs={24}>
            <div style={{ padding: "16px" }}>{info.details}</div>
          </Col>
        </Row>
      ))}
    </div>
  );
}

const MeetingType = {
  VINDO_MEETING_CALL: "Meeting Call",

  VINDO_METAVERSE_CALL: "Metaverse Meeting",

  VINDO_MEETING_DESK: "Meeting desk",

  CUSTOM_LINK: "Custom Link (ex: zoom, teams, etc…)",
};
