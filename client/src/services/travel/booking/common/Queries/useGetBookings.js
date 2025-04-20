import { useQuery } from "@tanstack/react-query";
import BookingsService from "../booking.service";
import { QUERY_KEY } from "services/constants";

export default function useGetBookings(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_BOOKINGS, params],
        queryFn: () => BookingsService.getBookings(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_BOOKINGS, params] };
}
