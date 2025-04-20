import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useDeleteTask(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => CustomerLeadBoardService.deleteTask(id),
    ...config,
  });

  return {
    deleteTask: mutateAsync,
    isPending: isPending,
  };
}
