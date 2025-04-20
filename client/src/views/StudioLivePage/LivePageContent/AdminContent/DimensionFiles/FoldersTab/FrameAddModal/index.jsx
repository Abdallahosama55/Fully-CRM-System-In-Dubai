import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Input, message, Modal, Row, Select, Typography, Upload } from "antd";

import useAddMediaFolder from "services/VverseMedia/Mutations/useAddMediaFolder";
import useUpdateMediaFolderStructure from "services/VverseMedia/Mutations/useUpdateMediaFolderStructure";
import { addChildNode, flattenFolder } from "views/StudioLivePage/LivePageContent/untils";
import { axiosCatch } from "utils/axiosUtils";
import { CloseSVG } from "assets/jsx-svg";

export default function FrameAddModal({
  addFolderModalOpen,
  setAddFolderModalOpen,
  liveData,
  setLiveData,
}) {
  const [form] = Form.useForm();
  const [folders, setFolders] = useState([]);

  const mediaFolder = useMemo(() => {
    return liveData?.data.mediaFolder ? JSON.parse(liveData?.data.mediaFolder) : [];
  }, [liveData]);

  useEffect(() => {
    if (mediaFolder) {
      setFolders(flattenFolder(mediaFolder).filter((folder) => folder.type === "FOLDER"));
    }
  }, [mediaFolder]);

  const addMediaFolderMutation = useAddMediaFolder({
    onSuccess: (data, varibles) => {
      const addedObject = {
        id: data.data.data.id,
        name: varibles.get("name"),
        parentId: varibles.get("parentId") ? +varibles.get("parentId") : null,
        type: "FOLDER",
        image: data.data.data.image,
        companyId: liveData?.data.companyId,
      };

      const dataWithNewObject = addChildNode(mediaFolder, addedObject);
      updateFrameFolderStructureMutation.mutate({
        mediaFolder: JSON.stringify(dataWithNewObject),
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const updateFrameFolderStructureMutation = useUpdateMediaFolderStructure({
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
      message.success("Folder Created Successfully");
      setAddFolderModalOpen(false);
    },
    onError: (err) => axiosCatch(err),
  });

  const onFinish = async (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    values.parentId && formData.append("parentId", values.parentId);
    formData.append("image", values.file?.fileList[0].originFileObj);

    addMediaFolderMutation.mutate(formData);
    form.resetFields();
  };
  return (
    <Modal
      destroyOnClose={true}
      footer={false}
      closeIcon={false}
      open={addFolderModalOpen}
      onCancel={() => {
        form.resetFields();
        setAddFolderModalOpen(false);
      }}
      centered>
      <Row align="middle" style={{ marginBlockEnd: "24px" }}>
        <Col flex={1}>
          <Row justify="center">
            <Typography.Title level={3} className="fz-14 fw-600">
              Create Folder
            </Typography.Title>
          </Row>
        </Col>

        <Col
          style={{ padding: "8px" }}
          className="clickable"
          onClick={() => setAddFolderModalOpen(false)}>
          <CloseSVG color="#000" />
        </Col>
      </Row>

      <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}>
          <Input placeholder="write here" />
        </Form.Item>
        <Form.Item name="parentId" label="Parent Folder">
          <Select
            options={folders?.map((folder) => ({
              label: folder.name,
              value: folder.id,
            }))}
            allowClear
          />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={24}>
            <Form.Item name="file" label={"image"}>
              <Upload.Dragger
                maxCount={1}
                beforeUpload={() => false}
                action={false}
                accept={"image/*"}
                style={{
                  background: "#F2F2F7",
                  borderRadius: "14px",
                  minHeight: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                  }}>
                  <Typography.Text className="gc fz-12">
                    <span className="fz-14">+</span> Upload Media
                  </Typography.Text>
                </div>
              </Upload.Dragger>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Button className="w-100" onClick={() => setAddFolderModalOpen(false)}>
                Cancel
              </Button>
            </Col>
            <Col xs={24} lg={12}>
              <Button
                className="w-100"
                type="primary"
                htmlType="submit"
                loading={addMediaFolderMutation.isPending}>
                Done
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}
