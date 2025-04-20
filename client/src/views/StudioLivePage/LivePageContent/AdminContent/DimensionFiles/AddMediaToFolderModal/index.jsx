import { useState } from "react";
import { Button, Col, message, Modal, Row, Tooltip, Typography } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import { CloseSVG } from "assets/jsx-svg";
import { axiosCatch } from "utils/axiosUtils";
import { addChildNode } from "views/StudioLivePage/LivePageContent/untils";
import useUpdateMediaFolderStructure from "services/VverseMedia/Mutations/useUpdateMediaFolderStructure";
import { QUERY_KEY } from "services/constants";
import FoldersTab from "../FoldersTab";
import useUpdateMedia from "services/VverseMedia/Mutations/useUpdateMedia";

export default function AddMediaToFolderModal({
  addMediaToFolderModalOpen,
  setAddMediaToFolderModalOpen,
  addFolderModalOpen,
  setAddFolderModalOpen,
  liveData,
  setLiveData,
}) {
  const queryClient = useQueryClient();
  const [selectedTreeKey, setSelectedTreeKey] = useState(null);

  const closeModal = () => {
    setSelectedTreeKey(null);
    setAddMediaToFolderModalOpen(false);
  };

  const {
    mutateAsync: updateMediaFolderStructure,
    isPending: isUpdateMediaFolderStructurePending,
  } = useUpdateMediaFolderStructure({
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
      setAddMediaToFolderModalOpen(false);
    },
    onError: (err) => axiosCatch(err),
  });

  const { mutate: addMediaToFolder, isPending } = useUpdateMedia({
    onSuccess: (_, variables) => {
      queryClient.setQueryData([QUERY_KEY.GET_ALL_MEDIA], (prev) => {
        // Early exit if no data exists
        if (!prev?.data?.data?.rows) {
          return prev;
        }

        // Use a shallow copy of prevData, only updating the necessary media object
        const mediaToChangeIndex = prev.data.data.rows.findIndex(
          (media) => media.id === +variables.mediaId,
        );

        if (mediaToChangeIndex > -1) {
          // Update only the necessary media item instead of cloning the entire rows array
          const updatedMedia = {
            ...prev.data.data.rows[mediaToChangeIndex],
            folderId: variables.folderId,
          };

          // Avoid cloning entire folder structure unless it's really needed
          const addedObject = {
            id: updatedMedia.id,
            name: updatedMedia.name,
            parentId: variables.folderId,
            type: "MEDIA",
            image: updatedMedia.image,
          };

          const currentFolderStructure = liveData?.data?.mediaFolder
            ? JSON.parse(liveData?.data?.mediaFolder)
            : [];

          // Update folder structure asynchronously (defer this update)
          updateMediaFolderStructure({
            mediaFolder: JSON.stringify(addChildNode(currentFolderStructure, addedObject)),
          }).then(() => {
            message.success("Media added to folder Successfully");
          });

          // Return the updated query data, only updating the necessary media item
          return {
            ...prev,
            data: {
              ...prev.data,
              data: {
                ...prev.data.data,
                rows: [
                  ...prev.data.data.rows.slice(0, mediaToChangeIndex),
                  updatedMedia, // Update the specific media item
                  ...prev.data.data.rows.slice(mediaToChangeIndex + 1),
                ],
              },
            },
          };
        }

        return prev; // If media item is not found, return the original data
      });

      // Close modal after immediate feedback
      setAddMediaToFolderModalOpen(false);
    },
  });

  const onSave = () => {
    addMediaToFolder({ mediaId: addMediaToFolderModalOpen, folderId: selectedTreeKey });
  };

  return (
    <Modal
      destroyOnClose={true}
      footer={false}
      closeIcon={false}
      open={addMediaToFolderModalOpen}
      onCancel={closeModal}
      centered>
      <Row align="middle" style={{ marginBlockEnd: "24px" }}>
        <Col flex={1}>
          <Row justify="center">
            <Typography.Title level={3} className="fz-14 fw-600">
              Select the folder to place the media
            </Typography.Title>
          </Row>
        </Col>

        <Col style={{ padding: "8px" }} className="clickable" onClick={closeModal}>
          <CloseSVG color="#000" />
        </Col>
      </Row>

      <FoldersTab
        liveData={liveData}
        setLiveData={setLiveData}
        selectedFolderKey={selectedTreeKey}
        setSelectedFolderKey={setSelectedTreeKey}
        addFolderModalOpen={addFolderModalOpen}
        setAddFolderModalOpen={setAddFolderModalOpen}
        setAddMediaToFolderModalOpen={setAddMediaToFolderModalOpen}
        fromAddMediaToFolderModal
      />

      <Row gutter={[12, 12]} justify="end" align="middle">
        <Col>
          <Button onClick={closeModal}>Cancel</Button>
        </Col>
        <Col>
          <Tooltip title={!selectedTreeKey ? "Select folder first" : ""}>
            <Button
              type="primary"
              disabled={!selectedTreeKey}
              onClick={onSave}
              loading={isPending || isUpdateMediaFolderStructurePending}>
              Add To Folder
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Modal>
  );
}
