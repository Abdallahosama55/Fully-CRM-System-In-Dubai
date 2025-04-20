import { useMutation } from "@tanstack/react-query";
import PipelineSourcesService from "../PipelineSources.service";

export default function useAddSourceToEventPipeline(pipelineId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => PipelineSourcesService.addSourceToEventPipeline(pipelineId, data),
    ...config,
  });

  return {
    addSourceToEventPipeline: mutateAsync,
    isPending: isPending,
  };
}
