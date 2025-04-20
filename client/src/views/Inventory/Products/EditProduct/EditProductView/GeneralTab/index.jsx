import { Col, Form, Image, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext, useEffect, useMemo, useState } from "react";
import GeneralForm from "./GeneralForm";
import userContext from "context/userContext";

export default function GeneralTab({
  virtual,
  setFormActiveTabs,
  setTabActiveKey,
  setProductData,
  productData,
  onClose,
  language,
}) {
  const [form] = useForm();

  const { user } = useContext(userContext);
  const [activeKeyData, setActiveKeyData] = useState("1");

  const onFinishFailed = (errorInfo) => {
    setActiveKeyData("1");
  };
  const hanleChange = (active) => {
    setActiveKeyData(active);
  };

  useEffect(() => {
    productData.productTranslations?.forEach((lang) => {
      form.setFieldValue(`productName${lang.languageCode}`, lang.name);
      form.setFieldValue(`shortDescription${lang.languageCode}`, lang.shortDescription);
      form.setFieldValue(`description${lang.languageCode}`, lang.description);
      form.setFieldValue(`customTab${lang.languageCode}`, JSON.parse(lang.customTab));
      lang.tags && form.setFieldValue(`productsTags${lang.languageCode}`, JSON.parse(lang.tags));

      form.setFieldValue(`tagTitle${lang.languageCode}`, lang.metaTagTitle);
      form.setFieldValue(`tagDescription${lang.languageCode}`, lang.metaTagDescription);
    });
  }, [form, productData.productTranslations]);

  const onFinish = (values) => {
    const productTranslation = {};

    language.forEach((languageCode) => {
      const languageTranslation = {
        languageCode: languageCode.code,
        name:
          values[`productName${languageCode.code}`] || values[`productName${user?.languageCode}`],
        shortDescription:
          values[`shortDescription${languageCode.code}`] ||
          values[`shortDescription${user?.languageCode}`],
        description:
          values[`description${languageCode.code}`] || values[`description${user?.languageCode}`],
        tags:
          JSON.stringify(values[`productsTags${languageCode.code}`]) ||
          JSON.stringify(values[`productsTags${user?.languageCode}`]),
        downloadableFiles:
          values[`downloadableFiles${languageCode.code}`] ||
          values[`downloadableFiles${user?.languageCode}`],
        downloadLimit:
          values[`downloadLimit${languageCode.code}`] ||
          values[`downloadLimit${user?.languageCode}`],
        downloadExpiry:
          values[`downloadExpiry${languageCode.code}`] ||
          values[`downloadExpiry${user?.languageCode}`],
        metaTagTitle:
          values[`tagTitle${languageCode.code}`] || values[`tagTitle${user?.languageCode}`],
        metaTagDescription:
          values[`tagDescription${languageCode.code}`] ||
          values[`tagDescription${user?.languageCode}`],
        customTab:
          JSON.stringify(values[`customTab${languageCode.code}`]) ||
          JSON.stringify(values[`customTab${user?.languageCode}`]),
      };

      productTranslation[languageCode.code] = languageTranslation;
    });

    setProductData((prev) => ({
      ...prev,
      productTranslation,
    }));
    setFormActiveTabs((prev) => [...prev, "data"]);
    setTabActiveKey("2");
  };

  const items = useMemo(() => {
    return language?.map((lan, i) => {
      return {
        key: `${i + 1}`,
        label: (
          <Row align="middle" gutter={[4, 0]}>
            <Col>
              <Row align="middle">
                <Image preview={false} src={lan?.flag} width={21} />
              </Row>
            </Col>
            <Col>{lan?.nativeName}</Col>
          </Row>
        ),
        forceRender: true,
        children: (
          <GeneralForm
            required={lan?.code === user?.languageCode}
            form={form}
            lang={lan?.code}
            onClose={onClose}
            virtual={virtual}
          />
        ),
      };
    });
  }, [form, language, onClose, user?.languageCode, virtual]);

  return (
    <Form onFinishFailed={onFinishFailed} form={form} layout="vertical" onFinish={onFinish}>
      <Tabs
        activeKey={activeKeyData}
        onChange={hanleChange}
        defaultActiveKey="1"
        className="inner-tab "
        items={items}
      />
    </Form>
  );
}
