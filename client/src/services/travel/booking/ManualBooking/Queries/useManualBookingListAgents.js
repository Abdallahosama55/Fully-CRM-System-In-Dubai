import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ManualBookingService from "../manual.booking.service";

export default function useManualBookingListAgents(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.MANUAL_BOOKING_LIST_HOTEL_AGENTS],
    queryFn: () => ManualBookingService.listAgents(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.MANUAL_BOOKING_LIST_HOTEL_AGENTS] };
}
