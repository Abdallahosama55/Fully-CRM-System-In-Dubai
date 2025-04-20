import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerService from "../customer.service";

export default function useGetCustomerById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_CUSTOMER_BY_ID, id],
    queryFn: () => CustomerService.getById(id),
    enabled: !!id,
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_CUSTOMER_BY_ID, id] };
}

export const useGetCustomerByIdSuspense = (id, config = {}) => {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.GET_CUSTOMER_BY_ID, id],
    queryFn: () => CustomerService.getById(id),
    enabled: !!id,
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_CUSTOMER_BY_ID, id] };
};
