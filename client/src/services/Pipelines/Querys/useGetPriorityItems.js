import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import PipelinesService from "../Pipelines.service";

export default function useGetPriorityItems(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.PIPELINES_PRIORITY_ITEMS],
    queryFn: () => PipelinesService.getPriorityItems(),
    ...config,
  });
  return {
    ...query,
    // data: query.data.data.data.rows?.map((item) => ({ ...item, id: item.id.toString() })),
    key: [QUERY_KEY.PIPELINES_PRIORITY_ITEMS],
  };
}
