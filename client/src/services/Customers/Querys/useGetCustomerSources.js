import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import CustomerService from "../customer.service";
import { QUERY_KEY } from "services/constants";

export default function useGetCustomerSources(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.CUSTOMER_SOURCES, id],
    queryFn: () => CustomerService.getSources(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.CUSTOMER_SOURCES, id] };
}

export const useGetCustomerSourcesSuspense = (id, config = {}) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.CUSTOMER_SOURCES, id],
    queryFn: () => CustomerService.getSources(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.CUSTOMER_SOURCES, id] };
};
