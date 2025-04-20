import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventHallsService from "../event-halls.service";

export default function useGetEventHalls(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_HALLS , id],
        queryFn: () => EventHallsService.getEventHalls(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_HALLS , id] };
}
