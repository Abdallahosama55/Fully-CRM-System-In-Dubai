import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "antd";

import useRenameFrameFolder from "services/DiemnsionsFolders/Mutations/useRenameFrameFolder";
import useDeleteFrameFolder from "services/DiemnsionsFolders/Mutations/useDeleteFrameFolder";
import useUpdateFrameFolderStructure from "services/DiemnsionsFolders/Mutations/useUpdateFrameFolderStructure";
import useRenameMediaFolder from "services/VverseMedia/Mutations/useRenameMediaFolder";
import useDeleteMediaFolder from "services/VverseMedia/Mutations/useDeleteMediaFolder";
import useUpdateMediaFolderStructure from "services/VverseMedia/Mutations/useUpdateMediaFolderStructure";
import { deleteNodeById, renameNodeById } from "../../../untils";
import { axiosCatch } from "utils/axiosUtils";
import TreeNode from "./TreeNode";
import { useParams } from "react-router-dom";

export default function useTreeData({ initialData, setLiveData, allMediaQuery, isMedia = false }) {
  const { liveId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: updateFrameFolderStructure } = useUpdateFrameFolderStructure({
    onSuccess: (_, variables) => {
      setLiveData((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            frameFolder: variables.frameFolder,
          },
        };
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const { mutate: updateMediaFolderStructure } = useUpdateMediaFolderStructure({
    onSuccess: (_, variables) => {
      setLiveData((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            mediaFolder: variables.mediaFolder,
          },
        };
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const renameMediaFolderMutation = useRenameMediaFolder({
    onSuccess: (_, variables) => {
      let mediaFolder = initialData;
      const newData = renameNodeById(mediaFolder, variables.folderId, variables.name);

      mediaFolder = JSON.stringify(newData);
      updateMediaFolderStructure({
        mediaFolder,
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const deleteMediaFolderMutation = useDeleteMediaFolder({
    onSuccess: (data, variables) => {
      let mediaFolder = initialData;
      const filteredMediaFolder = deleteNodeById(mediaFolder, variables.folderId);
      updateMediaFolderStructure({
        mediaFolder: JSON.stringify(filteredMediaFolder),
      });

      queryClient.setQueryData(allMediaQuery.queryKey, (prev) => {
        const updatedData = prev.data.data.rows.map((media) => {
          if (media.folderId === +variables.folderId) {
            media.folderId = null;
          }
          return { ...media };
        });
        return {
          ...prev,
          data: {
            ...prev.data,
            data: {
              ...prev.data.data,
              rows: updatedData,
            },
          },
        };
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const { mutate: renameFrameFolder } = useRenameFrameFolder({
    onSuccess: (_, variables) => {
      let frameFolder = initialData;
      const newData = renameNodeById(frameFolder, variables.folderId, variables.name);

      frameFolder = JSON.stringify(newData);
      updateFrameFolderStructure({
        eventId: liveId,
        frameFolder,
      });
    },
  });

  const { mutate: deleteFrameFolder } = useDeleteFrameFolder({
    onSuccess: (_, variables) => {
      let frameFolder = initialData;
      const filteredFrameFolder = deleteNodeById(frameFolder, variables.folderId);
      updateFrameFolderStructure({
        eventId: liveId,
        frameFolder: JSON.stringify(filteredFrameFolder),
      });
    },
  });

  const [treeData, setTreeData] = useState([]);

  const convertToTreeData = useCallback(
    (data) => {
      return data
        ?.map((item) => {
          const hasChildren = item.children && item.children.length > 0;

          let treeNode = {};
          if (item.type === "FOLDER") {
            // Create the tree node only for items of type "FOLDER"
            treeNode = {
              title: (
                <TreeNode
                  item={item}
                  renameFrameFolder={isMedia ? renameMediaFolderMutation.mutate : renameFrameFolder}
                  deleteFrameFolder={isMedia ? deleteMediaFolderMutation.mutate : deleteFrameFolder}
                />
              ),
              ...(item.image
                ? { icon: <Image src={item.image} preview={false} width={32} height={32} /> }
                : {}),
              key: item.id,
              isLeaf: false,
              isFolder: true,
            };

            // Add children only if there are any and the item is a "FOLDER"
            if (hasChildren) {
              treeNode.children = convertToTreeData(item.children);
            }

            return treeNode;
          } else {
            // If item.type is not "FOLDER", return undefined to exclude it
            return null;
          }
        })
        .filter(Boolean);
    },
    [
      isMedia,
      renameMediaFolderMutation.mutate,
      renameFrameFolder,
      deleteMediaFolderMutation.mutate,
      deleteFrameFolder,
    ],
  );

  // Initialize tree data state
  useEffect(() => {
    setTreeData(convertToTreeData(initialData));
  }, [initialData, convertToTreeData]);

  return [treeData];
}
