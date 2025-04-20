import { useState } from "react";
import { Button, Col, message, Modal, Row, Tooltip, Typography } from "antd";
import { useQueryClient } from "@tanstack/react-query";

import { CloseSVG } from "assets/jsx-svg";
import FramesFolders from "../FramesFolders";
import { axiosCatch } from "utils/axiosUtils";
import { addChildNode } from "views/StudioLivePage/LivePageContent/untils";
import useAddFrameToFolder from "services/DiemnsionsFrames/Mutations/useAddFrameToFolder";
import useUpdateFrameFolderStructure from "services/DiemnsionsFolders/Mutations/useUpdateFrameFolderStructure";

export default function AddFrameToFolderModal({
  addFrameToFolderModalOpen,
  setAddFrameToFolderModalOpen,
  setAddFrameModalOpen,
  liveData,
  setLiveData,
  listDiemnsionFramesQuery,
}) {
  const queryClient = useQueryClient();
  const [selectedTreeKey, setSelectedTreeKey] = useState(null);

  const closeModal = () => {
    setSelectedTreeKey(null);
    setAddFrameToFolderModalOpen(false);
  };

  const { mutate: updateFrameFolderStructure, isPending: isUpdateFrameFolderStructurePending } =
    useUpdateFrameFolderStructure({
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

  const { mutate: addFrameToFolder, isPending } = useAddFrameToFolder({
    onSuccess: (_, variables) => {
      queryClient.setQueryData(listDiemnsionFramesQuery.queryKey, (prev) => {
        if (!prev?.data?.data) {
          return prev;
        }

        const prevData = [...prev.data.data]; // Make a shallow copy of prevData
        const frameToChangeIndex = prevData.findIndex((frame) => frame.id === +variables.frameId);

        if (frameToChangeIndex > -1) {
          // Update the folderId of the frame
          prevData[frameToChangeIndex] = {
            ...prevData[frameToChangeIndex],
            folderId: variables.folderId,
          };

          const addedObject = {
            id: prevData[frameToChangeIndex].id,
            name: prevData[frameToChangeIndex].name,
            parentId: variables.folderId,
            type: "FRAME",
            image: prevData[frameToChangeIndex].image,
          };

          const currentFolderStructure = liveData?.data?.frameFolder
            ? JSON.parse(liveData?.data?.frameFolder)
            : [];

          // Get the updated folder structure
          const updatedFolderStructure = addChildNode(currentFolderStructure, addedObject);

          updateFrameFolderStructure({
            eventId: liveData?.data?.id,
            frameFolder: JSON.stringify(updatedFolderStructure),
          });

          message.success("Frame added to folder Successfully");
          setAddFrameToFolderModalOpen(false);

          return {
            ...prev,
            data: {
              ...prev.data,
              data: prevData, // Update prevData immutably
            },
          };
        }

        return prev;
      });
    },
  });
  const onSave = () => {
    addFrameToFolder({ frameId: addFrameToFolderModalOpen, folderId: selectedTreeKey });
  };

  return (
    <Modal
      destroyOnClose={true}
      footer={false}
      closeIcon={false}
      open={addFrameToFolderModalOpen}
      onCancel={closeModal}
      centered>
      <Row align="middle" style={{ marginBlockEnd: "24px" }}>
        <Col flex={1}>
          <Row justify="center">
            <Typography.Title level={3} className="fz-14 fw-600">
              Select the folder to place the frame
            </Typography.Title>
          </Row>
        </Col>

        <Col style={{ padding: "8px" }} className="clickable" onClick={closeModal}>
          <CloseSVG color="#000" />
        </Col>
      </Row>

      <FramesFolders
        liveData={liveData}
        setLiveData={setLiveData}
        listDiemnsionFramesQuery={listDiemnsionFramesQuery}
        selectedTreeKey={selectedTreeKey}
        setSelectedTreeKey={setSelectedTreeKey}
        addFrameToFolderModalOpen={addFrameToFolderModalOpen}
        setAddFrameToFolderModalOpen={setAddFrameToFolderModalOpen}
        setAddFrameModalOpen={setAddFrameModalOpen}
        fromAddFrameToFolderModal
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
              loading={isPending || isUpdateFrameFolderStructurePending}>
              Add To Folder
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Modal>
  );
}
