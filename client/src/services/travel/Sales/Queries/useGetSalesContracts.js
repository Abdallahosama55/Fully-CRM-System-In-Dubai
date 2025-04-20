import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import SalesAPI from "services/travel/sales.service";

export default (params = {}, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.SALES_CONTRACTS, params],
    queryFn: () => SalesAPI.getSalesContracts(params),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.SALES_CONTRACTS, params] };
};
