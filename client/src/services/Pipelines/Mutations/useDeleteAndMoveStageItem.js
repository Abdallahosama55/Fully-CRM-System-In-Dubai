import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useDeleteAndMoveStageItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => {
      return PipelinesService.deleteAndMoveStageItem(data);
    },
    ...config,
  });

  return {
    deleteAndMoveStageItem: mutateAsync,
    isPending: isPending,
  };
}
