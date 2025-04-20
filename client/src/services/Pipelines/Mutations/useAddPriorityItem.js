import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useAddPriorityItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => PipelinesService.addPriorityItem(data),
    ...config,
  });

  return {
    addPriorityItem: mutateAsync,
    isPending: isPending,
  };
}
