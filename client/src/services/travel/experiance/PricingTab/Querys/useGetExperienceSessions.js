import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "services/constants";
import PricingService from "../pricing.service";

export default function useGetExperienceSessions(productId, config = {}) {
  const query = useQuery({
    queryKey: [QUERY_KEY.GET_EXPERIANCE_SESSIONS],
    queryFn: () => PricingService.getExperienceSessions(productId),
    ...config,
  });
  return query;
}
