import { TravelDashboardAPI } from "../config";
const BASE = "/setting/";

const getAllAirports = (
  params = {
    size: 10,
    page: 1,
  },
) => TravelDashboardAPI.get(BASE + `airport/get`, { params: { page: 1, size: 10, ...params } });
const searchAirports = (name) => {
  return TravelDashboardAPI.get(`/charter/search-airport?name=${name}`)
};

const getAirlineCompanies = (params = { page: 1, size: 10 }) =>
  TravelDashboardAPI.get(BASE + "airline-company/get", {
    params: { page: 1, size: 10, ...params },
  });
const addAirlineCompany = (data) => TravelDashboardAPI.post(BASE + "airline-company/add", data);
const addAirport = (data) => TravelDashboardAPI.post(BASE + "airport/add", data);

const editAirlineCompany = (id, data) =>
  TravelDashboardAPI.put(BASE + "airline-company/edit/" + id, data);

const editAirport = (id, data) => TravelDashboardAPI.put(BASE + "airport/edit/" + id, data);

const editStatusAirlineCompany = (id, data) =>
  TravelDashboardAPI.patch(BASE + "airline-company/edit-active-status/" + id, data);

const editStatusAirport = (id, data) =>
  TravelDashboardAPI.patch(BASE + "airport/edit-active-status/" + id, data);

const deleteAirlineCompany = (id) =>
  TravelDashboardAPI.delete(BASE + `airline-company/delete/${id}`);

const deleteAirport = (id) => TravelDashboardAPI.delete(BASE + `airport/delete/${id}`);

const TravelSettingsService = {
  ///Queries
  getAllAirports,
  getAirlineCompanies,
  searchAirports,
  ///Mutations
  addAirlineCompany,
  editAirlineCompany,
  deleteAirlineCompany,
  editStatusAirport,
  editStatusAirlineCompany,
  deleteAirport,
  addAirport,
  editAirport,
};

export default TravelSettingsService;
