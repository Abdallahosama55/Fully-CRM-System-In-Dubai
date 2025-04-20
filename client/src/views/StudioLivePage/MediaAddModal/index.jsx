import { useState } from "react";
import { Button, Col, Form, Input, message, Modal, Row, Typography, Upload } from "antd";

import { AudioSVG, CloseSVG, DocsSVG, GallerySVG, VideosSVG } from "assets/jsx-svg";

import "./styles.css";
import VverseMediaService from "services/VverseMedia/vverse-media.service";
import { axiosCatch } from "utils/axiosUtils";

const tabs = [
  { id: "image", label: "Photos", icon: GallerySVG, children: "" },
  { id: "video", label: "Videos", icon: VideosSVG, children: "" },
  { id: "audio", label: "Audio", icon: AudioSVG, children: "" },
  { id: "doc", label: "Docs", icon: DocsSVG, children: "" },
];

export default function MediaAddModal({ addMediaModalOpen, setAddMediaModalOpen, setMedia }) {
  const [form] = Form.useForm();
  const [addLoading, setAddLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("image");

  const onFinish = async (values) => {
    if (addMediaModalOpen) {
      try {
        setAddLoading(true);
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        if (
          activeTab === "doc" &&
          (values.file.fileList[0].originFileObj.type ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
            values.file.fileList[0].originFileObj.type === "application/vnd.ms-powerpoint")
        ) {
          formData.append("type", "powerpoint");
        } else if (
          activeTab === "doc" &&
          values.file.fileList[0].originFileObj.type.includes("pdf")
        ) {
          formData.append("type", "pdf");
        } else {
          formData.append("type", activeTab);
        }
        formData.append("file", values.file.fileList[0].originFileObj);
        formData.append("image", values.cover?.fileList[0].originFileObj);

        const res = await VverseMediaService.add(formData);

        if (res.data.data) {
          setMedia((prev) => [res.data.data, ...prev]);
          setAddMediaModalOpen(false);
        }

        message.success("Media uploaded successfully");
      } catch (err) {
        console.log("Err", err);
        axiosCatch(err);
      } finally {
        setAddLoading(false);
      }
    }
  };

  return (
    <Modal
      rootClassName="media-add-modal"
      destroyOnClose={true}
      footer={false}
      closeIcon={false}
      open={addMediaModalOpen}
      onCancel={() => {
        form.resetFields();
        setAddMediaModalOpen(false);
      }}
      centered>
      <Row align="middle" style={{ marginBlockEnd: "12px" }}>
        <Col flex={1}>
          <Row justify="center">
            <Typography.Title level={3} className="fz-14 fw-600">
              Uploaded Media {activeTab}
            </Typography.Title>
          </Row>
        </Col>

        <Col
          style={{ padding: "8px" }}
          className="clickable"
          onClick={() => setAddMediaModalOpen(false)}>
          <CloseSVG color="#000" />
        </Col>
      </Row>

      <Row wrap={false} gutter={[8, 0]} style={{ overflowX: "auto", marginBlockEnd: "12px" }}>
        {tabs.map((tab) => (
          <Col key={tab.id}>
            <Button
              onClick={() => {
                setActiveTab(tab.id);
              }}
              type="text"
              className={`dimension-files-tab ${activeTab === tab.id ? "active" : ""}`}>
              <Row wrap={false} gutter={[6, 0]} align="middle">
                <Col>
                  <Row align="middle">
                    <tab.icon width="14px" height="14px" />
                  </Row>
                </Col>
                <Col>{tab.label}</Col>
              </Row>
            </Button>
          </Col>
        ))}
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
        <Form.Item name="description" label="Description">
          <Input.TextArea style={{ resize: "none" }} rows={3} placeholder="write here" />
        </Form.Item>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={activeTab === "image" ? 24 : 12}>
            <Form.Item
              name="file"
              label={activeTab !== "image" && "File"}
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
                  activeTab === "video"
                    ? "video/*"
                    : activeTab === "image"
                    ? "image/*"
                    : activeTab === "audio"
                    ? "audio/*"
                    : activeTab === "doc"
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
          {activeTab !== "image" && (
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

        <Form.Item>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Button className="w-100" onClick={() => setAddMediaModalOpen(false)}>
                Cancel
              </Button>
            </Col>
            <Col xs={24} lg={12}>
              <Button className="w-100" type="primary" htmlType="submit" loading={addLoading}>
                Done
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}
