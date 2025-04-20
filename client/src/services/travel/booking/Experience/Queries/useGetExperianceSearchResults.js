import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperienceBookingService from "../booking.service";

export default function useGetExperianceSearchResults(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_EXPERIANCE_SEARCH_RESULTS, params],
        queryFn: () => ExperienceBookingService.getExperianceSearchResults(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_EXPERIANCE_SEARCH_RESULTS, params] };
}

