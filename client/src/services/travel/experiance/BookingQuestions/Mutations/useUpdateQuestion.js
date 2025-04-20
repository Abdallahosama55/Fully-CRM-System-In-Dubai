import { useMutation } from "@tanstack/react-query";
import BookingQuestionsService from "../booking_questions.service";

export default function useUpdateQuestion(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (question) => BookingQuestionsService.updateQuestion(question),
    ...config,
  });

  return {
    updateQuestion: mutateAsync,
    isPending: isPending,
  };
}
