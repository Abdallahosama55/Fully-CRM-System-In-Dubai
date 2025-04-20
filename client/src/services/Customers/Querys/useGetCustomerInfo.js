import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerService from "../customer.service";

export default function useGetCustomerInfo(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_CUSTOMER_BY_ID, id],
    queryFn: () => CustomerService.getById(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_CUSTOMER_BY_ID, id] };
}
