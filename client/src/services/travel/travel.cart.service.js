import axios from "axios";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const getCart = (customerId, token) => {
  return axios
    .get(
      import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + `dashboard/cart/get-by-customerId/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const checkoutCart = (customerId, token) => {
  return axios
    .get(import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + `dashboard/cart/checkout-cart/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const TravelCartService = {
  getCart,
  checkoutCart,
};

export default TravelCartService;
