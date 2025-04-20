import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import { Col, Form, Image, Row, Upload, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { ImageRegularSVG } from "assets/jsx-svg";
import AddCancelButtons from "components/common/AddCancelButtons";
import AddProductButton from "components/common/AddProductButton";
import { useNotification } from "context/notificationContext";
import { useEffect, useState } from "react";
import CommonService from "services/common.service";
import checkFileds from "utils/checkFields";

export default function ImageTab({
  setFormActiveTabs,
  setTabActiveKey,
  productData,
  setProductData,
  onClose,
}) {
  const { openMessage } = useNotification();
  const [form] = useForm();
  const [files, setFiles] = useState([]);
  const [getImg, setGetImg] = useState([]);
  const [loading, setLoading] = useState({ addImages: false, getImages: false });

  const { openNotificationWithIcon } = useNotification();

  useEffect(() => {
    setGetImg(productData.productVariants[0]?.images || []);
  }, [productData.productVariants]);

  const onFinish = (values) => {
    if (productData.productVariants[0].images.length === 0) {
      openNotificationWithIcon(
        "error",
        "Would it be possible to consider including at least one image?",
      );
      return;
    }
    setLoading({ addImages: true, getImages: false });
    let uploadedImages = files.filter((file) => file.name) || [];

    let images = [],
      promises = [];

    uploadedImages.forEach((file) => {
      const formData = new FormData();
      formData.append("image", file.originFileObj);

      promises.push(
        CommonService.uploadImage(formData)
          .then(({ data }) => {
            images.push(data.uploadedFiles.image);
          })
          .catch((err) => {
            console.log(err);
            setLoading({ addImages: false, getImages: false });
            openNotificationWithIcon("error", "Something  wrong");
          }),
      );
    });

    Promise.allSettled(promises).then(() => {
      let newImages = files.filter((file) => !file.name);
      newImages = newImages.map((image) => image.thumbUrl);
      setProductData((prev) => ({
        ...prev,
        images: [...getImg, ...newImages, ...images],
      }));

      setFormActiveTabs((prev) => [...prev, "3DModel"]);
      setTabActiveKey("5");
      setLoading({ addImages: false, getImages: false });
      window.scrollTo({
        top: 10,
        left: 10,
        behavior: "smooth",
      });
    });
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const props = {
    defaultFileList: productData.productVariants[0].images.map((image) => {
      return {
        uid: image,
        thumbUrl: image,
        url: image,
        name: (
          <Typography.Text ellipsis style={{ maxWidth: "150px" }}>
            {image}
          </Typography.Text>
        ),
      };
    }),
    name: "file",
    multiple: true,
    accept: "image/*",
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        setLoading({ addImages: true, getImages: false });
      }

      if (status === "done") {
        openMessage({ type: "success", message: `${info.file.name} file uploaded successfully.` });
        setTimeout(() => {
          setFiles((prev) => [...prev, info.file]);
          setLoading({ addImages: false, getImages: false });
        }, 300);
      } else if (status === "error") {
        openMessage({ type: "error", message: `${info.file.name} file upload failed.` });
      } else if (status === "removed") {
        setFiles((prev) => prev.filter((prevFile) => info.file.uid !== prevFile.uid));
        setGetImg((prev) => prev.filter((prevFile) => info.file.uid !== prevFile));
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
          label="Images"
          getValueFromEvent={normFile}
          valuePropName="fileList"
          className="custom-upload">
          <Upload.Dragger {...props} customRequest={dummyRequest} onRemove={(e) => console.log(e)}>
            <p className="ant-upload-drag-icon">
              <ImageRegularSVG />
            </p>
            <p className="fz-14 fw-500">Upload File </p>
            <div className="fz-12 gc"> or drag and drop</div>
          </Upload.Dragger>
        </Form.Item>
      </div>
      <div>
        <Form.Item>
          <Row justify="end" className="mt-1">
            <AddCancelButtons
              addName="Next"
              cancel={onClose}
              addLoading={loading.addImages}
              htmlType="submit"
              add={() => checkFileds(form)}
            />
          </Row>
        </Form.Item>
      </div>
    </Form>
  );
}
