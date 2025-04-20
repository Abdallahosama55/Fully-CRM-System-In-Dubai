import { useQuery } from "@tanstack/react-query";
import ChartersService from "../charters.service";
import { QUERY_KEY } from "services/constants";
import { queryClient } from "services/queryClient";

export default (params, config = {}) => {
  const query = useQuery({
    queryFn: () => ChartersService.getSearchFlight(params),
    queryKey: [QUERY_KEY.CHARTER_SEARCH_FLIGHTS, params],
    ...config,
  });

  return { ...query, key: [QUERY_KEY.CHARTER_SEARCH_FLIGHTS, params] };
};

export const fetchFlights = (params, config = {}) => {
  return queryClient.fetchQuery({
    queryFn: () => ChartersService.getSearchFlight(params),
    queryKey: [QUERY_KEY.CHARTER_SEARCH_FLIGHTS, params],
    ...config,
  });
};
