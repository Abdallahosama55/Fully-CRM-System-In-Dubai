import axios from "axios";
import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const QUOTATION_BASE = "/quotation";
const QUOTATION_BASE_B2C = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT + "b2c/quotation";
// CREATE EMPTY QUOTATION
const createQuotation = (payload) => {
  return TravelDashboardAPI.post(QUOTATION_BASE + `/add`, { ...payload })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// ADD TRAVEL ITEM TO QUOTATION
const addToQuotation = (payload) => {
  return TravelDashboardAPI.post(QUOTATION_BASE + `/add-to-quotation`, { ...payload })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// LIST QUOTATIONS
const listQuotations = (params) => {
  return TravelDashboardAPI.get(QUOTATION_BASE + `/list`, { params: { ...params } })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getQuotationById = (id) => {
  return TravelDashboardAPI.get(QUOTATION_BASE + `/get-quotation-data/${id}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getQuotationByIdB2C = (id) => {
  return axios
    .get(QUOTATION_BASE_B2C + `/get-quotation-data/${id}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const deleteQuotationItem = (id) => {
  return TravelDashboardAPI.delete(QUOTATION_BASE + `/delete-item/${id}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const bookQuotation = (payload) => {
  return TravelDashboardAPI.post(QUOTATION_BASE + `/book`, payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log();
      throw new Error(
        Array.isArray(error.response?.data?.errors)
          ? error.response?.data?.errors[0]
          : error?.response?.data?.message || "something went wrong with the server",
      );
    });
};

const approveQuotationB2C = (id) => {
  return TravelDashboardAPI.post(QUOTATION_BASE_B2C + `/approve/${id}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log();
      throw new Error(
        Array.isArray(error.response?.data?.errors)
          ? error.response?.data?.errors[0]
          : error?.response?.data?.message || "something went wrong with the server",
      );
    });
};

const QuotationService = {
  createQuotation,
  addToQuotation,
  listQuotations,
  getQuotationById,
  deleteQuotationItem,
  bookQuotation,

  getQuotationByIdB2C,
  approveQuotationB2C,
};

export default QuotationService;
