import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventHallsService from "../event-halls.service";

export default function useGetEventHallById(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_HALL_BY_ID , id],
        queryFn: () => EventHallsService.getEventHallById(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_HALL_BY_ID , id] };
}
