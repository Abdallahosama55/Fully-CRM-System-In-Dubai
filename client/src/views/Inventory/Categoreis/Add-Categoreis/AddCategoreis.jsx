import { Col, Row, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import CategoriesProvider from "./categoriesContext";
import DataTab from "./DataTab";
import GeneralTab from "./GeneralTab";
import "./styles.css";
import StoreService from "services/store.service";

export default function AddCategoreis({
  setCategoreisdata,
  setCategoreisCount,
  onClose,
  issubcategories = false,
}) {
  const [formActiveTabs, setFormActiveTabs] = useState(["general"]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [language, setLanguage] = useState([]);

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
      label: `general`,
      children: (
        <GeneralTab
          onClose={onClose}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
          setGeneralImages={setGeneralImages}
          language={language}
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
          setCategoreisdata={setCategoreisdata}
          setCategoreisCount={setCategoreisCount}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
          generalImages={generalImages}
          resetTabs={resetTabs}
          issubcategories={issubcategories}
        />
      ),
    },
  ];

  return (
    <section>
      <main className="add-categoreis">
        <Row align="middle" justify="space-between" className="add-categoreis-header">
          <Col className="mb-1">
            <Typography.Text className="fz-24 fw-500">Add Category</Typography.Text>
          </Col>
        </Row>

        <Row className="add-categoreis-main">
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
