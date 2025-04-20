import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import {
  CinemaSVG,
  CloseSVG,
  DocumentSVG,
  FolderColoredSVG,
  ImagesSVG,
  OverlaySVG,
  SoundWavesSVG,
} from "assets/jsx-svg";
import { useState } from "react";
import VverseMediaService from "services/VverseMedia/vverse-media.service";
import { axiosCatch } from "utils/axiosUtils";
import BrowseFolders from "./BrowseFolders";

export default function MediaAddModal({ isOpen, setIsOpen, refetchMedia }) {
  const [form] = Form.useForm();
  const [addLoading, setAddLoading] = useState(false);
  const [folderOptions, setFolderOptions] = useState([]);

  const fileType = Form.useWatch("fileType", form);
  const folderId = Form.useWatch("folderId", form);

  const onFinish = async (values) => {
    try {
      setAddLoading(true);
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      if (
        fileType === "doc" &&
        (values.file.fileList[0].originFileObj.type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
          values.file.fileList[0].originFileObj.type === "application/vnd.ms-powerpoint")
      ) {
        formData.append("type", "powerpoint");
      } else if (fileType === "doc" && values.file.fileList[0].originFileObj.type.includes("pdf")) {
        formData.append("type", "pdf");
      } else {
        formData.append("type", fileType);
      }
      formData.append("file", values.file.fileList[0].originFileObj);
      formData.append("image", values.cover?.fileList[0].originFileObj);
      if (values?.folderId) {
        formData.append("folderId", values?.folderId);
      }

      const res = await VverseMediaService.add(formData);

      if (res.data.data) {
        refetchMedia();
        handleCancel();
      }
    } catch (err) {
      axiosCatch(err);
    } finally {
      setAddLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const handleFolderSelected = (selection) => {
    form.setFieldValue("folderId", selection?.path?.[selection?.path.length - 1]?.id);
    setFolderOptions(
      selection?.path?.map((folder) => ({ label: folder.name, value: folder.id })) ?? [],
    );
  };

  const handleClearFolderId = () => {
    form.setFieldValue("folderId", undefined);
    setFolderOptions([]);
  };

  return (
    <Modal
      destroyOnClose
      footer={false}
      closeIcon={false}
      open={isOpen}
      onCancel={handleCancel}
      width={700}
      centered>
      <Row>
        <Col flex={1} style={{ display: "flex", alignItems: "center" }}>
          <Row>
            <Typography.Title level={3} className="fz-14 fw-600">
              Upload Media
            </Typography.Title>
          </Row>
        </Col>
        <Col style={{ padding: "8px" }} className="clickable" onClick={handleCancel}>
          <CloseSVG color="#000" />
        </Col>
      </Row>
      <Divider style={{ margin: 0, marginBottom: 16 }} />
      <Form form={form} onFinish={onFinish} layout="vertical" requiredMark>
        <Form.Item
          name="fileType"
          label="Choose what you want to upload"
          rules={[
            {
              required: true,
            },
          ]}>
          <Radio.Group defaultValue="audio">
            <Radio value="audio">
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <SoundWavesSVG width={14} height={14} /> Audio
              </span>
            </Radio>
            <Radio value="image">
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ImagesSVG width={14} height={14} /> Photo
              </span>
            </Radio>
            <Radio value="video">
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CinemaSVG width={14} height={14} /> Video
              </span>
            </Radio>
            <Radio value="overlay">
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <OverlaySVG width={14} height={14} /> Overlay
              </span>
            </Radio>
            <Radio value="doc">
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <DocumentSVG width={14} height={14} /> Document
              </span>
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={fileType === "image" ? 24 : 12}>
            <Form.Item
              name="file"
              label={fileType !== "image" && "File"}
              rules={[
                {
                  required: true,
                  message: "Please upload file",
                },
              ]}>
              <Upload.Dragger
                maxCount={1}
                beforeUpload={() => false}
                action={false}
                accept={
                  fileType === "video"
                    ? "video/*"
                    : fileType === "image"
                    ? "image/*"
                    : fileType === "audio"
                    ? "audio/*"
                    : fileType === "doc"
                    ? ".ppt,.pptx,.pdf"
                    : ""
                }
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
          {fileType !== "image" && (
            <Col xs={24} lg={12}>
              <Form.Item name="cover" label="Cover">
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
          )}
        </Row>
        <Form.Item
          name="name"
          label="File Name"
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}>
          <Input placeholder="write here" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea style={{ resize: "none" }} rows={3} placeholder="write here" />
        </Form.Item>
        <Form.Item name="folderId" label="Choose where to save this file (optional)">
          <BrowseFolders onFolderSelected={handleFolderSelected}>
            <Select
              allowClear
              placeholder="Select folder"
              value={folderId}
              options={folderOptions}
              popupClassName="d-none"
              className="w-100"
              labelRender={(label) => (
                <Space>
                  <FolderColoredSVG width={14} height={14} />
                  <span>{label.label}</span>
                </Space>
              )}
              onClear={handleClearFolderId}
            />
          </BrowseFolders>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col xs={24}>
              <Button className="w-100" type="primary" htmlType="submit" loading={addLoading}>
                Save
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}
