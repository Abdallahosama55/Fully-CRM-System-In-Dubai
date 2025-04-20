import { Dot } from "./Dot";

const ThreeDots = ({ size = 1, space = 1, direction = "column", className = "", ...props }) => {
  const dotStyle = {
    margin: `${space}px`,
    width: `${size}px`,
    height: `${size}px`,
  };
  return (
    <div
      className={`${className}`}
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: "center",
      }}>
      <Dot
        style={{
          ...dotStyle,
        }}
        {...props}
      />
      <Dot
        style={{
          ...dotStyle,
        }}
        {...props}
      />
      <Dot
        style={{
          ...dotStyle,
        }}
        {...props}
      />
    </div>
  );
};

export { ThreeDots };
