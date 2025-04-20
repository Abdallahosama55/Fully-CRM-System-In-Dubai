import { Col, Divider, Modal, Row, message } from "antd";
import { ComputerSVG } from "assets/jsx-svg";
import FoldersBreadcrumb from "components/FoldersBreadcrumb";
import { useEffect, useMemo, useState } from "react";
import useMetaverseFrameFolders from "services/meetings/useMetaverseFrameFolders";
import noData from "../../../../assets/images/no-data.png";
import { useMetavarseBottomScreenContext } from "../context/metavarseBottomScreenContext";
import CreateFolderModal from "./CreateFolderModal";
import FolderBrowseItem from "./FolderBrowseItem/FolderBrowseItem";
import FoldersFilter from "./FoldersFilter";
import FrameBrowseItem from "./FrameBrowseItem/FrameBrowseItem";
import FramesPreview from "./FramesPreview";
import RenameFolderModal from "./RenameFolderModal";
import "../../styles.css";

export default function BrowseFramesModal({
  isOpen,
  setIsOpen,
  currentSubFolders,
  currentFolderFrames,
  currentFolderPath,
  onBreadcrumbChangeFolder,
  onFolderDeleted,
  onMoveFrame,
  onAddToFolder,
}) {
  const [draggedFrameState, setDraggedFrameState] = useState({
    isDragging: false,
    draggedFrame: undefined,
  });
  const [selectedFilesFilter, setSelectedFilesFilter] = useState("");
  const [selectedFolderForRename, setSelectedFolderForRename] = useState();
  const { deleteFolder } = useMetaverseFrameFolders();
  const { allFrameFolders, currentSelectedFolder, setAllFrameFolders } =
    useMetavarseBottomScreenContext();

  const handleFilterFiles = (filesFilter) => {
    setSelectedFilesFilter(filesFilter);
  };

  const handleRenameFolder = (folder) => {
    setSelectedFolderForRename(folder);
  };

  const handleDeleteFolder = (folder) => {
    deleteFolder({ folderId: folder.id }).then(() => {
      message.success("Folder deleted successfully");
      onFolderDeleted(folder);
    });
  };

  const handleDropOnFolder = (folder) => {
    onAddToFolder(draggedFrameState.draggedFrame, folder.id);
  };

  const handleFolderRenamed = (folderId, newName) => {
    setSelectedFolderForRename();

    setAllFrameFolders((oldFolders) => {
      const newFolders = oldFolders.slice();
      const folderIndex = newFolders.findIndex(({ id }) => id === folderId);
      if (folderIndex > -1) {
        newFolders[folderIndex] = { ...newFolders[folderIndex], name: newName };
      }

      return newFolders;
    });
  };

  const handleUpdateDraggingState = (newState) => {
    setDraggedFrameState(newState);
  };

  const handleFolderCreated = (folder) => {
    setAllFrameFolders([...allFrameFolders, folder]);
  };

  const filteredFolders = useMemo(() => {
    if (!selectedFilesFilter) {
      return currentSubFolders;
    }
    return currentSubFolders.filter((subFolder) => subFolder.type === selectedFilesFilter);
  }, [selectedFilesFilter, currentSubFolders]);

  const filteredFrames = useMemo(() => {
    if (!selectedFilesFilter) {
      return currentFolderFrames;
    }
    return currentFolderFrames.filter((frame) => frame.type === selectedFilesFilter);
  }, [selectedFilesFilter, currentFolderFrames]);

  useEffect(() => {
    setSelectedFilesFilter("");
  }, [isOpen]);

  return (
    <Modal
      className="browse-folders-modal"
      destroyOnClose
      open={isOpen}
      width={"80%"}
      onCancel={() => {
        setIsOpen(false);
      }}
      footer={null}
      title={
        <div className="d-flex align-center" style={{ gap: 8 }}>
          <ComputerSVG color="green" /> Browse Frames
        </div>
      }
      centered>
      <Row
        style={{
          flexDirection: "column",
        }}>
        <Col>
          <Divider style={{ marginTop: 0, marginBottom: 8 }} />
        </Col>
        <Col>
          <Row>
            <Col span={12} style={{ minHeight: 300 }}>
              <Row
                gutter={[0, 16]}
                style={{
                  flexDirection: "column",
                }}>
                <Col>
                  <FoldersBreadcrumb
                    folderPath={currentFolderPath}
                    onFetchFolderData={onBreadcrumbChangeFolder}
                  />
                </Col>
                <Col className="d-flex justify-between">
                  <FoldersFilter
                    selectedFilesFilter={selectedFilesFilter}
                    onFilterFiles={handleFilterFiles}
                  />
                  <CreateFolderModal
                    currentSelectedFolder={currentSelectedFolder}
                    onFolderCreated={handleFolderCreated}
                  />
                  <RenameFolderModal
                    isOpen={!!selectedFolderForRename}
                    folderId={selectedFolderForRename?.id}
                    onFolderRenamed={handleFolderRenamed}
                  />
                </Col>
                <Col className="folder-content">
                  {!filteredFrames.length && !filteredFolders.length ? (
                    <div
                      style={{
                        height: "50vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        placeContent: "center",
                        width: "100%",
                      }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <img src={noData} width={60} />
                        </div>
                        <div> No data to show !</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {filteredFolders.map((folder) => (
                        <FolderBrowseItem
                          key={folder.id}
                          folder={folder}
                          isDragging={draggedFrameState.isDragging}
                          onDrop={handleDropOnFolder}
                          onDeleteFolder={handleDeleteFolder}
                          onRenameFolder={handleRenameFolder}
                        />
                      ))}
                      {filteredFrames.map((frame) => (
                        <FrameBrowseItem
                          updateDraggingState={handleUpdateDraggingState}
                          key={frame?.name}
                          frame={frame}
                          onMoveFrame={onMoveFrame}
                        />
                      ))}
                    </>
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={1} className="d-flex justify-center align-center">
              <Divider type="vertical" style={{ height: "100%" }} />
            </Col>
            <Col span={11}>
              <FramesPreview updateDraggingState={handleUpdateDraggingState} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}
