import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import responseErrorMessageExtractor from "utils/responseErrorMessageExtractor";
const SERVICE_BASE = import.meta.env.VITE_BASE_TRAVEL_ENDPOINT_DASHBOARD + "/unauth/";

const searchLocation = (payload) => {
  return axios
    .post(SERVICE_BASE + "search-location", payload)
    .then((res) => {
      return res?.data?.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(responseErrorMessageExtractor(error));
    });
};

export default (params, config = {}) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.UNAUTH_SEARCH_BY_LOCATION, params],
    queryFn: ({ pageParam }) => searchLocation({ ...params, page: pageParam, size: 30 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage?.totalPages || !allPages) return undefined;

      if (lastPage?.totalPages > allPages?.length) {
        return allPages?.length + 1;
      }

      return undefined;
    },
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.UNAUTH_SEARCH_BY_LOCATION, params] };
};
