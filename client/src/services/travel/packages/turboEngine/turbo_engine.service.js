import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const COMMON_BASE = "/package/turbo-engine";
const getAccommodations = async (params) => {
  return TravelDashboardAPI.get(COMMON_BASE + "/accommodation/get-hotel-rooms", { params })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addAccommodationToLibrary = async (payload) => {
  return TravelDashboardAPI.post(
    COMMON_BASE + `/accommodation/add-to-library/${payload?.tripId}`,
    payload,
  )
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getExperiences = async (params) => {
  return TravelDashboardAPI.get(COMMON_BASE + "/experience/search", { params })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      // mock until deploy
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addExperienceToLibrary = async (payload) => {
  return TravelDashboardAPI.post(
    COMMON_BASE + `/experience/add-to-library/${payload?.tripId}`,
    payload,
  )
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getTransfers = async (params) => {
  const newRequet = {
    ...params,
    from: JSON.stringify(params?.from),
    to: JSON.stringify(params?.to),
  };

  return TravelDashboardAPI.get(COMMON_BASE + "/transfer/search", { params: newRequet })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addTransferToLibrary = async (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + `/transfer/add-to-library/${payload?.tripId}`, {
    ...payload,
    tripId: undefined,
    type: undefined,
  })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getFlights = async (params) => {
  return TravelDashboardAPI.get(COMMON_BASE + "/charter/search", { params: params })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addFlightToLibrary = async (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + `/charter/add-to-library/${payload?.tripId}`, {
    ...payload,
    tripId: undefined,
    type: undefined,
  })
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const PackagesTurboEngineService = {
  getAccommodations,
  addAccommodationToLibrary,
  getExperiences,
  addExperienceToLibrary,
  getTransfers,
  addTransferToLibrary,
  getFlights,
  addFlightToLibrary,
};

export default PackagesTurboEngineService;
