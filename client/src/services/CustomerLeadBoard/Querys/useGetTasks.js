import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants";
import CustomerLeadBoardService from "../CustomerLeadBoard.service";

export default function useGetTasks(params = {}, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.TASKS, params],
    queryFn: () => CustomerLeadBoardService.getTasks(params),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.TASKS, params] };
}
