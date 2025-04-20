import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesCommonService from "../common.service";

export default (params, config = {}) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.PACKAGES_LIST_DESTINATIONS, params],
    queryFn: ({ pageParam }) => PackagesCommonService.listDestinations({ ...params, page: pageParam, size: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage || lastPage.length === 0) return null
      return lastPageParam + 1
    },
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.PACKAGES_LIST_DESTINATIONS, params] };
};
