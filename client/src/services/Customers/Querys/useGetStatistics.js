import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CustomerService from "../customer.service";

export default function useGetStatistics(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.CUSTOMER_STATISTICS, id],
    queryFn: () => CustomerService.getStatistics(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_STATISTICS] };
}

export const useGetStatisticsSuspense = (id, config = {}) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.CUSTOMER_STATISTICS, id],
    queryFn: () => CustomerService.getStatistics(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_STATISTICS] };
};
