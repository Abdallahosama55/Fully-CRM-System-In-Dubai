import { useMutation } from "@tanstack/react-query";
import PricingService from "../pricing.service";

export default function useSetPricingRateAsDefault(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (rateId) => PricingService.setPricingRateAsDefault(rateId),
    ...config,
  });

  return {
    setPricingRateAsDefault: mutateAsync,
    isPending: isPending,
  };
}
