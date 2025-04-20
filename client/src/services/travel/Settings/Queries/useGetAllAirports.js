import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import TravelSettingsService from "../travelSettings.service";

export default (params = {}, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.ALL_AIRPORTS, params],
    queryFn: () => TravelSettingsService.getAllAirports(params),
    ...config,

    staleTime: Infinity,
  });
  return { ...query, queryKey: [QUERY_KEY.ALL_AIRPORTS, params] };
};
