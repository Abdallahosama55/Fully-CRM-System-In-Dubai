import { QUERY_KEY } from "services/constants";
import PackagesTurboEngineService from "../turbo_engine.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetTurboEngineTransfers(params, config = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_TURBO_ENGINE_TRANSFERS, params],
    queryFn: ({ pageParam }) => {
      console.log({pageParam});
      return PackagesTurboEngineService.getTransfers({
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
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_TURBO_ENGINE_TRANSFERS, params] };
}
