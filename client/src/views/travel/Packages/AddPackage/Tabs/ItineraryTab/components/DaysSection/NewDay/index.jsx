import React, { useState } from "react";
import BorderedCard from "../../BorderedCard";
import { Button, Dropdown, Flex, Input, message } from "antd";
import { MenuDotsSVG } from "assets/jsx-svg";
import PlusSVG from "assets/jsx-svg/PlusSVG";
import { v4 as uuidv4 } from "uuid";
import useAddDayToPackage from "services/travel/packages/itinerary/Mutations/useAddDayToPackage";
const NewDay = ({ tripId, index, close, handelAddDay }) => {
  const [title, setTitle] = useState("");
  const addDayToPackage = useAddDayToPackage(tripId, {
    onSuccess: (res, payload) => {
      handelAddDay({
        id: res,
        description: payload,
        items: [],
      });
      message.success("New day added successfully");
      setTitle("")
      close();
    },
    onError: (error) => {
      message?.error(error);
    },
  });

  const addDay = () => {
    addDayToPackage.mutate(title);
  };

  return (
    <BorderedCard
      style={{
        flex: "0 0 250px", // Fixes width in a flex container
        width: "250px", // Ensures width within the card itself
      }}>
      <Flex justify="space-between" align="center">
        <p className="md_text_semibold">Day {index + 1}</p>
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                label: "Cancel",
                onClick: close,
                key: "0",
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
      <Input
        placeholder="Add day title"
        value={title}
        onChange={(e) => setTitle(e?.target?.value)}
        style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
      />
      <Button icon={<PlusSVG />} className="w-100" size="small" type="primary" onClick={addDay}>
        Add
      </Button>
    </BorderedCard>
  );
};

export default NewDay;
