import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventSessionsService from "../event-sessions.service";

export default function useGetEventSessionById(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_SESSION_BY_ID , params],
        queryFn: () => EventSessionsService.getEventSessionById(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_SESSION_BY_ID , params] };
}
