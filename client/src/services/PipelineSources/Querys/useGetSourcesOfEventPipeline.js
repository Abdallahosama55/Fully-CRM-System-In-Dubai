import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import PipelineSourcesService from "../PipelineSources.service";

export default function useGetSourcesOfEventPipeline(pipelineId, params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.EVENT_PIPELINE_SOURECES],
    queryFn: () => PipelineSourcesService.getSourcesOfEventPipeline(pipelineId, params),
    ...config,
  });

  return { ...query, key: [QUERY_KEY.EVENT_PIPELINE_SOURECES] };
}
