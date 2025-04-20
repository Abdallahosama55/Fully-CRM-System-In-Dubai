import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingService from "../pricing.service";

export default function useGetPricingCategorySystem(config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PRICING_CATEGORIES_SYSTEM],
    queryFn: () => PricingService.getPricingCategorySystem(),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PRICING_CATEGORIES_SYSTEM] };
}
