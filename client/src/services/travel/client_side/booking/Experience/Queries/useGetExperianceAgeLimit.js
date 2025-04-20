import { useQuery } from "@tanstack/react-query";
import ExperienceBookingClientService from "../booking.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetExperianceAgeLimit(experianceId, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_EXPERIANCE_AGE_LIMIT , experianceId],
        queryFn: () => ExperienceBookingClientService.getExperianceAgeLimit(experianceId),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_EXPERIANCE_AGE_LIMIT , experianceId] };
}

