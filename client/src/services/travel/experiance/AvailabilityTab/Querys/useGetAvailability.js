import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetAvailability(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_AVAILABILITY],
    queryFn: () => AvailabilityService.getAvailability(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_AVAILABILITY] };
}
