import { useMutation } from "@tanstack/react-query";
import PricingService from "../pricing.service";

export default function useAddExperiencePricess(productId, config = {}) {
  const tempMutation = useMutation({
    mutationFn: (values) => PricingService.addExperiencePricess(values, productId),
    ...config,
  });

  return tempMutation;
}
