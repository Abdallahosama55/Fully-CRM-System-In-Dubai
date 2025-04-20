import { useMutation } from "@tanstack/react-query";
import pipelineTemplateService from "../pipelineTemplate.service";

export default function useAddPipelineTemplate(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => pipelineTemplateService.addPipelineTemplate(data),
    ...config,
  });

  return {
    addPipelineTemplate: mutateAsync,
    isPending: isPending,
  };
}
