import axios from "axios";
import { API_BASE } from "./config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const SERVICE_BASE = API_BASE + "customer/cart/";
const UNAUTH_BASE = API_BASE + "vindo/unauth/";

const list = () => {
  return axios.get(SERVICE_BASE + `list`);
};

const getCompnayProducts = ({
  offset = 0,
  limit = 100,
  name = "",
  mainCategory = [],
  subCategory = [],
  sortBy = "",
  companyId,
}) => {
  return axios
    .get(
      UNAUTH_BASE +
        `get-company-products?name=${name}&mainCategory=${mainCategory}&subCategory=${subCategory}&sortBy=${sortBy}&limit=${limit}&offset=${offset}&companyId=${companyId}`,
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getCategories = (companyId) => {
  return axios
    .get(UNAUTH_BASE + `get-categories?companyId=${companyId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const add = ({ quantity, productId, productVariantId }) => {
  return axios.post(SERVICE_BASE + `add`, { quantity, productId, productVariantId });
};
const edit = ({ quantity, productVariantId }) => {
  return axios.put(SERVICE_BASE + `edit`, { quantity, productVariantId });
};

const deleteCart = () => {
  return axios.delete(SERVICE_BASE + `delete`);
};

const deleteById = (productVariantId) => {
  return axios.delete(SERVICE_BASE + `delete-by-id/${productVariantId}`);
};

const CustomerCartService = {
  list,
  add,
  edit,
  deleteCart,
  deleteById,
  getCompnayProducts,
  getCategories,
};

export default CustomerCartService;
