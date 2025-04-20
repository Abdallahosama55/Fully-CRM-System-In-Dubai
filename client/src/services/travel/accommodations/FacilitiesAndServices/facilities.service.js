import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../../config";
const COMMON_BASE = "/accommodation/common";
const FACILITIES_BASE = "/accommodation/facilities";

const listFacilities = () => {
  return TravelDashboardAPI.get(COMMON_BASE + "/list-facilities/")
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addFacilitie = (id, data) => {
  return TravelDashboardAPI.post(FACILITIES_BASE + `/add/${id}`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getFacilitieById = (id) => {
  return TravelDashboardAPI.get(FACILITIES_BASE + `/get/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const FacilitiesAndService = {
  listFacilities,
  addFacilitie,
  getFacilitieById,
};

export default FacilitiesAndService;
