import { axiosCatch } from "utils/axiosUtils";
import { TravelDashboardAPI } from "../config";
const BASE_URL = "operations";

const operationsSearch = (request, params) => {
  return TravelDashboardAPI.post(BASE_URL + `/search-v2`, request, { params: params }).catch(
    (error) => {
      axiosCatch(error);
      throw new Error(error.response.data.message || "something went wrong with the server");
    },
  );
};
const exportToExcel = (request, params) => {
  return TravelDashboardAPI.post(BASE_URL + `/search-v2`, request, {
    params: params,
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_data.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      axiosCatch(error);
      throw new Error(error.response.data.message || "something went wrong with the server");
    });
};

const operatinsService = {
  operationsSearch,
  exportToExcel,
};
export default operatinsService;
