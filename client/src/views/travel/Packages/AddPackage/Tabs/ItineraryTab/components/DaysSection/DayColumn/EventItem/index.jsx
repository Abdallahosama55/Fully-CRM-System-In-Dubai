import React, { useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import BorderedCard from "../../../BorderedCard";
import { Button, Divider, Flex, Image, Tooltip, Typography } from "antd";
import { ChevronDownSVG, ChevronUpSVG, Delete2SVG } from "assets/jsx-svg";
import ItemTypeSvgIcon from "../../../ItemTypeSvgIcon";

const EventItem = ({ item, itemIndex, dayIndex, handelDelete }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <Draggable draggableId={`draggable-${dayIndex}-${itemIndex}-${item?.id}`} index={itemIndex}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <BorderedCard style={{ padding: "8px", marginBottom: "10px", borderRadius: "10px" }}>
            <Flex align="center" justify="space-between">
              <Flex gap={8} align="center">
                <ItemTypeSvgIcon type={item?.type} />
                <Typography.Paragraph
                  style={{
                    marginBottom: 0,
                    textTransform: "capitalize",
                    color: "var(--font-primary)",
                    userSelect: "none",
                    maxWidth: "110px",
                  }}
                  ellipsis={{ tooltip: item?.title || item?.name }}
                  className="xs_text_medium fw-500">
                  {item?.title || item?.name}
                </Typography.Paragraph>
              </Flex>
              <Flex gap={0}>
                <Tooltip title={"Delete"}>
                  <Button
                    size={"small"}
                    type="text"
                    onClick={() =>
                      handelDelete({
                        itemIndex: itemIndex,
                        dayIndex: dayIndex,
                      })
                    }>
                    <Delete2SVG color="#667085" />
                  </Button>
                </Tooltip>
                <Tooltip title={isCollapsed ? "Show" : "Unshow"}>
                  <Button
                    size={"small"}
                    type="text"
                    onClick={() => setIsCollapsed((prev) => !prev)}>
                    {isCollapsed ? <ChevronDownSVG /> : <ChevronUpSVG />}
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>
            {!isCollapsed && <Divider />}
            {!isCollapsed && (
              <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "6px" }}>
                <Image
                  src={item?.image}
                  width={44}
                  height={44}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
                <div>
                  <p className="sm_text_regular fw-600" style={{ textTransform: "capitalize" }}>
                    {item?.name}
                  </p>
                  <p className="xs_text_regular" style={{ textTransform: "lowercase" }}>
                    {item?.location}
                  </p>
                </div>
              </div>
            )}
          </BorderedCard>
        </div>
      )}
    </Draggable>
  );
};

export default EventItem;
