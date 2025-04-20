import { useQueries } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";
import ConstantService from "../constants.service";

export default (config = {}) => {
  const query = useQueries({
    queries: [
      {
        queryFn: () => ConstantService.getScheduleTypes(),
        queryKey: [QUERY_KEY.SCHEDULE_TYPE_CONSTANTS],
        refetchOnMount: false,
        ...config,
      },
      {
        queryFn: () => ConstantService.getMeetingStatus(),
        queryKey: [QUERY_KEY.MEETING_STATUS_CONSTANTS],
        refetchOnMount: false,
        ...config,
      },
    ],
  });

  return {
    schedulesType: query[0],
    meetingStatus: query[1],
  };
};

export const fetchConstants = () => {
  queryClient.fetchQuery({
    queryFn: () => ConstantService.getScheduleTypes(),
    queryKey: [QUERY_KEY.SCHEDULE_TYPE_CONSTANTS],
  });
  queryClient.fetchQuery({
    queryFn: () => ConstantService.getMeetingStatus(),
    queryKey: [QUERY_KEY.MEETING_STATUS_CONSTANTS],
  });
};
