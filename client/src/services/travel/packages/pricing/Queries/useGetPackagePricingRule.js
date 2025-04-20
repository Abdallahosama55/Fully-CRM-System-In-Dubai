import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PackagesPricingService from "../pricing.service";


export default function useGetPackagePricingRule(tripId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_PACKAGE_PRICING_RULE , tripId],
    queryFn: () => PackagesPricingService.getPricingRule(tripId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_PACKAGE_PRICING_RULE , tripId] };
}
