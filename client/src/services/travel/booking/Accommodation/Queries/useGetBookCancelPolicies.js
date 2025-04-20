import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BookingService from "../booking.service";
import dayjs from "dayjs";

export default function useGetBookCancelPolicies(bookingId, config = {}) {
  const query = useQuery({
    queryKey: [
      QUERY_KEY.BOOKING_GET_CANCEL_POLICIES,
      { bookingId, date: dayjs().format("DD/MM/YYY") },
    ],
    queryFn: () => BookingService.getBookCancelPolicies(bookingId),
    ...config,
  });
  return {
    ...query,
    key: [QUERY_KEY.BOOKING_GET_CANCEL_POLICIES, { bookingId, date: dayjs().format("DD/MM/YYY") }],
  };
}
