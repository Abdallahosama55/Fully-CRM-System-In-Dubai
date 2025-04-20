import { notification } from "antd";
import { increment, ref, update } from "firebase/database";
import ShopService from "services/shop.service";
import { axiosCatch } from "utils/axiosUtils";

const addToCart = async ({
  customerId,
  setAddLoading,
  productData,
  productQuantity,
  currentProductVariant,
  db,
  user,
  meetingId,
  isAgent = false,
}) => {
  try {
    if (!isAgent) {
      setAddLoading({ id: customerId, loading: true });
    }
    await ShopService.addSupport({
      productId: productData.id,
      quantity: productQuantity,
      productVariantId: currentProductVariant.id,
      customerId,
    });
    notification.success({ message: "Product added successfully ✔" });

    const addedToCartRef = ref(
      db,
      `Company/${user.companyId}/meeting/${meetingId}/settings/addedToCart`,
    );
    let updates = {};

    updates[`/${customerId}`] = increment(1);

    update(addedToCartRef, updates);
  } catch (err) {
    axiosCatch(err);
    console.log(err);
  } finally {
    if (!isAgent) {
      setAddLoading({ id: customerId, loading: false });
    }
  }
};

const askForCounter = ({
  changeSettings,
  counterActiveBtn,
  fileName,
  customField,
  price,
  sameCounterCliked,
  users = "All",
}) => {
  changeSettings("counter", {
    users: users,
    dataAskedFor: JSON.stringify({
      formData: {
        type: counterActiveBtn,
        message: `${
          counterActiveBtn === 1
            ? "Full Name"
            : counterActiveBtn === 2
            ? "Signture file"
            : counterActiveBtn === 3
            ? fileName + " file"
            : counterActiveBtn === 5
            ? "Payment"
            : customField
        }`,
        fileName: fileName,
        customField: customField,
        price: price,
        bla: sameCounterCliked,
      },
    }),
  });
};

export { addToCart, askForCounter };
