import { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import { Dropdown } from "antd";

// style
import { rgba2hex } from "utils/color-picker";

import "./styles.css";

const ColorPicker = ({ value, colorBtnStyle, onChange = () => {} }) => {
  const [color, setColor] = useState(value || "#000000");
  const openBtnRef = useRef(null);

  useEffect(() => {
    value && setColor(value);
  }, [value]);

  const handelChange = (color) => {
    setColor(rgba2hex(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`));
    onChange(rgba2hex(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`));
  };

  return (
    <div className={`color_picker`}>
      <Dropdown
        trigger={["click"]}
        dropdownRender={() => <SketchPicker color={color} onChange={handelChange} />}>
        <div
          ref={openBtnRef}
          className="color_btn"
          style={
            colorBtnStyle
              ? {
                  ...colorBtnStyle,
                  backgroundColor: color,
                }
              : {
                  backgroundColor: color,
                }
          }></div>
      </Dropdown>
    </div>
  );
};

export default ColorPicker;
