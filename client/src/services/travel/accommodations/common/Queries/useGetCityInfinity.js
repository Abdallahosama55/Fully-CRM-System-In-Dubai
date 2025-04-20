import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AccommodationAPI from "../../accommodation.service";
const PAGE_SIZE = 30;
export default function useGetCityInfinity(name, config = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_CITES_INFINITY, name],
    queryFn: ({ pageParam }) =>
      AccommodationAPI.getCites({ page: pageParam, size: PAGE_SIZE, name }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.totalPages > allPages?.length) {
        return allPages?.length + 1;
      }
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_CITES_INFINITY, name] };
}
