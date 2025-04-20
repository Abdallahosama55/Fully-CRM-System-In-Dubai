import { Select, Space } from "antd";
import {
  CinemaSVG,
  DocumentSVG,
  FilterMailSVG,
  ImagesSVG,
  OverlaySVG,
  SoundWavesSVG,
} from "assets/jsx-svg";

const options = [
  { label: "All", value: "" },
  { label: "Audio", value: "audio" },
  { label: "Video", value: "video" },
  { label: "Image", value: "image" },
  { label: "Overlay", value: "overlay" },
  { label: "Document", value: "document" },
];

const FilterMedia = ({ onFilter }) => {
  const renderIcon = (value, color) => {
    let Icon = FilterMailSVG;
    if (value == "video") {
      Icon = CinemaSVG;
    }
    if (value == "image") {
      Icon = ImagesSVG;
    }
    if (value == "audio") {
      Icon = SoundWavesSVG;
    }
    if (value == "overlay") {
      Icon = OverlaySVG;
    }
    if (value == "document") {
      Icon = DocumentSVG;
    }
    return <Icon width={12} height={12} color={color} />;
  };

  const handleChange = (val) => {
    onFilter(val);
  };

  return (
    <Select
      defaultValue=""
      onChange={handleChange}
      placeholder="Filter by"
      style={{
        width: "100%",
      }}
      labelRender={(option) => (
        <Space>
          <span role="img" aria-label={option.label}>
            {renderIcon(option.value, "white")}
          </span>
          {option.value ? option.label : "Filter by"}
        </Space>
      )}
      options={options}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={option.label}>
            {renderIcon(option.value)}
          </span>
          {option.label}
        </Space>
      )}
    />
  );
};
export default FilterMedia;
