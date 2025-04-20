import { Col, Row, Typography, Avatar, Tooltip } from "antd";
import dayjs from "dayjs";

import {
  Delete2SVG,
  EditSVG,
  IconlyLightOutlineCalendar,
  IconlyLightOutlineTimeCircle,
} from "assets/jsx-svg";
import CallsAndMeetingsAdd, { meetingTypes } from "views/Collaboration/CallsAndMeetingsAdd";

import "./styles.css";
import { getQueryParams } from "views/VirtualSupport/DeskQueue/utils";
import { Link, useParams } from "react-router-dom";
import { InfoCircleOutlined } from "@ant-design/icons";
import CallsAndMeetingsDetails from "views/Collaboration/CallsAndMeetingsDetails";
import useDeleteMeeting from "services/meetings/Mutations/useDeleteMeeting";
import { QUERY_KEY } from "services/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useNotification } from "context/notificationContext";
import WarningModal from "components/common/WarningModal";
import { useState } from "react";
import { getDateTimeToTimeZone } from "utils/time";
import { useDrawer } from "hooks/useDrawer";

function Content({ data, date, day, meetingsPage, showJoin, handleClose }) {
  const DrawerAPI = useDrawer();
  const {
    id,
    description,
    name,
    fromTime,
    toTime,
    time,
    meetingLink,
    endTime,
    meetingType,
    fullDate,
    title,
    participantBookedMeetings,
  } = data;
  const linkParams = getQueryParams(meetingLink);
  const params = new URLSearchParams(linkParams);
  const { meetingId } = useParams();
  const queryClient = useQueryClient();
  const { openNotificationWithIcon } = useNotification();

  const { deleteMeeting, isDeleteMeetingPending } = useDeleteMeeting(id, {
    onSuccess: (data, id) => {
      openNotificationWithIcon("success", `Deleted successfully`);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MEETINGS_CALENDAR] });
      handleClose();
      setIsDeleteModalOpen(false);
    },
    onError: (data) => {
      openNotificationWithIcon(
        "error",
        data?.response?.data?.errors ?? data?.response?.data?.message,
      );
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Delete modal

  const onRowDelete = () => {
    showDeleteModal();
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalOk = () => {
    deleteMeeting();
  };
  const handleDeleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      {DrawerAPI.Render}
      <WarningModal
        isloading={isDeleteMeetingPending}
        isWarningModalOpen={isDeleteModalOpen}
        handleCancel={handleDeleteModalCancel}
        handleOk={handleDeleteModalOk}
        warningBody={`Are you sure you want to delete this "${name || title || "New Meeting"
          }" meeting?`}
      />
      <div className="popover-calendar-title">
        <Row align="middle" justify="space-between">
          <Col>
            <Tooltip title={name || title || "New Meeting"}>
              <Typography.Title style={{ maxWidth: "180px" }} ellipsis>
                {name || title || "New Meeting"}
              </Typography.Title>
            </Tooltip>
          </Col>

          <Col>
            <Row gutter={[8, 0]}>
              <Col>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleClose();
                    DrawerAPI.open("40%");
                    DrawerAPI.setDrawerContent(
                      <CallsAndMeetingsDetails
                        DrawerAPI={DrawerAPI}
                        id={id}
                        setRefresh={() =>
                          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MEETINGS_CALENDAR] })
                        }
                      />,
                    );
                  }}>
                  <InfoCircleOutlined style={{ fontSize: 17, color: "#3A5EE3" }} />
                </div>
              </Col>
              <Col>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleClose();

                    DrawerAPI.open("40%");
                    DrawerAPI.setDrawerContent(
                      <CallsAndMeetingsAdd
                        id={id}
                        setRefresh={() => {
                          queryClient.invalidateQueries({
                            queryKey: [QUERY_KEY.MEETINGS_CALENDAR],
                          });
                        }}
                      />,
                    );
                  }}>
                  <EditSVG color="#3A5EE3" />
                </div>
              </Col>
              <Col>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onRowDelete();
                  }}>
                  <Delete2SVG color="red" />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="title-time">
          <div>
            <div className="center-items">
              <IconlyLightOutlineCalendar />
            </div>

            <Typography.Text>
              {fullDate &&
                getDateTimeToTimeZone(`${fullDate}`, localStorage.getItem("time-zone")).format(
                  "dd, MMMM",
                )}
            </Typography.Text>
          </div>
          <div>
            <div className="center-items">
              <IconlyLightOutlineTimeCircle />
            </div>
            <Typography.Text>
              {time}
              {/* {startTime
                ? `${dayjs(`${startTime}`).format("h:mm")} - ${dayjs(`${endTime}`).format("h:mmA")}`
                : `${dayjs(`${date}T${fromTime}`).format("h:mm")} - ${dayjs(
                    `${date}T${toTime}`,
                  ).format("h:mmA")}`} */}
            </Typography.Text>
          </div>
        </div>
        <hr />
      </div>
      <div className="popover-calendar-content">
        {description && (
          <div className="description-container">
            <div className="description">{description}</div>
          </div>
        )}

        <Row>
          <Col span={24} className="fz-14 fw-500">
            Type: {meetingTypes.filter((item) => item.value === meetingType)[0]?.label}
          </Col>
          <Col span={24} className="fz-14 fw-500">
            Members ({participantBookedMeetings ? (participantBookedMeetings || [])?.length : "0"})
          </Col>
          <Col span={24} className="invites">
            {participantBookedMeetings &&
              participantBookedMeetings.map((invite, index) => (
                <Row
                  wrap={false}
                  key={index}
                  align="middle"
                  style={{ paddingTop: "8px" }}
                  gutter={12}>
                  <Col>
                    <Avatar
                      size={32}
                      icon={
                        <div>
                          {invite?.customer?.account?.fullName ??
                            invite?.employee?.account?.fullName?.slice(0, 2) ??
                            "-"}
                        </div>
                      }
                    />
                  </Col>
                  <Col>
                    <Typography.Text
                      title={
                        invite?.customer?.account?.fullName ?? invite?.employee?.account?.fullName
                      }
                      ellipsis
                      className="invites fw-500">
                      {invite?.customer?.account?.fullName ?? invite?.employee?.account?.fullName}{" "}
                      {invite.isHost && <span className="fw-400 gc fz-12">(host)</span>}
                    </Typography.Text>
                  </Col>
                </Row>
              ))}
          </Col>
        </Row>

        {showJoin && (
          <div className="join  meetings-page-join">
            {/* <a href={''} target="_blank" rel="noreferrer">
                Join
              </a> */}
            {meetingId == id ? (
              <Link style={{ background: "rgba(105, 157, 72, 0.15)" }}>Joined</Link>
            ) : (
              <Link
                target={meetingType === "CUSTOM_LINK" && "_blank"}
                to={meetingType === "CUSTOM_LINK" ? meetingLink : `/booked-meeting/${id}?${params}`}
                unstable_viewTransition>
                Join
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Content;
