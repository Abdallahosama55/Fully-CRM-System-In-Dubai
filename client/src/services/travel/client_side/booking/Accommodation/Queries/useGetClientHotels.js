import { useQuery } from "@tanstack/react-query";
import { queryClient } from "services/queryClient";
import BookingClientService from "../booking.client.service";
import { QUERY_KEY_CLIENT } from "constants/QUERY_KEY_CLIENT";

export default function useGetClientHotels(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY_CLIENT.BOOKING_GET_HOTELS, params],
        queryFn: () => BookingClientService.getHotels(params),
        ...config,
    });
    return { ...query, key: [QUERY_KEY_CLIENT.BOOKING_GET_HOTELS, params] };
}

export const searchForClientHotels = (params, config = {}) => {
    return queryClient.fetchQuery({
        queryFn: () => BookingClientService.getHotels(params),
        queryKey: [QUERY_KEY_CLIENT.BOOKING_GET_HOTELS, params],
        ...config,
    });
};
