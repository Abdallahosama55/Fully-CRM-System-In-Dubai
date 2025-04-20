import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BookingQuestionsService from "../booking_questions.service";

export default function useGetQuestions(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_BOOKING_QUESTIONS],
    queryFn: () => BookingQuestionsService.getQuestions(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_BOOKING_QUESTIONS] };
}
