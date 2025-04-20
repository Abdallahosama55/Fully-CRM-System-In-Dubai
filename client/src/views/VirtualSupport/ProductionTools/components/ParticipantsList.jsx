import { useParticipants } from "@livekit/components-react";
import { Flex, Space, Typography } from "antd";
import { useState } from "react";
import ParticipantItem from "./ParticipantItem";
import { ShareSVG } from "assets/jsx-svg";
import "../styles.css";

const ParticipantsList = ({ camId, micId, meetingMetadata, setDragedParticipant }) => {
  const participants = useParticipants();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="participants-list">
      <div className="top-section">
        <Flex justify="space-between" align="center">
          <Typography.Text className="fz-14 fw-600">Media</Typography.Text>
          {isOpen ? (
            <div className="collapse-button" onClick={() => setIsOpen((prev) => !prev)}>
              -
            </div>
          ) : (
            <Space className="clickable" onClick={() => setIsOpen((prev) => !prev)}>
              <ShareSVG color="#3A5EE3" width={12} height={12} />
              <Typography.Text className="fz-14 fw-400 collapse-text">
                Share from participants
              </Typography.Text>
            </Space>
          )}
        </Flex>
      </div>

      <div aria-collapse={isOpen} className="collapse-content">
        <Flex vertical gap={24}>
          {participants
            ?.filter((participant) => participant.identity.includes("web"))
            .map((participant) => (
              <ParticipantItem
                key={participant.sid}
                participant={participant}
                camId={camId}
                micId={micId}
                meetingMetadata={meetingMetadata}
                setDragedParticipant={setDragedParticipant}
              />
            ))}
        </Flex>
      </div>
    </section>
  );
};

export default ParticipantsList;
