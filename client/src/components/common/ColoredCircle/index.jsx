import React from "react";

const ColoredCircle = ({size = "25px", color = "#000"}) => {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );
};

export default ColoredCircle;
