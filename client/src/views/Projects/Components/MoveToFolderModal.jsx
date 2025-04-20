import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Switch, Select, Tree } from "antd";
import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  MoreSVG,
  DeleteSVG,
  RenameSVG,
  CalenderFolderSVG,
  FolderIconSMSVG,
  EyeSVG,
} from "assets/jsx-svg";
import FoldersService from "services/meetaversProjects/folders.service";
import DimensionsService from "services/dimensions.service";
import { useNotification } from "context/notificationContext";
import FolderTreeCard from "./FolderTreeCard";

export default function MoveToFolderModal({
  isModalOpen,
  handleModalCancel,
  folderName,
  metaversName,
  initailTree,
  currentProjectId,
  getMeetversesByProjectId,
  metaversId,
}) {
  const { openNotificationWithIcon } = useNotification();

  const [treeData, setTreeData] = useState(initailTree);
  useEffect(() => {
    setTreeData(initailTree);
  }, [initailTree]);

  const [selectedFolderIdToRecieve, setSelectedFolderIdToRecieve] = useState(null);
  const onSelect = (selectedKeys, info) => {
    setSelectedFolderIdToRecieve(selectedKeys[0]);
  };

  const updateTreeData = (list, key, children) =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const onLoadData = ({ key, children }) =>
    new Promise((resolve, reject) => {
      if (children) {
        resolve();
        return;
      }

      FoldersService.getAllByFolderId(key)
        .then(({ data }) => {
          const children = data.data
            ?.filter((item) => item.type == "folder")
            .map((item) => ({ key: item?.id, title: <FolderTreeCard folderName={item?.name} /> }));
          setTreeData((origin) => updateTreeData(origin, key, children));
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  const handleMoveDimentionToFolder = (dimensionIdToSend, receiveingFolderId) => {
    handleMoveDimentionToFolderRequest(dimensionIdToSend, receiveingFolderId);
  };
  const handleMoveDimentionToFolderRequest = (dimensionIdToSend, receiveingFolderId) => {
    DimensionsService.addDimentionToFolder(dimensionIdToSend, receiveingFolderId)
      .then(({ data }) => {
        getMeetversesByProjectId(currentProjectId);
        handleModalCancel();
        openNotificationWithIcon("success", "Moved successfully");
      })
      .catch((error) => {
        var { errors } = error?.response.data;
        openNotificationWithIcon("error", errors[0]);
      });
  };
  const handelMoveFolderBtn = () => {
    handleMoveDimentionToFolder(metaversId, selectedFolderIdToRecieve);
  };
  return (
    <Modal
      destroyOnClose={true}
      centered={true}
      width={400}
      title={null}
      open={isModalOpen}
      onCancel={() => {
        handleModalCancel();
        setSelectedFolderIdToRecieve(null);
      }}
      footer={null}>
      <h6 style={{ marginBottom: "1rem", fontWeight: 700, fontSize: 20 }}>
        <span>Move "{metaversName}" </span>
      </h6>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div style={{ fontSize: 14, fontWeight: 400 }}>Current Location:</div>
        <div
          style={{
            marginLeft: 10,
            padding: "7px 10px",
            borderRadius: 10,
            border: " 1px solid #D1D1D6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <span>
            <FolderIconSMSVG style={{ height: 20 }} />
          </span>
          <span style={{ fontSize: 12, marginLeft: 7, fontWeight: 600 }}>{folderName}</span>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 16, marginTop: 15, marginBottom: 10, fontWeight: 500 }}>
          My Folders:
        </div>
      </div>
      <div>
        <Tree
          // showIcon
          defaultSelectedKeys={["1"]}
          switcherIcon={<DownOutlined />}
          treeData={treeData}
          onSelect={onSelect}
          loadData={onLoadData}
        />
      </div>
      {console.log("inin", treeData)}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20 }}>
        <Button
          size="small"
          style={{ width: "48%" }}
          block
          onClick={() => {
            handleModalCancel();
            setSelectedFolderIdToRecieve(null);
          }}>
          Cancel
        </Button>
        <span style={{ width: 5 }}></span>
        <Button
          disabled={selectedFolderIdToRecieve === null}
          onClick={handelMoveFolderBtn}
          size="small"
          className="btn-add"
          style={{ width: "48%" }}>
          Move
        </Button>
      </div>
    </Modal>
  );
}
