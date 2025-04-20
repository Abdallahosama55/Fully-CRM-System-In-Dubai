import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useUpdateStageItemOrder(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ stageId, newOrder }) => PipelinesService.updateStageItemOrder(stageId, newOrder),
    ...config,
  });
  return { updateStageItemOrder: mutateAsync, isPending };
}
