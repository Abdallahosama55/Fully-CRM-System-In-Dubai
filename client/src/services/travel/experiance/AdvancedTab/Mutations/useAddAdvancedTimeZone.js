import { useMutation } from "@tanstack/react-query";
import AdvancedService from "../advanced.service";

export default function useAddAdvancedTimeZone(productId, config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => AdvancedService.addAdvancedTimeZone(productId, data),
    ...config,
  });

  return {
    addAdvancedTimeZone: mutateAsync,
    isPending: isPending,
  };
}
