import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import pipelineTemplateService from "../pipelineTemplate.service";

export default function useGetPipelineTemplates(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.PIPELINES_TEMPLATES],
    queryFn: () => pipelineTemplateService.getPipelineTemplates(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.PIPELINES_TEMPLATES] };
}
