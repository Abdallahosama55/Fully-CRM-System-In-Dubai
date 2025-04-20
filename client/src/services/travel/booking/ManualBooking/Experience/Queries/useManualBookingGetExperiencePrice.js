import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ManualBookingService from "../../manual.booking.service";

export default function useManualBookingGetExperiencePrice(params, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.MANUAL_BOOKING_GET_EXPERIENCE_PRICE, params],
    queryFn: () => ManualBookingService.Experience.listHotelRooms(params),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.MANUAL_BOOKING_GET_EXPERIENCE_PRICE, params] };
}
