import { Col, Row, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import CategoriesProvider from "./bransContext";
import DataTab from "./DataTab";
import GeneralTab from "./GeneralTab";
import "./styles.css";
import StoreService from "services/store.service";

export default function AddBrands({ setBrandsCount, setBrandsdata, onClose }) {
  const [formActiveTabs, setFormActiveTabs] = useState(["general"]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [disabled, setDisabled] = useState(false);
  const [language, setLanguage] = useState([]);
  const [data, setData] = useState([]);

  const [generalImages, setGeneralImages] = useState({
    arImage: null,
    enImage: null,
  });

  const resetTabs = () => {
    setTabActiveKey("1");
    setGeneralImages({ arImage: null, enImage: null });
  };

  const getLanguagesAndCurrency = async () => {
    const res = await StoreService.getStoreInfo();
    const lang = await StoreService.getLanguage();

    const { languages, languageCode } = res.data.data;

    const convertedLang = JSON.parse(languages);

    let fullLanf = lang.data.data.filter((element) => convertedLang.includes(element.code));
    fullLanf.unshift(lang.data.data.find((element) => element.code === languageCode));
    setLanguage(fullLanf);
  };
  useEffect(() => {
    getLanguagesAndCurrency();
  }, []);

  const items = [
    {
      key: "1",
      label: `General`,
      disabled: disabled,
      children: (
        <GeneralTab
          onClose={onClose}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
          setGeneralImages={setGeneralImages}
          language={language}
          setData={setData}
        />
      ),
    },
    {
      key: "2",
      label: `Data`,
      disabled: !formActiveTabs.includes("data") ? true : false,
      children: (
        <DataTab
          onClose={onClose}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
          generalImages={generalImages}
          resetTabs={resetTabs}
          setDisabled={setDisabled}
          setBrandsCount={setBrandsCount}
          setBrandsdata={setBrandsdata}
          data={data}
        />
      ),
    },
  ];

  return (
    <section>
      <main className="add-brands">
        <Row align="middle" justify="space-between" className="add-brands-header">
          <Col className="mb-1">
            <Typography.Text className="fz-24 fw-500">Add Brand</Typography.Text>
          </Col>
        </Row>

        <Row className="add-brands-main">
          <CategoriesProvider>
            <Tabs
              className="w-100 tabs"
              activeKey={tabActiveKey}
              onChange={(active) => setTabActiveKey(active)}
              items={items}
            />
          </CategoriesProvider>
        </Row>
      </main>
    </section>
  );
}
