import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BOOKING_BASE = "/package/booking";
// GET PACKAGE SEARCH RESULTS
const getPackageSearchResults = (params) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/search`, { params: { ...params } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// CUSTOMIZE-TRIP
const customizeTrip = ({ tripId, ...payload }) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/customize-trip?tripId=${tripId}`, {
    tripId,
    ...payload,
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

// GET-PACKAGE-DETAILS
const getPackageDetails = (id) => {
  return TravelDashboardAPI.get(BOOKING_BASE + `/get-package-details?id=${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getFinalPrice = (payload) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/get-final-price`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const checkPackageAvailability = (payload) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/check-package-availability`, payload)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const bookPackage = (payload) => {
  return TravelDashboardAPI.post(BOOKING_BASE + `/book`, payload)
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      throw new Error(responseErrorMessageExtractor(error));
    });
};
const PackageBookingService = {
  getPackageSearchResults,
  customizeTrip,
  getPackageDetails,
  getFinalPrice,
  checkPackageAvailability,
  bookPackage,
};

export default PackageBookingService;
