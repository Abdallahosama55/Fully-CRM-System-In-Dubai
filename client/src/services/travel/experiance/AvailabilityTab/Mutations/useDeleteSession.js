import { useMutation } from "@tanstack/react-query";
import AvailabilityService from "../availability.service";

export default function useDeleteSession(config = {}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (productId) => AvailabilityService.deleteSession(productId),

    ...config,
  });

  return {
    deleteSession: mutateAsync,
    isPending: isPending,
  };
}
