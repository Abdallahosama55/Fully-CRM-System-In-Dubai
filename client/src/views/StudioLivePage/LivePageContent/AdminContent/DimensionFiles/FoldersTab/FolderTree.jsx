import { useState } from "react";
import { Col, Input, Popconfirm, Row, Tooltip, Typography } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  SaveOutlined,
} from "@ant-design/icons";

export default function TreeNode({
  item,
  renameMediaFolder,
  deleteMediaFolder,
  updateMediaFolder,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.name);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    setIsSaving(true);
    renameMediaFolder(
      { folderId: item.id, name: title },
      {
        onSuccess: () => {
          setIsSaving(false);
          setIsEditing(false);
        },
        onSettled: () => {
          setIsSaving(false);
        },
      },
    );
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setTitle(item.name); // Reset the title to the original value
  };

  const handleDeleteClick = (e, isFolder) => {
    e.stopPropagation();
    setIsDeleting(true);
    if (isFolder) {
      deleteMediaFolder(
        { folderId: item.id },
        {
          onSuccess: () => {
            setIsDeleting(false);
          },
          onSettled: () => {
            setIsDeleting(false);
          },
        },
      );
    } else {
      updateMediaFolder(
        { folderId: item.id, newFolderId: null },
        {
          onSuccess: () => {
            setIsDeleting(false);
          },
          onSettled: () => {
            setIsDeleting(false);
          },
        },
      );
    }
  };

  return (
    <Row gutter={[8, 8]} justify="space-between" align="middle" wrap={false}>
      <Col flex={1}>
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "200px" }}
          />
        ) : (
          <Row align="middle">
            <Tooltip title={title}>
              <Typography.Text style={{ maxWidth: "180px" }} ellipsis>
                {title}
              </Typography.Text>
            </Tooltip>
          </Row>
        )}
      </Col>
      <Col>
        {isEditing ? (
          isSaving ? (
            <LoadingOutlined />
          ) : (
            <Row align="middle" gutter={[16, 8]} wrap={false}>
              <Col>
                <SaveOutlined className={`clickable fz-18`} onClick={handleSaveClick} />
              </Col>
              <Col>
                <CloseOutlined className="clickable fz-18" onClick={handleCancelClick} />
              </Col>
            </Row>
          )
        ) : (
          <Row align="middle" gutter={[16, 8]}>
            {item.isFolder ? (
              <>
                <Col>
                  <Tooltip title="Rename folder">
                    <EditOutlined className="clickable fz-18" onClick={handleEditClick} />
                  </Tooltip>
                </Col>
              </>
            ) : null}

            <Col>
              {isDeleting ? (
                <LoadingOutlined />
              ) : (
                <Tooltip title={item.isFolder ? "Delete folder" : "Delete media from folder"}>
                  <Popconfirm
                    title={item.isFolder ? "Delete the Folder" : "Delete media from folder"}
                    description={`Are you sure to delete this ${
                      item.isFolder ? "folder" : "media"
                    }?`}
                    onConfirm={(e) => handleDeleteClick(e, item.isFolder)}
                    okText="Yes"
                    cancelText="No">
                    <DeleteOutlined
                      onClick={(e) => e.stopPropagation()}
                      className={`clickable fz-18`}
                    />
                  </Popconfirm>
                </Tooltip>
              )}
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}
