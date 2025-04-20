import React from "react";
import Panel from "./Panel";
import ItemForm from "./ItemForm";
import GroupForm from "./GroupForm";
import { DeleteSVG, DragSVG, MenuDotsSVG } from "assets/jsx-svg";
import Box from "components/Box";
import { useSliderStore } from "../sliderStore";
import { HolderOutlined } from "@ant-design/icons";
const getLabel = (type) => {
  switch (type) {
    case "item":
      return "Item";
    case "group":
      return "Group";
    default:
      return "Item";
  }
};
const ItemCard = ({ type, background, provided, ...rest }) => {
  const { removeItem } = useSliderStore();
  return (
    <Panel
      id={rest?.id}
      {...provided.draggableProps}
      initOpen={rest?.isOpen}
      innerRef={provided.innerRef}
      action={
        <>
          <div ref={provided.innerRef} {...provided.dragHandleProps}>
            <HolderOutlined />
          </div>
          <Box onClick={() => removeItem(rest.id)} sx={{ cursor: "pointer" }}>
            <DeleteSVG></DeleteSVG>
          </Box>{" "}
        </>
      }
      background={background}
      title={rest?.title ?? getLabel(type)}>
      {type === "group" ? (
        <GroupForm type={"group"} {...rest} />
      ) : (
        <ItemForm type={"item"} {...rest} />
      )}
    </Panel>
  );
};
export default ItemCard;
