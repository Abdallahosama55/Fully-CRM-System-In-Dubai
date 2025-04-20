import React from "react";
import "./styles.css";
import {
  EarthSVG,
  PackageDestinationEndSVG,
  PackageDestinationStartSVG,
  PlusSVG,
} from "assets/jsx-svg";
import Badge from "components/common/Badge";
import { Button, Flex, Tooltip } from "antd";

const DestinationCard = ({ width, name, daysCount, index, isLast, onAddClick }) => {
  if (index === 0 && isLast) {
    return (
      <div
        className={`destination_card only_one_destination_card`}
        style={{
          width,
          height: "40px",
        }}>
        <div className="destination_card_content" style={{ width }}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={4}>
              <Badge style={{ background: "var(--vbooking-b100)", padding: "3px 6px" }}>
                <Flex align="center" gap={4}>
                  <EarthSVG />
                  <span style={{ color: "#3538CD", background: "var(--vbooking-b100)" }}>
                    {name}
                  </span>
                </Flex>
              </Badge>
              <p className="xs_text_medium" style={{ color: "var(--font-secondary)" }}>
                ( {daysCount} Days)
              </p>
            </Flex>
            <Tooltip title={"Add day"}>
              <Button
                size={"small"}
                icon={<PlusSVG fill="#3538CD" />}
                type={"text"}
                style={{ height: "22px" }}
                onClick={onAddClick}
              />
            </Tooltip>
          </Flex>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`destination_card ${isLast ? "last_card" : index === 0 ? "first_card" : ""}`}
      style={{
        width,
        height: "40px",
      }}>
      {index !== 0 && (
        <div className="card_shape_start">
          <PackageDestinationStartSVG />
        </div>
      )}
      <div className="destination_card_content">
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={4}>
            <Badge style={{ background: "var(--vbooking-b100)", padding: "3px 6px" }}>
              <Flex align="center" gap={4}>
                <EarthSVG />
                <span style={{ color: "#3538CD", background: "var(--vbooking-b100)" }}>
                  {name}
                </span>
              </Flex>
            </Badge>
            <p className="xs_text_medium" style={{ color: "var(--font-secondary)" }}>
              ( {daysCount} Days)
            </p>
          </Flex>
          <Tooltip title={"Add day"}>
            <Button
              size={"small"}
              icon={<PlusSVG fill="#3538CD" />}
              type={"text"}
              style={{ height: "22px" }}
              onClick={onAddClick}
            />
          </Tooltip>
        </Flex>
      </div>
      {!isLast && (
        <div className="card_shape_end">
          <PackageDestinationEndSVG />
        </div>
      )}
    </div>
  );
};

export default DestinationCard;
