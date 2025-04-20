import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useGetCustomerProperties(params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.CUSTOMER_PROPERTIES],
    queryFn: () => CustomerLeadBoardService.getCustomerProperties(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.CUSTOMER_PROPERTIES] };
}
