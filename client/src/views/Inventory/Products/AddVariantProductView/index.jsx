import { Col, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import OptionsTab from "./OptionsTab";
import DataTab from "./DataTab";
import GeneralTab from "./GeneralTab";
import LinksTab from "./LinksTab";
import "./styles.css";
import Tab3DModel from "./3DModel";
import StoreService from "services/store.service";

export default function AddVariantProductView({ onClose, setProductsCount, setProductsdata }) {
  const [formActiveTabs, setFormActiveTabs] = useState(["general"]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(false);

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
      disabled,
      children: (
        <GeneralTab
          onClose={onClose}
          language={language}
          setData={setData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "2",
      label: `Data`,
      disabled: disabled || !formActiveTabs.includes("data") ? true : false,
      children: (
        <DataTab
          onClose={onClose}
          priceCurrency={priceCurrency}
          setData={setData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "3",
      label: `Links`,
      disabled: disabled || !formActiveTabs.includes("links") ? true : false,
      children: (
        <LinksTab
          onClose={onClose}
          data={data}
          setData={setData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
        />
      ),
    },
    {
      key: "4",
      label: `3D Model`,
      disabled: disabled || !formActiveTabs.includes("3DModel") ? true : false,
      children: (
        <Tab3DModel
          setData={setData}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
          onClose={onClose}
        />
      ),
    },
    {
      key: "5",
      label: `Options`,
      disabled: !formActiveTabs.includes("options") ? true : false,
      children: (
        <OptionsTab
          priceCurrency={priceCurrency}
          setProductsCount={setProductsCount}
          setProductsdata={setProductsdata}
          onClose={onClose}
          language={language}
          setDisabled={setDisabled}
          data={data}
          setData={setData}
        />
      ),
    },
  ];

  return (
    <section>
      <main className="add-product">
        <Row align="middle" justify="space-between" className="add-product-header">
          <Col>
            <span className="fz-24 fw-500">Add Variant Product /</span>
            <span className="fz-24 gc">Macbook Pro</span>
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
