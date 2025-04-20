import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetProductDuration(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PRODUCTION_DURATION],
    queryFn: () => AvailabilityService.getProductDuration(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PRODUCTION_DURATION] };
}
