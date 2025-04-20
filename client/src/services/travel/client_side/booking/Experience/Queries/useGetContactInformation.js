import { useQuery } from "@tanstack/react-query";
import ExperienceBookingClientService from "../booking.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetContactInformation(experianceId, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.GET_CONTACT_INFORMATION , experianceId],
        queryFn: () => ExperienceBookingClientService.getContactInformation(experianceId),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.GET_CONTACT_INFORMATION , experianceId] };
}

