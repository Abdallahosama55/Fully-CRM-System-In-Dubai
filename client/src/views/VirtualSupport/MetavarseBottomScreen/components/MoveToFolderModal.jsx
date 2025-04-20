import { Col, Modal, Row, Tree, Typography } from "antd";
import { MoveToFolderSVG } from "assets/jsx-svg";
import { useMemo, useState } from "react";
import "../../styles.css";
import { useMetavarseBottomScreenContext } from "../context/metavarseBottomScreenContext";

const { DirectoryTree } = Tree;

export default function MoveToFolderModal({
  isOpen,
  frame,
  onCancel,
  onAddToFolder,
  isPendingAddToFolder,
}) {
  const [selectedFolderId, setSelectedFolderId] = useState();
  const { allFrameFolders } = useMetavarseBottomScreenContext();

  const onSelect = (_, info) => {
    setSelectedFolderId(info.node.key);
  };

  const handleMoveFrame = () => {
    onAddToFolder(frame, selectedFolderId === "0" ? null : selectedFolderId);
  };

  const handleCancel = () => {
    setSelectedFolderId();
    onCancel();
  };

  const getSubFolders = (id, allFrameFolders) => {
    return (
      allFrameFolders
        ?.filter((folder) => folder.parentId === id)
        .map((folder) => ({
          title: folder.name,
          key: folder.id,
          children: getSubFolders(folder.id, allFrameFolders),
        })) ?? undefined
    );
  };

  const treeData = useMemo(() => {
    const rootFolders = allFrameFolders?.filter((folder) => !folder?.parentId);

    return [
      {
        title: "Root",
        key: "0",
        children:
          rootFolders?.map((folder) => ({
            title: folder.name,
            key: folder.id,
            children: getSubFolders(folder.id, allFrameFolders),
          })) ?? undefined,
      },
    ];
  }, [allFrameFolders]);

  return (
    <Modal
      className="move-frame-modal"
      destroyOnClose
      open={isOpen}
      width={500}
      okText="Move"
      okButtonProps={{ disabled: !selectedFolderId, loading: isPendingAddToFolder }}
      onOk={handleMoveFrame}
      onCancel={handleCancel}
      title={
        <div className="d-flex align-center" style={{ gap: 8 }}>
          <MoveToFolderSVG /> Move To Folder
        </div>
      }
      centered>
      <Row gutter={[20, 10]}>
        <Col>
          <Typography.Text style={{ fontWeight: "bold" }}>Moving Frame:</Typography.Text>
        </Col>
        <Col>
          <Typography.Text>{frame?.name}</Typography.Text>
        </Col>
        <Col className="w-100">
          <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            treeData={treeData}
            defaultExpandedKeys={[]}
          />
        </Col>
      </Row>
    </Modal>
  );
}
