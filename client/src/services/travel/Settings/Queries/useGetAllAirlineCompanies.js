import { QUERY_KEY } from "services/constants";
import TravelSettingsService from "../travelSettings.service";
import { useQuery } from "@tanstack/react-query";

/**
 *
 * @param {Object} [params={}] - Params to be passed to `getAirlineCompanies` service.
 * @param {QueryClientConfig} config - The configuration for the query client.
 * @returns {Object} - React query result.
 */

export default (params = {}, config = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.ALL_AIRLINE_COMPANIES, params],
    queryFn: () => TravelSettingsService.getAirlineCompanies(params),
    ...config,
  });

  return { ...query, queryKey: [QUERY_KEY.ALL_AIRLINE_COMPANIES, params] };
};
