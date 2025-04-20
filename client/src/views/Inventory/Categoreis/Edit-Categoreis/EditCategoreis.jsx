import { Col, Row, Spin, Tabs, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import CategoriesProvider from "./categoriesContext";
import DataTab from "./DataTab";
import GeneralTab from "./GeneralTab";
import "./styles.css";
import CategoryService from "services/category.service";
import { useNotification } from "context/notificationContext";
import StoreService from "services/store.service";
import userContext from "context/userContext";

export default function EditCategoreis({ setRefresh, onClose, id }) {
  const { openNotificationWithIcon } = useNotification();
  const [formActiveTabs, setFormActiveTabs] = useState(["general"]);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [categoreisdata, setCategoreisdata] = useState(false);
  const [language, setLanguage] = useState([]);
  const { user } = useContext(userContext);

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

  useEffect(() => {
    function getWarehouses() {
      setIsLoading(true);
      CategoryService.getCategoryId(id).then(
        (res) => {
          setIsLoading(false);
          const category = res.data.data;
          const data = {
            showStatus: category?.showStatus ? "Active" : "Draft",
            sortOrder: category?.sortOrder,
            image: category?.image,
            id: category?.id,
            parentCategoryId: category?.parentCategoryId,
            parentCategoryname: category?.parentCategory?.categoryTranslations?.find(
              (Translations) => Translations.languageCode === `${user.languageCode}`,
            ).name,
            categoryTranslations: category?.categoryTranslations,
          };
          setCategoreisdata(data);
        },
        () => {
          setIsLoading(false);
          openNotificationWithIcon("error", "Something wrong happened!");
        },
      );
    }

    getWarehouses();
  }, [id]);

  const items = [
    {
      key: "1",
      label: `generals`,
      children: (
        <GeneralTab
          onClose={onClose}
          categoreisdata={categoreisdata}
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
          categoreisdata={categoreisdata}
          setRefresh={setRefresh}
          onClose={onClose}
          setFormActiveTabs={setFormActiveTabs}
          setTabActiveKey={setTabActiveKey}
          generalImages={generalImages}
          resetTabs={resetTabs}
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
        <main className="edit-categoreis">
          <Row align="middle" justify="space-between" className="edit-categoreis-header">
            <Col className="mb-1">
              <Typography.Text className="fz-24 fw-500">Edit Category</Typography.Text>
            </Col>
          </Row>

          <Row className="edit-categoreis-main">
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
      )}
    </section>
  );
}
