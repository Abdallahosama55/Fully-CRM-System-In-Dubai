import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ManualBookingService from "../manual.booking.service";

export default function useManualBookingListSuppliers(params , config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.MANUAL_BOOKING_LIST_HOTEL_SUPPLIERS , params],
    queryFn: () => ManualBookingService.listSuppliers(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.MANUAL_BOOKING_LIST_HOTEL_SUPPLIERS , params] };
}
