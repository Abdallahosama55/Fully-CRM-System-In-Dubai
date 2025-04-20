import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingService from "../pricing.service";

export default function useGetPricingRateByID(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PRICING_RATE_BY_ID],
    queryFn: () => PricingService.getPricingRateByID(productId),
    ...config,
  });
  return query;
}
