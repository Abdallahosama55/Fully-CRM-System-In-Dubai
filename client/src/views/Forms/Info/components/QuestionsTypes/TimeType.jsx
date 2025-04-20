import React from "react";
import { Input, Select, Row, Col, Typography } from "antd";
import { ArrowDownSVG } from "assets/jsx-svg";

const { Option } = Select;
const { Text } = Typography;

const TimeType = ({ 
  questionText, 
  timeValue = { hour: "", minute: "", ampm: "AM" },
  onQuestionTextChange,
  onTimeChange 
}) => {
  const formatTwoDigits = (val) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) return "";
    return num < 10 ? `0${num}` : `${num}`;
  };

  const handleTimePartChange = (field, value) => {
    const newTime = { ...timeValue, [field]: value };
    onTimeChange(newTime);
  };

  return (
    <div style={{ 
      padding: "24px",
      borderRadius: "12px",
      backgroundColor: "#fff",
      border: "1px solid #D0D5DD",
      margin: "0 auto",
    }}>
      <Text strong style={{ display: "block", marginBottom: "8px" }}>
        Question
      </Text>
      <Input
        placeholder="Add the best time you prefer to start the trip"
        value={questionText}
        onChange={(e) => onQuestionTextChange(e.target.value)}
        style={{ marginBottom: "24px", fontSize: "13px" }}
      />

      <Text strong style={{ display: "block", marginBottom: "8px" }}>
        Time
      </Text>
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="HH"
            maxLength={2}
            value={timeValue.hour}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 2);
              handleTimePartChange("hour", formatTwoDigits(value));
            }}
          />
        </Col>

        <Col span={8}>
          <Input
            placeholder="MM"
            maxLength={2}
            value={timeValue.minute}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 2);
              handleTimePartChange("minute", formatTwoDigits(value));
            }}
          />
        </Col>

        <Col span={8}>
          <Select
            value={timeValue.ampm}
            onChange={(val) => handleTimePartChange("ampm", val)}
            suffixIcon={<ArrowDownSVG color="#3F65E4" />}
            style={{ width: "100%" }}
          >
            <Option value="AM">AM</Option>
            <Option value="PM">PM</Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default TimeType;