import { useState } from "react";
import {
  Button,
  Input,
  Form,
  message,
  Row,
  Typography,
  Upload,
  Modal,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined } from "@ant-design/icons";
import PostsService from "services/posts.service";
import { useEffect } from "react";
import { axiosCatch } from "utils/axiosUtils";

const array_of_allowed_file_types = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];

export default function EditPost({
  id,
  postImages,
  postDescription,
  closeModal,
  setPostsList,
}) {
  const [form] = useForm();
  const [isFilesSet, setIsFilesSet] = useState(false);
  const [addedFiles, setAddedFiles] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    );
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);

    setAddedFiles(
      fileList.filter((file) => {
        if (file.url) {
          return false;
        }
        return true;
      }),
    );
  };

  useEffect(() => {
    if (!isFilesSet) {
      form.setFieldValue("postDescription", postDescription);
      if (postImages.length > 0) {
        setFileList([
          ...fileList,
          ...postImages.map((file, index) => {
            return {
              uid: index + 1,
              name: "image.png",
              status: "done",
              url: file,
            };
          }),
        ]);
      }
      setIsFilesSet(true);
    }
  }, [fileList, form, isFilesSet, postDescription, postImages]);

  const beforeUpload = (file) => {
    const isJpgOrPng = array_of_allowed_file_types.includes(file.type);
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG/JPEG/GIF file!");
      return Upload.LIST_IGNORE;
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error("Image must be smaller than 3MB!");
      return Upload.LIST_IGNORE;
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleRemove = (file) => {
    if (file.url) {
      setDeletedImages((prev) => [...prev, file.uid - 1]);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="mt-8">Upload</div>
    </div>
  );

  const onFinish = (values) => {
    setEditLoading(true);
    const formData = new FormData();
    formData.append("description", values.postDescription);
    if (addedFiles.length > 0) {
      addedFiles.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
    }
    formData.append("deletedImages", JSON.stringify(deletedImages));

    PostsService.editPost(id, formData)
      .then(({ data }) => {
        setPostsList((prev) => {
          const postIndex = prev.findIndex((post) => post.id === id);
          let copy = [...prev];
          copy[postIndex].description = values.postDescription;
          // to-do get the return data from api
          copy[postIndex].files = data.data[1][0].files;
          return [...copy];
        });
        setEditLoading(false);
        closeModal();
      })
      .catch((err) => {
        setEditLoading(false);
        axiosCatch(err);
      });
  };

  return (
    <>
      <Typography.Title level={2} style={{ marginBottom: "1rem" }}>
        Edit post
      </Typography.Title>
      <Form form={form} name="edit-post" onFinish={onFinish}>
        <Form.Item name="postDescription">
          <Input.TextArea
            rows={5}
            placeholder="Post description"
            style={{ marginBottom: "20px" }}
          />
        </Form.Item>
        <Form.Item name="files">
          <Upload
            customRequest={dummyRequest}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            onRemove={handleRemove}
          >
            {fileList.length >= 20 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Row justify="end" style={{ marginTop: "20px" }}>
          <Button type="primary" htmlType="submit" loading={editLoading}>
            Save
          </Button>
        </Row>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
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
