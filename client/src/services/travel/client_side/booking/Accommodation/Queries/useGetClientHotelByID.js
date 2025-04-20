import { useQuery } from "@tanstack/react-query";
import BookingClientService from "../booking.client.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetClientHotelByID(id, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_GET_HOTEL_BY_ID, id],
        queryFn: () => BookingClientService.getAccommodationByID(id),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_GET_HOTEL_BY_ID, id] };
}
