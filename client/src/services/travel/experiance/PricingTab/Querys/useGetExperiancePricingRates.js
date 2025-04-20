import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingService from "../pricing.service";

export default function useGetExperiancePricingRates(productId, sessionId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_PRICING_RATES],
    queryFn: () => PricingService.getExperiancePricingRates(productId, sessionId),
    ...config,
  });
  return query;
}
