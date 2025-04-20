import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Row, Tree, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import FrameAddModal from "../FrameAddModal";
import useTreeData from "./useTreeData";
import { axiosCatch } from "utils/axiosUtils";
import { transferNode } from "../../../untils";
import useAddFrameToFolder from "services/DiemnsionsFrames/Mutations/useAddFrameToFolder";
import useUpdateFrameFolderStructure from "services/DiemnsionsFolders/Mutations/useUpdateFrameFolderStructure";

import "./styles.css";

export default function FramesFolders({
  liveData,
  setLiveData,
  listDiemnsionFramesQuery,
  selectedTreeKey,
  setSelectedTreeKey,
  addFrameModalOpen,
  setAddFrameModalOpen,
  fromAddFrameToFolderModal,
}) {
  const [gData, setGData] = useState([]);
  const [changeTreeDataLoading, setChangeTreeDataLoading] = useState(false);
  const queryClient = useQueryClient();

  const frameFolder = useMemo(() => {
    return liveData?.data?.frameFolder ? JSON.parse(liveData?.data?.frameFolder) : [];
  }, [liveData]);

  const [treeData] = useTreeData({
    initialData: frameFolder,
    setLiveData,
  });

  useEffect(() => {
    setGData(treeData);
  }, [treeData]);

  const { mutate: updateFrameFolderStructure } = useUpdateFrameFolderStructure({
    onSuccess: (_, variables) => {
      setLiveData((prev) => {
        prev.data.frameFolder = variables.frameFolder;

        return {
          ...prev,
        };
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const { mutate: addFrameToFolder } = useAddFrameToFolder({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(listDiemnsionFramesQuery.queryKey, (prev) => {
        const prevData = prev.data.data;

        const frameToChangeIndex = prevData.findIndex((frame) => frame.id === +variables.frameId);
        if (frameToChangeIndex > -1) {
          prevData[frameToChangeIndex].folderId = variables.folderId;

          const dataWithNewObject = transferNode(
            frameFolder,
            +variables.frameId,
            +variables.folderId,
          );
          updateFrameFolderStructure({
            eventId: liveData?.data?.id,
            frameFolder: JSON.stringify(dataWithNewObject),
          });
          return { ...prev };
        }
      });
    },
  });

  const allowDrop = (info) => {
    const dropPos = info.dropPosition;
    const dragNode = info.dragNode;
    const dropNode = info.dropNode;

    // Prevent dropping a node at top -1, bottom 1
    const isDroppedInRoot = dropPos === -1 || dropPos === 1;

    if (dragNode.isLeaf && isDroppedInRoot) {
      return false; // Prevent drop at root level
    }

    // You can also add more conditions here, for example:
    // Prevent dropping a leaf node under another leaf node
    if (dragNode && dropNode && dragNode.isFolder && dropNode.isLeaf) {
      return false;
    }

    return true; // Allow drop in all other cases
  };

  const onDrop = (info) => {
    const dragKey = info.dragNode.key;
    const dropKey = info.node ? info.node.key : null;
    const dropPos = info.node.pos.split("-");
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const isDroppedInRoot = info.node.pos === "0-0";

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i, 0, dragObj);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i + 1, 0, dragObj);
      }
    }
    // info.dropNode
    const oldData = gData;
    if (info.dragNode.isLeaf) {
      setChangeTreeDataLoading(true);
      addFrameToFolder(
        { frameId: info.dragNode.key, folderId: info.node.key },
        {
          onSuccess: () => {
            setChangeTreeDataLoading(false);
            setGData(data);
          },
          onSettled: () => {
            setChangeTreeDataLoading(false);
          },
          onError: () => {
            setGData(oldData);
          },
        },
      );
    } else if (info.dragNode.isFolder) {
      setChangeTreeDataLoading(true);

      const dataWithNewObject = transferNode(
        frameFolder,
        +info.dragNode.key,
        isDroppedInRoot ? null : +info.node.key,
      );

      updateFrameFolderStructure(
        {
          eventId: liveData?.data?.id,
          frameFolder: JSON.stringify(dataWithNewObject),
        },
        {
          onSuccess: () => {
            setChangeTreeDataLoading(false);
            // setGData(data);
          },
          onSettled: () => {
            setChangeTreeDataLoading(false);
          },
          onError: () => {
            // setGData(oldData);
          },
        },
      );
    }
  };

  return (
    <div className="frames-folders">
      <Row justify="end">
        <Button
          size="small"
          style={{ border: "none", margin: "0.5rem" }}
          onClick={() => setAddFrameModalOpen(true)}>
          <Flex vertical>
            <Typography.Text className="fz-12 fw-600" style={{ lineHeight: "12px" }}>
              Create
            </Typography.Text>
            <Typography.Text className="fz-12 fw-600" style={{ lineHeight: "12px" }}>
              Folder
            </Typography.Text>
          </Flex>
        </Button>
      </Row>
      <Tree.DirectoryTree
        className={`media-tree ${
          !fromAddFrameToFolderModal ? "side-folder-tree" : ""
        } draggable-tree`}
        draggable={(e) => {
          if (e.key !== "allFrame") {
            return e;
          } else {
            return;
          }
        }}
        multiple
        defaultExpandAll
        blockNode
        treeData={fromAddFrameToFolderModal ? gData : [{ title: "All", key: "allFrame" }, ...gData]}
        onDrop={onDrop}
        allowDrop={allowDrop}
        onSelect={(e) => setSelectedTreeKey(e[0])}
        selectedKeys={[selectedTreeKey]}
        expandAction={false}
      />

      {changeTreeDataLoading ? (
        <div className="tree-loading">
          <LoadingOutlined />
        </div>
      ) : null}

      <FrameAddModal
        addFrameModalOpen={addFrameModalOpen}
        setAddFrameModalOpen={setAddFrameModalOpen}
        liveData={liveData}
        setLiveData={setLiveData}
      />
    </div>
  );
}
