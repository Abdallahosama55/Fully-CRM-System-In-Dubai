import { Col, Form, Image, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCategoriesContext } from "../categoriesContext";
import GeneralForm from "./GeneralForm";
import AddProductButton from "components/common/AddProductButton";
import userContext from "context/userContext";
import { useContext, useEffect, useMemo } from "react";

export default function GeneralTab({
  setFormActiveTabs,
  setTabActiveKey,
  onClose,
  language,
  categoreisdata,
}) {
  const [form] = useForm();
  const { setData } = useCategoriesContext();
  const { user } = useContext(userContext);

  const onFinish = (values) => {
    const categoryTranslations = {};
    language.forEach((languageCode) => {
      const languageTranslation = {
        languageCode: languageCode.code,
        name:
          values[`categoreisName${languageCode.code}`] ||
          values[`categoreisName${user.languageCode}`],
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
      categoryTranslations[languageCode.code] = languageTranslation;
    });
    setData({ categoryTranslation: categoryTranslations });
    setFormActiveTabs((prev) => [...prev, "data"]);
    setTabActiveKey("2");
  };

  useEffect(() => {
    categoreisdata.categoryTranslations?.forEach((lang) => {
      form.setFieldValue(`categoreisName${lang.languageCode}`, lang.name);
      form.setFieldValue(`description${lang.languageCode}`, lang.description);
      form.setFieldValue(`metaTagTitle${lang.languageCode}`, lang.metaTagTitle);
      form.setFieldValue(`metaTagDescription${lang.languageCode}`, lang.metaTagDescription);
      form.setFieldValue(`metaTagKeyword${lang.languageCode}`, lang.metaTagKeywords);
    });
  }, [categoreisdata.categoryTranslations, form]);

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
        children: <GeneralForm required={lan.code === user.languageCode} lang={lan.code} />,
      };
    });
  }, [language, user.languageCode]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} name="general">
      <Tabs defaultActiveKey="1" className="inner-tab" items={items} />

      <AddProductButton cancel={onClose} addName="Next" className="mt-1" />
    </Form>
  );
}
