import React from "react";
import BorderedCard from "../../BorderedCard";
import { Button, Divider, Typography } from "antd";
import MessageItem from "../MessageItem";
import { useToggle } from "hooks/useToggle";
import AddNewMessageModal from "../../AddNewMessageModal";
import { PluseSVG } from "assets/jsx-svg";
import { PACKAGE_ENGAGEMENTS_MESSAGE_TYPES } from "constants/PACKAGE_ENGAGEMENTS_TYPES";

const PostTrip = ({ messages, tripId, onAdd }) => {
  const [isNewMessageOpen, toggleNewMessageOpen] = useToggle();

  return (
    <div>
      <AddNewMessageModal
        isOpen={isNewMessageOpen}
        close={toggleNewMessageOpen}
        tripId={tripId}
        messageDayType={PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.POST_TRIP}
        onAdd={onAdd}
      />

      <BorderedCard
        style={{
          flex: "0 0 250px",
          width: "250px",
          backgroundColor: "var(--vbooking-c200)",
        }}>
        <div className="day-header">
          <Typography.Title level={3} className="md_text_semibold" style={{ marginBottom: "0" }}>
            Post trip
          </Typography.Title>

          <Typography.Paragraph
            className="sm_text_regular"
            style={{ color: "var(--font-secondary)" }}>
            All messages after trip end
          </Typography.Paragraph>
        </div>
        <Divider />
        <div>
          {messages?.map((message) => (
            <MessageItem
              key={message?.id}
              message={message}
              handelDelete={onAdd}
            />
          ))}
        </div>

        <Button
          onClick={toggleNewMessageOpen}
          className="w-100"
          icon={<PluseSVG color={"#2D6ADB"} />}
          style={{ color: "#2D6ADB" }}>
          Add Message
        </Button>
      </BorderedCard>
    </div>
  );
};

export default PostTrip;
