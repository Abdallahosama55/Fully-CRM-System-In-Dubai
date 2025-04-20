import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import EventPartnersService from "../event-partners.service";

export default function useGetEventPartnerById(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EVENT_PARTNER_BY_ID , id],
        queryFn: () => EventPartnersService.getEventPartnerById(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EVENT_PARTNER_BY_ID , id] };
}
