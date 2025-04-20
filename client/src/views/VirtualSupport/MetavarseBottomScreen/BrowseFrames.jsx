import { Col, Row } from "antd";
import { ComputerSVG, FavouriteSVG } from "assets/jsx-svg";
import FoldersBreadcrumb from "components/FoldersBreadcrumb";
import { useMemo, useState } from "react";
import useMetaverseFrames from "services/meetings/useMetaverseFrames";
import BrowseFramesModal from "./components/BrowseFramesModal";
import MoveToFolderModal from "./components/MoveToFolderModal";
import { useMetavarseBottomScreenContext } from "./context/metavarseBottomScreenContext";

export default function BrowseFrames({ toggleShowFav, refetchAllFrames }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frameToBeMoved, setFrameToBeMoved] = useState();
  const {
    allFrames,
    allFrameFolders,
    currentSelectedFolder,
    isShowingOnlyFavFrames,
    setAllFrames,
    setCurrentSelectedFolder,
  } = useMetavarseBottomScreenContext();

  const { addToFolder, isPendingAddToFolder } = useMetaverseFrames();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const currentSubFolders = useMemo(() => {
    return allFrameFolders.filter((folder) => folder.parentId == currentSelectedFolder?.id);
  }, [allFrameFolders, currentSelectedFolder]);

  const currentFolderFrames = useMemo(() => {
    return allFrames.filter((frame) => frame.folderId == currentSelectedFolder?.id);
  }, [allFrames, currentSelectedFolder]);

  const getSelectedFolderPath = (folder, allFrameFolders) => {
    if (folder) {
      const path = [{ name: folder.name, id: folder.id }];
      let parent = allFrameFolders.find((frameFolder) => folder.parentId == frameFolder?.id);
      while (parent) {
        path.unshift({ name: parent.name, id: parent.id });
        parent = allFrameFolders.find((frameFolder) => parent.parentId == frameFolder?.id);
      }
      return path;
    }
    return [];
  };

  const handleBreadcrumbChangeFolder = (folderId) => {
    const folder = allFrameFolders.find((folder) => folder.id == folderId);
    setCurrentSelectedFolder(folder);
  };

  const handleMoveFrame = (frame) => {
    setFrameToBeMoved(frame);
  };

  const handleAddToFolder = (frame, folderId) => {
    addToFolder({ frameId: frame.id, folderId }).then(() => {
      handleFrameMoved(frame, folderId === "0" ? null : folderId);
    });
  };

  const handleFrameMoved = (frame, folderId) => {
    setFrameToBeMoved();

    setAllFrames((oldFramesList) => {
      const oldFrameIndex = oldFramesList.findIndex((oldFrame) => oldFrame.id === frame.id);
      const newFramesList = oldFramesList.slice();
      if (oldFrameIndex > -1) {
        newFramesList[oldFrameIndex] = { ...oldFramesList[oldFrameIndex], folderId };
      }

      return newFramesList;
    });
  };

  const handleDeleteFolder = () => {
    refetchAllFrames();
  };

  const currentFolderPath = useMemo(
    () => getSelectedFolderPath(currentSelectedFolder, allFrameFolders),
    [currentSelectedFolder, allFrameFolders],
  );

  return (
    <Row className="w-100">
      <Col flex={1} className="d-flex justify-center">
        {isShowingOnlyFavFrames ? (
          <span className="d-flex justify-center align-center clickable" onClick={toggleShowFav}>
            <FavouriteSVG color="#FC4F4F" style={{ marginRight: 8 }} /> Favourite Frames
          </span>
        ) : (
          <FoldersBreadcrumb
            folderPath={currentFolderPath}
            onFetchFolderData={handleBreadcrumbChangeFolder}
          />
        )}
      </Col>
      <Col className="d-flex clickable align-center" style={{ gap: 4 }} onClick={handleOpenModal}>
        <ComputerSVG />
        Browse Frames
      </Col>
      <BrowseFramesModal
        isOpen={isModalOpen}
        currentFolderPath={currentFolderPath}
        currentSubFolders={currentSubFolders}
        currentFolderFrames={currentFolderFrames}
        onFolderDeleted={handleDeleteFolder}
        setIsOpen={setIsModalOpen}
        onBreadcrumbChangeFolder={handleBreadcrumbChangeFolder}
        onMoveFrame={handleMoveFrame}
        onAddToFolder={handleAddToFolder}
      />
      <MoveToFolderModal
        isPendingAddToFolder={isPendingAddToFolder}
        onAddToFolder={handleAddToFolder}
        isOpen={!!frameToBeMoved}
        frame={frameToBeMoved}
        onCancel={() => setFrameToBeMoved()}
      />
    </Row>
  );
}
