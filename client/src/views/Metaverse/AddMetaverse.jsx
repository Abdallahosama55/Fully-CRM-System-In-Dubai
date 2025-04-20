import { Button, Col, Form, Image, Input, Row, Select, Typography } from "antd";
import Dragger from "antd/es/upload/Dragger";
import "./AddMetaverseStyle.css";
import {
  AirplaneSVG,
  SwimSVG,
  HatSVG,
  EventSVG,
  EntertainmentSVG,
  AlbumsSVG,
  ShoppingCartSVG,
} from "assets/jsx-svg";
import UploadSVG from "assets/jsx-svg/UploadSVG";
import { useNotification } from "context/notificationContext";
import { useEffect, useState } from "react";
import DimensionsService from "services/dimensions.service";
import { axiosCatch } from "utils/axiosUtils";

export default function AddMetaverse({ drowerClose, setVerseModalOpen, data, setDimensions, folderId }) {
  const [form] = Form.useForm();
  const [addLoading, setAddLoading] = useState(false);
  const [previewPic, setPreviewPic] = useState("");
  const [previewPicData, setPreviewPicData] = useState("");
  const { openMessage, openNotificationWithIcon } = useNotification();

  useEffect(() => {
    if (data) {
      (async () => {
        form.setFieldValue("name", data.name);
        form.setFieldValue("category", data.tag ? data.tag.split(",") : undefined);
        form.setFieldValue("description", data.description);
        form.setFieldValue("type", data.isHolomeet ? "Holomeet" : "Avatar");
        data.image && setPreviewPic(data.image);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onFinish = async (values) => {
    try {
      setAddLoading(true);
      if (values.name.includes("_")) {
        openNotificationWithIcon("info", "Underscore not allowed for dimension name");
        form.setFieldValue("name", "");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      if (data) {
        formData.append("id", data.id);
      }
      formData.append("tag", values.category);
      formData.append("description", values.description);
      formData.append("isHolomeet", values.type === "Holomeet");
      folderId && formData.append("folderId", folderId);
      previewPicData && formData.append("image", previewPicData);

      let res = null;
      if (data) {
        res = await DimensionsService.editDimension(formData);
        setDimensions((prev) => {
          const dimIndex = prev.findIndex((dim) => dim.id === res.data.data[1][0].id);
          prev[dimIndex] = res.data.data[1][0];
          return [...prev];
        });
        openNotificationWithIcon("success", "Dimension Added Successfully ✔");
      } else {
        res = await DimensionsService.addDimension(formData);
        setDimensions((prev) => [...prev, res.data.data]);
        openNotificationWithIcon("success", "Dimension Added Successfully ✔");
      }
      setVerseModalOpen({ open: false, id: null });
      drowerClose();
    } catch (err) {
      axiosCatch(err);
    } finally {
      setAddLoading(false);
    }
  };

  const props = {
    name: "file",
    multiple: false,
    action: false,
    maxCount: 1,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      const { status } = info.file;
      setPreviewPic(await getBase64(info.fileList[0].originFileObj));
      setPreviewPicData(info.fileList[0].originFileObj);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        openMessage({ type: "success", message: `${info.file.name} file uploaded successfully.` });
      } else if (status === "error") {
        openMessage({ type: "error", message: `${info.file.name} file upload failed.` });
      }
    },
    accept: "image/*",
    height: 192,
    style: { background: "#27294205", border: previewPic && "none" },
  };

  return (
    <Form requiredMark="optional" form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label={
          <span>
            Dimension Name
            <span style={{ color: "red", marginLeft: 4 }}>*</span>
          </span>
        }
        rules={[{ required: true, message: "Please Enter Dimension Name" }]}>
        <Input placeholder="Enter Here" />
      </Form.Item>

      <Form.Item
        name="type"
        label={
          <span>
            Type
            <span style={{ color: "red", marginLeft: 4 }}>*</span>
          </span>
        }
        rules={[{ required: "true", message: "Please Select Dimension Type" }]}
        initialValue={"Avatar"}>
        <Select
          placeholder="Select Type"
          options={[
            { label: "Avatar", value: "Avatar" },
            { label: "Holomeet", value: "Holomeet" },
          ]}
        />
      </Form.Item>

      <Form.Item name="category" label="Category">
        <Select placeholder="Select Category" mode="multiple">
          {categoryList.map((category) => (
            <Select.Option value={category.name} key={category.name}>
              <Row align="middle" wrap={false} gutter={[8, 0]}>
                <Col>
                  <Row align="middle">{category.icon}</Row>
                </Col>
                <Col>
                  <Typography.Text>{category.name}</Typography.Text>
                </Col>
              </Row>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={6} placeholder="Enter Description Heredddd" />
      </Form.Item>

      <Form.Item label="Dimension Photo" className="basic-info-upload-wraper">
        <Dragger showUploadList={false} {...props}>
          {previewPic && (
            <>
              <div className="basic-info-upload-img">
                <Image preview={false} src={previewPic} style={{ maxHeight: "100%" }} />
              </div>
            </>
          )}
          <div className="ant-upload-hint">
            <div className="basic-info-upload-icon">
              <UploadSVG />
            </div>
          </div>
          <p className="ant-upload-hint">Upload Photo</p>
          <p className="ant-upload-hint">Or Drag & Drop</p>
        </Dragger>
      </Form.Item>

      <Form.Item>
        <Row justify="end">
          <Button type="primary" htmlType="submit" loading={addLoading}>
            {data ? "Edit" : "Add"}
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
}

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

let categoryList = [
  {
    name: "Shopping",
    icon: <ShoppingCartSVG color="#2D2D2D" style={{ width: "16px", height: "16px" }} />,
  },
  {
    name: "Travel",
    icon: <AirplaneSVG color="#2D2D2D" />,
  },
  {
    name: "Gallery",
    icon: <AlbumsSVG color="#2D2D2D" />,
  },
  {
    name: "Sport",
    icon: <SwimSVG color="#2D2D2D" />,
  },
  {
    name: "Entertainment",
    icon: <EntertainmentSVG color="#2D2D2D" />,
  },
  {
    name: "Event",
    icon: <EventSVG color="#2D2D2D" />,
  },
  {
    name: "Education",
    icon: <HatSVG color="#2D2D2D" />,
  },
];
