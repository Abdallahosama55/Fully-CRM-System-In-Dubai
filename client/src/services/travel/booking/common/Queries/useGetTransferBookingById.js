// 
import { useQuery } from "@tanstack/react-query";
import BookingsService from "../booking.service";
import { QUERY_KEY } from "services/constants";

export default function useGetTransferBookingById(params, config = {}) {
    const query = useQuery({
        queryKey: [QUERY_KEY.GET_TRANSFER_BOOKING_BY_ID, params],
        queryFn: () => {
            try {
                return BookingsService.getTransferBookingById(params);
              } catch (error) {
                console.error('Error in query function:', error);
                throw error;
              }
        },
        ...config,
    });
    return { ...query, key: [QUERY_KEY.GET_TRANSFER_BOOKING_BY_ID, params] };
}
