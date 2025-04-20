const commonStyle = {
  borderRadius: "50%",
  display: "inline-block",
};

const Dot = ({ style, color = "#030713", size = 9 }) => {
  return (
    <span
      style={{
        height: `${size}px`,
        width: `${size}px`,

        backgroundColor: color,
        ...commonStyle,
        ...style,
      }}></span>
  );
};

export { Dot };
