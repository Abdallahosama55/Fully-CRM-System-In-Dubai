import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetSessions(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_SESSIONS],
    queryFn: () => AvailabilityService.getSessions(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_SESSIONS] };
}
