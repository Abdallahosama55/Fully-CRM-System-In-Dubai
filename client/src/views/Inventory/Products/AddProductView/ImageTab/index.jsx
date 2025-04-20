import { Form, Row, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { ImageRegularSVG } from "assets/jsx-svg";
import { useState } from "react";
import CommonService from "services/common.service";
import checkFileds from "utils/checkFields";
import { useNotification } from "context/notificationContext";
import AddCancelButtons from "components/common/AddCancelButtons";

export default function ImageTab({ setFormActiveTabs, setTabActiveKey, setData, onClose }) {
  const [form] = useForm();
  const [files, setFiles] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openMessage } = useNotification();
  const { openNotificationWithIcon } = useNotification();

  const onFinish = (values) => {
    if (files.length === 0) {
      openNotificationWithIcon(
        "error",
        "Would it be possible to consider including at least one image?",
      );
      return;
    }
    let images = [];
    setLoading(true);
    files?.forEach((file) => {
      const formData = new FormData();
      formData.append("image", file.originFileObj);

      file.originFileObj &&
        CommonService.uploadImage(formData)
          .then(({ data }) => {
            images.push(data.uploadedFiles.image);
          })
          .then(() => {
            setData((prev) => ({ ...prev, images }));
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            openNotificationWithIcon("error", "Something  wrong");
          });
    });
    setLoading(false);
    setFormActiveTabs((prev) => [...prev, "3DModel"]);
    setTabActiveKey("5");
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props = {
    name: "file",
    multiple: true,
    accept: "image/*",
    onChange(info) {
      const { status } = info.file;

      if (status === "uploading") {
        setLoading(true);
      }

      if (status === "done") {
        openMessage({ type: "success", message: `${info.file.name} file uploaded successfully.` });
        setImageData(info);
        setTimeout(() => {
          setFiles((prev) => [...prev, info.file]);
          setLoading(false);
        }, 300);
      } else if (status === "error") {
        openMessage({ type: "error", message: `${info.file.name} file upload failed.` });
      } else if (status === "removed") {
        setFiles((prev) => prev.filter((prevFile) => info.file.uid !== prevFile.uid));
      }
    },
    listType: "picture",
    style: { background: "#fff" },
    height: "286px",
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className="general-form">
      <div>
        <Form.Item
          rules={[{ required: true }]}
          label="Images"
          getValueFromEvent={normFile}
          valuePropName="fileList"
          className="custom-upload">
          <Upload.Dragger {...props} customRequest={dummyRequest}>
            <p className="ant-upload-drag-icon">
              <ImageRegularSVG />
            </p>
            <p className="fz-14 fw-500">Upload File </p>
            <div className="fz-12 gc"> or drag and drop</div>
          </Upload.Dragger>
        </Form.Item>
        {/* <Row gutter={[16, 16]} wrap={false} style={{ overflowX: "auto" }}>
          {files?.map((file) => (
            <Col key={file.uid}>
              <Image
                src={file.thumbUrl || "https://via.placeholder.com/150"}
                width={100}
                height={100}
              />
              <span
                className="delete-img-btn"
                onClick={() =>
                  setFiles((prev) =>
                    prev.filter((prevFile) => file.uid !== prevFile.uid),
                  )
                }
              >
                <CloseOutlined />
              </span>
            </Col>
          ))}
        </Row> */}
      </div>
      <div>
        <Form.Item>
          <Row justify="end" className="mt-1">
            <AddCancelButtons
              htmlType="submit"
              addLoading={loading}
              add={() => checkFileds(form)}
              cancel={onClose}
              addName="Next"
            />
          </Row>
        </Form.Item>
      </div>
    </Form>
  );
}
