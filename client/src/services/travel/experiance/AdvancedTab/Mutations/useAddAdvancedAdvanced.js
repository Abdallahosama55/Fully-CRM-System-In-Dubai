import { useMutation } from "@tanstack/react-query";
import AdvancedService from "../advanced.service";

export default function useAddAdvancedAdvanced(productId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => AdvancedService.addAdvancedAdvanced(productId, data),
    ...config,
  });

  return {
    addAdvancedAdvanced: mutateAsync,
    isPending: isPending,
  };
}
