import { useMutation } from "@tanstack/react-query";
import PipelinesService from "../Pipelines.service";

export default function useUpdateStageItem(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, label, color }) => PipelinesService.updateStageItem(id, { label, color }),
    ...config,
  });
  return { updateStageItem: mutateAsync, isPending };
}
