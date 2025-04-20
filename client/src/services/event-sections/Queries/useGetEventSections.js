import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventsSectionsService from "../event-sections.service";

export default function useGetEventSections(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_SECTIONS , id],
        queryFn: () => EventsSectionsService.getEventSections(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_SECTIONS , id] };
}
