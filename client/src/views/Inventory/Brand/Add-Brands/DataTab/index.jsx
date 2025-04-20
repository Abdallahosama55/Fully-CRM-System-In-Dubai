import { Form, Image, InputNumber, message, Row, Select, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

import { useBrandsContext } from "../bransContext";
import Dragger from "antd/es/upload/Dragger";
import { CloseSVG, ImageRegularSVG } from "assets/jsx-svg";
import BrandsService from "services/brands.service";
import AddCancelButtons from "components/common/AddCancelButtons";
import { useNotification } from "context/notificationContext";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function DataTab({
  resetTabs,
  setBrandsCount,
  setBrandsdata,
  onClose,
  setDisabled,
  data,
}) {
  const { openNotificationWithIcon } = useNotification();
  const [form] = useForm();
  const [previewPic, setPreviewPic] = useState("");
  const [previewPicData, setPreviewPicData] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { dataRef, getCurrentbrands, resetForms } = useBrandsContext();
  dataRef.current = form;

  const reset = () => {
    resetForms();
    resetTabs();

    window.scrollTo({ top: 0, left: 0 });
  };

  const onFinish = async (values) => {
    setDisabled(true);
    const currentbrandsInfo = getCurrentbrands();
    const formData = new FormData();

    previewPicData && formData.append("image", previewPicData);
    formData.append("brandTranslation", JSON.stringify(data.BrandTranslations));
    formData.append(
      "brandInfo",
      JSON.stringify({
        showStatus: currentbrandsInfo.data.brandsStatus === "Active",
        sortOrder: currentbrandsInfo.data.sortOrder,
      }),
    );

    setIsLoading(true);

    BrandsService.addBrand(formData).then(
      (data) => {
        setIsLoading(false);
        reset();
        onClose();
        setBrandsCount((prev) => prev + 1);
        setBrandsdata((prev) => [...prev, data.data.data.brand]);
        openNotificationWithIcon("success", "All good!");
        setDisabled(false);
      },
      () => {
        setIsLoading(false);
        openNotificationWithIcon("error", "Something wrong happend!");
      },
    );
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

      setPreviewPic(await getBase64(info?.fileList[0]?.originFileObj));
      setPreviewPicData(info?.fileList[0]?.originFileObj);
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: "image/*",
    height: 250,
    style: {
      background: "#fff",
      MinHeight: "250px",
      border: previewPic && "none",
    },
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical" name="data">
        <section className="general-form">
          <Form.Item className="upload-brands-img">
            <Form.Item
              name="brandsImage"
              getValueFromEvent={normFile}
              valuePropName="fileList"
              noStyle>
              <Dragger style={{ background: "#fff" }} showUploadList={false} {...props}>
                {previewPic && (
                  <>
                    <div className="basic-info-upload-img">
                      <Image preview={false} src={previewPic} style={{ maxHeight: "240px" }} />
                    </div>
                    <div
                      className="basic-info-upload-img-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewPic("");
                        form.setFieldValue("deskPic", undefined);
                      }}>
                      <CloseSVG />
                    </div>
                  </>
                )}
                <div className="ant-upload-hint">
                  <div>
                    <ImageRegularSVG />
                  </div>
                </div>
                <p className="fz-14 fw-500">Upload Photo</p>
                <p className="fz-12 fw-400">Or Drag & Drop</p>
              </Dragger>
            </Form.Item>
          </Form.Item>

          <Form.Item name="brandsStatus" label="Status">
            <Select placeholder="Select category status">
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Draft">Draft</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="sortOrder" label="Sort Order">
            <InputNumber className="w-100" min={0} placeholder="0" />
          </Form.Item>
        </section>

        <Form.Item>
          <Row justify="end">
            <AddCancelButtons
              cancel={onClose}
              addName="Finish"
              addLoading={isLoading}
              add={() => form.submit()}
            />
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
