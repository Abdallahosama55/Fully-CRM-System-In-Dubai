import { useMutation } from "@tanstack/react-query";
import PricingService from "../pricing.service";

export default function useAddPricingRate(id, config = {}) {
  const tempMutation = useMutation({
    mutationFn: (data) => PricingService.addPricingRate(data, id),
    ...config,
  });

  return tempMutation
}
