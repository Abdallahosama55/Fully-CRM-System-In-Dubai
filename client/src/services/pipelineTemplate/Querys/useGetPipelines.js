import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import pipelineTemplateService from "../pipelineTemplate.service";

export default function useGetPipelines(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.PIPLINES],
    queryFn: () => pipelineTemplateService.getPipelines(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.PIPLINES] };
}
