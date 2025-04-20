import { InfoCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { ArrowRightColoredSVG, ClockSVG2 } from "assets/jsx-svg";
import "./styles.css";
import { useLocation } from "react-router-dom";

export default function DeskCard({ desk, onSelect }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const textColor = queryParams.get("textColor") || "#272942";
  const linkAndBtnColor = queryParams.get("linkColor") || "#272942";

  return (
    <Card
      className="desk-card clickable"
      onClick={() => onSelect(desk)}
      title={
        <div className="d-flex justify-between">
          <span>{desk?.name}</span>
          <span className="d-flex">
            <ArrowRightColoredSVG color={linkAndBtnColor} />
          </span>
        </div>
      }>
      <div className="d-flex align-center justify-between">
        <span>
          {desk?.description && (
            <>
              <InfoCircleOutlined /> {desk?.description || ""}
            </>
          )}
        </span>
        <span className="fz-14 d-flex align-center">
          <ClockSVG2
            style={{ fontSize: 16, marginRight: 4 }}
            width={16}
            height={16}
            color={textColor}
          />
          {desk.duration || 30} min
        </span>
      </div>
    </Card>
  );
}
