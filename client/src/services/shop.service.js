import axios from "axios";
import { API_BASE } from "./config";

const SERVICE_BASE = API_BASE + "vindo/shop/product/";
const COMMON_BASE = API_BASE + "vindo/shop/common/";
const CART_BASE = API_BASE + "vindo/shop/cart/";

const getProductList = ({
  offset = 0,
  limit = 100,
  name = "",
  mainCategory = [],
  subCategory = [],
  sortBy = "",
}) => {
  return axios.get(
    SERVICE_BASE +
      `get-products?limit=${limit}&offset=${offset}&name=${name}&mainCategory=${mainCategory}&subCategory=${subCategory}&sortBy=${sortBy}`,
  );
};

const getProductById = (productId) => {
  return axios.get(SERVICE_BASE + `get-product/${productId}`);
};

const getCategories = () => {
  return axios.get(COMMON_BASE + "get-categories");
};

const getMyProductList = ({
  offset = 0,
  limit = 1000,
  name = "",
  mainCategory = [],
  subCategory = "",
  sortBy = "",
}) => {
  console.log("offset", offset);
  return axios.get(
    SERVICE_BASE +
      `get-my-products?name=${name}&mainCategory=${mainCategory}&subCategory=${subCategory}&sortBy=${sortBy}&limit=${limit}&offset=${offset}`,
  );
};

const addSupport = (data) => {
  return axios.post(CART_BASE + "add-edit-quantity-support", data);
};

const getCartData = () => {
  return axios.get(CART_BASE + "list");
};

const ShopService = {
  getProductList,
  getProductById,
  getCategories,
  getMyProductList,
  addSupport,
  getCartData,
};
export default ShopService;
