import { Button, Card, Flex, Typography } from "antd";
import { TimeSVG } from "assets/jsx-svg";
import Members from "./Members";
import { useParams } from "react-router-dom";
const QueueItem = ({
  link,
  name,
  formTime,
  toTime,
  timeZone,
  customers,
  employees,
  meetingId,
  meetingLinkParams,
  meetingColor,
}) => {
  const params = new URLSearchParams(meetingLinkParams);
  const { meetingId: meetingIdParams } = useParams();
  const isDirect = link.includes("/direct-call/");

  const handleChangeMeetingLink = () => {
    // setConnected();
    window.open(
      isDirect ? `/direct-call/${meetingId}?${params}` : `/booked-meeting/${meetingId}?${params}`,
      "_self",
    );
  };
  return (
    <Card
      style={{
        borderLeft: `2px solid ${meetingColor}`,
        border: "1px solid #f2f2f7",
      }}>
      <Flex justify="space-between" align="center">
        <Card.Meta
          className="virtial-support-desk-queue-item-card"
          title={name}
          description={
            <div>
              <Typography.Text
                className="fz-12 fw-500"
                style={{
                  color: "#8e8e93",
                }}
                ellipsis>
                <Members customers={customers ?? []} employees={employees ?? []}></Members>
              </Typography.Text>
              <Flex align="center" gap={4}>
                <TimeSVG width={12} color="#8E8E93"></TimeSVG>
                <Typography.Text
                  className="fz-12 fw-500"
                  style={{
                    color: "#8e8e93",
                  }}
                  ellipsis>
                  Today, {formTime} - {toTime} {timeZone}
                </Typography.Text>
              </Flex>
            </div>
          }
        />
        <Button
          disabled={meetingIdParams === meetingId}
          onClick={handleChangeMeetingLink}
          size="small"
          style={{
            color: "#ffffff",
            background: `${meetingIdParams === meetingId ? "rgba(105, 157, 72, 0.15)" : "#3a5ee3"}`,
          }}>
          {meetingIdParams === meetingId ? "Joined" : "Join"}
        </Button>
      </Flex>
    </Card>
  );
};
export default QueueItem;
