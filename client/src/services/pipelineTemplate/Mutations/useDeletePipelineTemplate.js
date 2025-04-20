import { useMutation } from "@tanstack/react-query";
import pipelineTemplateService from "../pipelineTemplate.service";

export default function useDeletePipelineTemplate(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id) => pipelineTemplateService.deleteTemplate(id),
    ...config,
  });

  return {
    deleteTemplate: mutateAsync,
    isPending: isPending,
  };
}
