import { axiosCatch } from "utils/axiosUtils";
import { TravelDashboardAPI } from "../config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
const BASE_URL = "transfer";
const getVehicleTypes = () => {
  return TravelDashboardAPI.get(BASE_URL + `/list-vehicle-type`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getVehicleBrands = () => {
  return TravelDashboardAPI.get(BASE_URL + `/list-vehicle-brand`)
    .then((res) => {
      return res?.data?.data?.rows;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};


const getVehicleBrandModels = (params) => {
  console.log({params})
  return TravelDashboardAPI.get(BASE_URL + `/search-car-model` , {params : params})
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getVehicleById = (id) => {
  return TravelDashboardAPI.get(BASE_URL + `/get-vehicle-by-id/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      axiosCatch(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getVehicleList = (params = {}) => {
  return TravelDashboardAPI.get(BASE_URL + `/list-vehicle`, { params })
    .then((res) => {
      return {
        rows: res?.data?.data?.rows,
        total: res?.data?.data?.count,
      }
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};


const addVehicle = (request) => {
  return TravelDashboardAPI.post(BASE_URL + `/add-vehicle`, request)
    .catch((error) => {
      axiosCatch(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};


const editVehicle = (id, data) => TravelDashboardAPI.put(BASE_URL + `/edit-vehicle/${id}`, data)
  .catch((error) => {
    axiosCatch(error);
    throw new Error(responseErrorMessageExtractor(error));
  });

const deleteVehicle = (id) => TravelDashboardAPI.delete(BASE_URL + `/delete-vehicle/${id}`)
  .then((res) => {
    return res.data.data;
  })
  .catch((error) => {
    axiosCatch(error);
    throw new Error(responseErrorMessageExtractor(error));
  });

const TransferService = {
  getVehicleTypes,
  getVehicleBrands,
  getVehicleBrandModels,
  getVehicleById,
  getVehicleList,
  addVehicle,
  editVehicle,
  deleteVehicle,
  getVehicleById,
};
export default TransferService;
