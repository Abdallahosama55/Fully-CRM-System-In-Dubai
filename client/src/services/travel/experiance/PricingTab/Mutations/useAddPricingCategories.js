import { useMutation } from "@tanstack/react-query";
import PricingService from "../pricing.service";

export default function useAddPricingCategories(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, productId }) => PricingService.addPricingCategories(data, productId),
    ...config,
  });

  return {
    addPricingCategories: mutateAsync,
    isPending: isPending,
  };
}
