import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AreaService from "../area.service";

export default (params, config = {}) => {
  console.log("params FROM useListAreasInfinity", params);
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.LIST_AREAS, params],
    queryFn: ({ pageParam }) => AreaService.listAreas({ page: pageParam, size: 10, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.totalPages || !Array.isArray(allPages)) return undefined;

      if (lastPage.totalPages > allPages.length) {
        return allPages.length + 1;
      }
      return undefined; // Prevents unnecessary requests if all pages are loaded
    },
    ...config,
  });

  return { ...query, key: [QUERY_KEY.LIST_AREAS, params] };
};
