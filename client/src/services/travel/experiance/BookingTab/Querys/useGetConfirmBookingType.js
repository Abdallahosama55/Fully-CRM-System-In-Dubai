import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BookingService from "../booking.service";

export default function useGetConfirmBookingType(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_CONFIRM_BOOKING_TYPE],
    queryFn: () => BookingService.getConfirmBookingType(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_CONFIRM_BOOKING_TYPE] };
}
