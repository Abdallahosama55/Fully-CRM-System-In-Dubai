import { useContext, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Upload,
  Select,
  Typography,
  Tooltip,
} from "antd";
import default_image from "assets/images/default_image.png";
import PriceSection from "./PriceSection";
import { USFlagSVG } from "assets/jsx-svg";
import flag from "assets/images/ARflag.png";
import DownloadableSection from "./DownloadableSection";
import beforUploadImage from "utils/imageUpload";
import { useEffect } from "react";
import Infinity from "assets/images/Infinity.png";
import userContext from "context/userContext";

export default function Variation({
  form,
  enName,
  arName,
  data,
  language,
  VariantName,
  enVariantName,
  arVariantName,
  lengthClass,
  weightClass,
  productData,
  priceCurrency,
  ownModels,
}) {
  const [quantityLimit, setQuantityLimit] = useState([]);
  const { user } = useContext(userContext);

  useEffect(() => {
    language.forEach((lang) => {
      const Name = data.productTranslations?.find((trans) => lang.code == trans.languageCode)?.name;
      const languageCode = user?.languageCode || "en";
      if (languageCode === lang.code) {
        form.setFieldValue([enVariantName, `name${lang.code}`], `${Name}/${enVariantName}`);
      } else {
        form.setFieldValue(
          [enVariantName, `name${lang.code}`],
          `${Name}/${VariantName?.[lang.code]}`,
        );
      }
    });
  }, [VariantName, data.productTranslations, enVariantName, form, language, user?.languageCode]);

  return (
    <>
      <Form.Item>
        <Row justify="space-between" align="top">
          <Col xs={24} xxl={6}>
            <Form.Item
              rules={[{ required: true }]}
              name={[enVariantName, "productImage"]}
              label="Product Image">
              <Upload
                defaultFileList={productData.productVariants
                  .find((variant) => variant.title === enVariantName)
                  ?.images?.map((url, index) => ({
                    uid: index,
                    name: (
                      <Tooltip title={url}>
                        <Typography.Text style={{ maxWidth: "300px" }} ellipsis>
                          {url}
                        </Typography.Text>
                      </Tooltip>
                    ),
                    status: "done",
                    url: url,
                  }))}
                accept="image/*"
                beforeUpload={beforUploadImage}
                multiple
                listType="picture">
                <Row
                  style={{ backgroundColor: "#fff" }}
                  justify="center"
                  align="middle"
                  className="variant-upload">
                  <Image
                    alt="placeholder"
                    src={default_image}
                    preview={false}
                    width={180}
                    height={180}
                  />
                </Row>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        label="3D Model"
        name={[enVariantName, "ownModel"]}
        initialValue={productData.ownModel}>
        <Select placeholder="Select Model">
          {ownModels?.map((model) => (
            <Select.Option key={model.id} value={model.id}>
              <Row align="middle" gutter={[16, 0]}>
                <Col>
                  <Image
                    preview={false}
                    alt={model.name}
                    src={model.image}
                    width={30}
                    height={30}
                  />
                </Col>
                <Col>
                  <Typography.Text>{model.name}</Typography.Text>
                </Col>
              </Row>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Name">
        <Row gutter={[10, 28]} justify="space-between" align="middle">
          {language.map((lang) => (
            <Col key={lang.code} xs={12}>
              <Row wrap={false} align="middle" gutter={8}>
                <Col>
                  <Row align="middle" justify="center" className="option-lang">
                    <Image preview={false} src={lang.flag} width={19} />
                  </Row>
                </Col>
                <Col flex={1}>
                  <Form.Item name={[enVariantName, `name${lang.code}`]} noStyle>
                    <Input placeholder="Enter product name" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Form.Item>

      <Form.Item label="SKU (Stock Keeping Unit)" name={[enVariantName, "sku"]}>
        <Input placeholder="Enter product sku" />
      </Form.Item>

      <PriceSection name={enVariantName} priceCurrency={priceCurrency} />

      <Form.Item label="Quantity">
        <Row className="input-with-btn-row">
          <Col flex={1}>
            <Form.Item name={[enVariantName, "quantityLimit"]} noStyle>
              <InputNumber
                max={1000000}
                className="input-with-btn w-100"
                placeholder="Enter product quantity or Leave blank for unlimited"
                disabled={
                  quantityLimit.find((ele) => ele.id === enVariantName)?.opend ? true : false
                }
                min={0}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button
              onClick={() => {
                form.setFieldValue(["attributes", enVariantName, "quantityLimit"], undefined);
                setQuantityLimit((prev) => {
                  let current = prev.find((ele) => +ele.id === +enVariantName);
                  if (current) {
                    current.opend = !current.opend;
                  } else {
                    current = {
                      id: enVariantName,
                      opend: true,
                    };
                  }

                  let restFields = prev.filter((ele) => +ele.id !== +enVariantName);

                  return [...restFields, current];
                });
              }}
              className="big-input-btn-Infinity "
              style={{
                background:
                  quantityLimit.find((ele) => ele.id === enVariantName)?.opend && "#D7DAE2",
              }}>
              <Row justify="center" align="middle">
                <Image preview={false} src={Infinity} />
              </Row>
            </Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label="Minimum Quantity" name={[enVariantName, "minimumQuantity"]}>
        <InputNumber
          max={1000000}
          className="w-100"
          placeholder="Enter product minimum ordered amount"
          min={0}
        />
      </Form.Item>

      <Form.Item label={`Dimensions (L X W X H) ${lengthClass ? `(${lengthClass})` : ""}`}>
        <Row gutter={10} wrap={false}>
          <Col xs={8}>
            <Form.Item name={[enVariantName, "specificationLength"]} noStyle>
              <InputNumber
                placeholder="Length"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item name={[enVariantName, "specificationWidth"]} noStyle>
              <InputNumber
                placeholder="Width"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item name={[enVariantName, "specificationHeight"]} noStyle>
              <InputNumber
                placeholder="Height"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        label={`Weight ${weightClass ? `(${weightClass})` : ""}`}
        name={[enVariantName, "specificationWeight"]}>
        <InputNumber className="w-100" placeholder="Enter product weight" min={0} />
      </Form.Item>
      <Form.Item style={{ display: "none" }} name={[enVariantName, "id"]}>
        <Input />
      </Form.Item>

      <DownloadableSection form={form} name={enVariantName} />
    </>
  );
}
