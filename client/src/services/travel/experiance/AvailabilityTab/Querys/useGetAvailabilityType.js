import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetAvailabilityType(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_AVAILABILITY_TYPE],
    queryFn: () => AvailabilityService.getAvailabilityType(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_AVAILABILITY_TYPE] };
}
