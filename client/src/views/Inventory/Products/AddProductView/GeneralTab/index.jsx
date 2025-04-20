import { Col, Form, Image, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { USFlagSVG } from "assets/jsx-svg";
import GeneralForm from "./GeneralForm";
import ARflag from "assets/images/ARflag.png";
import AddProductButton from "components/common/AddProductButton";
import { useContext, useMemo, useState } from "react";
import userContext from "context/userContext";

export default function GeneralTab({
  virtual,
  setFormActiveTabs,
  setTabActiveKey,
  setData,
  onClose,
  language,
}) {
  const [form] = useForm();
  const [activeKeyData, setActiveKeyData] = useState("1");

  const { user } = useContext(userContext);

  const onFinishFailed = (errorInfo) => {
    setActiveKeyData("1");
  };
  const hanleChange = (active) => {
    setActiveKeyData(active);
  };

  const onFinish = (values) => {
    setTabActiveKey("2");
    console.log(values, "values");
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
    console.log(productTranslation, "productTranslation");
    setData((prev) => ({ ...prev, productTranslation }));
    setFormActiveTabs((prev) => [...prev, "data"]);
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
            virtual={virtual}
          />
        ),
      };
    });
  }, [form, language, user?.languageCode, virtual]);

  return (
    <Form onFinishFailed={onFinishFailed} form={form} layout="vertical" onFinish={onFinish}>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKeyData}
        className="inner-tab"
        items={items}
        onChange={hanleChange}
      />
      <AddProductButton cancel={onClose} addName="Next" />
    </Form>
  );
}
