// 
import { useQuery } from "@tanstack/react-query";
import BookingsService from "../booking.service";
import { QUERY_KEY } from "services/constants";

export default function useGetFlightBookingById(params, config = {}) {
    console.log('config', config)
    console.log('params', params)

    const query = useQuery({
        queryKey: [QUERY_KEY.GET_FLIGHT_BOOKING_BY_ID, params],
        queryFn: () => {
            try {
                console.log('TEST TEST TEST TEST');
                return BookingsService.getFlightBookingById(params);
              } catch (error) {
                console.error('Error in query function:', error);
                throw error;
              }
        },
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_FLIGHT_BOOKING_BY_ID, params] };
}
