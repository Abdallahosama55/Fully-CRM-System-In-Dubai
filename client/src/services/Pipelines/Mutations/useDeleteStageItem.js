import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useDeleteStageItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => PipelinesService.deleteStageItem(id),
    ...config,
  });

  return {
    deleteStageItem: mutateAsync,
    isPending: isPending,
  };
}
