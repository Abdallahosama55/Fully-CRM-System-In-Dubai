import { useState, useContext } from "react";
import { Avatar, Button, Col, Form, Input, message, Modal, Row, Upload } from "antd";
import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

import userContext from "context/userContext";
import PostsService from "services/posts.service";
import { axiosCatch } from "utils/axiosUtils";
import { UploadOutlined } from "@ant-design/icons";
import { stringAvatar } from "utils/string";

import "./styles.css";

const array_of_allowed_file_types = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "video/mp4",
  "video/mov",
  "video/quicktime",
];

export default function CreatePhotoVideoPost({ setPostsList }) {
  const [form] = useForm();
  const { user } = useContext(userContext);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const { communityId } = useParams();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (file.type.includes("video")) {
      const videoURL = URL.createObjectURL(file.originFileObj);
      window.open(videoURL, "_blank");
    } else {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    }
  };

  const handleChange = ({ fileList }) => {
    setUploadedFiles(fileList);
  };

  const beforeUpload = (file) => {
    const isAllowedFileType = array_of_allowed_file_types.includes(file.type);
    if (!isAllowedFileType) {
      message.error("You can only upload JPG/PNG/JPEG/GIF/MP4/MOV files!");
      return Upload.LIST_IGNORE;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("File must be smaller than 10MB!");
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div className="mt-8">Upload</div>
    </div>
  );

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("description", values.description || "");
      uploadedFiles.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
      const res = await PostsService.createPost({ communityId, formData });
      setPostsList((prev) => [
        {
          ...res.data.data,
          communityPostLikes: [],
          account: {
            fullName: user.fullName,
            profileImage: user.profileImage,
          },
          comment: [],
        },
        ...prev,
      ]);
    } catch (err) {
      axiosCatch(err);
    } finally {
      setLoading(false);
      form.resetFields();
      setUploadedFiles([]);
    }
  };

  return (
    <>
      <Form form={form} name="post" onFinish={onFinish}>
        <Row gutter={[6, 0]} align="top" justify="space-between" style={{ paddingBottom: "1rem" }}>
          <Col>
            <Avatar
              size={45}
              src={user?.profileImage}
              {...(user?.profileImag ? {} : { ...stringAvatar(user?.fullName) })}
              style={{ objectFit: "cover" }}
            />
          </Col>

          <Col flex="1">
            <Row gutter={8} justify="space-between">
              <Col xs={24}>
                <Form.Item name="description">
                  <Input.TextArea
                    rows={3}
                    className="postInput"
                    placeholder="Try mix reality lens"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Post
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Form form={form} name="edit-post" onFinish={onFinish}>
        <Form.Item name="files" style={{ paddingInlineStart: "50px" }}>
          <Upload
            multiple={true}
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={uploadedFiles}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}>
            {uploadedFiles.length >= 20 ? null : uploadButton}
          </Upload>
        </Form.Item>

        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </Form>
    </>
  );
}
