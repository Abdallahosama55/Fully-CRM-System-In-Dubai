import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const COMMON_BASE = "/package/departure";

const addDepartureDates = (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + `/add`, payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const getDepartureDates = (tripId) => {
    return TravelDashboardAPI.get(COMMON_BASE + `/get/${tripId}`)
      .then((res) => {
        return res?.data?.data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error(responseErrorMessageExtractor(error));
      });
  };
  
const PackagesDepartureService = {
    addDepartureDates,
    getDepartureDates
};

export default PackagesDepartureService;
