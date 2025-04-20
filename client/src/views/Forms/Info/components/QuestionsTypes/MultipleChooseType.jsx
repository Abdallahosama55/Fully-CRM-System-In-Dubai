import React, { useCallback } from 'react';
import { Button, Input } from 'antd';
import { Delete } from 'assets/jsx-svg';
import { DraggableChoice } from '../DraggableChoiceItem';

const MultipleChooseType = ({ questionText, options, onQuestionTextChange, onOptionsChange }) => {
  // Handle reordering of choices
  const moveChoice = useCallback((dragIndex, hoverIndex) => {
    const updatedOptions = [...options];
    const draggedItem = updatedOptions[dragIndex];

    const direction = dragIndex < hoverIndex ? 'down' : 'up';

    if (direction === 'down') {
      for (let i = dragIndex; i < hoverIndex; i++) {
        updatedOptions[i] = updatedOptions[i + 1];
      }
    } else {
      for (let i = dragIndex; i > hoverIndex; i--) {
        updatedOptions[i] = updatedOptions[i - 1];
      }
    }

    updatedOptions[hoverIndex] = draggedItem;
    onOptionsChange(updatedOptions);
  }, [options, onOptionsChange]);

  const addChoice = () => {
    const newOptions = [...options, `Option ${options.length + 1}`];
    onOptionsChange(newOptions);
  };

  const deleteChoice = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    onOptionsChange(newOptions);
  };

  const updateChoice = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionsChange(newOptions);
  };

  return (
    <div style={{ padding: "24px", borderRadius: "12px", backgroundColor: "#fff", border:"1px solid #D0D5DD" }}>
      <div className="container-group">
        <div className="form-group">
          <label className="form-label">Question</label>
          <Input
            placeholder="Enter your question"
            value={questionText}
            onChange={(e) => onQuestionTextChange(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Options</label>
          {options.map((option, index) => (
            <DraggableChoice
              key={`choice-${index}`}
              id={`choice-${index}`}
              index={index}
              choice={option}
              moveChoice={moveChoice}
              onDelete={deleteChoice}
              onUpdate={updateChoice}
            />
          ))}
          <Button onClick={addChoice}>
            Add Option
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultipleChooseType;
