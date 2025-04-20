import { Col, Row, Spin, Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import WarehousesProvider from "./warehousesContext";
import DataTab from "./DataTab";
import GeneralTab from "./GeneralTab";
import "./styles.css";
import WarehousesService from "services/warehouses.service";
import { useNotification } from "context/notificationContext";
import StoreService from "services/store.service";

export default function EditWarehouses({ setRefresh, onClose, id }) {
  const { openNotificationWithIcon } = useNotification();
  const [formActiveTabs, setFormActiveTabs] = useState(["general"]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [warehousesdata, setWarehousesdata] = useState(false);
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

  useEffect(() => {
    function getWarehouses() {
      setIsLoading(true);
      WarehousesService.getWarehouseId(id).then(
        (res) => {
          setIsLoading(false);
          const warehouses = res.data.data;
          const data = {
            showStatus: warehouses?.showStatus ? "Active" : "Draft",
            sortOrder: warehouses?.sortOrder,
            image: warehouses?.image,
            id: warehouses?.id,
            warehouseTranslations: warehouses?.warehouseTranslations,
          };
          setWarehousesdata(data);
        },
        () => {
          setIsLoading(false);
          openNotificationWithIcon("error", "Something  wrong happened!");
        },
      );
    }

    getWarehouses();
  }, [id]);

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
          warehousesdata={warehousesdata}
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
          warehousesdata={warehousesdata}
          setRefresh={setRefresh}
          onClose={onClose}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
          generalImages={generalImages}
          resetTabs={resetTabs}
          data={data}
        />
      ),
    },
  ];
  return (
    <section>
      {isLoading ? (
        <Row align="middle" justify="center">
          <Spin />
        </Row>
      ) : (
        <main className="add-warehouses">
          <Row align="middle" justify="space-between" className="add-warehouses-header">
            <Col className="mb-1">
              <Typography.Text className="fz-24 fw-500">Edit Warehouses</Typography.Text>
            </Col>
          </Row>

          <Row className="add-warehouses-main">
            <WarehousesProvider>
              <Tabs
                className="w-100 tabs"
                activeKey={tabActiveKey}
                onChange={(active) => setTabActiveKey(active)}
                items={items}
              />
            </WarehousesProvider>
          </Row>
        </main>
      )}
    </section>
  );
}
