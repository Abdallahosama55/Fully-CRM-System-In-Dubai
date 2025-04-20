import { useEffect, useMemo, useState } from "react";
import { Button, Flex, Row, Tree, Typography } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";

import useUpdateMediaFolderStructure from "services/VverseMedia/Mutations/useUpdateMediaFolderStructure";
import useUpdateMedia from "services/VverseMedia/Mutations/useUpdateMedia";
import useGetAllMedia from "services/VverseMedia/Querys/useGetAllMedia";
import { transferNode } from "views/StudioLivePage/LivePageContent/untils";
import useTreeData from "../../DimensionFrame/FramesFolders/useTreeData";
import FrameAddModal from "./FrameAddModal";
import { axiosCatch } from "utils/axiosUtils";

import "./styles.css";

export default function FoldersTab({
  liveData,
  setLiveData,
  setSelectedFolderKey,
  selectedFolderKey,
  addFolderModalOpen,
  setAddFolderModalOpen,
  fromAddMediaToFolderModal,
}) {
  const queryClient = useQueryClient();
  const [gData, setGData] = useState([]);
  const [changeTreeDataLoading, setChangeTreeDataLoading] = useState(false);

  const allMediaQuery = useGetAllMedia({
    select: (data) => data.data.data,
  });

  const updateMediaMutation = useUpdateMedia({
    onSuccess: (data, variables) => {
      queryClient.setQueryData(allMediaQuery.queryKey, (prev) => {
        const prevData = [...prev.data.data.rows]; // Create a new array instead of mutating

        const updatedMediaIndex = prevData.findIndex((media) => media.id === +variables.mediaId);

        if (updatedMediaIndex > -1) {
          prevData[updatedMediaIndex] = {
            ...prevData[updatedMediaIndex],
            folderId: variables.folderId,
          };

          return {
            ...prev,
            data: {
              ...prev.data,
              data: {
                ...prev.data.data,
                rows: prevData,
              },
            },
          };
        }

        return prev;
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const mediaFolder = useMemo(() => {
    return liveData?.data?.mediaFolder ? JSON.parse(liveData?.data?.mediaFolder) : [];
  }, [liveData]);

  const [treeData] = useTreeData({
    initialData: mediaFolder,
    setLiveData,
    allMediaQuery,
    isMedia: true,
  });

  useEffect(() => {
    setGData(treeData);
  }, [treeData]);

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

  const { mutate: updateMediaFolderStructure } = useUpdateMediaFolderStructure({
    onSuccess: (_, variables) => {
      setLiveData((prev) => {
        prev.data.mediaFolder = variables.mediaFolder;

        return {
          ...prev,
        };
      });
    },
    onError: (err) => axiosCatch(err),
  });

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
      updateMediaMutation.mutate(
        { mediaId: +info.dragNode.key, folderId: +info.node.key },
        {
          onSuccess: () => {
            setChangeTreeDataLoading(false);
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
        mediaFolder,
        +info.dragNode.key,
        isDroppedInRoot ? null : +info.node.key,
      );

      updateMediaFolderStructure(
        {
          mediaFolder: JSON.stringify(dataWithNewObject),
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
    <div className="h-100">
      <div className="media-folders">
        <Row justify="end">
          <Button
            size="small"
            style={{ border: "none", margin: "0.5rem" }}
            onClick={() => setAddFolderModalOpen(true)}>
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
            !fromAddMediaToFolderModal ? "side-folder-tree" : ""
          } draggable-tree`}
          draggable
          multiple
          treeData={
            fromAddMediaToFolderModal ? gData : [{ title: "All", key: "allFrame" }, ...gData]
          }
          onSelect={(e) => setSelectedFolderKey(e[0])}
          selectedKeys={[selectedFolderKey]}
          onDrop={onDrop}
          allowDrop={allowDrop}
          expandAction={false}
        />

        {changeTreeDataLoading || allMediaQuery.isLoading ? (
          <div className="tree-loading">
            <LoadingOutlined />
          </div>
        ) : null}

        <FrameAddModal
          addFolderModalOpen={addFolderModalOpen}
          setAddFolderModalOpen={setAddFolderModalOpen}
          liveData={liveData}
          setLiveData={setLiveData}
        />
      </div>
    </div>
  );
}
