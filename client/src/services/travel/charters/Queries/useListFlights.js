import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import ChartersService from "../charters.service";

export default (params = {}, config = {}) => {
  const query = useQuery({
    queryFn: () => ChartersService.getListFlight(params),
    queryKey: [QUERY_KEY.FLIGHT_LIST, params],
    ...config,
  });
  return { ...query, key: [QUERY_KEY.FLIGHT_LIST, params] };
};
