import { useQuery } from "@tanstack/react-query";
import meetingsService from "../meetings.service";
import { QUERY_KEY } from "services/constants";

export default (id, config) => {
  const { data, isPending, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEY.MEETING_BY_ID, id],
    queryFn: async () => {
      try {
        const rest = await meetingsService.getMeetingById(id);
        if (typeof config?.onSuccess === "function") {
          config.onSuccess(rest);
        }
        return rest;
      } catch (e) {
        throw new Error(e);
      }
    },
    enabled: !!id,

    ...config,
  });
  return { data, isPending, isLoading, isError };
};
