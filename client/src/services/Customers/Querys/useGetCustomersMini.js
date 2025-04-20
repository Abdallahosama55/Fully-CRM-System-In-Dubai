import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerService from "../customer.service";

export default function useGetCustomersMini(params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.CUSTOMERS_MINI, params],
    queryFn: () => CustomerService.getAllMini(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.CUSTOMERS_MINI, params] };
}
