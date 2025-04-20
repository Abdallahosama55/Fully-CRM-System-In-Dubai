import { Col, Form, Image, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { useBrandsContext } from "../bransContext";
import GeneralForm from "./GeneralForm";
import { SAFlagSVG, USFlagSVG } from "assets/jsx-svg";
import ARflag from "assets/images/ARflag.png";
import AddProductButton from "components/common/AddProductButton";
import { useContext, useMemo } from "react";
import userContext from "context/userContext";

export default function GeneralTab({
  setFormActiveTabs,
  setTabActiveKey,
  setGeneralImages,
  onClose,
  language,
  setData,
}) {
  const [form] = useForm();

  const { generalRef } = useBrandsContext();
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

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} name="general">
      <Tabs defaultActiveKey="1" className="inner-tab" items={items} />

      <AddProductButton cancel={onClose} addName="Next" className="mt-1" />
    </Form>
  );
}
