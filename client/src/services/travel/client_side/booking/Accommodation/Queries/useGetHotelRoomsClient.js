import { useQuery } from "@tanstack/react-query";
import { queryClient } from "services/queryClient";
import BookingClientService from "../booking.client.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetHotelRoomsClient(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_GET_HOTEL_ROOMS, params],
        queryFn: () => BookingClientService.getHotelRooms(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_GET_HOTEL_ROOMS, params] };
}

export const searchForClientRooms = (params, config = {}) => {
    return queryClient.fetchQuery({
        queryFn: () => BookingClientService.getHotelRooms(params),
        queryKey: [QUERY_KEY_CLIENT.BOOKING_GET_HOTEL_ROOMS, params],
        ...config,
    });
};
