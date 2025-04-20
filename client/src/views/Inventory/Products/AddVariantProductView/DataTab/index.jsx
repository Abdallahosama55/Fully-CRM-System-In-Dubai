import { Form, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import checkFileds from "utils/checkFields";
import ModelTab from "./ModelTab";
import PriceTab from "./PriceTab";
import SpecificationTab from "./SpecificationTab";
import StockTab from "./StockTab";
import AddProductButton from "components/common/AddProductButton";
import userContext from "context/userContext";
import { useContext } from "react";

export default function DataTab({
  setFormActiveTabs,
  priceCurrency,
  setTabActiveKey,
  setData,
  onClose,
}) {
  const [form] = useForm();
  const { user } = useContext(userContext);
  const onFinish = (values) => {
    setFormActiveTabs((prev) => [...prev, "links"]);
    setTabActiveKey("3");
    const prices = priceCurrency
      .filter((price) => price !== user.cuurencyCode)
      .map((price) => {
        return {
          key: price,
          value: values[`price${price}`],
        };
      })
      .filter((price) => price.value !== null);
    const newValues = {
      ...values,
      Price: values[`price${user.cuurencyCode}`],
      prices: JSON.stringify(prices),
    };
    setData((prev) => ({ ...prev, ...newValues }));
  };

  const items = [
    {
      key: "1",
      label: `Price`,
      forceRender: true,
      children: <PriceTab priceCurrency={priceCurrency} />,
    },
    {
      key: "2",
      label: `Model`,
      forceRender: true,
      children: <ModelTab />,
    },
    {
      key: "3",
      label: `Stock`,
      forceRender: true,
      children: <StockTab />,
    },
    {
      key: "4",
      label: `Specification`,
      forceRender: true,
      children: <SpecificationTab />,
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Tabs defaultActiveKey="1" className="data-tab" items={items} />

      <Form.Item>
        <Row justify="end">
          <AddProductButton
            addName="Next"
            htmlType="submit"
            onClick={() => checkFileds(form)}
            cancel={onClose}
          />
        </Row>
      </Form.Item>
    </Form>
  );
}
