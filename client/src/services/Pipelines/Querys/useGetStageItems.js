import { useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import PipelinesService from "../Pipelines.service";

export default function useGetStageItems(config = {}) {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.PIPELINES_STAGE_ITEMS],
    queryFn: () => PipelinesService.getStageItems(),
    ...config,
  });
  return {
    ...query,
    key: [QUERY_KEY.PIPELINES_STAGE_ITEMS],
  };
}
// data: query.data.data.data.rows?.forEach((item) => ({ ...item, id: item.id.toString() })),
