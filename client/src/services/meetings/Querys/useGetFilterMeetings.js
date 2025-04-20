import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import meetingsService from "../meetings.service";

export default (params, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.MEETINGS_CALENDAR, params],
    queryFn: () => meetingsService.getFilterData(params),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.MEETINGS_CALENDAR, params] };
};
