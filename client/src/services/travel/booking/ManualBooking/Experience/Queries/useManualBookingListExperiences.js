import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ManualBookingService from "../../manual.booking.service";

export default function useManualBookingListExperiences(supplierId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.MANUAL_BOOKING_LIST_EXPERIENCES, supplierId],
    queryFn: () => ManualBookingService.Experience.listExperiences(supplierId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.MANUAL_BOOKING_LIST_EXPERIENCES, supplierId] };
}
