import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BookingService from "../booking.service";

export default function useGetContactInfoQuestions(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_CONTACT_INFO_QUESTIONS],
    queryFn: () => BookingService.getContactInfoQuestions(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_CONTACT_INFO_QUESTIONS] };
}
