import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingService from "../pricing.service";

export default function useGetUnusedExperienceSessions(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_UNUSED_EXPERIANCE_SESSIONS, productId],
    queryFn: () => PricingService.getUnusedExperienceSessions(productId),
    ...config,
  });
  return { ...query, key: [QUERY_KEY.GET_UNUSED_EXPERIANCE_SESSIONS, productId] };
}
