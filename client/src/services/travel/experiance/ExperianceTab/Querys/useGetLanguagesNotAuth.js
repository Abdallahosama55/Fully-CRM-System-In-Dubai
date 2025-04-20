import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ExperianceService from "../experiance.service";
import { queryClient } from "services/queryClient";

export default function useGetLanguagesNotAuth(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_LANGUAGES],
    queryFn: async () => {
      const cachedData = queryClient.getQueryData([QUERY_KEY.GET_LANGUAGES]);
      if (cachedData) {
        // Return cached data if it exists
        return cachedData;
      }
      // Fetch from API if data is not in cache
      const response = await ExperianceService.getLanguagesNotAuth();
      return response;
    },
    staleTime: Infinity, // Data is considered fresh forever (won't refetch unless manually invalidated)
    cacheTime: 1000 * 60 * 10, // Cache the data for 10 minutes
    ...config,
  });

  return { ...query, key: [QUERY_KEY.GET_LANGUAGES] };
}
