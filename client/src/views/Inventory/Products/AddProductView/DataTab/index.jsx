import { Form, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import checkFileds from "utils/checkFields";
import ModelTab from "./ModelTab";
import PriceTab from "./PriceTab";
import SpecificationTab from "./SpecificationTab";
import StockTab from "./StockTab";
import AddProductButton from "components/common/AddProductButton";
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";
import { useContext } from "react";

export default function DataTab({
  virtual,
  priceCurrency,
  setFormActiveTabs,
  setTabActiveKey,
  setData,
  onClose,
}) {
  const { openNotificationWithIcon } = useNotification();
  const [form] = useForm();
  const { user } = useContext(userContext);
  const onFinish = (values) => {
    console.log(values, "values");
    if (values.specificationLength || values.specificationWidth || values.specificationHeight) {
      if (
        values.specificationLength &&
        values.specificationWidth &&
        values.specificationHeight &&
        values.specificationLengthClass
      ) {
      } else {
        openNotificationWithIcon("info", "You Should Enter All Dimensions And Length Class");

        return;
      }
    }

    if (values.specificationWeight && !values.specificationWeightClass) {
      openNotificationWithIcon("info", "You Should Enter Weight Class");
      return;
    }

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
      children: <StockTab form={form} />,
    },
    {
      key: "4",
      label: `Specification`,
      forceRender: true,
      children: <SpecificationTab virtual={virtual} />,
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Tabs defaultActiveKey="1" className="inner-tab data-tab" items={items} />
      <Form.Item>
        <Row justify="end">
          <AddProductButton
            htmlType="submit"
            onClick={() => checkFileds(form)}
            cancel={onClose}
            addName="Next"
          />
        </Row>
      </Form.Item>
    </Form>
  );
}
