import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationAPI from "../../accommodation.service";

export default function useGetHotelListByCity(params, config = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_HOTEL_LIST_BY_CITY, params],
    queryFn: ({ pageParam = 1 }) =>
      AccommodationAPI.getHotelListByCity({ ...params, page: pageParam, size: 30 }),
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

  return { ...query, key: [QUERY_KEY.GET_HOTEL_LIST_BY_CITY, params] };
}
