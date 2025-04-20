import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../config";

const BASE = "/charter";

const getSearchFlight = (params = {}) =>
  TravelDashboardAPI.get(BASE + "/search-flight", {
    params,
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

const addFlight = (data) => TravelDashboardAPI.post(BASE + "/add-flight", data);
const deleteFlight = (id) => TravelDashboardAPI.delete(BASE + `/delete-flight/${id}`);
const deleteFlightGroup = (id) =>
  TravelDashboardAPI.delete(BASE + "/delete-flights-by-group/" + id);
const editFlight = (groupId, rest) =>
  TravelDashboardAPI.put(BASE + "/edit-flights/" + groupId, rest);

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

const ChartersService = {
  getSearchFlight,
  calculatePriceCost,
  deleteFlight,
  addFlight,
  editFlight,
  deleteFlightGroup,
  bookFlight,
  getListFlight,
};
export default ChartersService;
