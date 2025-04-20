import React, { useCallback } from 'react';
import { Button, Input, Typography } from 'antd';
import { DraggableChoice } from '../DraggableChoiceItem';

const { Text } = Typography;

const CheckBoxesType = ({ 
  questionText = "", 
  options = ["Istanbul", "Dubai", "Rome"], // Default options
  onQuestionTextChange = () => {},
  onOptionsChange = () => {}
}) => {
  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : ["Istanbul", "Dubai", "Rome"];
  
  const moveChoice = useCallback((dragIndex, hoverIndex) => {
    onOptionsChange(prev => {
      const currentOptions = Array.isArray(prev) ? prev : ["Istanbul", "Dubai", "Rome"];
      const newChoices = [...currentOptions];
      const draggedItem = newChoices[dragIndex];
      
      const direction = dragIndex < hoverIndex ? 'down' : 'up';
      
      if (direction === 'down') {
        for (let i = dragIndex; i < hoverIndex; i++) {
          newChoices[i] = newChoices[i + 1];
        }
        newChoices[hoverIndex] = draggedItem;
      } else {
        for (let i = dragIndex; i > hoverIndex; i--) {
          newChoices[i] = newChoices[i - 1];
        }
        newChoices[hoverIndex] = draggedItem;
      }
      
      return newChoices;
    });
  }, [onOptionsChange]);

  const addChoice = () => {
    onOptionsChange([...safeOptions, `Option ${safeOptions.length + 1}`]);
  };

  const deleteChoice = (index) => {
    onOptionsChange(safeOptions.filter((_, i) => i !== index));
  };

  const updateChoice = (index, value) => {
    const newChoices = [...safeOptions];
    newChoices[index] = value;
    onOptionsChange(newChoices);
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
        placeholder="Select all that apply"
        style={{ marginBottom: "24px", fontSize: "13px" }}
        value={questionText}
        onChange={(e) => onQuestionTextChange(e.target.value)}
      />

      <Text strong style={{ display: "block", marginBottom: "8px" }}>
        Options
      </Text>
      {safeOptions.map((choice, index) => (
        <DraggableChoice
          key={`choice-${index}`}
          id={`choice-${index}`}
          index={index}
          choice={choice}
          moveChoice={moveChoice}
          onDelete={deleteChoice}
          onUpdate={updateChoice}
        />
      ))}
      <Button 
        type="dashed" 
        onClick={addChoice}
        style={{ marginTop: "8px" }}
      >
        Add option
      </Button>
    </div>
  );
};

export default CheckBoxesType;