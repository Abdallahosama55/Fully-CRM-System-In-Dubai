import { ColorPicker } from "antd";
import React from "react";
const CustomColorPicker = (props) => {
  return (
    <ColorPicker
      {...props}
      format="hex"
      style={{ background: "white", width: "100%" }}
      defaultFormat="hex"
      disabledAlpha
      defaultValue="#1677ff"
      onChange={(_, color) => props?.onChange(color)}
    />
  );
};

export default CustomColorPicker;
