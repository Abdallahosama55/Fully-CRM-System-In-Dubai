import { QUERY_KEY } from "services/constants";
import QuotationService from "../quotation.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export default function useListQuotations(params, config = {}) {
  const query = useInfiniteQuery({
    queryKey: [QUERY_KEY.LIST_QUOTATIONS, params],
    queryFn: ({ pageParam }) => {
      return QuotationService.listQuotations({
        ...params,
        status: "NEW",
        page: pageParam,
        size: 30,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage?.currentPage === lastPage?.totalPages) return null;
      return lastPage?.currentPage + 1;
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY.LIST_QUOTATIONS, params] };
}

export function useListQuotationsWithPagination(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.LIST_QUOTATIONS_WITH_PAGINATION, params],
    queryFn: () => {
      return QuotationService.listQuotations({
        ...params,
      });
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY.LIST_QUOTATIONS_WITH_PAGINATION, params] };
}
