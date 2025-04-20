import { useQuery } from "@tanstack/react-query";
import BookingsService from "../booking.service";
import { QUERY_KEY } from "services/constants";

export default function useGetExperienceBookingById(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_EXPERIENCE_BOOKING_BY_ID, params],
        queryFn: () => BookingsService.getExperienceBookingById(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_EXPERIENCE_BOOKING_BY_ID, params] };
}
