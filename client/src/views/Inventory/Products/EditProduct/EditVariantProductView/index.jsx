import { useEffect, useState } from "react";
import { Col, Row, Tabs, Typography } from "antd";

import OptionsTab from "./OptionsTab";
import DataTab from "./DataTab";
import GeneralTab from "./GeneralTab";
import LinksTab from "./LinksTab";
import "./styles.css";

import Tab3DModel from "./3DModel";
import StoreService from "services/store.service";

export default function EditVariantProductView({
  id,
  onClose,
  productData,
  setRefresh,
  setProductData,
}) {
  const [formActiveTabs, setFormActiveTabs] = useState(["general"]);
  const [tabActiveKey, setTabActiveKey] = useState("1");

  const [language, setLanguage] = useState([]);
  const [priceCurrency, setPriceCurrency] = useState([]);

  const getLanguagesAndCurrency = async () => {
    const res = await StoreService.getStoreInfo();
    const lang = await StoreService.getLanguage();

    const { languages, currencies, languageCode, currencyCode } = res.data.data;

    const convertedLang = JSON.parse(languages);
    const convertedCurrencies = JSON.parse(currencies);

    convertedCurrencies.unshift(currencyCode);
    let fullLanf = lang.data.data.filter((element) => convertedLang.includes(element.code));
    fullLanf.unshift(lang.data.data.find((element) => element.code === languageCode));
    setLanguage(fullLanf);
    setPriceCurrency(convertedCurrencies);
  };

  useEffect(() => {
    getLanguagesAndCurrency();
  }, []);

  const items = [
    {
      key: "1",
      label: `General`,
      children: (
        <GeneralTab
          onClose={onClose}
          productData={productData}
          setProductData={setProductData}
          setFormActiveTabs={setFormActiveTabs}
          language={language}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "2",
      label: `Data`,
      disabled: formActiveTabs.includes("data") ? true : false,
      children: (
        <DataTab
          onClose={onClose}
          productData={productData}
          setProductData={setProductData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
          priceCurrency={priceCurrency}
        />
      ),
    },
    {
      key: "3",
      label: `Links`,
      disabled: !formActiveTabs.includes("links") ? true : false,
      children: (
        <LinksTab
          onClose={onClose}
          productData={productData}
          setProductData={setProductData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "4",
      label: `3D Model`,
      disabled: !formActiveTabs.includes("3DModel") ? true : false,
      children: (
        <Tab3DModel
          onClose={onClose}
          productData={productData}
          setProductData={setProductData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "5",
      label: `Options`,
      disabled: !formActiveTabs.includes("options") ? true : false,
      children: (
        <OptionsTab
          onClose={onClose}
          productData={productData}
          setProductData={setProductData}
          language={language}
          setRefresh={setRefresh}
          priceCurrency={priceCurrency}
        />
      ),
    },
  ];
  return (
    <section>
      <main className="add-product">
        <Row align="middle" justify="space-between" className="add-product-header">
          <Col>
            <Typography.Text className="fz-24 fw-500">Edit Product</Typography.Text>
          </Col>
        </Row>

        <Row className="add-product-main">
          <Tabs
            className="w-100"
            activeKey={tabActiveKey}
            onChange={(active) => setTabActiveKey(active)}
            items={items}
          />
        </Row>
      </main>
    </section>
  );
}
