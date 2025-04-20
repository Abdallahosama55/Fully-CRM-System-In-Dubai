import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useUpdateTaskAssignTo(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ taskId, assignToId }) =>
      CustomerLeadBoardService.updateTaskAssignTo(taskId, assignToId),
    ...config,
  });

  return {
    updateTaskAssignTo: mutateAsync,
    isPending: isPending,
  };
}
