import React from "react";
import BorderedCard from "../../../../../BorderedCard";
import { Button, Checkbox, Flex, Tooltip, Typography } from "antd";
import ItemTypeSvgIcon from "../../../../../ItemTypeSvgIcon";
import formatNumber from "utils/formatNumber";
import { StarOutlined } from "@ant-design/icons";
/*
{
    "id": 286,
    "name": "test",
    "location": "Cairo Festival City, Nasr City, Egypt",
    "price": 0,
    "createdAt": "2024-12-26T14:45:43.48+02:00",
    "updatedAt": "2024-12-26T14:45:43.48+02:00",
    "image": "https://chickchack.s3.amazonaws.com/vindo-files/1735217012097empty_screen_icon.jpg",
    "libraryTripId": 75,
    "source": "STATIC",
    "description": "<p>this s a test</p>",
    "childPrice": 180,
    "adultPrice": 150,
    "type": "EXPERIENCE",
    "destination": "Cairo Festival City, Nasr City, Egypt",
    "groupId": null,
    "isDefault": null
}
*/
const SelectItemCard = ({ item, isSelected, onSelect, onUnSelect, isDefault, makeDefault }) => {
  return (
    <BorderedCard style={{ padding: "8px", marginBottom: "10px", borderRadius: "10px" }}>
      <Flex align="center" justify="space-between">
        <Flex gap={8} align="center">
          <ItemTypeSvgIcon type={item?.type} />
          <Typography.Paragraph
            style={{
              marginBottom: 0,
              textTransform: "capitalize",
              color: "var(--font-primary)",
              maxWidth: "300px",
            }}
            ellipsis={{ tooltip: item?.title || item?.name }}
            className="lg_text_medium">
            {item?.title || item?.name}
          </Typography.Paragraph>
        </Flex>
        <Flex gap={8} align="center">
          <p className="sm_text_regular">${formatNumber(item?.adultPrice || item?.price)}</p>
          <Checkbox checked={isSelected} onChange={isSelected ? onUnSelect : onSelect} />
          {makeDefault && (
            <Tooltip title="Make default">
              <Button
                size="small"
                style={{ width: "25px", height: "25px" }}
                onClick={makeDefault}
                type={isDefault ? "primary" : "default"}
                icon={<StarOutlined />}
              />
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </BorderedCard>
  );
};

export default SelectItemCard;
