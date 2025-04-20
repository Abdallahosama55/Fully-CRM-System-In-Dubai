import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useDeletePriorityItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => PipelinesService.deletePriorityItem(id),
    ...config,
  });

  return {
    deletePriorityItem: mutateAsync,
    isPending: isPending,
  };
}
