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
import { useNotification } from "context/notificationContext";
import userContext from "context/userContext";

export default function DataTab({
  virtual,
  setFormActiveTabs,
  setTabActiveKey,
  setProductData,
  productData,
  onClose,
  priceCurrency,
}) {
  const [form] = useForm();
  const { openNotificationWithIcon } = useNotification();
  const { user } = useContext(userContext);

  useEffect(() => {
    if (productData.productVariants[0].price) {
      let spPrice = [];
      let quPrice = [];

      if (productData.productVariants[0].productSpecialPrice) {
        spPrice = JSON.parse(productData.productVariants[0].productSpecialPrice);
      }

      if (productData.productVariants[0].productSpecialPrice) {
        quPrice = JSON.parse(productData.productVariants[0].productSpecialQuantityPrice);
      }

      form.setFieldValue(`price${user.cuurencyCode}`, productData.productVariants[0].price);
      if (productData.productVariants[0].prices) {
        const Prices = JSON.parse(productData.productVariants[0].prices);
        Prices.forEach((price) => {
          form.setFieldValue(`price${price.key}`, price.value);
        });
      }

      form.setFieldValue("taxId", productData.taxId);
      if (spPrice && spPrice.length > 0 && spPrice[0]) {
        form.setFieldValue("mainSpecialPrice", spPrice[0].price);
        form.setFieldValue("mainSpecialPriceDate", [
          dayjs(spPrice[0].startDate),
          dayjs(spPrice[0].endDate),
        ]);
        form.setFieldValue(
          "specialPrice",
          spPrice.splice(1, 1).map((sp) => ({
            specialPrice: sp.price,
            specialPriceDate: [dayjs(sp.startDate), dayjs(sp.endDate)],
          })),
        );
      }
      if (quPrice && quPrice.length > 0 && quPrice[0]) {
        form.setFieldValue("mainQuantity", quPrice[0].quantity);
        form.setFieldValue("mainQuantityPrice", quPrice[0].price);
        form.setFieldValue("mainQuantityPriceDate", [
          dayjs(quPrice[0].startDate),
          dayjs(quPrice[0].endDate),
        ]);
        form.setFieldValue(
          "quantityPrice",
          quPrice.splice(1, 1).map((qu) => ({
            quantity: qu.quantity,
            quantityPrice: qu.price,
            quantityPriceDate: [dayjs(qu.startDate), dayjs(qu.endDate)],
          })),
        );
      }

      productData.productVariants[0].quantity &&
        form.setFieldValue("stockQuantityLimit", productData.productVariants[0].quantity);
      productData.productVariants[0].minimumQuantity &&
        form.setFieldValue("stockMinimumQuantity", productData.productVariants[0].minimumQuantity);
      productData.productVariants[0].dateAvailable &&
        form.setFieldValue(
          "stockDateAvailable",
          dayjs(productData.productVariants[0].dateAvailable),
        );
      form.setFieldValue("specificationSortOrder", productData.sortOrder);
      form.setFieldValue("specificationLengthClass", productData.lengthClass);
      form.setFieldValue("specificationWeightClass", productData.weightClass);
      form.setFieldValue("specificationShippingClass", productData.shippingClass);
      form.setFieldValue("sku", productData.productVariants[0].SKU);
      form.setFieldValue("specificationWeight", productData.productVariants[0].weight);
      form.setFieldValue("model", productData.modelNumber);
      form.setFieldValue("location", productData.location);
      let dimensions = productData.productVariants[0].dimensions.split("x");
      form.setFieldValue(
        "specificationLength",
        dimensions[0] === "undefined" ? undefined : dimensions[0],
      );
      form.setFieldValue(
        "specificationWidth",
        dimensions[1] === "undefined" ? undefined : dimensions[1],
      );
      form.setFieldValue(
        "specificationHeight",
        dimensions[2] === "undefined" ? undefined : dimensions[2],
      );
    }
  }, [form, productData, user.cuurencyCode]);

  const onFinish = (values) => {
    if (values.specificationLength || values.specificationWidth || values.specificationHeight) {
      if (
        values.specificationLength &&
        values.specificationWidth &&
        values.specificationHeight &&
        values.specificationLengthClass
      ) {
      } else {
        openNotificationWithIcon(
          "info",
          undefined,
          "You Should Enter All Dimensions And Length Class",
        );

        return;
      }
    }

    if (values.specificationWeight && !values.specificationWeightClass) {
      openNotificationWithIcon("info", undefined, "You Should Enter Weight Class");
      return;
    }
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
    window.scrollTo({
      top: 10,
      left: 10,
      behavior: "smooth",
    });
  };

  const items = [
    {
      key: "1",
      forceRender: true,
      label: `Price`,
      children: <PriceTab productData={productData} priceCurrency={priceCurrency} />,
    },
    {
      key: "2",
      forceRender: true,
      label: `Model`,
      children: <ModelTab />,
    },
    {
      key: "3",
      forceRender: true,
      label: `Stock`,
      children: <StockTab form={form} />,
    },
    {
      key: "4",
      forceRender: true,
      label: `Specification`,
      children: <SpecificationTab virtual={virtual} />,
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
