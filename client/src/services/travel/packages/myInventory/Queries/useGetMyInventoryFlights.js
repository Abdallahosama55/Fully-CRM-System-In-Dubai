import { QUERY_KEY } from "services/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import PackagesMyInventoryService from "../my_Inventory.service";

export default function useGetMyInventoryFlights(params, config = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_MY_INVENTORY_FLIGHTS, params],
    queryFn: ({ pageParam }) => {
      return PackagesMyInventoryService.getFlights({
        ...params,
        page: pageParam,
        size: 10,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (
        !lastPage ||
        !lastPage?.count ||
        !lastPage?.rows ||
        !lastPage?.rows?.length === 0 ||
        allPages?.length * 10 >= lastPage?.count
      ) {
        return null;
      }
      return allPages?.length + 1;
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_MY_INVENTORY_FLIGHTS, params] };
}
