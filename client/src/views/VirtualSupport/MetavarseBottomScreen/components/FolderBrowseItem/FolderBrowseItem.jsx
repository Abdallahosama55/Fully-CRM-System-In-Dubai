import { Typography } from "antd";
import { FolderColoredSVG } from "assets/jsx-svg";
import { useState } from "react";
import FolderSettings from "./FolderSettings";
import "../../styles.css";
import { useMetavarseBottomScreenContext } from "../../context/metavarseBottomScreenContext";

export default function FolderBrowseItem({
  folder,
  isDragging,
  onDeleteFolder,
  onRenameFolder,
  onDrop,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOnDrop = () => {
    onDrop(folder);
  };

  const { setCurrentSelectedFolder } = useMetavarseBottomScreenContext();

  return (
    <div
      className={`folder-item clickable${isDragging ? " dragging" : ""}`}
      onClick={() => setCurrentSelectedFolder(folder)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleOnDrop}>
      <div className="folder">
        {isHovered && (
          <FolderSettings
            folder={folder}
            onDeleteFolder={onDeleteFolder}
            onRenameFolder={onRenameFolder}
          />
        )}
        <div className="image">
          <FolderColoredSVG width={90} height={90} />
        </div>
      </div>
      <Typography.Text strong ellipsis style={{ maxWidth: "70%" }} className="folder-label">
        {folder?.name}
      </Typography.Text>
    </div>
  );
}
