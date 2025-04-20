import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useUpdatePriorityItem(id, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => PipelinesService.updatePriorityItem(id, data),
    ...config,
  });
  return { updatePriorityItem: mutateAsync, isPending };
}
