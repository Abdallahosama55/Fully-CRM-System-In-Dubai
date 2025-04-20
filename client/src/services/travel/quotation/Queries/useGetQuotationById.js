import { QUERY_KEY } from "services/constants";
import QuotationService from "../quotation.service";
import { useQuery } from "@tanstack/react-query";

export function useGetQuotationById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_QUOTATION_BY_ID, id],
    queryFn: () => {
      return QuotationService.getQuotationById(id);
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_QUOTATION_BY_ID, id] };
}
