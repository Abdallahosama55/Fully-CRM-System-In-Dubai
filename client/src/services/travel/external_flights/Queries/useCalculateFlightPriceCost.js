import { useQuery } from "@tanstack/react-query";
import ChartersService from "../external_flights.service";
import { QUERY_KEY } from "services/constants";

export default (params, config = {}) => {
  console.log({ ...params }, config);
  const query = useQuery({
    queryFn: () => ChartersService.calculatePriceCost(params),
    queryKey: [QUERY_KEY.CALCULATE_FLIGHT_PRICE_COST, params],
    ...config,
  });
  return { ...query, key: [QUERY_KEY.CALCULATE_FLIGHT_PRICE_COST, params] };
};
