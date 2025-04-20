import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import customerActivityService from "../customerActitvity.services";

function useGetCustomerActivity(params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.CUSTOMER_ACTIVITY, params],
    queryFn: () => customerActivityService.getAllActivity(params),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.CUSTOMER_ACTIVITY, params] };
}
function useGetSuspenseCustomerActivity(params = {}, config = {}) {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.CUSTOMER_ACTIVITY, params],
    queryFn: () => customerActivityService.getAllActivity(params),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.CUSTOMER_ACTIVITY, params] };
}
export { useGetSuspenseCustomerActivity, useGetCustomerActivity };
