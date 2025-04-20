import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useUpdatePriorityItemOrder(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ leadPriorityId, newOrder }) =>
      PipelinesService.updatePriorityItemOrder(leadPriorityId, newOrder),
    ...config,
  });
  return { updatePriorityItemOrder: mutateAsync, isPending };
}
