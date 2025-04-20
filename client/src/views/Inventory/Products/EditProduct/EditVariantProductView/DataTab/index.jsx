import { useContext, useEffect } from "react";
import { Form, Row, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";

import checkFileds from "utils/checkFields";
import ModelTab from "./ModelTab";
import PriceTab from "./PriceTab";
import SpecificationTab from "./SpecificationTab";
import StockTab from "./StockTab";
import dayjs from "dayjs";
import AddProductButton from "components/common/AddProductButton";
import userContext from "context/userContext";

export default function DataTab({
  setFormActiveTabs,
  setTabActiveKey,
  productData,
  setProductData,
  onClose,
  priceCurrency,
}) {
  const [form] = useForm();
  const { user } = useContext(userContext);

  useEffect(() => {
    if (productData.productVariants[0]?.price) {
      form.setFieldValue(`price${user.cuurencyCode}`, productData?.productVariants[0]?.price);
      if (productData.productVariants[0].prices) {
        const Prices = JSON.parse(productData.productVariants[0].prices);
        Prices.forEach((price) => {
          form.setFieldValue(`price${price.key}`, price.value);
        });
      }
      form.setFieldValue("taxId", productData.taxId);

      productData.productVariants[0].dateAvailable &&
        form.setFieldValue(
          "stockDateAvailable",
          dayjs(productData.productVariants[0].dateAvailable),
        );
      form.setFieldValue("specificationSortOrder", productData.sortOrder);
      form.setFieldValue("specificationLengthClass", productData.lengthClass);
      form.setFieldValue("specificationWeightClass", productData.weightClass);
      form.setFieldValue("specificationShippingClass", productData.shippingClass);
      form.setFieldValue("model", productData.modelNumber);
      form.setFieldValue("location", productData.location);
    }
  }, [form, productData]);

  const onFinish = (values) => {
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
    setProductData((prev) => ({ ...prev, ...newValues }));
    setFormActiveTabs((prev) => [...prev, "links"]);
    setTabActiveKey("3");
  };

  const items = [
    {
      key: "1",
      label: `Price`,
      children: <PriceTab priceCurrency={priceCurrency} />,
      forceRender: true,
    },
    {
      key: "2",
      label: `Model`,
      children: <ModelTab />,
      forceRender: true,
    },
    {
      key: "3",
      label: `Stock`,
      children: <StockTab />,
      forceRender: true,
    },
    {
      key: "4",
      label: `Specification`,
      children: <SpecificationTab />,
      forceRender: true,
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Tabs defaultActiveKey="1" className="data-tab" items={items} />

      <Form.Item>
        <Row justify="end">
          <AddProductButton
            addName="Next"
            cancel={onClose}
            htmlType="submit"
            onClick={() => checkFileds(form)}
          />
        </Row>
      </Form.Item>
    </Form>
  );
}
