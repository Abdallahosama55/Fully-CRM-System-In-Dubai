import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

export default function FoldersFilter({ selectedFilesFilter, onFilterFiles }) {
  const handleItemChange = ({ key }) => {
    onFilterFiles(key);
  };

  const filterOptions = [
    { key: "", value: "", label: "All Files" },
    { key: "AUDIO", value: "AUDIO", label: "Audio Frames" },
    { key: "MEDIA", value: "MEDIA", label: "Media Frames" },
  ];

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: filterOptions,
        selectable: true,
        onSelect: handleItemChange,
        defaultSelectedKeys: [1],
      }}>
      <Space className="clickable">
        {filterOptions.find((option) => option.key === selectedFilesFilter).label ?? "All Files"}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
}
