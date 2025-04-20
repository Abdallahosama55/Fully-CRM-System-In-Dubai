import { Popover } from "antd";
import Box from "components/Box";
import { useCallback, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
const GradientColorPicker = ({ value, onChange, defaultValue }) => {
  const [color, setColor] = useState(defaultValue ?? value ?? "white");

  const debouncedOnChange = useCallback((color) => {
    setColor(color);
  }, []);
  return (
    <div>
      <Popover
        trigger={["click"]}
        afterOpenChange={(state) => {
          if (!state) {
            if (typeof onChange === "function") onChange(color);
          }
        }}
        content={
          <ColorPicker
            hideGradientType
            hideGradientAngle
            hideGradientStop
            hideGradientControls
            value={color}
            onChange={debouncedOnChange}
            height={150}
          />
        }>
        <Box
          sx={{
            width: "33px",
            borderRadius: "4px",
            height: "33px",
            border: "1px solid rgba(45, 95, 235, 0.15)",
            background: color,
          }}
        />
      </Popover>
    </div>
  );
};
export default GradientColorPicker;
