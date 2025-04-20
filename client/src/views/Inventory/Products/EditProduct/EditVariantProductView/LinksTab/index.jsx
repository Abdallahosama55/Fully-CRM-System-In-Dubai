import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Typography,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext, useEffect } from "react";
import { ImageRegularSVG } from "assets/jsx-svg";
import { useState } from "react";
import BrandsService from "services/brands.service";
import CategoriesService from "services/category.service";
import { axiosCatch } from "utils/axiosUtils";
import checkFileds from "utils/checkFields";
import AddCategoriesView from "../../../../Categoreis/Add-Categoreis/AddCategoreis";
import Plus from "assets/images/IconlyLightOutlinePlus.png";
import { useNotification } from "context/notificationContext";
import CommonService from "services/common.service";
import AddCancelButtons from "components/common/AddCancelButtons";
import AddBrands from "views/Inventory/Brand/Add-Brands/AddBrands";
import userContext from "context/userContext";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function LinksTab({
  setFormActiveTabs,
  setTabActiveKey,
  productData,
  setProductData,
  onClose,
}) {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [checked, setChecked] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(subCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [getImgFiles, setGetImgFiles] = useState([]);
  const [loading, setLoading] = useState({ addImages: false, getImages: false });
  const { openMessage } = useNotification();
  const { user } = useContext(userContext);
  const [files, setFiles] = useState([]);

  const { openNotificationWithIcon } = useNotification();

  const toggleModal = (e) => {
    e?.preventDefault();
    setAddNew(false);
    setIsModalOpen((prev) => !prev);
  };
  useEffect(() => {
    setGetImgFiles(productData?.links || []);
  }, [productData?.links]);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const props = {
    defaultFileList: productData?.links?.map((image) => {
      return {
        uid: image,
        thumbUrl: image,
        url: image,
        name: (
          <Typography.Text style={{ maxWidth: "400px" }} ellipsis>
            {image}
          </Typography.Text>
        ),
      };
    }),
    name: "file",
    multiple: true,
    accept: "image/*,application/pdf",
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
        setGetImgFiles((prev) => prev.filter((prevFile) => info.file.uid !== prevFile));
      }
    },
    listType: "picture",
    style: { background: "#fff" },
    height: "286px",
  };

  useEffect(() => {
    if (isModalOpen === false) {
      BrandsService.search()
        .then(({ data }) => setBrands(data.data.brands))
        .catch(axiosCatch);

      CategoriesService.search(true)
        .then(({ data }) => setCategories(data.data.categories))
        .catch(axiosCatch);

      CategoriesService.search()
        .then(({ data }) =>
          setSubCategories(
            data.data.categories.filter((category) => category.parentCategoryId !== null),
          ),
        )
        .catch(axiosCatch);
    }
  }, [isModalOpen]);
  useEffect(() => {
    setSelectedCategories(
      productData.categories
        .filter((category) => !category.parentCategoryId)
        .map((category) => category.id),
    );
    form.setFieldValue("linksBrand", productData.brandId ? productData.brandId : []);
    form.setFieldValue("customTab", productData.customTab ? JSON.parse(productData.customTab) : []);
    form.setFieldValue(
      "linksCategories",
      productData.categories
        .filter((category) => !category.parentCategoryId)
        .map((category) => category.id),
    );
    setChecked(productData.isDownloadAbel);
    form.setFieldValue(
      "linksSubCategories",
      productData.categories
        .filter((category) => category.parentCategoryId)
        .map((category) => category.id),
    );
    form.setFieldValue("linksLabels", productData.lable);
  }, [form, productData]);

  const handelChange = (value) => {
    setChecked(value);
  };

  useEffect(() => {
    setShowSubCategories(() =>
      subCategories.filter((category) => selectedCategories.includes(category.parentCategoryId)),
    );
  }, [selectedCategories, subCategories]);

  const onFinish = (values) => {
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
          .catch((err) => console.log(err)),
      );
    });

    Promise.allSettled(promises)
      .then(() => {
        let newImages = files.filter((file) => !file.name);
        newImages = newImages.map((image) => image.thumbUrl);
        setProductData((prev) => ({
          ...prev,
          links: [...getImgFiles, ...newImages, ...images],
        }));
        setProductData((prev) => ({
          ...prev,
          ...values,
          linksBrand: values.linksBrand.length === 0 ? null : values.linksBrand,
        }));
      })
      .then(() => {
        setFormActiveTabs((prev) => [...prev, "3DModel"]);
        setTabActiveKey("4");
        setLoading({ addImages: false, getImages: false });
      })
      .catch((err) => {
        console.log(err);
        setLoading({ addImages: false, getImages: false });
        openNotificationWithIcon("error", "Something  wrong");
      });
  };
  const AddNewComponent = {
    sub_categories: (
      <AddCategoriesView
        onClose={toggleModal}
        fromModal={true}
        toggleModal={toggleModal}
        issubcategories={true}
      />
    ),
    categories: (
      <AddCategoriesView onClose={toggleModal} fromModal={true} toggleModal={toggleModal} />
    ),
    brand: <AddBrands onClose={toggleModal} fromModal={true} toggleModal={toggleModal} />,
  };
  return (
    <section className="general-form">
      <Form form={form} layout="vertical" onFinish={onFinish} name="links">
        <div>
          <Form.Item className="links-categories-item" label="Brand(Manufacturer)">
            <Row className="w-100 links-categories" align="middle">
              <Col style={{ flex: 1 }}>
                <Form.Item name="linksBrand" noStyle>
                  <Select mode="multiple" placeholder="Select product brand/manufacturer">
                    {brands.map((brand) => (
                      <Select.Option key={brand.id} value={brand.id}>
                        {brand.brandTranslations.find((lang) => lang.languageCode === "en").name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <button
                  className="add-ategory"
                  onClick={(e) => {
                    toggleModal(e);
                    setAddNew("brand");
                  }}
                  type="primary">
                  <Row gutter={4}>
                    <Col>
                      <Image preview={false} src={Plus} />
                    </Col>
                    <Col className="fz-12 ">Add brand</Col>
                  </Row>
                </button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item className="links-categories-item" label="Categories">
            <Row className="links-categories" align="middle">
              <Col style={{ flex: "1" }}>
                <Form.Item noStyle name="linksCategories">
                  <Select
                    mode="multiple"
                    placeholder="Select categories"
                    onChange={(v) => setSelectedCategories(v)}>
                    {categories.map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {
                          category.categoryTranslations.find(
                            (lang) => lang.languageCode === `${user?.languageCode}`,
                          ).name
                        }
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <button
                  className="add-ategory"
                  onClick={(e) => {
                    toggleModal(e);
                    setAddNew("categories");
                  }}
                  type="primary">
                  <Row gutter={4}>
                    <Col>
                      <Image preview={false} src={Plus} />
                    </Col>
                    <Col className="fz-12 ">Add Category</Col>
                  </Row>
                </button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item className="links-categories-item" label="Sub Categories">
            <Row className="w-100 links-categories" align="middle">
              <Col style={{ flex: 1 }}>
                <Form.Item name="linksSubCategories" noStyle>
                  <Select mode="multiple" placeholder="Select sub categories">
                    {showSubCategories.map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {
                          category.categoryTranslations.find(
                            (lang) => lang.languageCode === `${user?.languageCode}`,
                          ).name
                        }
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <button
                  className="add-ategory"
                  onClick={(e) => {
                    toggleModal(e);
                    setAddNew("sub_categories");
                  }}
                  type="primary">
                  <Row gutter={4}>
                    <Col>
                      <Image preview={false} src={Plus} />
                    </Col>
                    <Col className="fz-12 ">Add Sub Category</Col>
                  </Row>
                </button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item name="linksLabels" label="Labels">
            <Select placeholder="Select labels">
              <Select.Option value="New">New</Select.Option>
              <Select.Option value="Hot">Hot</Select.Option>
              <Select.Option value="Sale">Sale</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="isDownloadAbel" label="isDownloadAbel" name="isDownloadAbel">
            <Switch checked={checked} onChange={handelChange} />
          </Form.Item>
          <Form.Item
            label="Files"
            getValueFromEvent={normFile}
            valuePropName="fileList"
            className="custom-upload">
            <Upload.Dragger
              {...props}
              customRequest={dummyRequest}
              onRemove={(e) => console.log(e)}>
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
            <Row justify="end">
              <AddCancelButtons
                addName="Next"
                htmlType="submit"
                addLoading={loading.addImages}
                add={() => checkFileds(form)}
                cancel={onClose}
              />
            </Row>
          </Form.Item>
        </div>
      </Form>

      <Modal
        open={isModalOpen}
        onOk={toggleModal}
        onCancel={toggleModal}
        footer={false}
        centered
        destroyOnClose={true}
        width={1200}>
        {AddNewComponent[addNew]}
      </Modal>
    </section>
  );
}
