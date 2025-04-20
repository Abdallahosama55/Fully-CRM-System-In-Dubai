import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerService from "../customer.service";

export default function useGetCustomers(params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.CUSTOMERS, params],
    queryFn: () => CustomerService.search(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.CUSTOMERS, params] };
}
