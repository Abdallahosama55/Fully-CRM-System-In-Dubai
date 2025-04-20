import { useMutation } from "@tanstack/react-query";
import BookingQuestionsService from "../booking_questions.service";

export default function useAddQuestion(productId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (question) =>
      BookingQuestionsService.addQuestion(productId, question),
    ...config,
  });

  return {
    addQuestion: mutateAsync,
    isPending: isPending,
  };
}
