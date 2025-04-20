import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventParticipantsService from "../event-participant.service";

export default function useGetEventParticipantById(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_PARTICIPANT_BY_ID , params],
        queryFn: () => EventParticipantsService.getEventParticipantById(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_PARTICIPANT_BY_ID , params] };
}
