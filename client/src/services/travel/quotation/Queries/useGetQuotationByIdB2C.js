import QuotationService from "../quotation.service";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export function useGetQuotationByIdB2C(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY_CLIENT.GET_QUOTATION_BY_ID, id],
    queryFn: () => {
      return QuotationService.getQuotationByIdB2C(id);
    },
    ...config,
  });
  return { ...query, key: [QUERY_KEY_CLIENT.GET_QUOTATION_BY_ID, id] };
}
