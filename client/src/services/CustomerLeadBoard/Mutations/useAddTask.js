import { useMutation } from "@tanstack/react-query";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useAddTask(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => CustomerLeadBoardService.addTask(data),
    ...config,
  });

  return {
    addTask: mutateAsync,
    isPending: isPending,
  };
}
