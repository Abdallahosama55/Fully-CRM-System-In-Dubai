import { Form, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import AddCancelButtons from "components/common/AddCancelButtons";
import { useContext, useState } from "react";
import { useNotification } from "context/notificationContext";
import ProductsService from "services/product.service";
import checkFileds from "utils/checkFields";
import { getSpecial } from "utils/productVariations";
import userContext from "context/userContext";
import { useDrawer } from "hooks/useDrawer";

export default function AREffectTab({
  setRefresh,
  language,
  setProductData,
  productData,
  onClose,
}) {
  const { openNotificationWithIcon } = useNotification();
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState();
  const { user } = useContext(userContext);
  const DrawerAPI = useDrawer();

  const onFinish = (values) => {
    const { specialPrice, specialQuantityPrice } = getSpecial(productData);
    let productTranslationCopy = productData.productTranslations?.slice();
    language.forEach((lang) => {
      if (productTranslationCopy[lang.code]) {
        productTranslationCopy[lang.code].tags = JSON.parse(
          productTranslationCopy[lang.code].tags ?? "[]",
        ).join(" ");
      }
    });

    let productText = productTranslationCopy
      .map((lang) => Object.values(lang)?.map((x) => x?.toString()))
      .flat()
      .filter(Boolean);
    // eslint-disable-next-line array-callback-return

    productText = productText.map((e) => {
      if (e) {
        return e.trim();
      }
    });
    const sendData = {
      options: "",
      modelNumber: productData.model,
      isDownloadAbel: productData.isDownloadAbel ? true : false,
      location: productData.location,
      taxId: productData.taxId,
      status: "Active",
      lengthClass: productData.specificationLengthClass,
      weightClass: productData.specificationWeightClass,
      shippingClass: productData.specificationShippingClass,
      sortOrder: productData.specificationSortOrder,
      brandId: productData.linksBrand,
      categories: productData.linksCategories,
      subCategories: productData.linksSubCategories,
      label: productData.linksLabels,
      productTranslation: productData.productTranslation,
      links: productData.links || [],

      // customTab: productData.customTab,

      productVariant: [
        {
          id: productData.productVariants[0].id,
          dimensions: `${productData.specificationLength}x${productData.specificationWidth}x${productData.specificationHeight}`,
          weight: productData.specificationWeight,
          SKU: productData.sku || undefined,
          libraryId: productData.ownModel,
          AREffectId: null,
          price: productData.Price,
          prices: productData.prices,
          customTab: productData.customTab,
          quantity: productData.stockQuantityLimit,
          minimumQuantity: productData.stockMinimumQuantity,
          // type: productData.isVirtual ? 'virtual' : 'simple',
          searchKeys:
            [...new Set(productText)]
              .map((word) => word.toLowerCase())
              .join(" ")
              .split(" ")
              .sort()
              .join(" ") || "",
          barCode: "",
          title: productData.productTranslation[user?.languageCode].name,
          colorCode: "",
          name: "",
          productSpecialPrice: JSON.stringify(specialPrice),
          productSpecialQuantityPrice: JSON.stringify(specialQuantityPrice),
          dateAvailable: productData.stockDateAvailable,
          images: productData.images || [],
        },
      ],
    };
    ProductsService.editProduct(productData.id, sendData)
      .then(({ data }) => {
        openNotificationWithIcon("success", undefined, "Product Edit Successfully ✔");

        onClose();
        setRefresh((prve) => !prve);
        setIsLoading(false);
        DrawerAPI.handleSetDestroyOnClose(true);
      })
      .catch((error) => {
        setIsLoading(false);
        openNotificationWithIcon("error", undefined, "Something  wrong");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {DrawerAPI.Render}
      <Typography.Title>AR Effect</Typography.Title>
      <Form.Item>
        <Row justify="end">
          <AddCancelButtons
            cancel={onClose}
            addName="Finish"
            htmlType="submit"
            addLoading={isLoading}
            add={() => checkFileds(form)}
          />
        </Row>
      </Form.Item>
    </Form>
  );
}
