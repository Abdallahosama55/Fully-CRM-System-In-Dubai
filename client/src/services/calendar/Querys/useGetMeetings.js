import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import calendarService from "../calendar.service";

export default (params, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.MEETINGS_CALENDAR, params],
    queryFn: () => calendarService.getData(params),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.MEETINGS_CALENDAR, params] };
};
