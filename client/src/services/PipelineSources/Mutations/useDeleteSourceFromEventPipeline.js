import { useMutation } from "@tanstack/react-query";
import PipelineSourcesService from "../PipelineSources.service";

export default function useDeleteSourceFromEventPipeline(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => PipelineSourcesService.deleteSourceFromEventPipeline(id),
    ...config,
  });

  return {
    deleteSource: mutateAsync,
    isPending: isPending,
  };
}
