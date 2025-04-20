import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventSessionsService from "../event-sessions.service";

export default function useGetEventSessions(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_SESSIONS , params],
        queryFn: () => EventSessionsService.getEventSessions(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_SESSIONS , params] };
}
