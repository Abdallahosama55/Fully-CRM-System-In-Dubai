import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import AvailabilityService from "../availability.service";

export default function useGetSessionById(sessionId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_SESSIONS_BY_ID],
    queryFn: () => AvailabilityService.getSessionById(sessionId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_SESSIONS_BY_ID] };
}
