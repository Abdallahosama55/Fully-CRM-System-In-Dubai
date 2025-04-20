import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BookingService from "../booking.service";
import { queryClient } from "services/queryClient";

export default function useGetHotels(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.BOOKING_GET_HOTELS, params],
    queryFn: () => BookingService.getHotels(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.BOOKING_GET_HOTELS, params] };
}

export const searchForAHotels = (params, config = {}) => {
  return queryClient.fetchQuery({
    queryFn: () => BookingService.getHotels(params),
    queryKey: [QUERY_KEY.BOOKING_GET_HOTELS, params],
    ...config,
  });
};
