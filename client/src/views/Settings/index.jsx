import { useContext, useEffect, useState } from "react";
import { Button, Input, Select, Form, Row, Col, Avatar, Table, Modal } from "antd";

import { axiosCatch } from "utils/axiosUtils";

import "./style.css";
import { useNotification } from "context/notificationContext";
import StoreService from "services/store.service";
import userContext from "context/userContext";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { columns } from "./TableColumns";
import AddTax from "./AddTax";

const { Option } = Select;

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [listTax, settlistTax] = useState([]);
  const [id, setId] = useState(false);
  const [tabsData, setTabsData] = useState("");
  const [productsCount, setProductsCount] = useState("");
  const [page, setPage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { openNotificationWithIcon } = useNotification();
  const { user } = useContext(userContext);

  useEffect(() => {
    const getTax = async () => {
      try {
        setIsLoading(true);
        const res = await StoreService.getlistTax();
        setProductsCount(res.data.data.length);
        settlistTax(() => {
          return res.data.data.map((tab) => {
            return {
              key: tab.id,
              name: tab.name,
              value: tab.value,
              actions: {
                tab: tab,
                setRefresh: setRefresh,
                setId: setId,
                setIsModalOpen: setIsModalOpen,
                setTabsData: setTabsData,
              },
            };
          });
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        axiosCatch(error);
      }
    };
    getTax();
  }, [refresh]);

  useEffect(() => {
    const getStoreInfo = async () => {
      const info = await StoreService.getStoreInfo();
      const { languages, currencies, languageCode, currencyCode } = info?.data?.data;
      form.setFieldValue(`languageCode`, languageCode);
      form.setFieldValue(`currencyCode`, currencyCode);
      form.setFieldValue(`currencies`, JSON.parse(currencies));
      form.setFieldValue(`languages`, JSON.parse(languages));
    };
    const getCurrencyAndLanguage = async () => {
      setLoading(true);
      try {
        const getLangData = await StoreService.getLanguage();
        setLanguage(getLangData?.data?.data?.filter((lan) => lan.code !== user.languageCode));
        const getCurrencyData = await StoreService.getCurrency();
        setCurrency(
          getCurrencyData?.data?.data?.filter((currency) => currency.code !== user.cuurencyCode),
        );
      } catch (err) {
        axiosCatch(err);
      } finally {
        setLoading(false);
      }
    };
    getStoreInfo();
    getCurrencyAndLanguage();
  }, [form, user.cuurencyCode, user.languageCode]);

  const onFinish = async (values) => {
    setLoading(true);
    const data = {
      languages: JSON.stringify(values.languages),
      currencies: JSON.stringify(values.currencies),
    };
    try {
      await StoreService.updateStoreInfo(data);
      setLoading(false);
      openNotificationWithIcon("success", "Updated successfully");
    } catch (error) {
      openNotificationWithIcon("error", "Something wrong happend!");
      setLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setId(false);
    setTabsData("");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setId(false);
    setTabsData("");
  };
  return (
    <section className="body-content">
      <Row justify="center">
        <Col span={16}>
          <Form form={form} layout="vertical " name="control-hooks" onFinish={onFinish}>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item name="currencyCode" label="current currency">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="languageCode" label="current language">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="currencies" label="Currencies">
              <Select placeholder="Select your currency" allowClear mode="multiple">
                {currency?.map((currencyItem) => (
                  <Option key={currencyItem.code} value={currencyItem.code}>
                    {currencyItem.code} [{currencyItem.symbol}]
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="languages" label="Languages">
              <Select placeholder="Select your Languages" allowClear mode="multiple">
                {language?.map((lang) => (
                  <Option key={lang.code} value={lang.code}>
                    {lang.nativeName} <Avatar size={25} shape="square" src={lang.flag} />
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Row justify="end">
                <Col>
                  <Button loading={loading} type="primary" htmlType="submit">
                    Update
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row className="mt-1" justify="space-between">
        <Col>
          <div className="fw-600">Taxes Table</div>
        </Col>
        <Col>
          <Button onClick={() => setIsModalOpen(true)} type="primary">
            Add Taxes
          </Button>
        </Col>
      </Row>
      <Row className="w-100">
        <Col span={24}>
          <Table
            loading={isLoading}
            scroll={{ x: 700 }}
            style={{ marginTop: "32px" }}
            columns={columns}
            dataSource={listTax}
            pagination={{
              pageSize: 10,
              total: productsCount,
              onChange: (page) => {
                setPage((page - 1) * 10);
              },
              defaultCurrent: page / 10 + 1,
            }}
          />
        </Col>
      </Row>
      <Modal
        destroyOnClose={true}
        title={id ? "Eidte Tax" : "add Tax"}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <AddTax
          setRefresh={setRefresh}
          tabsData={tabsData}
          handleCancel={handleCancel}
          id={id}
          settlistTax={settlistTax}
        />
      </Modal>
    </section>
  );
};
export default Settings;
