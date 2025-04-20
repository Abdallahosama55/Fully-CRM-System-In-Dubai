import { SettingOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { MoveToFolderSVG } from "assets/jsx-svg";
import "../../styles.css";

export default function FrameSettings({ frame, onMoveFrame }) {
  const frameOptions = [
    {
      label: "Move To Folder",
      icon: <MoveToFolderSVG style={{ marginRight: 8 }} />,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        onMoveFrame?.(frame);
      },
    },
  ];

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: frameOptions,
      }}
      placement="bottomRight">
      <span className="frame-settings-icon" onClick={(e) => e.stopPropagation()}>
        <SettingOutlined />
      </span>
    </Dropdown>
  );
}
