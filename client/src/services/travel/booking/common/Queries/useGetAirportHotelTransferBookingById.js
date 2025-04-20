// 
import { useQuery } from "@tanstack/react-query";
import BookingsService from "../booking.service";
import { QUERY_KEY } from "services/constants";

export default function useGetAirportHotelTransferBookingById(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_AIRPORT_HOTEL_TRANSFER_BOOKING_BY_ID, params],
        queryFn: () => {
            try {
                return BookingsService.getAirportHotelTransferBookingById(params);
              } catch (error) {
                console.error('Error in query function:', error);
                throw error;
              }
        },
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_AIRPORT_HOTEL_TRANSFER_BOOKING_BY_ID, params] };
}
