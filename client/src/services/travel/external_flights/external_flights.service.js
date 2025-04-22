import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../config";

const BASE = "/tbo-flight";

const getSearchFlight = (params = {}) =>
  TravelDashboardAPI.get(BASE + "/search", {
    params,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });

const calculatePriceCost = (params = {}) => {
  return TravelDashboardAPI.get(BASE + `/calculate-price-coast/${params?.id}`, {
    params,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getListFlight = (params = {}) => {
  return TravelDashboardAPI.get(BASE + "/list-flight", { params })
    .then((res) => {
      return {
        rows: res?.data?.data?.rows,
        total: res?.data?.data?.count,
      };
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const bookFlight = (payload) => {
  return TravelDashboardAPI.post(BASE + "/book-flight", payload);
};

const ExternalFlightService = {
  getSearchFlight,
  calculatePriceCost,
  bookFlight,
  getListFlight,
};

export default ExternalFlightService;
