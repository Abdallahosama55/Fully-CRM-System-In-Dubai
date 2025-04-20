import { Button, Input } from "antd";
import React from "react";
import { useDrag, useDrop } from 'react-dnd';
import DoubleThreeDot from "assets/jsx-svg/DoubleThreeDot";
import { Delete } from "assets/jsx-svg";

const ItemTypes = {
  CHOICE: 'choice',
};

export const DraggableChoice = ({ id, index, choice, moveChoice, onDelete, onUpdate }) => {
  const ref = React.useRef(null);
  
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CHOICE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover(item, monitor) {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
   
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
   
      const shouldMove = dragIndex < hoverIndex 
        ? hoverClientY > hoverMiddleY 
        : hoverClientY < hoverMiddleY;
      
      if (!shouldMove) return;
      
  
      moveChoice(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CHOICE,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{
      position: 'relative',
      marginBottom: 8,
      display:  isDragging ? "none" : "block",
      opacity: isDragging ? 0 : 1,
      transform: isDragging ? 'scale(0.98)' : 'scale(1)',
      transition: 'all 0.2s ease',
    }}>
      {isOver && (
        <div style={{
          height: 50,
          backgroundColor: 'rgba(38, 132, 255, 0.1)',
          border: '2px dashed #2684FF',
          borderRadius: 4,
          marginBottom: 8,
        }} />
      )}
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 16px',
    
 gap:"6px",

        cursor: isDragging ? 'grabbing' : 'grab',
      }}>
        <div style={{ marginRight: 12 }}>
          <DoubleThreeDot />
        </div>
        
        <span className="choice-item-span">
          {String.fromCharCode(65 + index)}
        </span>
        
        <Input
          value={choice}
          onChange={(e) => onUpdate(index, e.target.value)}
          style={{ flex: 1, marginRight: 12 }}
        />
        
        <Button 
          icon={<Delete />}
       className="outline"
          onClick={() => onDelete(index)}
          type="text"
        />
      </div>
    </div>
  );
};