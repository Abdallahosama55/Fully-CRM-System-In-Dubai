import { useMutation } from "@tanstack/react-query";
import BookingQuestionsService from "../booking_questions.service";

export default function useDeleteQuestion(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => BookingQuestionsService.deleteQuestion(id),
    ...config,
  });

  return {
    deleteQuestion: mutateAsync,
    isPending: isPending,
  };
}
