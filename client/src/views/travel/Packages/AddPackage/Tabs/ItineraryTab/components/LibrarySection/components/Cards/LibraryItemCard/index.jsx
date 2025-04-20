import { Flex, Typography } from "antd";
import React, { useMemo } from "react";
import formatNumber from "utils/formatNumber";
import BorderedCard from "../../../../BorderedCard";
import { Draggable } from "react-beautiful-dnd";
import { MenuDotsSVG } from "assets/jsx-svg";
import ItemTypeSvgIcon from "../../../../ItemTypeSvgIcon";

const LibraryItemCard = ({ index, ...props }) => {
  const item = useMemo(() => {
    if (props?.items?.find((el) => el.isDefault)) {
      return {
        ...props?.items?.find((el) => el.isDefault),
        replacements: props?.items?.filter((el) => !el.isDefault),
      };
    }

    return props;
  }, [props]);

  return (
    <Draggable draggableId={`${JSON.stringify(item)}`} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <BorderedCard style={{ padding: "8px", marginBottom: "10px", borderRadius: "10px" }}>
            <Flex align="center" justify="space-between">
              <Flex gap={8} align="center">
                <ItemTypeSvgIcon type={props?.type} />
                <Typography.Paragraph
                  style={{
                    marginBottom: 0,
                    textTransform: "capitalize",
                    color: "var(--font-primary)",
                    maxWidth: "170px",
                  }}
                  ellipsis={{ tooltip: item?.title || item?.name }}
                  className="lg_text_medium">
                  {item?.title || item?.name}
                </Typography.Paragraph>
              </Flex>
              <Flex gap={4}>
                <p className="sm_text_regular">${formatNumber(item?.adultPrice || item?.price)}</p>
                <MenuDotsSVG />
              </Flex>
            </Flex>
            {Array.isArray(item?.replacements) && item?.replacements?.length > 0 && (
              <Typography.Paragraph
                style={{ marginBottom: "0rem" }}
                ellipsis={{
                  tooltip: item?.replacements
                    ?.map((el) => `${el?.name || el?.title} ($${el?.adultPrice || el?.price})`)
                    .join(", "),
                }}>
                {item?.replacements
                  ?.map((el) => `${el?.name || el?.title} ($${el?.adultPrice || el?.price})`)
                  .join(", ")}
              </Typography.Paragraph>
            )}
          </BorderedCard>
        </div>
      )}
    </Draggable>
  );
};

export default LibraryItemCard;
