import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesPricingService from "../pricing.service";


export default function useGetTotalPricingItem(tripId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_PRICING_TOTAL_PRICE , tripId],
    queryFn: () => PackagesPricingService.getTotalPricingItem(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_PRICING_TOTAL_PRICE , tripId] };
}
