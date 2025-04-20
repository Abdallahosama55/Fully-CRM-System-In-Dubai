import { useMutation } from "@tanstack/react-query";
import AdvancedService from "../advanced.service";

export default function useAddAdvancedSettings(productId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => AdvancedService.addAdvancedSettings(productId, data),
    ...config,
  });

  return {
    addAdvancedSettings: mutateAsync,
    isPending: isPending,
  };
}
