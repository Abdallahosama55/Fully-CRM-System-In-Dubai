import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { RenameSVG } from "assets/jsx-svg";
import "../../styles.css";

export default function FolderSettings({ folder, onDeleteFolder, onRenameFolder }) {
  const filterOptions = [
    {
      label: "Rename",
      icon: <RenameSVG />,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        onRenameFolder(folder);
      },
    },
    {
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        onDeleteFolder(folder);
      },
    },
  ];

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: filterOptions,
      }}
      placement="bottomRight">
      <span className="folder-settings-icon" onClick={(e) => e.stopPropagation()}>
        <SettingOutlined />
      </span>
    </Dropdown>
  );
}
