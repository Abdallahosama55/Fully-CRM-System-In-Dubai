import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useAddStageItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => PipelinesService.addItemStage(data),
    ...config,
  });

  return {
    addStageItem: mutateAsync,
    isPending: isPending,
  };
}
