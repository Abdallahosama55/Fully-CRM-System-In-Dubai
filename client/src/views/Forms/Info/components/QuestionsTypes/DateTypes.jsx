import React from "react";
import { Input, Row, Col, Typography } from "antd";

const { Text } = Typography;

const DateTypes = ({ 
  questionText, 
  dateValue = { month: "", day: "", year: "" },
  onQuestionTextChange,
  onDateChange 
}) => {
  const formatTwoDigits = (val) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) return "";
    return num < 10 ? `0${num}` : `${num}`;
  };

  const handleDatePartChange = (field, value) => {
    const newDate = { ...dateValue, [field]: value };
    onDateChange(newDate);
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
        placeholder="Add the date you prefer to start the trip"
        value={questionText}
        onChange={(e) => onQuestionTextChange(e.target.value)}
        style={{ marginBottom: "24px", fontSize: "13px" }}
      />

      <Text strong style={{ display: "block", marginBottom: "8px" }}>
        Date
      </Text>
      <Row gutter={8}>
        <Col span={8}>
          <Input
            placeholder="MM"
            maxLength={2}
            value={dateValue.month}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 2);
              handleDatePartChange("month", formatTwoDigits(value));
            }}
          />
        </Col>

        <Col span={8}>
          <Input
            placeholder="DD"
            maxLength={2}
            value={dateValue.day}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 2);
              handleDatePartChange("day", formatTwoDigits(value));
            }}
          />
        </Col>

        <Col span={8}>
          <Input
            placeholder="YYYY"
            maxLength={4}
            value={dateValue.year}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 4);
              handleDatePartChange("year", value);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DateTypes;