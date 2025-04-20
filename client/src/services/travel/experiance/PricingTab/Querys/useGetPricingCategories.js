import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingService from "../pricing.service";

export default function useGetPricingCategories(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PRICING_CATEGORIES],
    queryFn: () => PricingService.getPricingCategories(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PRICING_CATEGORIES] };
}
