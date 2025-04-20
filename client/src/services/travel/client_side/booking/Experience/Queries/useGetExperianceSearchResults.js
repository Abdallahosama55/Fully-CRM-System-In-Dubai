import { useQuery } from "@tanstack/react-query";
import ExperienceBookingClientService from "../booking.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetExperianceSearchResults(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_EXPERIANCE_SEARCH_RESULTS, params],
        queryFn: () => ExperienceBookingClientService.getExperianceSearchResults(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_EXPERIANCE_SEARCH_RESULTS, params] };
}

