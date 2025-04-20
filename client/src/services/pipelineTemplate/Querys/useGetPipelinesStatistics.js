import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import pipelineTemplateService from "../pipelineTemplate.service";

export default function useGetPipelinesStatistics(config = {}) {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.PIPLINES_STATISTICS],
    queryFn: () => pipelineTemplateService.getPipelinesStatistics(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.PIPLINES_STATISTICS] };
}
