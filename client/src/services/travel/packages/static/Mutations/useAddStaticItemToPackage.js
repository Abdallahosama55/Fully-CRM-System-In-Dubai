import { useMutation } from "@tanstack/react-query";
import { TravelDashboardAPI } from "services/travel/config";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
const COMMON_BASE = "/package/static";

const addStaticItemToLibrary = async (payload) => {
  return TravelDashboardAPI.post(COMMON_BASE + `/add-item`, payload)
      .then((res) => {
          return res?.data?.data;
      })
      .catch((error) => {
        throw new Error(responseErrorMessageExtractor(error));
      });
}

export default (config) => {
  const mutatino = useMutation({
    mutationFn: (data) => addStaticItemToLibrary(data),
    ...config,
  });

  return mutatino;
};
