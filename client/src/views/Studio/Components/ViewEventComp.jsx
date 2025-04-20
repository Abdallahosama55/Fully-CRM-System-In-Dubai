import { useContext } from "react";
import dayjs from "dayjs";
import {
  Col,
  Row,
  Typography,
  Avatar,
  Button,
  Skeleton,
  Flex,
  Tag,
  Timeline,
  message,
  Tooltip,
} from "antd";
import { useQueryClient } from "@tanstack/react-query";

import useGetEventById from "services/Events/Querys/useGetEventById";
import noVerse from "assets/images/meetingBg.jpg";
import { DateSVG, TimeSVG } from "assets/jsx-svg";
import { stringAvatar } from "utils/string";
import userContext from "context/userContext";
import useCheckEmailEventAccessAndEnroll from "services/Common/Queries/useCheckEmailEventAccessAndEnroll";
import useEventEnrollForAuthEmployess from "services/Events/Mutations/useEventEnrollForAuthEmployess";
import { axiosCatch } from "utils/axiosUtils";

import "./styles.css";

export default function ViewEventComp({ eventId }) {
  const { user } = useContext(userContext);
  const { data: eventData, isLoading } = useGetEventById(eventId, {
    select: (data) => data.data.data,
    enabled: eventId !== undefined,
  });
  const queryClient = useQueryClient();

  const {
    data: checkEmailEventAccessAndEnroll,
    isPending: checkEmailEventAccessAndEnrollLoading,
    queryKey,
  } = useCheckEmailEventAccessAndEnroll(
    {
      eventId,
      email: user.email,
    },
    {
      select: (data) => data.data.data,
      enabled: eventId !== undefined,
    },
  );

  const eventEnroll = useEventEnrollForAuthEmployess({
    onSuccess: () => {
      queryClient.setQueryData(queryKey, (prev) => {
        const prevData = prev.data.data;
        prevData.enroll = true;
        return { ...prev };
      });
      message.success("You have been enrolled successfully");
    },
    onError: (err) => axiosCatch(err),
  });

  if (isLoading || checkEmailEventAccessAndEnrollLoading) {
    return <Skeleton />;
  }

  const durationUnits = {
    MIN: "minute",
    HOUR: "hour",
    DAY: "day",
  };

  return (
    <>
      <div
        style={{
          padding: 10,
          backgroundSize: "cover",
          height: "30vh",
          backgroundImage: `url(${eventData.invitationCard || noVerse})`,
          display: "flex",
          alignItems: "end",
        }}
      />

      <div style={{ padding: "12px 24px" }}>
        <Row gutter={[32, 24]}>
          <Col>
            <Flex gap={8} vertical>
              <Typography.Text className="fz-22 fw-700">{eventData.title}</Typography.Text>
              <Flex gap={8} wrap={false} align="center">
                <DateSVG />
                <Typography.Text className="fw-500">
                  {dayjs(eventData.startDate).format("MMM DD, YYYY")}
                </Typography.Text>
              </Flex>
            </Flex>
          </Col>
          <Col>
            <Flex
              gap={12}
              justify="flex-end"
              vertical
              className="h-100"
              style={{ maxWidth: "500px" }}>
              <Flex justify="flex-start" wrap>
                {eventData?.tags
                  ? eventData.tags.map((tag) => (
                      <Tag color="gray" key={tag}>
                        {tag}
                      </Tag>
                    ))
                  : null}
              </Flex>
              <Flex gap={8} align="center">
                <TimeSVG />
                <Typography.Text className="fw-500">{eventData.startTime}</Typography.Text>
              </Flex>
            </Flex>
          </Col>
          <Col>
            <Tooltip
              title={
                checkEmailEventAccessAndEnroll.enroll
                  ? "You have been already enrolled"
                  : !checkEmailEventAccessAndEnroll.hasAccess
                  ? "You don't have access to this event"
                  : ""
              }>
              <Button
                loading={eventEnroll.isPending || checkEmailEventAccessAndEnrollLoading}
                disabled={
                  !checkEmailEventAccessAndEnroll.hasAccess || checkEmailEventAccessAndEnroll.enroll
                }
                className="w-100"
                style={{
                  background: "#272942",
                  color: "#fff",
                  opacity:
                    !checkEmailEventAccessAndEnroll.hasAccess ||
                    checkEmailEventAccessAndEnroll.enroll
                      ? "0.2"
                      : "1",
                }}
                onClick={() => eventEnroll.mutate(eventId)}>
                Enroll
              </Button>
            </Tooltip>
          </Col>
          <Col flex={1}>
            <Row justify="end">
              <Button
                onClick={() => {
                  window.open(eventData.adminLink, "_blank", "noreferrer");
                }}
                // loading={isPending}
                style={{ background: "#272942", color: "#fff" }}>
                <Col>Go Live</Col>
              </Button>
            </Row>
          </Col>
        </Row>

        <Row gutter={[32, 12]} style={{ marginBlockStart: "2rem" }}>
          <Col xs={24} md={8} lg={6}>
            <Flex vertical gap={8}>
              <Typography.Text className="fz-18 fw-600">Description</Typography.Text>
              <Typography.Text className="fw-500" style={{ lineHeight: "18px" }}>
                {eventData.description}
              </Typography.Text>
            </Flex>
          </Col>
          <Col xs={24} md={16} lg={13}>
            <Flex vertical gap={8}>
              <Typography.Text className="fz-18 fw-600">Program</Typography.Text>
              <Typography.Text className="fz-16 fw-500">
                {dayjs(eventData.startDate).format("MMM DD, YYYY")}
              </Typography.Text>
              <Timeline
                className="sub-event-timeline"
                items={
                  eventData.subEvents
                    ? eventData.subEvents.map((event) => ({
                        dot: (
                          <Typography.Text className="fw-600">
                            {dayjs(event.startTime).format("HH:mm")} -{" "}
                            {dayjs(event.startTime)
                              .add(
                                event.duration || 0,
                                durationUnits[event.durationUnit] || "minute",
                              )
                              .format("HH:mm")}
                          </Typography.Text>
                        ),
                        color: "black",
                        children: (
                          <Row gutter={[0, 12]}>
                            <Col xs={24}>
                              <Typography.Text className="fz-16 fw-700">
                                {event.title}
                              </Typography.Text>
                            </Col>
                            <Col xs={24}>
                              <Typography.Text>{event.description}</Typography.Text>
                            </Col>

                            <Row gutter={[0, 12]}>
                              {event.speakers?.map((speakerId) => {
                                const speaker = eventData.liveDimensionsSpeakers?.find(
                                  (speaker) => speaker.id === speakerId,
                                );
                                if (speaker) {
                                  return (
                                    <Col xs={24} key={speakerId}>
                                      <Row align="middle" gutter={[12, 12]}>
                                        <Col>
                                          <Avatar size={42} src={speaker.image} />
                                        </Col>
                                        <Col flex={1}>
                                          <Typography.Text>{speaker.title}</Typography.Text>
                                        </Col>
                                      </Row>
                                    </Col>
                                  );
                                }
                              })}
                            </Row>
                          </Row>
                        ),
                      }))
                    : []
                }
              />
            </Flex>
          </Col>
          <Col xs={24} md={24} lg={5}>
            <Flex vertical gap={8} align="center">
              <Typography.Text className="fz-18 fw-600">Speakers</Typography.Text>
              {eventData.liveDimensionsSpeakers?.map((speaker) => (
                <Flex key={speaker.id} align="center" gutter={8} vertical>
                  <Avatar
                    src={speaker.image}
                    size={52}
                    {...(speaker.image ? {} : { ...stringAvatar(speaker.title || "") })}
                  />
                  <Typography.Text className="fz-16 fw-600">{speaker.title}</Typography.Text>
                  <Typography.Text className="fz-500">{speaker.email}</Typography.Text>
                </Flex>
              ))}
            </Flex>
          </Col>
        </Row>
      </div>
    </>
  );
}
