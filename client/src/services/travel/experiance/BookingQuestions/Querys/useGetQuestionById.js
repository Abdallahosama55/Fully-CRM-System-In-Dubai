import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import BookingQuestionsService from "../booking_questions.service";

export default function useGetQuestionById(id, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_BOOKING_QUESTIONS_BY_ID],
    queryFn: () => BookingQuestionsService.getById(id),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_BOOKING_QUESTIONS_BY_ID] };
}
