import { useMutation } from "@tanstack/react-query";
import PricingService from "../pricing.service";

export default function useDeletePricingRate(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (rateId) => PricingService.deletePricingRate(rateId),
    ...config,
  });

  return {
    deletePricingRate: mutateAsync,
    isPending: isPending,
  };
}
