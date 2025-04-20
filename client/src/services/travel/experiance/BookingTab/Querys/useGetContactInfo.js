import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BookingService from "../booking.service";

export default function useGetContactInfo(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_CONTACT_INFO],
    queryFn: () => BookingService.getContactInfo(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_CONTACT_INFO] };
}
