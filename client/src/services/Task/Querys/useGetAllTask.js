import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import taskService from "../task.service";
import { QUERY_KEY } from "services/constants";

function useGetAllTask(params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.ALL_TASK, params],
    queryFn: () => taskService.getAllTask(params),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.ALL_TASK, params] };
}
function useGetSuspenseAllTask(params = {}, config = {}) {
  const query = useSuspenseQuery({
    queryKey: [QUERY_KEY.ALL_TASK, params],
    queryFn: () => taskService.getAllTask(params),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.ALL_TASK, params] };
}
export { useGetSuspenseAllTask, useGetAllTask };
