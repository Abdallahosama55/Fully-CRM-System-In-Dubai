import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TravelSettingsService from "../travelSettings.service";

export default (name, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.SEARCH_AIRPORTS, name],
    queryFn: () => TravelSettingsService.searchAirports(name),
    ...config,

    staleTime: Infinity,
  });
  return { ...query, queryKey: [QUERY_KEY.SEARCH_AIRPORTS, name] };
};
