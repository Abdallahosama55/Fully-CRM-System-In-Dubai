import { useQuery } from "@tanstack/react-query";
import meetingsService from "../meetings.service";
import { QUERY_KEY } from "services/constants";

export default (params, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.MEETING_EMPLOYEES_ALL_QUEUES, params],
    queryFn: () => meetingsService.getQueuesList(params),
    ...config,
  });
  return { ...query, queryKey: [QUERY_KEY.MEETING_EMPLOYEES_ALL_QUEUES] };
};
