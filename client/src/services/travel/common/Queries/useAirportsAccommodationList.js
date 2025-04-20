import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TravelCommonService from "../travel.comon.service";
const PAGE_SIZE = 30;
export default (params = {}, config = {}) => {
  const query = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      TravelCommonService.airportsAccommodationList({
        ...params,
        page: pageParam,
        size: PAGE_SIZE,
      }),
    queryKey: [QUERY_KEY.AIRPORTS_ACCOMMODATION_LIST, params],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.count || lastPage?.count < allPages?.length * PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY.AIRPORTS_ACCOMMODATION_LIST, params] };
};
