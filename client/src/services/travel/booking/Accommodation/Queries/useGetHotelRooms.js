import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BookingService from "../booking.service";
import { queryClient } from "services/queryClient";

export default function useGetHotelRooms(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.BOOKING_GET_HOTEL_ROOMS, params],
    queryFn: () => BookingService.getHotelRooms(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.BOOKING_GET_HOTEL_ROOMS, params] };
}

export const searchForRooms = (params, config = {}) => {
  return queryClient.fetchQuery({
    queryFn: () => BookingService.getHotelRooms(params),
    queryKey: [QUERY_KEY.BOOKING_GET_HOTEL_ROOMS, params],
    ...config,
  });
};
