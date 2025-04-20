import { useQuery } from "@tanstack/react-query";
import ExperienceBookingClientService from "../booking.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetExperianceSessions(bookingKey, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_GET_EXPERIANCE_SESSIONS, bookingKey],
        queryFn: () => ExperienceBookingClientService.getExperianceSessions(bookingKey),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_GET_EXPERIANCE_SESSIONS, bookingKey] };
}

