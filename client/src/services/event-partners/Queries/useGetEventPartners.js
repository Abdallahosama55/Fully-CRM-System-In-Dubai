import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventPartnersService from "../event-partners.service";

export default function useGetEventPartners(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_PARTNERS , id],
        queryFn: () => EventPartnersService.getEventPartners(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_PARTNERS , id] };
}
