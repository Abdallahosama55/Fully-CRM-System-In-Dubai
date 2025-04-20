import { Tooltip, Typography, message } from "antd";
import { DocumentSVG, FavouriteSVG, FolderColoredSVG, SoundWavesSVG } from "assets/jsx-svg";
import FrameSettings from "./FrameSettings";
import { useMemo, useState } from "react";
import "../../styles.css";
import useMetaverseFrames from "services/meetings/useMetaverseFrames";
import { useMetavarseBottomScreenContext } from "../../context/metavarseBottomScreenContext";

export default function FrameBrowseItem({
  frame,
  showSettings = true,
  onMoveFrame,
  updateDraggingState,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { setAllFrames, allFrames, allFrameFoldersMap } = useMetavarseBottomScreenContext();
  const { updateFavorite } = useMetaverseFrames();

  const isTextureVideo = (texture) => {
    if (!texture) return false;
    const arrayOfTexture = texture.split(".");

    return (
      arrayOfTexture.length &&
      ["mp4", "mov", "wmv", "webM", "avi", "flv", "mkv", "mts"].includes(
        arrayOfTexture[arrayOfTexture.length - 1]?.split("?")?.[0],
      )
    );
  };

  const isAudio = frame.type == "AUDIO";
  const isVideo = !isAudio && isTextureVideo(frame?.texture);
  const backgroundImageUrl = frame?.image || frame?.texture;
  const backgroundImage = !isVideo && backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined;
  const isDocument = !isVideo && !isAudio && !backgroundImage;
  const parentFolderPath = useMemo(() => {
    if (!frame?.folderId) {
      return "";
    }
    const path = [];
    let parentFolderId = frame?.folderId;
    while (parentFolderId) {
      path.unshift(allFrameFoldersMap[parentFolderId]?.name);
      parentFolderId = allFrameFoldersMap[parentFolderId]?.parentId;
    }

    return path.join(" -> ");
  }, [frame, allFrameFoldersMap, allFrames]);

  const handleUpdateFrameFav = (frameId, isFav) => {
    updateFavorite({ frameId, isFav }).then(() => {
      setAllFrames((oldFrames) => {
        const frameIndex = oldFrames.findIndex((frame) => frame.id === frameId);
        if (frameIndex > -1) {
          const frame = { ...oldFrames[frameIndex] };
          frame.isFav = isFav;
          const newFrames = oldFrames.slice();
          newFrames[frameIndex] = frame;
          return newFrames;
        }
        return oldFrames;
      });
      message.success(isFav ? "Frame marked as favorite" : "Frame removed from favorite");
    });
  };

  const handleMarkAsFav = () => {
    handleUpdateFrameFav(frame.id, !frame.isFav);
  };

  return (
    <div
      className="frame-item"
      draggable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragStart={() =>
        updateDraggingState({
          isDragging: true,
          draggedFrame: frame,
        })
      }
      onDragEnd={() =>
        updateDraggingState({
          isDragging: false,
          draggedFrame: undefined,
        })
      }>
      <div
        className="frame"
        style={
          isAudio
            ? {
                border: "1px solid #A4ADDE",
                background: "#DEE2F6",
              }
            : isDocument
            ? {
                border: "1px solid #D59C9C",
                background: "#ECD0D0",
              }
            : undefined
        }>
        {showSettings && isHovered && <FrameSettings frame={frame} onMoveFrame={onMoveFrame} />}
        {parentFolderPath && (
          <Tooltip title={parentFolderPath} placement="bottom">
            <FolderColoredSVG className="frame-folder-icon" width={15} height={15} />
          </Tooltip>
        )}
        <FavouriteSVG
          onClick={handleMarkAsFav}
          color={frame.isFav ? "#FC4F4F" : "white"}
          className="frame-fav-icon"
        />
        <div
          className="image"
          style={{
            backgroundImage,
          }}>
          {isVideo && (
            <video width="100%" height="100%" autoPlay={false} muted>
              <source src={frame?.texture} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {isAudio && !backgroundImage && <SoundWavesSVG width={35} height={35} />}
          {isDocument && <DocumentSVG width={35} height={35} />}
        </div>
      </div>
      <Tooltip title={frame?.name}>
        <Typography.Text strong ellipsis style={{ maxWidth: "70%" }} className="frame-label">
          {frame?.name}
        </Typography.Text>
      </Tooltip>
    </div>
  );
}
