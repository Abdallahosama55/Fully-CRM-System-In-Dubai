import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TransferService from "../transfer.service";

export default (params, config = {}) => {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.VEHICLE_BRAND_MODELS, params],
    queryFn: ({ pageParam }) =>
      TransferService.getVehicleBrandModels({ ...params, page: pageParam, size: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return null;
      if (config?.onNextPage && typeof config?.onNextPage === "function") {
        config?.onNextPage();
      }
      return allPages?.length + 1;
    },
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.VEHICLE_BRAND_MODELS, params] };
};
