import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperienceBookingService from "../booking.service";

export default function useGetExperianceAgeLimit(experianceId, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_EXPERIANCE_AGE_LIMIT , experianceId],
        queryFn: () => ExperienceBookingService.getExperianceAgeLimit(experianceId),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_EXPERIANCE_AGE_LIMIT , experianceId] };
}

