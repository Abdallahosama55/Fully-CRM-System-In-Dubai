import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperienceBookingService from "../booking.service";

export default function useGetExperianceSessions(bookingKey, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.BOOKING_GET_EXPERIANCE_SESSIONS, bookingKey],
        queryFn: () => ExperienceBookingService.getExperianceSessions(bookingKey),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.BOOKING_GET_EXPERIANCE_SESSIONS, bookingKey] };
}

