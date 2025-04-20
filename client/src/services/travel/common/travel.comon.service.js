import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
import { TravelDashboardAPI } from "../config";

const airportsAccommodationList = (data) => {
  return TravelDashboardAPI.get(`/common/list-airports-accomodations`, {
    params: { ...data },
  })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const TravelCommonService = {
    airportsAccommodationList
}

export default TravelCommonService;