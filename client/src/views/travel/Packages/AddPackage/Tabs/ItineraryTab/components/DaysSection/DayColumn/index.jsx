import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import EventItem from "./EventItem";
import BorderedCard from "../../BorderedCard";
import { Button, Divider, Dropdown, Flex, Input, message, Typography } from "antd";
import { MenuDotsSVG } from "assets/jsx-svg";
import ItemTypeSvgIcon from "../../ItemTypeSvgIcon";
import useEditItineraryDescription from "services/travel/packages/itinerary/Mutations/useEditItineraryDescription";
import dayjs from "dayjs";

const DayColumn = ({ day, index, handelDeleteDay, handelDeleteItemInDay, updateDayDescription }) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(day?.description || "");

  const editItineraryDescriptionMutation = useEditItineraryDescription(day?.id, {
    onSuccess: () => {
      message?.success("Day title edited successfully");
      setIsEditTitle(false);
      updateDayDescription({ description: titleValue, id: day?.id });
    },
    onError: (error) => message?.error(error?.message),
  });

  return (
    <BorderedCard
      style={{
        flex: "0 0 263px", // Fixes width in a flex container
        width: "263px", // Ensures width within the card itself
      }}>
      <div className="day-header">
        <Flex justify="space-between" align="center">
          <Typography.Title
            ellipsis={{ rows: 1, tooltip: day.description }}
            level={3}
            className="md_text_semibold"
            style={{ marginBottom: "0" }}>
            {day?.date ? dayjs(day?.date , "YYYY-MM-DD").format("DD MMM, YYYY") : `Day ${index + 1}`}
          </Typography.Title>
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  label: "Delete",
                  onClick: () => handelDeleteDay(day.id),
                  key: "0",
                },
                {
                  label: !isEditTitle ? (titleValue ? "Edit title" : "Add title") : "Cancel edit",
                  onClick: () => {
                    setIsEditTitle((prev) => !prev);
                    setTitleValue(day?.description);
                  },
                  key: "1",
                },
              ],
            }}>
            <Button
              type="text"
              size="small"
              style={{ paddingInlineEnd: "0px", paddingInlineStart: "0px" }}>
              <MenuDotsSVG />
            </Button>
          </Dropdown>
        </Flex>
        {isEditTitle ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 40px",
              gap: "4px",
              marginTop: "0.25rem",
            }}>
            <Input
              autoFocus
              onPressEnter={() => {
                if(!editItineraryDescriptionMutation?.isPending){
                  editItineraryDescriptionMutation.mutate(titleValue);
                }
              }}
              size="small"
              value={titleValue}
              onChange={(e) => setTitleValue(e?.target?.value)}
            />
            <Button
              size="small"
              type={"primary"}
              disabled={Boolean(!titleValue) || editItineraryDescriptionMutation.isPending}
              onClick={() => {
                editItineraryDescriptionMutation.mutate(titleValue);
              }}>
              Ok
            </Button>
          </div>
        ) : (
          <Typography.Paragraph
            className="sm_text_regular"
            style={{ color: "var(--font-secondary)" }}>
            {day.description}
          </Typography.Paragraph>
        )}
        <Flex gap={8} align="center">
          {[...new Set(day?.items?.map((item) => item?.type))].map((type) => (
            <ItemTypeSvgIcon type={type} key={type} />
          ))}
        </Flex>
      </div>
      <Divider />
      <Droppable droppableId={"" + day.id} type="item">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="day-column"
            style={{ minHeight: "50px" }}>
            {day?.items?.map((item, itemIndex) => (
              <EventItem
                key={item?.id}
                item={item}
                itemIndex={itemIndex}
                dayIndex={index}
                handelDelete={handelDeleteItemInDay}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </BorderedCard>
  );
};

export default DayColumn;
