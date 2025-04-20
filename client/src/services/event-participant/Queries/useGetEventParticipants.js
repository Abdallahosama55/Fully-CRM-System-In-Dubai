import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventParticipantsService from "../event-participant.service";

export default function useGetEventParticipants(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_PARTICIPANTS , params],
        queryFn: () => EventParticipantsService.getEventParticipants(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_PARTICIPANTS , params] };
}
