import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TransferService from "../transfer.service";

export default (params = {}, config = {}) => {
  const query = useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      TransferService.getVehicleList({ ...params, page: pageParam, size: 30 }),
    queryKey: [QUERY_KEY.INFINITE_VEHICLE_LIST, params],
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.totalPages || lastPage?.totalPages <= pages?.length) return undefined;
      return pages?.length + 1;
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY.INFINITE_VEHICLE_LIST, params] };
};
