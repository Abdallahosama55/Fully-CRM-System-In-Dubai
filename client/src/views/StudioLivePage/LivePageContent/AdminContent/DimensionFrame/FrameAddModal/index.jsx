import { Button, Col, Form, Input, message, Modal, Row, Select, Typography, Upload } from "antd";

import { CloseSVG } from "assets/jsx-svg";
import { useEffect, useMemo, useState } from "react";
import useAddFrameFolder from "services/DiemnsionsFolders/Mutations/useAddFrameFolder";
import useUpdateFrameFolderStructure from "services/DiemnsionsFolders/Mutations/useUpdateFrameFolderStructure";
import { axiosCatch } from "utils/axiosUtils";
import { addChildNode, flattenFolder } from "../../../untils";

export default function FrameAddModal({
  addFrameModalOpen,
  setAddFrameModalOpen,
  liveData,
  setLiveData,
}) {
  const [form] = Form.useForm();
  const [folders, setFolders] = useState([]);

  const frameFolder = useMemo(() => {
    return liveData?.data.frameFolder ? JSON.parse(liveData?.data.frameFolder) : [];
  }, [liveData]);

  useEffect(() => {
    if (frameFolder) {
      setFolders(flattenFolder(frameFolder).filter((folder) => folder.type === "FOLDER"));
    }
  }, [frameFolder]);

  const addFolderMutation = useAddFrameFolder({
    onSuccess: (data, varibles) => {
      const addedObject = {
        id: data.data.data.id,
        name: varibles.get("name"),
        parentId: varibles.get("parentId") ? +varibles.get("parentId") : null,
        type: "FOLDER",
        image: data.data.data.image,
        companyId: liveData?.data.companyId,
      };

      const dataWithNewObject = addChildNode(frameFolder, addedObject);

      updateFrameFolderStructureMutation.mutate({
        eventId: liveData?.data?.id,
        frameFolder: JSON.stringify(dataWithNewObject),
      });
    },
    onError: (err) => axiosCatch(err),
  });

  const updateFrameFolderStructureMutation = useUpdateFrameFolderStructure({
    onSuccess: (_, variables) => {
      setLiveData((prev) => {
        prev.data.frameFolder = variables.frameFolder;
        return {
          ...prev,
        };
      });
      message.success("Folder Created Successfully");
      setAddFrameModalOpen(false);
    },
    onError: (err) => axiosCatch(err),
  });

  const onFinish = async (values) => {
    const formData = new FormData();

    formData.append("name", values.name);
    values.parentId && formData.append("parentId", values.parentId);
    formData.append("image", values.file?.fileList[0].originFileObj);

    addFolderMutation.mutate(formData);
    form.resetFields();
  };
  return (
    <Modal
      destroyOnClose={true}
      footer={false}
      closeIcon={false}
      open={addFrameModalOpen}
      onCancel={() => {
        form.resetFields();
        setAddFrameModalOpen(false);
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
          onClick={() => setAddFrameModalOpen(false)}>
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
            <Form.Item name="file" label={"Image"}>
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
              <Button className="w-100" onClick={() => setAddFrameModalOpen(false)}>
                Cancel
              </Button>
            </Col>
            <Col xs={24} lg={12}>
              <Button
                className="w-100"
                type="primary"
                htmlType="submit"
                loading={addFolderMutation.isPending}>
                Done
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}
