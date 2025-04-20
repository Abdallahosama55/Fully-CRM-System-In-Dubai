import { Col, Form, Image, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { useWarehousesContext } from "../warehousesContext";
import GeneralForm from "./GeneralForm";
import { USFlagSVG } from "assets/jsx-svg";
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

  const { generalRef } = useWarehousesContext();
  const { user } = useContext(userContext);

  generalRef.current = form;

  const onFinish = (values) => {
    const WarehouseTranslations = {};
    language.forEach((languageCode) => {
      const languageTranslation = {
        languageCode: languageCode.code,
        name:
          values[`warehousesName${languageCode.code}`] ||
          values[`warehousesName${user.languageCode}`],
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
        location:
          values[`warehousesLocation${languageCode.code}`] ||
          values[`warehousesLocation${user.languageCode}`],
      };
      WarehouseTranslations[languageCode.code] = languageTranslation;
    });
    setFormActiveTabs((prev) => [...prev, "data"]);
    setData({ WarehouseTranslations: WarehouseTranslations });
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
