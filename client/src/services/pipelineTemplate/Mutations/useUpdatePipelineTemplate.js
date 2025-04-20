import { useMutation } from "@tanstack/react-query";
import pipelineTemplateService from "../pipelineTemplate.service";

export default function useUpdatePipelineTemplate(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, data }) => pipelineTemplateService.updateTemplate(id, data),
    ...config,
  });
  return { updateTemplate: mutateAsync, isPending };
}
