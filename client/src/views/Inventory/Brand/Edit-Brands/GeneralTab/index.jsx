import { Col, Form, Image, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { useBransContext } from "../bransContext";
import GeneralForm from "./GeneralForm";
import { USFlagSVG } from "assets/jsx-svg";
import ARflag from "assets/images/ARflag.png";
import AddProductButton from "components/common/AddProductButton";
import userContext from "context/userContext";
import { useContext, useEffect, useMemo } from "react";

export default function GeneralTab({
  setFormActiveTabs,
  setTabActiveKey,
  onClose,
  brandsdata,
  language,
  setData,
}) {
  const [form] = useForm();
  const { generalRef } = useBransContext();
  generalRef.current = form;
  const { user } = useContext(userContext);

  const onFinish = (values) => {
    const BrandTranslations = {};
    language.forEach((languageCode) => {
      const languageTranslation = {
        languageCode: languageCode.code,
        name: values[`brandsName${languageCode.code}`] || values[`brandsName${user.languageCode}`],
        description:
          values[`description${languageCode.code}`] || values[`description${user.languageCode}`],
        metaTagDescription:
          values[`metaTagDescription${languageCode.code}`] ||
          values[`metaTagDescription${user.languageCode}`],
        metaTagKeywords:
          values[`metaTagKeyword${languageCode.code}`] ||
          values[`metaTagKeyword${user.languageCode}`],
        metaTagTitle:
          values[`metaTagTitle${languageCode.code}`] || values[`metaTagTitle${user.languageCode}`],
      };
      BrandTranslations[languageCode.code] = languageTranslation;
    });
    setFormActiveTabs((prev) => [...prev, "data"]);
    setData({ BrandTranslations: BrandTranslations });
    setTabActiveKey("2");
  };

  const items = useMemo(() => {
    return language.map((lan, i) => {
      return {
        key: `${i + 1}`,
        label: (
          <Row align="middle" gutter={[4, 0]}>
            <Col>
              <Row align="middle">
                <Image preview={false} src={lan.flag} width={21} />
              </Row>
            </Col>
            <Col>{lan.nativeName}</Col>
          </Row>
        ),
        forceRender: true,
        children: (
          <GeneralForm form={form} required={lan.code === user.languageCode} lang={lan.code} />
        ),
      };
    });
  }, [form, language, user.languageCode]);

  useEffect(() => {
    brandsdata.brandTranslations?.forEach((lang) => {
      form.setFieldValue(`brandsName${lang.languageCode}`, lang.name);
      form.setFieldValue(`description${lang.languageCode}`, lang.description);
      form.setFieldValue(`metaTagTitle${lang.languageCode}`, lang.metaTagTitle);
      form.setFieldValue(`metaTagDescription${lang.languageCode}`, lang.metaTagDescription);
      form.setFieldValue(`metaTagKeyword${lang.languageCode}`, lang.metaTagKeywords);
    });
  }, [brandsdata.brandTranslations, form]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} name="general">
      <Tabs defaultActiveKey="1" className="inner-tab" items={items} />

      <AddProductButton cancel={onClose} addName="Next" className="mt-1" />
    </Form>
  );
}
