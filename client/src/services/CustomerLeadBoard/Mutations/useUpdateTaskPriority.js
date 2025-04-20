import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useUpdateTaskPriority(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ taskId, priorityId }) =>
      CustomerLeadBoardService.updateTaskPriority(taskId, priorityId),
    ...config,
  });

  return {
    updateTaskPriority: mutateAsync,
    isPending: isPending,
  };
}
