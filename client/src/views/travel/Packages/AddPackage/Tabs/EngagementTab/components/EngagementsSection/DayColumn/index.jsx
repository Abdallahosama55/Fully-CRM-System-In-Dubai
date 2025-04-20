import React from "react";
import BorderedCard from "../../BorderedCard";
import { Button, Divider, Flex, Typography } from "antd";
import ItemTypeSvgIcon from "../../ItemTypeSvgIcon";
import MessageItem from "../MessageItem";
import PluseSVG from "assets/jsx-svg/PluseSVG";
import { useToggle } from "hooks/useToggle";
import AddNewMessageModal from "../../AddNewMessageModal";
import { PACKAGE_ENGAGEMENTS_MESSAGE_TYPES } from "constants/PACKAGE_ENGAGEMENTS_TYPES";

const DayColumn = ({ day, index, tripId, messages, onAdd }) => {
  const [isNewMessageOpen, toggleNewMessageOpen] = useToggle();

  return (
    <>
      <AddNewMessageModal
        isOpen={isNewMessageOpen}
        close={toggleNewMessageOpen}
        tripId={tripId}
        messageDayType={PACKAGE_ENGAGEMENTS_MESSAGE_TYPES?.DAY}
        itineraryId={day?.id}
        onAdd={onAdd}
      />

      <BorderedCard
        style={{
          flex: "0 0 250px", // Fixes width in a flex container
          width: "250px", // Ensures width within the card itself
        }}>
        <div className="day-header">
          <Typography.Title
            ellipsis={{ rows: 1, tooltip: day.description }}
            level={3}
            className="md_text_semibold"
            style={{ marginBottom: "0" }}>
            Day {index + 1}
          </Typography.Title>

          <Typography.Paragraph
            className="sm_text_regular"
            style={{ color: "var(--font-secondary)" }}>
            {day.description}
          </Typography.Paragraph>

          <Flex gap={8} align="center">
            {[...new Set(day?.messages?.map((message) => message?.type))].map((type) => (
              <ItemTypeSvgIcon type={type} key={type} />
            ))}
          </Flex>
        </div>
        <Divider />
        <div className="day-column">
          {messages?.map((message) => (
            <MessageItem
              key={message?.id}
              message={message}
              handelDelete={onAdd}
            />
          ))}
        </div>

        <Button
          className="w-100"
          icon={<PluseSVG color={"#2D6ADB"} />}
          onClick={toggleNewMessageOpen}
          style={{ color: "#2D6ADB" }}>
          Add Message
        </Button>
      </BorderedCard>
    </>
  );
};

export default DayColumn;
