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
  data,
  onClose,
  setProductsCount,
  setDisbaled,
  setProductsdata,
  language,
}) {
  const { openNotificationWithIcon } = useNotification();
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(userContext);
  const DrawerAPI = useDrawer();

  const onFinish = (values) => {
    setDisbaled(true);
    setLoading(true);
    const { specialPrice, specialQuantityPrice } = getSpecial(data);

    let productTranslationCopy = JSON.parse(JSON.stringify(data.productTranslation));
    language.forEach((lang) => {
      productTranslationCopy[lang.code].tags =
        productTranslationCopy[lang.code].tags &&
        JSON.parse(productTranslationCopy[lang.code].tags).join(" ");
    });

    let productText = Object.values(productTranslationCopy)
      .map((lang) => Object.values(lang))
      .flat()
      .filter(Boolean)
      // eslint-disable-next-line array-callback-return
      .map((e) => {
        if (e) {
          return e.trim();
        }
      });
    const sendData = {
      options: "",
      modelNumber: data.model,
      location: data.location,
      taxId: data.taxId,
      taxClass: data.taxClass,
      status: "Active",
      lengthClass: data.specificationLengthClass,
      weightClass: data.specificationWeightClass,
      shippingClass: data.specificationShippingClass,
      sortOrder: data.specificationSortOrder,
      brandId: data.linksBrand,
      categories: data.linksCategories,
      subCategories: data.linksSubCategories,
      lable: data.linksLabels,
      productTranslation: data.productTranslation,
      links: data.links || [],
      isDownloadAbel: data.isDownloadAbel ? true : false,

      productVariant: [
        {
          dimensions: `${data.specificationLength}x${data.specificationWidth}x${data.specificationHeight}`,
          weight: data.specificationWeight,
          SKU: data.sku,
          libraryId: data.ownModel,
          AREffectId: null,
          price: data.Price,
          quantity: data.stockQuantityLimit,
          minimumQuantity: data.stockMinimumQuantity,
          prices: data.prices,
          // type: data.isVirtual ? 'virtual' : 'simple',
          searchKeys:
            [...new Set(productText)]
              .map((word) => word.toLowerCase())
              .join(" ")
              .split(" ")
              .sort()
              .join(" ") || "",
          barCode: "",
          title: data.productTranslation?.[user?.languageCode]?.name,
          colorCode: "",
          name: "",
          productSpecialPrice: JSON.stringify(specialPrice),
          productSpecialQuantityPrice: JSON.stringify(specialQuantityPrice),
          dateAvailable: data.stockDateAvailable,
          images: data.images || [],
        },
      ],
    };

    ProductsService.addProduct(sendData)
      .then(({ data }) => {
        openNotificationWithIcon("success", "Product Added Successfully ✔");
        setProductsdata((prev) => [...prev, data.data.product]);
        setProductsCount((prev) => prev + 1);
        onClose();
        setDisbaled(false);
        setLoading(false);
        DrawerAPI.handleSetDestroyOnClose(true);
      })
      .catch((error) => {
        setLoading(false);
        openNotificationWithIcon("error", undefined, "Something  wrong");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setDisbaled(true);
      });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {DrawerAPI.Render}
      <div>
        <Typography.Title>AR Effect</Typography.Title>
      </div>
      <div>
        <Form.Item>
          <Row justify="end">
            <AddCancelButtons
              htmlType="submit"
              add={() => checkFileds(form)}
              cancel={onClose}
              addName="Save"
              addLoading={loading}
            />
          </Row>
        </Form.Item>
      </div>
    </Form>
  );
}
