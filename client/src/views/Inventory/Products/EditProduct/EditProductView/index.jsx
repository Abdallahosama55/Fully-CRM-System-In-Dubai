import { Col, Row, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import Tab3DModel from "./3DModel";
import AREffectTab from "./AREffectTab";
import DataTab from "./DataTab";
import GeneralTab from "./GeneralTab";
import ImageTab from "./ImageTab";
import LinksTab from "./LinksTab";
import StoreService from "services/store.service";

export default function EditProductView({ onClose, productData, setProductData, setRefresh }) {
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
          language={language}
          onClose={onClose}
          productData={productData}
          setProductData={setProductData}
          // virtual={virtual}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "2",
      label: `Data`,
      disabled: !formActiveTabs.includes("data") ? true : false,
      children: (
        <DataTab
          productData={productData}
          priceCurrency={priceCurrency}
          onClose={onClose}
          setProductData={setProductData}
          // virtual={virtual}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
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
      label: `Image`,
      disabled: !formActiveTabs.includes("images") ? true : false,
      children: (
        <ImageTab
          productData={productData}
          onClose={onClose}
          setProductData={setProductData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "5",
      label: `3D Model`,
      disabled: !formActiveTabs.includes("3DModel") ? true : false,
      children: (
        <Tab3DModel
          productData={productData}
          onClose={onClose}
          setProductData={setProductData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "6",
      label: `AR Effect`,
      disabled: !formActiveTabs.includes("AREffect") ? true : false,
      children: (
        <AREffectTab
          language={language}
          productData={productData}
          setProductData={setProductData}
          setRefresh={setRefresh}
          onClose={onClose}
          // virtual={virtual}
        />
      ),
    },
  ];

  return (
    <section>
      <main className="add-product">
        <Row align="middle" justify="space-between" className="add-product-header">
          <Col>
            <Row align="middle" gutter={[8, 8]}>
              <Col>
                <Typography.Text className="fz-24 fw-500">Edit Product</Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="add-product-main">
          <Tabs
            activeKey={tabActiveKey}
            className="w-100"
            items={items}
            onChange={(active) => setTabActiveKey(active)}
          />
        </Row>
      </main>
    </section>
  );
}
