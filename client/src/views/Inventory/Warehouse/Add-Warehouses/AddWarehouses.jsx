import { Col, Row, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import WarehousesProvider from "./warehousesContext";
import DataTab from "./DataTab";
import GeneralTab from "./GeneralTab";
import "./styles.css";
import StoreService from "services/store.service";

export default function AddWarehouses({ onClose, setWarehousesdata, setWarehousesCount }) {
  const [formActiveTabs, setFormActiveTabs] = useState(["general"]);
  const [tabActiveKey, setTabActiveKey] = useState("1");

  const [generalImages, setGeneralImages] = useState({
    arImage: null,
    enImage: null,
  });
  const [language, setLanguage] = useState([]);
  const [data, setData] = useState([]);

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
          setWarehousesdata={setWarehousesdata}
          setWarehousesCount={setWarehousesCount}
          data={data}
        />
      ),
    },
  ];
  return (
    <section>
      <main className="add-warehouses">
        <Row align="middle" justify="space-between" className="add-warehouses-header">
          <Col className="mb-1">
            <Typography.Text className="fz-24 fw-500">Add Warehouses</Typography.Text>
          </Col>
        </Row>

        <Row className="add-warehouses-main">
          <WarehousesProvider>
            <Tabs
              items={items}
              className="w-100 tabs"
              activeKey={tabActiveKey}
              onChange={(active) => setTabActiveKey(active)}
            />
          </WarehousesProvider>
        </Row>
      </main>
    </section>
  );
}
