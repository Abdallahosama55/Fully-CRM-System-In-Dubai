import { useMutation } from "@tanstack/react-query";
import PricingService from "../pricing.service";

export default function useUpdatePricingRate(productId, config = {}) {
  const tempMutation = useMutation({
    mutationFn: (data) => PricingService.updatePricingRate({ ...data, productId }),
    ...config,
  });

  return tempMutation;
}
