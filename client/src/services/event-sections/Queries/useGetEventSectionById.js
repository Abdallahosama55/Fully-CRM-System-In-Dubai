import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventsSectionsService from "../event-sections.service";

export default function useGetEventSectionById(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_SECTION_BY_ID , id],
        queryFn: () => EventsSectionsService.getEventSectionById(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_SECTION_BY_ID , id] };
}
