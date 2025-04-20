import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import CustomerDeskService from "../customerDesk.service";

export default (type, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.CUSTOMER_DESK, type],
    queryFn: () => CustomerDeskService.get(type),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.CUSTOMER_DESK, type] };
};
