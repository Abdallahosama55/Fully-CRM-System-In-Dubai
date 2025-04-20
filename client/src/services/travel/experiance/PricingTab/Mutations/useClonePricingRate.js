import { useMutation } from "@tanstack/react-query";
import PricingService from "../pricing.service";

export default function useClonePricingRate(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ rateId, productId }) => PricingService.clonePricingRate(rateId, productId),
    ...config,
  });

  return {
    clonePricingRate: mutateAsync,
    isPending: isPending,
  };
}
