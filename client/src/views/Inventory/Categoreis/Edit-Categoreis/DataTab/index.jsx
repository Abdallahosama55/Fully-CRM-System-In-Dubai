import { Form, Image, InputNumber, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useMemo, useState } from "react";

import { useCategoriesContext } from "../categoriesContext";
import Dragger from "antd/es/upload/Dragger";
import { CloseSVG, ImageRegularSVG } from "assets/jsx-svg";
import CategoryService from "services/category.service";
import AddCancelButtons from "components/common/AddCancelButtons";
import { useNotification } from "context/notificationContext";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function DataTab({ resetTabs, setRefresh, onClose, categoreisdata }) {
  const { openNotificationWithIcon, openMessage } = useNotification();
  const [form] = useForm();
  const [previewPic, setPreviewPic] = useState(categoreisdata.image ? categoreisdata.image : "");
  const [previewPicData, setPreviewPicData] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [categoreisParentdata, setCategoreisParentdata] = useState([]);

  const { data } = useCategoriesContext();

  const reset = () => {
    resetTabs();

    window.scrollTo({ top: 0, left: 0 });
  };
  const onFinish = async (values) => {
    const formData = new FormData();
    previewPicData && formData.append("image", previewPicData);

    formData.append("deleteImage", previewPic === "" ? true : false);
    formData.append("categoryTranslation", JSON.stringify(data.categoryTranslation));
    formData.append(
      "categoryInfo",
      JSON.stringify({
        showStatus: values.categoreisStatus === "Active",
        sortOrder: values.sortOrder,
        parent:
          typeof values.parent === "string"
            ? categoreisdata.parentCategoryId
            : values.parent
            ? values.parent
            : null,
      }),
    );

    setIsLoading(true);

    CategoryService.editCategory(categoreisdata.id, formData).then(
      () => {
        setIsLoading(false);
        reset();
        onClose();
        setRefresh((prev) => !prev);
        openNotificationWithIcon("success", "All good!");
      },
      () => {
        setIsLoading(false);
        openNotificationWithIcon("error", "Something wrong happend!");
      },
    );
  };

  useEffect(() => {
    function getWarehouses() {
      setIsLoading(true);
      CategoryService.search(true).then(
        (res) => {
          setIsLoading(false);
          const categories = res.data.data.categories;
          setCategoreisParentdata(categories);
        },
        () => {
          setIsLoading(false);
          openNotificationWithIcon("error", "Something wrong happened!");
        },
      );
    }
    getWarehouses();
  }, []);

  const parentData = useMemo(() => {
    return categoreisParentdata.map((data) => {
      return {
        key: data.id,
        id: data.id,
        name: data.categoryTranslations.find((i) => i.languageCode === "en").name,
      };
    });
  }, [categoreisParentdata]);

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
        openMessage({ type: "success", message: `${info.file.name} file uploaded successfully.` });
      } else if (status === "error") {
        openMessage({ type: "error", message: `${info.file.name} file upload failed.` });
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
            <Form.Item name="categoreisImage" noStyle>
              <Dragger
                style={{ background: "#fff" }}
                getValueFromEvent={normFile}
                valuePropName="fileList"
                showUploadList={false}
                {...props}>
                {previewPic && (
                  <>
                    <div className="basic-info-upload-img">
                      <Image preview={false} src={previewPic} height={240} />
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
          <Form.Item initialValue={categoreisdata.parentCategoryname} name="parent" label="Parent">
            <Select allowClear placeholder="Select Parent">
              {parentData &&
                parentData.map((data) => (
                  <Select.Option key={data.id} value={data.id}>
                    {data.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            initialValue={categoreisdata.showStatus}
            name="categoreisStatus"
            label="Status">
            <Select placeholder="Select category status">
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Draft">Draft</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item initialValue={categoreisdata.sortOrder} name="sortOrder" label="Sort Order">
            <InputNumber className="w-100" min={0} placeholder="0" />
          </Form.Item>
        </section>

        <Form.Item>
          <Row justify="end">
            <AddCancelButtons
              cancel={onClose}
              addName="Finish"
              add={() => form.submit()}
              addLoading={isLoading}
            />
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
