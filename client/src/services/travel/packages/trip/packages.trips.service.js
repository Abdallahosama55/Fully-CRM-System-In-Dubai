import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const COMMON_BASE = "/package/trip";

const listTrips = (params) => {
  return TravelDashboardAPI.get(COMMON_BASE + "/list", { params })
    .then((res) => {
      return { rows: res?.data?.data?.rows, total: res?.data?.data?.count };
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getTripById = (id) => {
  return TravelDashboardAPI.get(COMMON_BASE + `/get-by-id/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addTrip = (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + `/add`, payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const editTrip = (payload) => {
  return TravelDashboardAPI.put(COMMON_BASE + `/edit/${payload?.id}`, payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const updateTripStatus = (tripId) => {
  return TravelDashboardAPI.put(COMMON_BASE + `/update-status?tripId=${tripId}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const deleteTrip = (id) => {
  return TravelDashboardAPI.delete(COMMON_BASE + `/delete/${id}`)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addDescription = ({ tripId, ...payload }) => {
  return TravelDashboardAPI.put(COMMON_BASE + `/add-description/${tripId}`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getDescription = (tripId) => {
  return TravelDashboardAPI.get(COMMON_BASE + `/get-description/${tripId}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const PackagesTripService = {
  addTrip,
  editTrip,
  listTrips,
  getTripById,
  deleteTrip,
  updateTripStatus,

  addDescription,
  getDescription,
};

export default PackagesTripService;
