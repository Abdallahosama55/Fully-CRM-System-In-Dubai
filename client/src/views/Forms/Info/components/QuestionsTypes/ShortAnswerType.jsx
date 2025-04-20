import React from "react";
import { Input, Typography } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

const ShortAnswerType = ({ questionText, onQuestionTextChange, example, onExampleChange }) => {
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
        placeholder="Tell us in less than 5 lines about your last trip"
        style={{ marginBottom: "24px", fontSize: "13px" }}
        value={questionText}
        onChange={(e) => onQuestionTextChange(e.target.value)}
      />

      <Text strong style={{ display: "block", marginBottom: "8px" }}>
        Add example to the user
      </Text>
      <TextArea
        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        style={{
          resize: "none",
          overflow: "auto",
          minHeight: "90px",
          maxWidth: "100%",  
          fontSize: "13px"
        }}
        value={example}
        onChange={(e) => onExampleChange && onExampleChange(e.target.value)}
      />
    </div>
  );
};

export default ShortAnswerType;