import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";

const BASE = "/setting/city-area";

const listAreas = (params) => {
  console.log("params", params);
  return TravelDashboardAPI.get(BASE + "/list", { params: { ...params } })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

const addArea = (payload) => {
  return TravelDashboardAPI.post(BASE + "/add", { ...payload })
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(
        Array.isArray(error.response.data.errors) && error.response.data.errors?.length > 0
          ? error.response.data.errors[0]
          : "Something went wrong with the server",
      );
    });
};

const AreaService = {
  listAreas,
  addArea,
};

export default AreaService;
