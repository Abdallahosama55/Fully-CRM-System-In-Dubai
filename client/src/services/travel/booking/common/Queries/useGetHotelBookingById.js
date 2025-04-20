import { useQuery } from "@tanstack/react-query";
import BookingsService from "../booking.service";
import { QUERY_KEY } from "services/constants";

export default function useGetHotelBookingById(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_HOTEL_BOOKING_BY_ID, params],
        queryFn: () => BookingsService.getHotelBookingById(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_HOTEL_BOOKING_BY_ID, params] };
}
